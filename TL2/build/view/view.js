 const fs = require('fs');
 const path = require('path');
 const CFonts = require('cfonts');
 const inquirer = require('inquirer');
 const Listr = require('listr');

 /** 
  * Shows the logo on the command line interface tool 
  */
 function showBanner() {
 	CFonts.say('IBuilder',
 		bannerOptions()
 	);
 }

 function bannerOptions() {
 	var options = {
 		align: 'left',
 		background: 'green',
 		maxLength: '8',
 		env: 'node',
 		font: 'shade',
 		space: 'true',
 		lineHeight: '5',
 		letterSpacing: '4'
 	}
 	return options;
 }


 /**
  * Asks the user to choose between validate and minify plus validate 
  */
 function showOptions() {
 	return new Promise(function (resolve, reject) {
 		inquirer
 			.prompt([{
 				name: "validateOrMinify",
 				type: "list",
 				message: "Should I just validate all JS dependencies in the html file or should I validate all JS dependencies and minify the JS code?",
 				choices: ["just validate dependencies", "validate and minify"],
 			}, ])
 			.then((answer) => {
 				if (answer.validateOrMinify === "just validate dependencies") {
 					resolve("validate");
 				} else if (answer.validateOrMinify === "validate and minify") {
 					resolve("minify");
 				} else {
 					console.log(err);
 					reject(new Error("error"));
 				}
 			})
 			.catch(error => {
 				console.log('An error occured while showing the possible options to the user:' + error.message)
 			});
 	})
 }


 /**
  * function: creates a Listr to show the process of validation process
  * @param {*} justValidateInController the executed steps in the process
*/

 function showTasks(tasks) {
 	const validationTasks = new Listr(tasks);
 	validationTasks.run().catch(err => {});
 }


 module.exports = {
 	showBanner: showBanner,
 	showOptions: showOptions,
 	showTasks: showTasks
 }