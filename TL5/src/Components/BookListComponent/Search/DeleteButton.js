import React, { Component } from "react";

/** 
 * @class DeleteButton - Represents the delete button of the searchbar. 
 * @extends Component
 */
class DeleteButton extends Component {

    /** Renders the delete button.
     * @returns {Component} - The DeleteButton component.
     */
    render(){
        return (
        <div className="form-group col-6 col-sm-2">
            <button onClick={this.props.handleClick} type="submit" id="search-reset-button" className="btn btn-secondary btn-block">X</button>
        </div>
        );
    }
}

/**
 * @exports DeleteButton
 */
export default DeleteButton;