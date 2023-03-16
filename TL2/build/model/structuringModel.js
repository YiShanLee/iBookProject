const path = require('path');
const fs = require('fs').promises;
const pathToSrcFolder = path.resolve('src/');
const pathToDistFolder = path.resolve('dist/')

/**
 * Returns some actions that are to be performed when the user
 * selects 'Validate and minify'.
 */
function getTasks() {
    return [{
            title: 'Create a new dist folder for the copying task',
            task: () => createNewDistfolder().catch(error => showErrorInListr(error))
        },
        {
            title: 'Copy structure of source folder into dist folder',
            task: () => createFileStructure().catch(error => showErrorInListr(error))
        }
    ];
}

function showErrorInListr(error) {
    throw new Error('An error occured while running the structuring tasks: ' + error.message);
}

/**
 * Creates a new dist folder in order to copy the structure
 * of the source folder into it later on.
 */
async function createNewDistfolder() {
    return await fs.mkdir(pathToDistFolder, {
        recursive: false
    }).catch(error => {
        throw new Error('Error in the creating new dist folder: ' + error.message)
    });
}


/**
 * Calls the recursive function for copying the structure of the
 * source folder into the dist folder.
 */
async function createFileStructure() {
    return await copyStructureOfSrcToDist(pathToSrcFolder, pathToDistFolder);
}


/**
 * Reads the directories and files in the source folder
 * and copies them to the dist folder.
 * 
 * @param pathToCopy: The current path that needs to be copied to the dist folder
 * @param pathToPaste: The current path in the dist folder where files are copied to
 */
async function copyStructureOfSrcToDist(pathToCopy, pathToPaste) {
    let files = await readSourceDirectory(pathToCopy);

    for (let file of files) {
        let targetPath = path.resolve(pathToPaste, file.name);
        let inputPath = path.resolve(pathToCopy, file.name);
        if (file.isDirectory()) {
            await copyDirectory(targetPath).catch(error => {
                throw new Error('An error occurred while copying the directories of the source folder: ' + error.message)
            });
            await copyStructureOfSrcToDist(inputPath, targetPath).catch(error => {
                throw new Error('Error in the copying structure of src folder to dist folder: ' + error.message)
            });
        } else if (file.isFile()) {
            await copyFile(inputPath, targetPath).catch(error => {
                throw new Error('Error in the copying file from src folder to the dist folder: ' + error.message)
            });
        }
    }
}

/**
 * Copies a file from one folder to another.
 * @param {string} inputPath - The string that represents the file to be copied. 
 * @param {string} targetPath - The place where the file is copied to.
 */
async function copyFile(inputPath, targetPath) {
    return await fs.copyFile(inputPath, targetPath).catch(error => {
        throw new Error('Error in the copying file structure: ' + error.message)
    });
}

/**
 * Copies a directory from one folder to another.
 * @param {string} targetPath - The directory to be created  
 */
async function copyDirectory(targetPath) {
    return await fs.mkdir(path.resolve(targetPath)).catch(error => {
        throw new Error('Error in the copying directory: ' + error.message)
    });
}

/**
 * Tries to read a directory.
 * 
 * @param {string} directoryToBeRead - The directory that one wants to read.
 */
async function readSourceDirectory(directoryToBeRead) {
    let files = [];
    files = await fs.readdir(directoryToBeRead, {
        withFileTypes: true
    }).catch(error => {
        throw new Error('Error in the reading files: ' + error.message)
    });

    return files;
}


module.exports = {
    getTasks: getTasks
}