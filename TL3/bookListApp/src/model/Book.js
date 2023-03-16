class Book {
  constructor(title, author, isbn, description) {
    if (title === "" || author === "" || isbn === "" || description === "") {
      throw new Error("Please fill in all fields");
    }

    const regex = /^[0-9]{10}$/; 
    if (!regex.test(parseInt(isbn))) {
      throw new Error("ISBN must have 10 digits");
    }

    this.title = title;
    this.author = author;
    this.isbn = isbn;
    this.description = description; 
  }
 
}

export {
  Book
};