import React, { Component } from "react";

/** 
 * @class SubmitButton - Represents the submit button of the searchbar. 
 * @extends Component
 */
class SubmitButton extends Component {

    /** 
     * Renders the submit button. 
     * 
     * @returns {Component} - The SubmitButton component.
     */
    render(){
        return (
            <div className="form-group col-6 col-sm-2">
                <button onClick={this.props.handleClick} type="submit" id="search-button" className="btn btn-primary btn-block"><i className="fa fa-search"></i></button>
            </div>
        );
    }
}

/**
 * @exports SubmitButton
 */
export default SubmitButton;