class Store {
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

  getBook(isbn) {
    const books = this.getBooks();

    return books.find(book => {
      if (book.isbn === isbn) {
        return book;
      }
    });
  }

  addBook(book) {
    const books = this.getBooks();

    books.push(book);

    localStorage.setItem("books", JSON.stringify(books));
  }

  removeBook(isbn) {
    const books = this.getBooks();

    books.forEach((book, index) => {
      if (book.isbn === isbn) {
        books.splice(index, 1);
      }
    });

    localStorage.setItem("books", JSON.stringify(books));
  }

  rateBook(isbn, rating){
    const books = this.getBooks();

    const hasIsbn = (book) => book.isbn===isbn;
    const index = books.findIndex(hasIsbn);
    
    books[index].rating = rating;

    localStorage.setItem("books", JSON.stringify(books));
  }
}

export default Store;
