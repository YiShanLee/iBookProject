import React, {Component} from "react";
import databaseSingleton from "../Database";
import Notification from "./Notification";

/** 
 * @class AddBook - Represents the AddBook component. 
 * @extends Component
 */
class AddBook extends Component {

  /**
   * Creates an AddBook instance with a state that holds the user-given parameters of a book 
   * to be added to the database as well as the default rating of a new book.
   * Creates an instance of the database as well as of the notification container.
   * 
   * @constructor
   * @param {Object} props - The data received from the parent component. 
   */
  constructor(props) {
    super(props);
    this.state = {
      author: "",
      title: "",
      isbn: "",
      description: "",
      rating: "1",
      timestamp: ""
    };
    this.database = databaseSingleton;
    this.notification = new Notification();
  }

  /**
   * Updates the state of the component according to the user inputs.
   * 
   * @param {Object} event 
   */
  updateInput(event) {
    let bookObject = {};
    bookObject[event.target.id] = event.target.value;
    this.setState(bookObject);
  }

  /**
   * Validates the inputs that the user made for the book they want to add to the database. 
   * 
   * @async
   * @returns True, if the inputs are valid and the book can be added to the database. False, if the user made invalid inputs.
   */
  async validateInputs() {
    let inputsAreValid = false;
    const regex = /^\d{10}$/;

    if (this.state.title === "" || this.state.author === "" || this.state.isbn === "" || this.state.description === "") {
      this.notification.showWarning("Please fill in all fields");
    } else if (!regex.test(this.state.isbn)) {
      this.notification.showWarning("The ISBN has a wrong format.");
    } else if (await this.isbnAlreadyExists()) {
      this.notification.showWarning("ISBN already exists");
    } else {
      inputsAreValid = true;
    }

    return inputsAreValid;
  }

  /**
   * Fetches all books from the database and checks whether a book with the user-provided ISBN already exists. 
   * If the ISBN already exists, it shall not be added to the database.
   * 
   * @async
   * @returns True, if the ISBN already exists. False, if the ISBN does not exist in the database.
   */
  async isbnAlreadyExists() {
    let existent = false;
    let books = await this.database.getBooks();
    books.forEach(books => {
      if (books.isbn === this.state.isbn) {existent = true;}
    })
    return existent;
  }

  /**
   * Adds the book, that the user defined, to the database. 
   * 
   * @async
   * @param {Object} event 
   */
  async addBook(event) {
    event.preventDefault();
    if (await this.validateInputs()) {
      this.database.addBook(this.state);
      this.props.history.push('/bookList');
      this.notification.showSuccess("The book has been successfully added.")
    }
  }

  /**
   * Renders a form with a submit button where the user can define the author, title, ISBN and description for the book they want to add. 
   * 
   * @returns {Component} - The AddBook component.
   */
  render() {
    return ( 
      <div className="container p-4 mw-100">
      <form id="book-form" onSubmit={event => this.addBook(event)} className="w-50 m-auto">
        <div className="form-group">
          <label htmlFor="author">Author</label>
          <input type="text" id="author" className="form-control" onChange={this.updateInput.bind(this)}/>
         </div>
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input type="text" id="title" className="form-control" onChange={this.updateInput.bind(this)}/>
          </div>
          <div className="form-group">
            <label htmlFor="isbn">ISBN</label>
            <input type="text" id="isbn" className="form-control" onChange={this.updateInput.bind(this)}/>
          </div>
          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea className="form-control" id="description" rows="3" onChange={this.updateInput.bind(this)}></textarea>
          </div>
          <button type="submit" className="btn btn-primary btn-block add-button">
            <i className="fas fa-plus"></i>Add Book
        </button>
      </form>
    </div>
    )
  }
}

/**
 * @exports AddBook
 */
export default AddBook;