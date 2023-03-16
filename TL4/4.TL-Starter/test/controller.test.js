import Controller from "../src/controller/controller";
import BooksList from "../src/view/BooksList";
import AddBook from "../src/view/AddBook";
import BookDetail from "../src/view/AddBook";
import Router from "../src/controller/Router";
import ThemeSwitcher from "../src/userInterface/ThemeSwitcher";
import BookManager from "../src/model/BookManager";
import Book from "../src/model/Book";

jest.mock("../src/view/BooksList");
jest.mock("../src/view/AddBook");
jest.mock("../src/view/BookDetail");
jest.mock("../src/controller/Router");
jest.mock("../src/userInterface/ThemeSwitcher");
jest.mock("../src/model/BookManager");
jest.mock("../src/utils/filterBooksBySearch");
jest.mock("../src/model/Book");

beforeEach(() => {
    BooksList.mockClear();
    AddBook.mockClear();
    BookDetail.mockClear();
    Router.mockClear();
    ThemeSwitcher.mockClear();
    BookManager.mockClear();
    Book.mockClear();
});

describe("test suite for Controller", () => {
    //Zeile 10-23
    test("initialising Controller calls the constructor of ThemeSwitcher", () => {
        //given + when 
        const controller = new Controller();
        //then
        expect(ThemeSwitcher).toHaveBeenCalledTimes(1);
    });


    test("initialising Controller calls the constructor of BooksList once", () => {
        //given + when
        const controller = new Controller();
        //then
        expect(BooksList).toHaveBeenCalledTimes(1);
    });

    test("initialising Controller calls the constructor of AddBook once", () => {
        //given + when
        const controller = new Controller();
        //then
        expect(AddBook).toHaveBeenCalledTimes(1);
    });

    test("initialising Controller calls the constructor of BookDetail", () => {
        //given + when
        const controller = new Controller();
        //then
        expect(BookDetail).toHaveBeenCalledTimes(1);
    });

    test("initialising Controller calls the constructor of Router once", () => {
        //given + when
        const controller = new Controller();
        //then
        expect(Router).toHaveBeenCalledTimes(1);
    });

    test("initialising Controller invokes method addRoute of Router three times", () => {
        //given + when
        const controller = new Controller();
        //then
        expect(controller.router.addRoute).toHaveBeenCalledTimes(3);
    });

    test("initialising Controller invokes method determineCurrentRoute of Router once", () => {
        //given + when
        const controller = new Controller();
        //then
        expect(controller.router.determineCurrentRouteAndExecuteCallback).toHaveBeenCalledTimes(1);
    });

    //Zeile 25-29
    test("calling registerRoutes invokes method addRoute of Router six times", () => {
        //given
        const controller = new Controller();
        const mockRouterInstance = Router.mock.instances[0];  
        const mockAddRoute = mockRouterInstance.addRoute;      
        //when
        controller.registerRoutes();
        //then
        expect(mockAddRoute).toHaveBeenCalledTimes(6);
    });

    //Zeile 31-35
    test("calling bookDetailRoute invokes method getBookIsbnFromHash in Controller class once", () => {
        //given
        const controller = new Controller();
        controller.getBookIsbnFromHash = jest.fn();
        //when
        controller.executeBookDetailRoute();
        //then
        expect(controller.getBookIsbnFromHash).toHaveBeenCalledTimes(1);
    });

    test("calling executeBookDetailRoute invokes method getBook of bookManager", () => {
        //given
        const controller = new Controller();
        const mockBookManagerInstance = BookManager.mock.instances[0];
        const mockGetBook = mockBookManagerInstance.getBook;
        controller.getBookIsbnFromHash = jest.fn();
        //when
        controller.executeBookDetailRoute();
        //then
        expect(mockGetBook).toHaveBeenCalledTimes(1);
    });

    test("calling executeBookDetailRoute invokes method getBookIsbnFromHash in Controller class once", () => {
        //given
        const controller = new Controller();
        controller.getBookIsbnFromHash = jest.fn();
        //when
        controller.executeBookDetailRoute();
        //then
        expect(controller.getBookIsbnFromHash).toHaveBeenCalledTimes(1);
    });

    //Zeile 38-59
    test("calling executeBookListRoute invokes method renderView of BookList once", () => {
        //given
        const controller = new Controller();
        const mockBookLisItnstance = BooksList.mock.instances[0];
        const mockRenderView = mockBookLisItnstance.renderView;
        //when
        controller.executeBookListRoute();
        //then
        expect(mockRenderView).toHaveBeenCalledTimes(1);
    });

    test("executeBookListRoute invokes method getBooks of bookManager within bindSearchButtonClick twice", () => {
        // given
        const controller = new Controller();
        const mockBookListViewInstance = BooksList.mock.instances[0];
        mockBookListViewInstance.bindSearchButtonClick = jest.fn(mockCallback => {
            mockCallback();
        });
        const mockBookManagerInstance = BookManager.mock.instances[0];
        const mockGetBooks = mockBookManagerInstance.getBooks;
        // when
        controller.executeBookListRoute();
        // then
        expect(mockGetBooks).toHaveBeenCalledTimes(2);
    });

    test("executeBookListRoute invokes method clearSearch of bookListView within bindSearchResetButtonClick once", () => {
        // given
        const controller = new Controller();
        const mockBookListViewInstance = BooksList.mock.instances[0];
        mockBookListViewInstance.bindSearchResetButtonClick = jest.fn(mockCallback => {
            mockCallback();
        });
        const mockClearSearch = mockBookListViewInstance.clearSearch;
        // when
        controller.executeBookListRoute();
        // then
        expect(mockClearSearch).toHaveBeenCalledTimes(1);
    });

    //Zeile 60-83
    test("calling executeAddBookRoute invokes method renderView of AddBook once", () => {
        //given
        const controller = new Controller();
        const mockAddBookViewInstance = AddBook.mock.instances[0];
        const mockRenderView = mockAddBookViewInstance.renderView;
        //when
        controller.executeAddBookRoute();
        //then
        expect(mockRenderView).toHaveBeenCalledTimes(1);
    });

    test("calling executeAddBookRoute invokes method bindAddButtonClick of AddBook once", () => {
        //given
        const controller = new Controller();
        const mockAddBookViewInstance = AddBook.mock.instances[0];
        const mockBindButtonClick = mockAddBookViewInstance.bindAddBookButtonClick;
        //when
        controller.executeAddBookRoute();
        //then
        expect(mockBindButtonClick).toHaveBeenCalledTimes(1);
    });

    test("executeAddBookRoute invokes addBook method of addBookView within the try-catch block once", () => {
        //given
        const controller = new Controller();
        const mockAddBookViewInstance = AddBook.mock.instances[0];
        const mockAddBook = mockAddBookViewInstance.addBook;
        // es kommt eine funktion als Inputparameter die dann auch ausgeführt wird
        mockAddBookViewInstance.bindAddBookButtonClick = jest.fn(mockCallback => {
            mockCallback();
        });
        //when
        controller.executeAddBookRoute();
        //then
        expect(mockAddBook).toHaveBeenCalledTimes(1);
    });

    test("calling executeAddBookRoute sets location.hash to the value specified within bindDetailButtonClick", () => {
        //given
        const controller = new Controller();
        const mockBookListViewInstance = BooksList.mock.instances[0];
        mockBookListViewInstance.bindDetailButtonClick = jest.fn(() => {
            location.hash = "#/books";
        });
        //when
        controller.executeBookListRoute();
        //then
        expect(location.hash).toEqual("#/books");
    });

    //Zeile 83-88
    test("calling getBookIsbnFromHash returns the isbn of the details page", () => {
        //given
        location.hash = "#/details/1234567890"
        const controller = new Controller();
        //when
        const returnedISBN = controller.getBookIsbnFromHash();
        //then
        expect(returnedISBN).toEqual("1234567890");
    });

    //Zeile 95-97
    test("calling removeBook invokes method removeBook of BookManager once", () => {
        //given
        const controller = new Controller();
        const mockBookManagerInstance = BookManager.mock.instances[0];
        const mockRemoveBook = mockBookManagerInstance.removeBook;
        //when
        controller.removeBook("1234567890");
        //then
        expect(mockRemoveBook).toHaveBeenCalledTimes(1);
    });

    test("calling removeBook invokes method removeBook of BookList once", () => {
        //given
        const controller = new Controller();
        const mockBooksListInstance = BooksList.mock.instances[0];
        const mockRemoveBook = mockBooksListInstance.removeBook;
        //when
        controller.removeBook("1234567890");
        //then
        expect(mockRemoveBook).toHaveBeenCalledTimes(1);
    });

    test("calling rateBook invokes method rateBook of BookManager once", () => {
        //given
        const controller = new Controller();
        const mockBookManagerInstance = BookManager.mock.instances[0];
        const mockRateBook = mockBookManagerInstance.rateBook;
        //when
        controller.rateBook("1234567890", "4");
        //then
        expect(mockRateBook).toHaveBeenCalledTimes(1);
    });

    test("calling rateBook invokes method updateRating of BookList once", () => {
        //given
        const controller = new Controller();
        const mockBooksListInstance = BooksList.mock.instances[0];
        const mockUpdateRating = mockBooksListInstance.updateRating;
        //when
        controller.rateBook("1234567890", "4");
        //then
        expect(mockUpdateRating).toHaveBeenCalledTimes(1);
    });
});