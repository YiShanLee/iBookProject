import ThemeSwitcher from "../userInterface/ThemeSwitcher";
import BookManager from "../model/BookManager";
import BooksList from "../view/BooksList";
import BookDetail from "../view/BookDetail";
import AddBook from "../view/AddBook";
import Router from "./Router";
import filterBooksBySearch from "../utils/filterBooksBySearch";

class Controller {
  constructor() {
    this.bookManager = new BookManager();

    // start ThemeSwitcher
    new ThemeSwitcher();

    this.booksListView = new BooksList();
    this.addBookView = new AddBook();
    this.bookDetailView = new BookDetail();

    this.router = new Router();
    this.registerRoutes();
    this.router.determineCurrentRouteAndExecuteCallback(); // triggers initial view rendering
  }

  registerRoutes() {
    this.router.addRoute("#/books", this.executeBookListRoute.bind(this));
    this.router.addRoute("#/addBooks", this.executeAddBookRoute.bind(this));
    this.router.addRoute("#/details", this.executeBookDetailRoute.bind(this));
  }

  executeBookDetailRoute() {
    const isbn = this.getBookIsbnFromHash();
    const book = this.bookManager.getBook(isbn);
    this.bookDetailView.renderView(book);
  }

  executeBookListRoute() {
    const books = this.bookManager.getBooks();
    this.booksListView.renderView(books);

    this.booksListView.bindSearchButtonClick(event => {
      const searchInput = this.booksListView.getSearchInput();
      const hideNotFoundBooks = filterBooksBySearch(
        this.bookManager.getBooks(),
        searchInput
      );
      this.booksListView.hideNotFoundBooks(hideNotFoundBooks);
    });
    this.booksListView.bindSearchResetButtonClick(event => {
      this.booksListView.clearSearch();
    });
    this.booksListView.bindDetailButtonClick(event => {
      location.hash = "#/details/" + event.target.dataset.isbn;
    });
    this.booksListView.bindRemoveButtonClick(event => {
      this.removeBook(event.target.dataset.isbn);
    });
    this.booksListView.bindRatingButtonClick(event => {
      this.rateBook(event.target.dataset.isbn, event.target.dataset.rating);
    })
  }

  executeAddBookRoute() {
    this.addBookView.renderView();
    this.addBookView.bindAddBookButtonClick(event => {
      try {
        const input = this.addBookView.getFormInputs();

        this.bookManager.addBook(
          input.title,
          input.author,
          input.isbn,
          input.description
        );

        this.addBookView.addBook();

        location.hash = "#/books";
      } catch (error) {
        this.addBookView.addBook(error);
      }
    });
  }

  getBookIsbnFromHash() {
    const hash = location.hash;

    const hashParts = hash.split("/");
    const isbn = hashParts[hashParts.length - 1];

    return isbn;
  }

  removeBook(isbn) {
    this.bookManager.removeBook(isbn);
    this.booksListView.removeBook(isbn);
  }

  rateBook(isbn, rating) {
    this.bookManager.rateBook(isbn, rating);
    this.booksListView.updateRating(isbn, rating);
  }
}

export default Controller;
