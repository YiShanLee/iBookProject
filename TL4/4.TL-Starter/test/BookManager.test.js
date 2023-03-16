import BookManager from "../src/model/BookManager";
import Book from "../src/model/Book";
import Store from "../src/model/Store";

jest.mock("../src/model/Book");
jest.mock("../src/model/Store");

const mockBook = {
    titel: "mockTitle",
    author: "mockAuthor",
    isbn: "1234567890",
    description: "mockDescription"
};
const mockBooks = [{
        author: "Max",
        title: "Hello World",
        isbn: "1234567891",
        description: "First Lorem ipsum dolor sit amet, consetetur sadipscing elitr,sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat,  sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.  "
    },
    {
        author: "Fritz",
        title: "Hello Dave",
        isbn: "1234567892",
        description: "Second  Lorem ipsum dolor sit amet, consetetur sadipscing elitr,sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat,  sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.  "
    }
];

describe("test suite for bookManager", () => {
    beforeEach(() => {
        Book.mockClear();
        Store.mockClear();
    });

    test("BookManager constructor calls the Store constructor once", () => {
        //given + when 
        const bookManager = new BookManager();
        //then
        expect(Store).toHaveBeenCalledTimes(1);
    });
    //getBooks
    test("calling getBooks invokes method getBooks of Store once", () => {
        //given
        const bookManager = new BookManager();
        const mockStoreInstance = Store.mock.instances[0];
        const mockGetBooks = mockStoreInstance.getBooks;
        //when 
        bookManager.getBooks();
        //then
        expect(mockGetBooks).toHaveBeenCalledTimes(1);
    });


    test("calling getBook with 1234567890 invokes method getBook of Store once", () => {
        //given
        const bookManager = new BookManager();
        const mockStoreInstance = Store.mock.instances[0];
        const mockGetBook = mockStoreInstance.getBook;
        //when
        bookManager.getBook(1234567890);
        //then
        expect(mockGetBook).toHaveBeenCalledTimes(1);
    });

    // Zeile 17 - 27
    test("calling addBook invokes the Book constructor once", () => {
        //given
        const bookManager = new BookManager();
        bookManager.doesISBNAlreadyExist = jest.fn();
        //when
        bookManager.addBook(mockBook.titel, mockBook.author, mockBook.isbn, mockBook.description);
        //then
        expect(Book).toHaveBeenCalledTimes(1);
    });

    test("calling addBook invokes method getBooks of Store once", () => {
        //given
        const bookManager = new BookManager();
        bookManager.doesISBNAlreadyExist = jest.fn();
        const mockStoreInstance = Store.mock.instances[0];
        const mockGetBooks = mockStoreInstance.getBooks;
        //when
        bookManager.addBook(mockBook.titel, mockBook.author, mockBook.isbn, mockBook.description);
        //then
        expect(mockGetBooks).toHaveBeenCalledTimes(1);
    });

    test("calling addBook throws error when doesISBNAlradyExists returns true", () => {
        //given
        const bookManager = new BookManager();
        bookManager.doesISBNAlreadyExist = jest.fn(() => {
            return true;
        });
        //when
        const callAddBook = () => {
            bookManager.addBook();
        };
        //then
        expect(callAddBook).toThrow();
    });

    test("calling addBook invokes addBook of store once", () => {
        //given
        const bookManager = new BookManager();
        bookManager.doesISBNAlreadyExist = jest.fn();
        const mockStoreInstance = Store.mock.instances[0];
        const mockAddBook = mockStoreInstance.addBook;
        //when
        bookManager.addBook(mockBook.titel, mockBook.author, mockBook.isbn, mockBook.description);
        //then
        expect(mockAddBook).toHaveBeenCalledTimes(1);
    });
    
    // Zeile 29 - 39
    test("doesISBNAlreadyExist returns true when the provided isbn already exists", () => {
        //given
        const bookManager = new BookManager();
        //when
        const checkISBN = bookManager.doesISBNAlreadyExist(mockBooks, mockBooks[0].isbn);
        //then
        expect(checkISBN).toBe(true);
    });

    test("doesISBNAlradyExist returns false when the provided isbn does not exist", () => {
        //given
        const bookManager = new BookManager();
        //when
        const checkISBN = bookManager.doesISBNAlreadyExist(mockBooks, "5637489902");
        //then
        expect(checkISBN).toBe(false);
    });
    
    // Zeile 41 - 44
    test("calling removeBook invokes method removeBook of Store once", () => {
        //given
        const bookManager = new BookManager();
        const mockStoreInstance = Store.mock.instances[0];
        const mockRemoveBook = mockStoreInstance.removeBook;
        //when
        bookManager.removeBook(mockBook.isbn);
        //then
        expect(mockRemoveBook).toHaveBeenCalledTimes(1);
    });

    test("calling rateBook invokes method rateBook of Store once", () => {
        //given
        const bookManager = new BookManager();
        const mockStoreInstance = Store.mock.instances[0];
        const mockRateBook = mockStoreInstance.rateBook;
        //when
        bookManager.rateBook(mockBook.isbn, "4");
        //then
        expect(mockRateBook).toHaveBeenCalledTimes(1);
    });
});