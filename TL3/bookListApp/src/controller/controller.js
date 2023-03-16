import {
  BookManager
} from "../model/BookManager"
import {
  BooksList
} from "../view/BooksList"
import {
  AddBook
} from "../view/AddBook"
import {
  BookDetail
} from "../view/BookDetail"
import {
  Router
} from "./Router"
import {
  ThemeSwitcher
} from "../userInterface/ThemeSwitcher"

function Controller() {
  const bookManager =new BookManager();

class Controller {
  constructor() {
    this.bookManager = new BookManager();

    // start ThemeSwitcher
    new ThemeSwitcher();

    // initialize access to other classes
    this.booksListView = new BooksList();
    this.bookDetailView = new BookDetail();
    this.router = new Router();
    this.addBookView = new AddBook();

    // initialize the routing through the web application
    this.registerRoutes();
    this.router.determineCurrentRouteAndExecuteCallback(); // triggers initial view rendering

  }

  /**
   * triggers rendering of Book List View
   */
  executeBookListRoute() {
    const books = this.bookManager.getBooks();
    this.booksListView.renderView(books);
    this.booksListView.bindSearchButtonClick(this.executeSearch.bind(this));
    this.booksListView.bindStopSearchButtonClick(this.executeSearchAbortion.bind(this));
    this.booksListView.bindDetailButtonClick(event => {
      location.hash = "#/details/" + event.target.dataset.isbn;
    });
    this.booksListView.bindRemoveButtonClick(event => {
      this.removeBook(event.target.dataset.isbn);
    });
  }

  /**
   * triggers rendering of Add Book View
   * throws an error when book is added but input fields are empty
   */
  executeAddBookRoute() {
    this.addBookView.renderView();
    this.addBookView.bindAddBookButtonClick(() => {
      try {
        const input = this.addBookView.getFormInputs();

        // Add Book to Store
        this.bookManager.addBook(
          input.title,
          input.author,
          input.isbn,
          input.description
        );

        this.addBookView.addBook();

        // Go to books view
        location.hash = "#/books";
      } catch (error) {
        this.addBookView.addBook(error);
      }
    });
  }

  /**
   *  triggers rendering of Book Detail View
   */
  executeBookDetailRoute() {
    const isbn = this.getBookIsbnFromHash();
    const book = this.bookManager.getBook(isbn);
    this.bookDetailView.renderView(book);
  }

  /**
   * implements the actions executed by clicking on the search button
   */
  executeSearch() {
    try {
      const [searchText, searchCategory] = this.booksListView.getSearch();
      if (searchCategory === "" || searchText === "") {
        this.booksListView.searchFailed("Error: Fill in the search field");
      }
      let searchResultBooks = this.bookManager.getFoundBooks(searchText, searchCategory);
      this.booksListView.renderView(searchResultBooks);
      this.setButtonBindings();
    } catch (error) {
      this.booksListView.searchFailed(error);
    }
  }

  /**
   * shows all books in the book list after search abortion button was clicked
   */
  executeSearchAbortion() {
    this.executeBookListRoute();
  }

  /**
   * sets all button bindings after searching was executed
   */
  setButtonBindings() {
    this.booksListView.bindStopSearchButtonClick(this.executeSearchAbortion.bind(this))
    this.booksListView.bindSearchButtonClick(this.executeSearch.bind(this))
    this.booksListView.bindDetailButtonClick(event => {
      location.hash = "#/details/" + event.target.dataset.isbn
    })
    this.booksListView.bindRemoveButtonClick(event => {
      this.removeBook(event.target.dataset.isbn)
    })
  }

  /**
   * @returns the isbn of one specific book
   */
  getBookIsbnFromHash() {
    const hash = location.hash;
    const hashParts = hash.split("/");
    const isbn = hashParts[hashParts.length - 1];
    return isbn;
  }

  /**
   * Triggers removal of a book from storage
   * @param {String} isbn - unique identification number of the book to be deleted
   */
  removeBook(isbn) {
    this.bookManager.removeBook(isbn);
    this.booksListView.removeBook(isbn);
  }

  /**
   * lists all the possible routes and binds them to the function
   */
  registerRoutes() {
    this.router.addRoute("#/books", this.executeBookListRoute.bind(this));
    this.router.addRoute("#/addBooks", this.executeAddBookRoute.bind(this));
    this.router.addRoute("#/details", this.executeBookDetailRoute.bind(this));
  };


    // booksListView.removeBook(isbn);
  }
}

export {
  Controller
};
