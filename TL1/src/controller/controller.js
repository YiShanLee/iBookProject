function controller() {

    var view = viewConstructor();
    var model = modelConstructor();

    if (model.isLocalStorageNotAvailable()) {
        view.renderErrorPage("The local storage is not available");
    } else {
        /**
         * Fetches the books that are in the local storage and updates the 
         * book list.
         */
        model.getBooksFromStorage();

        /**
         * Changes the theme of the website from light to dark or from dark
         * to light when the user clicks the dark or the light button
         */
        view.bindClickOnDarkButton(darkButtonWasClicked);
        view.bindClickOnLightButton(lightButtonWasClicked);

        /**
         * Renders the content of the page correctly when it is 
         * loaded for the first time  (i.e., not only when the 
         * hash code changes)
         */
        switch (window.location.hash) {
            case "":
            case "#list":
                view.renderBookListView(model.getBookList(), deleteBook, getDetails);
                document.getElementById("detailsTab").setAttribute("class", "nav-link disabled");
                break;
            case "#add":
                view.renderAddView();
                view.bindClickOnAddButton(addBookButtonWasClicked);
                document.getElementById("detailsTab").setAttribute("class", "nav-link disabled");
                break
            case "#details":
                view.renderDetailsView(model.getSelectedBook());
                break;
            default:
                view.renderErrorPage("404 ERROR - HASH DOES NOT EXIST");
        }

        window.onhashchange = function () {
            renderView(window.location.hash);
        }

    }


    /**
     * Changes the theme of the web application to light
     * 
     * @callback controller~lightButtonWasClicked
     */
    function lightButtonWasClicked() {
        var style = document.getElementById('css');
        style.setAttribute('href', 'css/Light.css');
    }

    /**
     * Changes the theme of the web application to dark
     * 
     * @callback controller~darkButtonWasClicked
     */
    function darkButtonWasClicked() {
        var style = document.getElementById('css');
        style.setAttribute('href', 'css/Dark.css');
    }




    /**
     * Changes the content of the web page based on the tab in the navigation bar
     *  that the user clicked on or based on the hash code the user typed in
     * 
     * @param {string} hash - The hash code for the respective route of a tab
     */
    function renderView(hash) {
        if (hash === "#list" || hash == "") {
            view.renderBookListView(model.getBookList(), deleteBook, getDetails);
            document.getElementById("detailsTab").setAttribute("class", "nav-link disabled");
        } else if (hash === "#add") {
            view.renderAddView();
            view.bindClickOnAddButton(addBookButtonWasClicked);
            document.getElementById("detailsTab").setAttribute("class", "nav-link disabled");
        } else if (hash === "#details") {
            view.renderDetailsView(model.getSelectedBook());
        } else {
            view.renderErrorPage("404 ERROR - HASH DOES NOT EXIST");
        }
    }

    /**
     * Performs the delete action when the user clicked on the 
     * delete icon of the book list view.
     * 
     * @param {string} isbn 
     */
    function deleteBook(isbn) {
        model.deleteBook(isbn);
        view.animateBookDeletion(isbn);

        if (model.getSelectedBook() != null && model.getSelectedBook().isbn === isbn) {
            var emptyBook;
            model.setSelectedBook(emptyBook);
        }
    }

    /**
     * Fetches the details for a user-selected book and forwards the
     * user to the details view.
     * 
     * @param {string} isbn - The isbn of the book the user selected.
     */
    function getDetails(isbn) {
        var detailBook = model.getBookByIsbn(isbn);
        model.setSelectedBook(detailBook);
        window.location.hash = "#details";
        document.getElementById("detailsTab").setAttribute("class", "nav-link active");
        view.renderDetailsView(detailBook);
    }


    /**
     * Performs the actions that need to be done when the Add Book button of 
     * the Add Book page was clicked by delegating the respective actions
     * either to the view or to the model.
     * 
     * @callback controller~addBookButtonWasClicked
     */
    function addBookButtonWasClicked() {
        var inputFields = view.getInputFields();
        if (inputFields == null) {
            return;
        } else if (isbnAlreadyExists(inputFields)) {
            view.showErrorMessage("This ISBN already exists.");
        } else {
            model.addBook(inputFields);
            window.location.hash = "#list";
            view.showSuccessMessage("Book Added");
        }


    }

    /**
     * Checks whether the isbn of the book to be added is still free or not.
     * 
     * @param {Object} book - The book of which the ISBN shall be checked.
     */
    function isbnAlreadyExists(book) {
        return model.isbnAlreadyExists(book);
    }

}
