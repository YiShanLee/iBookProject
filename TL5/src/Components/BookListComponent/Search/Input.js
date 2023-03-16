import React, { Component } from "react";

/** 
 * @class Input - Represents the input field of the searchbar to type in a searchterm.
 * @extends Component
 */
class Input extends Component {

    /**
     * Updates the search text according to the user input.
     * 
     * @param {Object} event 
     */
    handleInput(event){
        this.props.handleInputChange(event.target.value);
    }

    /** Renders the input field.
     * @returns {Component} - The Input component.
     */
    render(){
            
    /**
     * @constant 
     * @type {string}
     */ 
    const value = this.props.value;

        return (
            <div className="form-group col-sm-5">
                <input value={value} onChange={(event) => this.handleInput(event)} type="text" className="form-control" id="inputSearchText" placeholder="Search term"></input>
            </div>
        );
    }
}

/**
 * @exports Input
 */
export default Input;