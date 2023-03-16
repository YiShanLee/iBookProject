import React, { Component } from "react";
import {motion} from "framer-motion";

import Rating from "./Rating";
import {Link} from "react-router-dom";

/**
* @constant 
* @type {Object}
*/
const variants = {
  delete: { x:1500, transition: { duration : 2 } },
};

/** 
 * @class Book - Represents a single book in the booklist. 
 * @extends Component
*/
class Book extends Component {

  /**
  * Creates an instance of Book.
  *
  * @constructor
  * @param {object} props - The data received from the parent component.
  * @param {object} props.book - The book, for which a table row will be created.
  * @param {string} props.book.author - Contains the author of the book.
  * @param {string} props.book.isbn - Contains the isbn of the book.
  * @param {string} props.book.description - Contains the description of the book.
  * @param {string} props.book.rating - Contains the rating of the book.
  * @param {string} props.book.title - Contains the title of the book.
  * @param {callback} props.deleteBook - Contains a callback function from the parent component to delete a book.
  * @param {callback} props.updateBook - Contains a callback function from the parent component to update the rating of a book.
  */
  constructor(props){
    super(props);
    this.handleClickDeleteButton = this.handleClickDeleteButton.bind(this);
    this.delete = this.props.deleteBook;
    this.state = {
      deleteClicked: false
    };
  }

  /**
   * Changes state to true if delete button was clicked.
   */
  handleClickDeleteButton(){
    this.setState({
      deleteClicked: true
    })    
  }

  /** 
   * Renders the book view. Displays every attribute in its own tablecell 
   * and adds cells with options to delete a book or to show the details of a book.
   * 
   * @returns {Component} The BookList component.
   */ 
  render() {
   
    /**
     * @constant 
     * @type {string|string|string|string}
     */
    const {author, isbn, rating, title} = this.props.book;  
  
      return (
        <motion.tr key={isbn} 
          animate={this.state.deleteClicked ? "delete" : "{}"}
          onAnimationComplete={this.state.deleteClicked ? ()=>this.delete(isbn) : ()=>{}}
          variants={variants}
        >
          <td>{title}</td>
          <td>{author}</td>
          <td>{isbn}</td>
          <td><Link to={`/bookdetail/${isbn}`}><div className="fas fa-eye text-primary detail-button"></div></Link></td>
          <td><a onClick={this.handleClickDeleteButton} data-isbn={isbn} className="fas fa-trash text-primary remove-button"></a></td>
          <Rating rating={rating} isbn={isbn} handleClick={(isbn, rating) => this.props.updateBook(isbn, rating)}/>
        </motion.tr>
      );
    }
  }
  
  /**
   * @exports Book
   */
  export default Book;
  