import {
  Store
} from "./Store"
import {
  Book
} from "./Book"


class BookManager {
  constructor() {
    this.store = new Store();
  }
  
  /**
   * checks if an isbn already exists in a given list of books
   * @param {Array} books -  list of books to be checked
   * @param {Integer} isbn - unique identification number of a book to be checked
   * @returns true if isbn already exists, false otherwise
   */
  doesISBNAlreadyExist(books, isbn) {
    let alreadyExistent = false;
    books.forEach(bookItem => {
      const book = bookItem;
      if (book.isbn === isbn) {
        alreadyExistent = true;

      }
    });
    return alreadyExistent;
  }

  /**
   * @returns list of all books in the local storage
   */
  getBooks() {
    return this.store.getBooks();
  }

  /**
   * @param {String} isbn - unique identification number for each book
   * @returns the book of the isbn from the storage
   */
  getBook(isbn) {
    return this.store.getBook(isbn);
  }

  /**
   * checks whether a book can be added to local storage and if possible triggers the adding of the book.
   * @param {String} title - title of book
   * @param {String} author - author of book
   * @param {String} isbn - isbn of book
   * @param {String} description - description of book
   */
  addBook(title, author, isbn, description) {
    const book = new Book(title, author, isbn, description);

    const books = this.store.getBooks();

    if (this.doesISBNAlreadyExist(books, isbn)) {
      throw new Error("ISBN already exists");
    }

    this.store.addBook(book);
  }

  /**
   * searches for the book title in local storage
   * @param {*} the input in the search field
   */
  searchTitle(input) {
    const books = this.store.getBooks();
    let foundBooks = [];
    let sucessfulSearch = false;
    books.forEach(bookItem => {
      if (bookItem.title == input) {
        foundBooks.push(bookItem);
        sucessfulSearch = true;
      }
    });
    if (sucessfulSearch == false) {
      return this.store.getBooks();
    }
    console.log(foundBooks);
    return foundBooks;
  }
  searchAuthor(input) {
    const books = this.store.getBooks();
    let foundBooks = [];
    let sucessfulSearch = false;
    books.forEach(bookItem => {
      if (bookItem.author == input) {
        foundBooks.push(bookItem);
        sucessfulSearch = true;
      }
    });
    if (sucessfulSearch == false) {
      return this.store.getBooks();
    }
    console.log(foundBooks);
    return foundBooks;
  }
  searchISBN(input) {
    const books = this.store.getBooks();
    let foundBooks = [];
    let sucessfulSearch = false;
    books.forEach(bookItem => {
      if (bookItem.isbn == input) {
        foundBooks.push(bookItem);
        sucessfulSearch = true;
      }
    });
    if (sucessfulSearch == false) {
      return this.store.getBooks();
    }
    console.log(foundBooks);
    return foundBooks;
  }

   /* searches for books matching an input of the user in the local storage 
   * @param {String} searchText - input by user in search field
   * @param {String} searchCategory - chosen category by user (title, author or isbn)
   * @returns list of books that match the search
   */
  getFoundBooks(searchText, searchCategory) {
    searchCategory = searchCategory.toLowerCase();
    let foundBooks = [];
    const books = this.store.getBooks();
    books.forEach(book => {
      if (book[searchCategory].includes(searchText)) {
        foundBooks.push(book);
      }
    })
    return foundBooks;
  }

  /**
   * removes one book idenitified by isbn from local storage
   * @param {String} isbn unique identification number of the book to be removed
   */
  removeBook(isbn) {
    this.store.removeBook(isbn);
  }


}

export {
  BookManager
};