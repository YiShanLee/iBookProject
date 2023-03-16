function viewConstructor() {

    var lightButton = document.getElementById("lightmode");
    var darkButton = document.getElementById("darkmode");
    var bookView = document.getElementById("bookView");
    const messageContainer = document.getElementById("messageContainer");

    /**
     * Defines what function is called when the light button
     * is clicked.
     * 
     * @param {controller~lightButtonWasClicked} callback - The function that is 
     * called when the light button is clicked.
     */
    function bindClickOnLightButton(callback) {
        lightButton.addEventListener("click", callback);
    }

    /**
     * Defines the function that is called when the dark
     * button is clicked.
     * 
     * @param {controller~darkButtonWasClicked} callback - The functiont hat
     * is called when the dark button is clicked.
     */
    function bindClickOnDarkButton(callback) {
        darkButton.addEventListener("click", callback);
    }


    /**
     * Creates a form with input fields that can be used by the user
     * to create a book and add it to his/her book list.
     */
    function renderAddView() {
        const labelDetails = "class='col-form-label m-1' for='inputLarge'";
        const inputDetails = "class='form-control form-control' type='text'";
        bookView.innerHTML = `\
            <label ${labelDetails}>Author</label> \
            <input ${inputDetails} id='authorField'> \
            <label ${labelDetails}>Title</label> \
            <input ${inputDetails} id='titleField'> \
            <label ${labelDetails}>ISBN</label> \
            <input ${inputDetails} id='isbnField'> \
            <label ${labelDetails}>Description</label> \
            <input ${inputDetails} id='descriptionField'> \
            \
            <button id='addBook' type='button' class='btn btn-primary col-sm-12 mt-3'>Add book</button> \
        `;
    }


    /**
     * Displays the details, i.e., the title, the author, the ISBN,
     * and the description of a book that was selected by the user.
     * 
     * @param {Object} book - The book that the user selected.
     */
    function renderDetailsView(book) {
        if (book == null) {
            renderErrorPage("No book selected to display details of.")
        } else {
            bookView.innerHTML = "";

            var author = book.author;
            var title = book.title;
            var isbn = book.isbn;
            var description = book.description;

            var generalInfo = document.createElement("div");
            generalInfo.setAttribute("class", "text-center text-primary");
            generalInfo.setAttribute("style", "font-size:150%");
            generalInfo.innerHTML = `\
                Author: ${author} <br> \
                Title: ${title} <br> \
                ISBN: ${isbn} \
                `;

            var details = document.createElement("div");
            details.setAttribute("class", "text-justify col-md-8 offset-md-2 mb-3");
            details.innerHTML = description;

            bookView.innerHTML = "";
            bookView.appendChild(generalInfo);
            bookView.appendChild(details);
            
        }
    }

    /**
     * Gets the user inputs for the book the user wants to add.
     * Validates the correctness of the input fields. If all input fields
     * are filled in correctly, a book object is created.
     * 
     * @returns {Object} book - The representation of a valid book.
     */
    function getInputFields() {
        var authorField = document.getElementById('authorField').value;
        var titleField = document.getElementById('titleField').value;
        var isbnField = document.getElementById('isbnField').value;
        var descriptionField = document.getElementById('descriptionField').value;
        var book = null;

        if (authorField === "" || titleField === "" || isbnField === "" || descriptionField === "") {
            showErrorMessage("Please fill in all fields.");
            } else if (!isbnIsValid(isbnField)) {
            showErrorMessage("The ISBN has the wrong format.");
        } else {
            book = {
                author: authorField,
                title: titleField,
                description: descriptionField,
                isbn: isbnField
            };
            return book;
        }

    }

    /**
     * Styles the message container that is shown to the user 
     * when the user made a mistake while filling out the form 
     * in the Add book view.
     * 
     * @param {string} message - The message to be shown to the user.
     */
    function showErrorMessage(message) {
        messageContainer.setAttribute('class', "alert alert-dismissible alert-danger");
        messageContainer.innerHTML = message;
        animateMessage(messageContainer);
    }

    /**
     * Styles the message container that is shown to the user 
     * when a book was successfully added by the user in the 
     * Add book view.
     * 
     * @param {string} message - The message to be shown to the user.
     */
    function showSuccessMessage(message) {
        messageContainer.setAttribute('class', 'alert alert-dismissible alert-success');
        messageContainer.innerHTML = message;
        animateMessage(messageContainer);
    }

    /**
     * Fades in a given object and fades it out again.
     * 
     * @param messageContainer - The object that is animated .
     */
    function animateMessage(messageContainer) {
        const messageAnimation = popmotion.styler(messageContainer);

        popmotion.tween({
            from: {
                opacity: 0
            },
            to: {
                opacity: 1
            },
            duration: 3000,
            flip: 1
        }).start(messageAnimation.set)
    }

    /**
     * Checks whether the ISBN provided by the user is in the correct format.
     *
     * @param {string} isbnField - The ISBN that the user provided.
     * @returns {boolean} true if the ISBN is valid, false if it is not.
     */
    function isbnIsValid(isbnField) {
        if (isbnField.length === 10 && /^\d+$/.test(isbnField)) {
            return true;
        } else {
            return false;
        }
    }

    /**
     * Binds the add button in the Add Book View to a function 
     * in the controller that is performed when the user clicks
     * the button.
     * 
     * @param {Controller~addBookButtonWasClicked} callback - The callback that
     * handles the click on the add button.
     */
    function bindClickOnAddButton(callback) {
        document.getElementById('addBook').addEventListener("click", callback);
    }

    function getBookView() {
        return bookView;
    }

    /**
     * Creates a table and displays information about the stored books, each in it's own row with a button
     * to delete the book and another one to show the details of a book.
     * 
     * @param {Object} storedBooks - An object that contains all stored books.
     * @param {model~deleteBook} callbackDelete - The callback that handels the click on the delete button.
     * @param {model~getDetails} callbackDetails - The callback that handels the click on the details button.
     */

    function renderBookListView(storedBooks, callbackDelete, callbackDetails) {

        bookView.innerHTML = "";

        var table = document.createElement('table');
        var tableRowHead = document.createElement('tr');
        var captionTitle = document.createElement('th');
        var captionAuthor = document.createElement('th');
        var captionISBN = document.createElement('th');
        var captionDetail = document.createElement('th');
        var captionDelete = document.createElement('th');

        bookView.appendChild(table);
        table.appendChild(tableRowHead);
        tableRowHead.appendChild(captionTitle);
        tableRowHead.appendChild(captionAuthor);
        tableRowHead.appendChild(captionISBN);
        tableRowHead.appendChild(captionDetail);
        tableRowHead.appendChild(captionDelete);

        captionTitle.innerText = 'Title';
        captionAuthor.innerText = 'Author';
        captionISBN.innerText = 'ISBN';
        captionDetail.innerText = 'Detail';
        captionDelete.innerText = 'Delete';

        var headerCells = document.getElementsByTagName('th');
        for (var i = 0; i < headerCells.length; i++) {
            headerCells[i].setAttribute('scope', 'col');
        }
        table.classList.add('table');

        /** 
         * Creates table rows and cells for each book and inserts the information of the stored books
         * as well as buttons to delete a book and show the details of a book
         * and adds functionality to buttons.
         * 
         * @param {Object} book - A single book from the storedBooks object, which information will be
         * displayed in the table
         */
        storedBooks.forEach(function (book) {
            var bookRow = document.createElement('tr');
            bookRow.setAttribute("id", book.isbn);

            var bookCellTitle = document.createElement('td');
            var bookCellAuthor = document.createElement('td');
            var bookCellIsbn = document.createElement('td');
            var bookCellDetail = document.createElement('td');
            var bookCellDelete = document.createElement('td');
            var detailButton = document.createElement('button');
            var deleteButton = document.createElement('button');
            var detailIcon = document.createElement('i');
            var deleteIcon = document.createElement('i');

            bookRow.appendChild(bookCellTitle);
            bookRow.appendChild(bookCellAuthor);
            bookRow.appendChild(bookCellIsbn);
            bookRow.appendChild(bookCellDetail);
            bookRow.appendChild(bookCellDelete);

            table.appendChild(bookRow);

            bookCellTitle.innerHTML = book.title;
            bookCellAuthor.innerHTML = book.author;
            bookCellIsbn.innerHTML = book.isbn;

            bookCellDetail.appendChild(detailButton);
            bookCellDelete.appendChild(deleteButton);
            detailButton.appendChild(detailIcon);
            deleteButton.appendChild(deleteIcon);

            detailIcon.classList.add('fas');
            detailIcon.classList.add('fa-info');
            deleteIcon.classList.add('far');
            deleteIcon.classList.add('fa-trash-alt');

            detailButton.addEventListener('click', function () {
                callbackDetails(book.isbn)
            });
            deleteButton.addEventListener('click', function () {
                callbackDelete(book.isbn)
            });

        });
    }

    /** 
     * Fetches the table row of the book the user wants to delete,
     * then moves the row to the right and then removes it .
     * 
     * @param {string} isbn - The identifier of the book that shall be deleted.
     */
    function animateBookDeletion(isbn) {
        const animatedRow = document.getElementById(isbn);
        const rowanimation = popmotion.styler(animatedRow);

        popmotion.tween({
            from: {
                x: 1
            },
            to: {
                x: window.innerWidth
            },
            duration: 3000
        }).start({
            update: rowanimation.set,
            complete: () => animatedRow.remove()
        });
    }

    /**
     * Creates the message container which is to inform the user 
     * of any error that occured.
     *    
     * @param {​​String}​​ text - Error message to be displayed
     */
    function renderErrorPage(text) {
        bookView.innerHTML = "";
        var errorMessage = document.createElement('p');
        errorMessage.innerText = text;
        bookView.appendChild(errorMessage);
        errorMessage.setAttribute("class", "text-danger text-center errorMessage");
    }

    return {
        bindClickOnLightButton: bindClickOnLightButton,
        bindClickOnDarkButton: bindClickOnDarkButton,
        renderAddView: renderAddView,
        renderDetailsView: renderDetailsView,
        getBookView: getBookView,
        getInputFields: getInputFields,
        bindClickOnAddButton: bindClickOnAddButton,
        renderBookListView: renderBookListView,
        showErrorMessage: showErrorMessage,
        animateBookDeletion: animateBookDeletion,
        showSuccessMessage: showSuccessMessage,
        renderErrorPage: renderErrorPage
    };
}