	const UglifyJS = require("uglify-js");
const path = require('path');
const fs = require('fs').promises;
const validationModel = require('../model/validationModel');
const pathToDistFolder = path.resolve('dist/')
let minifiedJsFiles = {};

/**
 * Returns the actions that will be performed when the user
 * selects 'Validate and minify'.
 */
function getTasks() {
    return [{
        title: 'Minify JS Code and update the dist folder',
        task: () => writeMinifiedCodeIntoDistJsFiles().catch(error => showErrorInListr(error))
    }];
}


function showErrorInListr(error) {
    throw new Error('An error occured while running the task: ' + error.message);
}

/**
 * Compresses a JavaScript file 
 * @param {string} uncompressedFile - The path to the file that is minified.
 * @return minified Java Script Code
 */
async function minify(uncompressedFile) {
    let minificationResult;
    try {
        minificationResult = UglifyJS.minify(uncompressedFile).code;
    } catch (error) {
        console.log("Error in the minifying process " + error.message);
    }
    return minificationResult;

}

/**
 * Compresses the JavaScript files that are linked in the
 * index.html of the source folder.
 * @return minified Java Script file
 */
async function minifyJSCode() {
    let uncompressedFiles = validationModel.getUncompressedJS();
    Object.keys(uncompressedFiles).forEach(async fileName => {
        await minify(uncompressedFiles[fileName]).then(minificationResult => {
            minifiedJsFiles[fileName] = minificationResult;
        }).catch((error) => {
            throw new Error('Error in the minifying process: ' + error.message)
        });
    });
    return minifiedJsFiles;
}

/**
 * Overwrites the linked JavaScript files with the minified version.
 */
async function writeMinifiedCodeIntoDistJsFiles() {
    let filesToWrite = await minifyJSCode().catch((error) => {
        throw new Error('Error in the writing minify code inro dist folder: ' + error.message)
    });


    Object.keys(filesToWrite).forEach(async filePath => {
        await fs.writeFile(path.resolve(pathToDistFolder, filePath), minifiedJsFiles[filePath], 'utf-8')
            .catch((error) => {
                console.log("Cannot overwrite java script file: " + error.message);
	    });
    })
}

module.exports = {
    getTasks: getTasks
}
