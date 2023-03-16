import React, { Component } from "react";

import Book from "./Book";

/**
 *  @class BookListTable - Represents the table in which the books are listed.
 *  @extends Component
*/
class BookListBooks extends Component {

    /** Renders the books of the bookslist in table rows.
     * 
     * @returns {Component} - The BookListTable component.
     */
    render(){
        
        /**
        * @constant  
        * @type {Object}
        */  
        const books = this.props.books;

        return (
            <table className="table table-striped mt-5">
                
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Author</th>
                        <th>ISBN</th>
                        <th>Detail</th>
                        <th>Delete</th>
                        <th>Rate</th>
                    </tr>
                </thead>
                
                <tbody id="book-list">
                    {books.map((book) => (
                        <Book key={book.isbn} book={book}
                        updateBook={(isbn, rating) => 
                        this.props.handleUpdate(isbn, rating)
                        }
                        deleteBook={(isbn) => 
                        this.props.handleDelete(isbn)
                        }/>
                    ))}
                </tbody>
            </table>
        );
    }
}

/**
 * @exports BookListBooks
 */
export default BookListBooks;