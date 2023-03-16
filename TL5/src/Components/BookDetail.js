import React, { Component} from "react";
import "../bootstrap.default.css";
import Spinner from "./Spinner";
import databaseSingleton from "../Database"
import {Redirect} from "react-router-dom";

/**
 * @class BookDetail - Represents the Book Detail view of a specific book that was clicked in the BookList view.
 * @extends Component
 */
class BookDetail extends Component { 

    /**
     * Creates an instance of the BookDetail view with an initial state for the loading status.
     * Creates access to the database.
     * 
     * @constructor
     * @param {Object} props - The data received from the parent component. 
     */
    constructor(props) {
        super(props);
        this.state = {loading: true, bookExistent: true};
        this.database = databaseSingleton;
    }

    /**
     * Retreives the data of the book that was selected by the user.
     * If the book is undefined, e.g., due to a non-existent ISBN in the URI field, the bookExistent state is updated to false.
     * Once the book is fetched the state of the book is replaced with the new gained data and the state of loading is set to false.
     */
    componentDidMount() {
        this.database.getBook(this.props.match.params.isbn).then(book => {
            if (book !== undefined) {
                this.setState({
                    author: book.author,
                    title: book.title,
                    isbn: book.isbn,
                    description: book.description,
                    rating: book.rating,
                    loading: false
                })
            } else {
                this.setState({bookExistent: false, loading: false})
            }
           
        })   
    }

    /**
     * Renders the BookDetail view.
     * Shows a spinner during the data fetching process.
     * When the loading process is finished, a heading for each book feature and its values are displayed.
     * If the book is undefined, the user is redirected to the 404 page.
     * 
     * @returns {Component} - The BookDetail component. 
     */
    render() {

        /**
         * Displays the spinner
         */
        if(this.state.loading) {
            return <div><Spinner/></div>
        }

        /**
         * Displays the 404 page when a non-existent ISBN was provided in the URI field of the browser.
         */
        if(!this.state.bookExistent) {
            return <Redirect to={"/detailsnotfound"}/>
        }

        /**
         * Displays the bookDetail View
         */
        return(
            <div className="d-flex justify-content-center p-5">
                <div id="Anzeige" className="row col-4 p-5 text-center border border-primary">
                    <h5 className="col-12 bg-primary text-light p-1">Author</h5>
                    <p className="col-12">{this.state.author}</p>
                    <h5 className="col-12 bg-primary text-light p-1">Title</h5>
                    <p className="col-12">{this.state.title}</p>
                    <h5 className="col-12 bg-primary text-light p-1">ISBN</h5>
                    <p className="col-12">{this.state.isbn}</p>
                    <h5 className="col-12 bg-primary text-light p-1">Description</h5>
                    <p className="col-12 text-justify">{this.state.description}</p>
                </div>
            </div>
          
        )
    }
}

/**
 * @exports BookDetail
 */
export default BookDetail;