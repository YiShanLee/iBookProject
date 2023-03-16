import React, { Component } from "react";
import BookListTable from "./BookTable/BookListTable";
import SearchBar from "./Search/SearchBar";
import databaseSingleton   from "../../Database";
import Spinner from "../Spinner"

/** 
 * @class BookList - Represents a book list including a searchbar and a table in which all books are displayed, 
 * with the BookListTable. 
 * @extends Component
 */
class BookList extends Component {

  /**
   * Creates an instance of BookList with the initial states for books, searchValue, searchOption and loading.
   * Creates access to the database.
   * 
   * @constructor
   * @param {object} props - The data received from the parent component.
   */
    constructor(props) {
        super(props)
        this.database = databaseSingleton;
        this.state = {books:[], searchValue: "", searchOption: "title", loading: true};
    }

    /**
     * Retrieves book data from the database, when the BookList component is mounted.
     * Replaces state of books with the new gained data and sets state of loading to false.
     */
    componentDidMount(){
      this.database.getBooks()
      .then(result => {
        this.setState({books: result, loading: false});
      });
    }

    /**
     * Updates the state of searchValue according to the text inserted in search field of searchbar.
     * 
     * @param {string} input - Contains the new input value.
     */
    updateInput(input){
      this.setState({searchValue: input});
    }

    /**
     * Updates the state of searchOption according to selected option of the dropdown in the searchbar.
     * 
     * @param {string} value - Contains the selected option.
     */
    updateInputOption(value){
      this.setState({searchOption: value});
    }

    /**
     * Updates the state of books according to a changed rating.
     * Updates the rating for the specific book in the database.
     * 
     * @param {string} isbn - Contains the isbn of the book whose rating changed.
     * @param {string} rating - Contains the value of the new rating.
     */
    updateRating(isbn, rating){
      const updatedBooks = this.state.books;
      const hasIsbn = (book) => book.isbn===isbn;
      const index = updatedBooks.findIndex(hasIsbn);
      updatedBooks[index].rating = rating;
      const updatedBook = updatedBooks[index];  
      this.setState({books: updatedBooks});
      this.database.updateBookRating(updatedBook, rating);
    }

    /**
     * Updates the state of books according to a deleted book and deletes the book in the database.
     * 
     * @param {string} isbn - Contains the isbn of the book to delete.
     */
    deleteBook(isbn){
      const bookArray = this.state.books;
      const hasIsbn = (book) => book.isbn===isbn;
      const index = bookArray.findIndex(hasIsbn);
      bookArray.splice(index, 1);
      this.setState({books: bookArray});
      this.database.deleteBook(isbn);
    }

    /**
     * Searches books according to the current state of searchOption and searchValue.
     * Sets the state of books to the matching books, so that only matching books will be displayed.
     */
    searchBook(){
      const books = this.state.books;
      const searchOption = this.state.searchOption;
      const searchValue = this.state.searchValue;
      const searchedBooks = books.filter(book => (book[searchOption].includes(searchValue)));
      this.setState({books: searchedBooks});
    }

    /**
     * Clears the search field in the searchbar by setting the searchValue and the searchOption back to their default values.
     * Aligns the state of books with all books stored in the database.
     */
    clearSearch(){
      this.database.getBooks()
      .then(result => {
        this.setState({books: result});
      });
      this.setState({searchValue: ""});
      this.setState({searchOption: "title"});
    }

    /** 
     * Renders the booklist view. 
     * Shows a spinner while data are still loading. 
     * After loading the data searchbar and booktable are displayed.
     * 
     * @returns {Component} - The BookList component.
     */
    render(){

      /**
        * @constant  
        * @type {Object}
        */
      const globalBooks = this.state.books;

      /**
        * @constant  
        * @type {string}
        */
      const globalSearchValue = this.state.searchValue;
        
      /**
        * @constant  
        * @type {string}
        */
      const globalSearchOption = this.state.searchOption;

      /**
       * Displays the spinner
       */
      if(this.state.loading) {
        return <div><Spinner/></div>
      }
        
      /**
       * Displays the bookList View.
       */
      return (
        <div className="container mt-4" >
          <SearchBar searchValue={globalSearchValue} searchOption={globalSearchOption} handleInputChange={(input)=>this.updateInput(input)} handleInputOptionChange={(value)=>this.updateInputOption(value)} handleSearch={()=>this.searchBook()} deleteSearch={()=>this.clearSearch()}/>
          <BookListTable books={globalBooks} handleDelete={(isbn)=>this.deleteBook(isbn)} handleUpdate={(isbn, rating)=>this.updateRating(isbn, rating)}/>
        </div>
      );
    }
}

/**
 * @exports BookList
 */
export default BookList;