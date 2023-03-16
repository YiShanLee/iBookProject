import Store from "../src/model/Store";


const mockBook = {
    titel: "mockTitle",
    author: "mockAuthor",
    isbn: "1234567890",
    description: "mockDescription"
};

const mockBook2 = {
    titel: "mockTitle2",
    author: "mockAuthor2",
    isbn: "1234567892",
    description: "mockDescription2"
};

const mockBook3 = {
    titel: "mockTitle3",
    author: "mockAuthor3",
    isbn: "1234567893",
    description: "mockDescription3"
};

const mockBook4 = {
    titel: "mockTitle4",
    author: "mockAuthor4",
    isbn: "1234567894",
    description: "mockDescription4"
};

const mockBook5 = {
    titel: "mockTitle5",
    author: "mockAuthor5",
    isbn: "1234567895",
    description: "mockDescription5"
};


describe("Store test suit", () => {
    beforeAll(() => {
        localStorage.clear();
    });

    //Zeile 2 - 13
    test("calling getBooks returns an array containing a book if it has been added to the local storage", () => {
        //given
        const store = new Store();
        store.addBook(mockBook);
        //when
        const booksInStore = store.getBooks();
        //then
        expect(booksInStore).toContainEqual(mockBook);
    });

    test("getBooks returns an array not containing a book if it has been removed from the storage", () => {
        //given
        const store = new Store();
        store.addBook(mockBook2);
        store.removeBook(mockBook2.isbn);
        //when
        const booksInStore = store.getBooks();
        expect(booksInStore).not.toContain(mockBook2);
    });

    test("getBooks returns an empty array of length 0 if there is no book in the localStorage", () => {
        //given
        const books = [];
        const store = new Store();
        //when
        localStorage.setItem("books", JSON.stringify(books))
        //then
        const booksInStore = store.getBooks();
        expect(booksInStore).toHaveLength(0);
    });

    //getBooks    
    test("getBooks returns an array of length 1 if a total of one book has been added to the localStorage", () => {
        //given
        const books = [];
        const store = new Store();
        localStorage.setItem("books", JSON.stringify(books))
        store.addBook(mockBook);
        //when
        const getBooks = store.getBooks();
        expect(getBooks).toHaveLength(1);
    });

    test("getBooks returns an array of length 5 if a total of five book has been added to the localStorage", () => {
        //given
        const books = [];
        const store = new Store();
        localStorage.setItem("books", JSON.stringify(books))
        store.addBook(mockBook);
        store.addBook(mockBook2);
        store.addBook(mockBook3);
        store.addBook(mockBook4);
        store.addBook(mockBook5);
        //when
        const getBooks = store.getBooks();
        //then
        expect(getBooks).toHaveLength(5);
    });

    test("getBook returns the matching book from the localStorage if called with an existing isbn", () => {
        //given
        const books = [];
        const store = new Store();
        localStorage.setItem("books", JSON.stringify(books))
        store.addBook(mockBook);
        //when + then
        expect(store.getBook(mockBook.isbn)).toStrictEqual(mockBook);
    });

    test("getBook returns undefined if called with an isbn that has no matching book in the storage", () => {
        //given
        const books = [];
        localStorage.setItem("books", JSON.stringify(books))
        //when
        const store = new Store();
        //then
        expect(store.getBook(mockBook.isbn)).toBeUndefined();
    });

    test("rating of a book is changed correctly with updateRating", () => {
        //given
        const books = [];
        const store = new Store();
        localStorage.setItem("books", JSON.stringify(books))
        store.addBook(mockBook);
        store.addBook(mockBook2);
        store.addBook(mockBook3);
        store.addBook(mockBook4);
        store.addBook(mockBook5);
        //when
        store.rateBook(mockBook4.isbn, "4");
        //then
        expect(store.getBook(mockBook4.isbn).rating).toStrictEqual("4");

    });


});