import React, { Component } from "react";

/** 
 * @class Rating - Represents the star rating of a single book.
 * @extends Component
 */
class Rating extends Component {

    /**
     * Updates the rating of the book according to the user input.
     * 
     * @param {Object} event 
     */
    updateRating(event){
        const isbn = event.target.dataset.isbn;
        const rating = event.target.dataset.rating;
        this.props.handleClick(isbn, rating);
    }

    /** 
     * Renders the star rating according to the rating of a book. 
     * Selected stars are displayed in yellow.
     * Unselected stars are displayed in green.
     * 
     * @returns {Component} - The Rating component.
     */
    render(){

        let rating = this.props.rating;

        /**
         * @constant  
         * @type {Array}
         */
        const elements = [];

        /**
         * @constant  
         * @type {Array}
         */
        const items = [];
        
        /**
         * @constant  
         * @type {string}
         */
        const isbn = this.props.isbn;  

        while(rating > 0){
            elements.push("fas fa-star text-warning rating-button");
            rating--;
        }
        
        while(elements.length != 5){
            elements.push("fas fa-star text-primary rating-button");
        }

        for (const [index, value] of elements.entries()) {
            items.push(<a key={`${isbn}-${index+1}`} onClick={(event)=>this.updateRating(event)} data-rating={index+1} data-isbn={isbn} className={value}></a>)
        }
        
        return(
            <td>
                {items}
            </td>
        )
    }
}

/**
 * @exports Rating
 */
export default Rating;