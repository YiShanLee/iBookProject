class Store {
  constructor() {

  }

  /**
   * read all books from local storage
   * @returns list of all books in local storage
   */
  getBooks() {
    let books;
    if (localStorage.getItem("books") === null) {
      books = [];
    } else {
      const booksFromStorage = localStorage.getItem("books");
      books = JSON.parse(booksFromStorage);
    }
    return books;
  }

  /**
   * reads one book with a specific isbn from local storage
   * @param {String} isbn unique identification number of a book
   * @returns the book with matching isbn
   */
  getBook(isbn) {
    const books = this.getBooks();
    let book;
    books.forEach(bookItem => {
      if (bookItem.isbn === isbn) {
        book = bookItem;
      }
    });
    return book;
  }

  /**
   * adds the new book to local storage
   * @param {String} book - parameter of the book to be added
   */
  addBook(book) {
    const books = this.getBooks();

    books.push(book);

    localStorage.setItem("books", JSON.stringify(books));
  }

  /**
   * remove one book identified by isbn from local storage
   * @param {String} isbn - unique identification number of the book to be removed
   */
  removeBook(isbn) {
    const books = this.getBooks();

    books.forEach((book, index) => {
      if (book.isbn === isbn) {
        books.splice(index, 1);
      }
    });

    localStorage.setItem("books", JSON.stringify(books));
  }

}

export {Store};
