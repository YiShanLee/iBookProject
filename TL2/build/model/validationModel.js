const fsWithPromises = require('fs').promises;
const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio');
const rmfr = require('rmfr');

/**
 * Global access point for the path to the index.html and to the
 * source folder, as they are needed several times.
 */
const pathToIndexHtml = path.resolve('src', 'index.html');
const pathToSrcFolder = path.resolve('src/');

/**
 * Global variables for storing the paths to the JS files,
 * as given in the html and for storing the text of the 
 * js files.
 */
let scriptList = [];
let uncompressedJSFiles = {};

/**
 * Returns the actions that will be performed when the user
 * selects 'Just validate'.
 */
function getTasks() {
    return [{
            title: 'Determine Links from the HTML file',
            task: () => determineLinksFromHtml().catch(error => showErrorInListr(error))
        },
        {
            title: 'Check dependencies',
            task: () => checkDependencies().catch(error => showErrorInListr(error))
        },
        {
            title: 'Read in linked files',
            task: () => readInLinkedFiles().catch(error => showErrorInListr(error))
        },
        {
            title: 'Remove dist folder',
            task: () => removeDistFolder().catch(error => showErrorInListr(error))
        }
    ];
}


function showErrorInListr(error) {
    throw new Error('An error occured while running the task: ' + error.message);
}

/** Checks the index.html for script tags and adds them to the 
 * global scriptList. 
 * 
 * @throws Error, if there are no script tags in the index.html or an erro occured while 
 * reading the index.html
 */
async function determineLinksFromHtml() {
    let data = await fsWithPromises.readFile(pathToIndexHtml, 'utf-8')
        .catch((error) => {
            throw new Error("Could not read the html file: " + error.message)
        });
    let $ = cheerio.load(data);
    $('script').each((_index, element) => {
        scriptList.push($(element).attr('src'));
    });

    if (scriptList.length === 0) {
        throw new Error('There are no script files in the index.html');
    }
    return scriptList;
}


/**
 * Checks whether all of the script files in the html
 * are accessible.
 */
async function checkDependencies() {
    for (let i = 0; i < scriptList.length; i++) {
        return await fsWithPromises.access(path.resolve(pathToSrcFolder, scriptList[i]), fs.constants.F_OK | fs.constants.R_OK)
            .catch((error) => {
                throw new Error('One of the JS files in the html is not readable: ' + error.message)
            });
    }
}

/**
 * Fetches the content of each JS file and saves each in an
 * array.
 * @return array with all js files
 */
async function readInLinkedFiles() {
    for (let i = 0; i < scriptList.length; i++) {
        currentContent = await fsWithPromises.readFile(path.resolve(pathToSrcFolder, scriptList[i]), 'utf-8')
            .catch((error) => {
                throw new Error('Could not read file: ' + error.message);
            });
        uncompressedJSFiles[scriptList[i]] = currentContent;
    }
    return uncompressedJSFiles;
}

/**
 * Getter for the array of all JS files
 * @return array with all js files
 */
function getUncompressedJS() {
    return uncompressedJSFiles;
}

/**
 * Deletes a dist folder if it already exists,
 * if not, nothing happens.
 */
async function removeDistFolder() {
    return await rmfr(path.resolve('dist/')).catch(error => {
        throw new Error('An error occurred while removing the dist folder: ' + error.message)
    });
}

module.exports = {
    getTasks: getTasks,
    getUncompressedJS: getUncompressedJS
}