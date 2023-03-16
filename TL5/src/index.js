import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

/**
 * @constant
 * @type {Object}
 */
const rootNode = document.getElementById("root");

/**
 * Initializes the App and adds it to the rootNode.
 */
ReactDOM.render(
        <App />
        , rootNode);
