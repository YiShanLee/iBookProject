import React, { Component } from "react";
import Input from "./Input";
import InputSearchOption from "./InputSearchOption";
import SearchButton from "./DeleteButton";
import SubmitButton from "./SubmitButton";
import DeleteButton from "./DeleteButton";

/** 
 * @class SearchBar - Represents a searchbar, including an Input field, an InputSearchOption field, 
 * a submit and a delete button.
 * @extends Component
 */
class SearchBar extends Component {

    /** Renders the searchbar.
     * 
     * @returns {Component} - The SearchBar component.
     */
    render(){

        /**
        * @constant  
        * @type {string}
        */
        const searchOption = this.props.searchOption;

        /**
        * @constant  
        * @type {string}
        */
        const searchValue= this.props.searchValue;

        return (
            <div className="form-row">
                <Input value={searchValue} handleInputChange={(input)=>this.props.handleInputChange(input)}/>
                <InputSearchOption value={searchOption} handleOptionChange={(value)=>this.props.handleInputOptionChange(value)}/>
                <SubmitButton handleClick={this.props.handleSearch}/>
                <DeleteButton handleClick={this.props.deleteSearch}/>
            </div>
        );
    }
}

/**
 * @exports SearchBar
 */
export default SearchBar;