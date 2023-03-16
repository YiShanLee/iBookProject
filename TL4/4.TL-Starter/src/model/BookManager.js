import Store from "./Store";
import Book from "./Book";

class BookManager {
  constructor() {
    this.store = new Store();
  }

  getBooks() {
    return this.store.getBooks();
  }

  getBook(isbn) {
    return this.store.getBook(isbn);
  }

  addBook(title, author, isbn, description) {
    const book = new Book(title, author, isbn, description);

    const books = this.store.getBooks();

    if (this.doesISBNAlreadyExist(books, isbn)) {
      throw new Error("ISBN already exists");
    }

    this.store.addBook(book);
  }

  doesISBNAlreadyExist(books, isbn) {
    let doesISBNAlreadyExist = false;

    books.forEach(book => {
      if (book.isbn === isbn) {
        doesISBNAlreadyExist = true;
      }
    });

    return doesISBNAlreadyExist;
  }

  removeBook(isbn) {
    this.store.removeBook(isbn);
  }

  rateBook(isbn, rating){
    this.store.rateBook(isbn, rating);
  }
}

export default BookManager;