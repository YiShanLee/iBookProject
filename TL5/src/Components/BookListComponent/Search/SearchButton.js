import React, { Component } from "react";

/** 
 * @class SearchButton - Represents the different buttons of the searchbar. 
 * @extends Component
 */
class SearchButton extends Component {

    /** 
     * Renders the submit button. 
     * 
     * @returns {Component} - The SearchButton component.
     */
    render(){
        return (
            <div className="form-group col-6 col-sm-2">
                <button onClick={this.props.handleClick} type="submit" id={this.props.id} className={this.props.className}>{this.props.input}</button>
            </div>
        );
    }
}

/**
 * @exports SearchButton
 */
export default SearchButton;