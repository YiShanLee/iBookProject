function modelConstructor() {

    var bookList = [];
    var selectedBook;

    /**
     * Checks the availability of the local storage. 
     * 
     * @returns true if the local storage is not available,
     * false if not
     */
    function isLocalStorageNotAvailable() {
        return ((typeof (Storage) === "undefined"));
    }

    /**
     * Tests if the local storage is available and fetches the
     * previously saved books from the Local storage at startup, 
     * should there be any.
     */
    function getBooksFromStorage() {
        if (typeof (Storage) !== "undefined") {
            if (localStorage.getItem("bookList") != null) {
                bookList = JSON.parse(localStorage.getItem("bookList"));
            }
        }
    }

    /**
     * Returns the index of a book in the global bookList.
     * 
     * @param {string} isbn - The 'key' for the wanted book.
     */
    function getBookPositionInArrayByIsbn(isbn) {
        for (var i = 0; i < bookList.length; i++) {
            if (bookList[i].isbn === isbn) {
                return i;
            }
        }
        return -1;
    }

    /** 
     * Returns a reversed copy of the globally stored book list.
     * Note: slice() is needed so that the original bookList is not
     * mutated.
     */
    function getBookList() {
        var reversedList = bookList.slice().reverse();
        return reversedList;
    }

    function getSelectedBook() {
        return selectedBook;
    }

    function setSelectedBook(book) {
        selectedBook = book;
    }

    /**
     * Performs both actions that are needed when the user clicked 
     * the add button: adding the book to the local storage as well
     * as to the global book list of the model.
     * 
     * @param {Object} book - The book object that the user generated.
     */
    function addBook(book) {
        console.log(bookList);
        bookList.push(book);
        getBooksFromStorage();
        addBookToLocalStorage();        
    }

    /**
     * Adds a book to the local storage by converting the global bookList  into a 
     * string representation.
     */
    function addBookToLocalStorage() {
        if (typeof (Storage) !== "undefined") {
            localStorage.setItem("bookList", JSON.stringify(bookList));
        }
        console.log(localStorage);

    }

    /**
     * Checks if a book with the same ISBN as the user-provided book already exists in the 
     * global bookList.
     * 
     * @param {Object} book - The book of which the ISBN shall be checked.
     * @returns {boolean} - True if the ISBN already exists, false if not.
     */
    function isbnAlreadyExists(book) {
        return (getBookPositionInArrayByIsbn(book.isbn) >= 0);
    }

    /**
     * Deletes the book via its ISBN selected book from the bookList object,
     * converts the bookList object into a JSON string,
     * and replaces the bookList string stored in the local Storage with the updated bookList string.
     * 
     * @param {string} isbn - ISBN of a stored book, that has been selected for deletion.
     */
    function deleteBook(isbn) {
        var indexOfBookToDelete = getBookPositionInArrayByIsbn(isbn);

        bookList.splice(indexOfBookToDelete, 1);

        var bookListString = JSON.stringify(bookList);

        localStorage.setItem("bookList", bookListString);
    }

    /**
     * Returns book from bookList by ISBN.
     * Returns null should ISBN not exist in bookList.
     * 
     * @param {string} isbn - ISBN of the book of which the details are required
     */
    function getBookByIsbn(isbn) {
        var index = getBookPositionInArrayByIsbn(isbn);
        return bookList[index];

    }


    return {
        addBook: addBook,
        getBookList: getBookList,
        deleteBook: deleteBook,
        getBookByIsbn: getBookByIsbn,
        getSelectedBook: getSelectedBook,
        setSelectedBook: setSelectedBook,
        getBooksFromStorage: getBooksFromStorage,
        isbnAlreadyExists: isbnAlreadyExists,
        isLocalStorageNotAvailable: isLocalStorageNotAvailable
    };

}