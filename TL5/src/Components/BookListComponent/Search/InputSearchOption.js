import React, { Component } from "react";

/** 
 * @class InputSearchOption - Represents the dropdown menu of the searchbar to select the desired search category.
 * @extends Component
 */
class InputSearchOption extends Component {

    /**
     * Updates the search category according to the user input.
     * 
     * @param {Object} event 
     */
    optionChange(event){
        this.props.handleOptionChange(event.target.value);
    }

    /** 
     * Renders the input searchoption. Title is selected as default value.
     * 
     * @returns {Component} - The InputSearchOption component.
     */
    render(){
        
        /**
         * @constant 
         * @type {string}
         */ 
        const value = this.props.value;

        return (
            <div className="form-group col-sm-3">
                <select value={value} onChange={(event)=>this.optionChange(event)} id="inputSearchOption" className="form-control">
                <option value="title">Title</option>
                <option value="author">Author</option>
                <option value="isbn">ISBN</option>
                </select>
            </div>
        );
    }
}

/**
 * @exports InputSearchOption
 */
export default InputSearchOption;