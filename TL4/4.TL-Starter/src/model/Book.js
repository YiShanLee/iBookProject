class Book {
  constructor(title, author, isbn, description) {
    if (title === "" || author === "" || isbn === "" || description === "") {
      throw new Error("Please fill in all fields");
    }

    this.isISBNUnique(isbn);

    this.title = title;
    this.author = author;
    this.isbn = isbn;
    this.description = description;
    this.rating = 1;
  }

  isISBNUnique(isbn) {
    const regex = /^[0-9]{10}$/;

    if (!regex.test(parseInt(isbn))) {
      throw new Error("ISBN must have 10 digits");
    }
  }
}

export default Book;
