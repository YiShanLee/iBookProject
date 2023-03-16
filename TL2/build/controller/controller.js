const view = require('../view/view');
const minifyModel = require('../model/minifyModel');
const validationModel = require('../model/validationModel');
const structuringModel = require('../model/structuringModel');

let validationTasks;
let structuringTasks;
let minifyTasks;

/**
 * Shows the initial view of CLI to user 
 * depending on the option selected by the user, performs the respective action in the view
 */
async function startUp() {
    view.showBanner();
    let option = await view.showOptions();
    if (option === "validate") {
        view.showTasks(validationModel.getTasks());
    } else if (option === "minify") {
        view.showTasks(getValidationAndMinifyTasks());
    } else {
        console.log("The input couldn't be resolved");
    }
}

/**
 * Fetches all tasks that need to be done for the option 'Minify and validate'
 * and returns them in order to be shown in the view.
 * @return tasks from the validation and minify process
 */
function getValidationAndMinifyTasks() {
   try {
        validationTasks = validationModel.getTasks();
        structuringTasks = structuringModel.getTasks();
        minifyTasks = minifyModel.getTasks();
    } catch (error) {
        console.log('An error occured while fetching the tasks from the models: ' + error.message);
    }

    let task = validationTasks.concat(structuringTasks.concat(minifyTasks));
    return task;
}

module.exports = {
    startUp: startUp
}