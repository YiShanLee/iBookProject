import {Animater} from "../userInterface/Animater"


class BooksList {

  constructor() {
    this.$viewSpace = document.querySelector("#viewSpace");
    this.animater = new Animater();
    this.messageBox = new MessageBox("#message-box", this.animater);
  }

/**
 * creates the fundamental book list view and triggers the function to add all books to the table
 * @param {Array} books - list of books to be listed
 */
  renderView(books) {
    const view = `
      <div class="container mt-4">
        <table class="table table-striped mt-5">
        <thead>
          <tr>
            <th>Titel</th>
            <th>Author</th>
            <th>ISBN</th>
            <th>Detail</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody id="book-list"></tbody>
      </table>
      <div class="container mt-4">
        `;

    this.$viewSpace.innerHTML = view;
    this.addBooksToTable(books);
  }

  /**
   * adds all books of a passed in list to the book table
   * @param {Array} books - list of books to be added to table
   */
  addBooksToTable(books) {
    books.forEach(book => {
      this.addBookAsTableRow(book, true);
    });
  }

  /**
   * adds one book to the table in the book list view and triggers the creation of the delete and detail buttons for each book
   * @param {Object} book - book to be added to table
   */
  addBookAsTableRow(book) {
    const $bookList = document.querySelector("#book-list");
    const $row = document.createElement("tr");
    $row.setAttribute("data-isbn", book.isbn);

    $row.innerHTML = `
         <td>${book.title}</td>
         <td>${book.author}</td>
         <td>${book.isbn}</td>
        `;

    const $deleteCell = this.createDeleteCell(book.isbn);
    const $detailCell = this.createDetailCell(book.isbn);

    $row.appendChild($detailCell);
    $row.appendChild($deleteCell);

    $bookList.insertBefore($row, $bookList.firstChild);
  }

  /**
   * creates the detail cell in the book list view row of the book of the given isbn
   * @param {String} isbn - unique identification number of book that the button is for
   */
  createDetailCell(isbn) {
    const $detailCell = document.createElement("td");
    const $link = document.createElement("a");
    $link.setAttribute("data-isbn", isbn);
    $link.classList.add("fas", "fa-eye", "text-primary", "detail-button");

    $detailCell.appendChild($link);

    return $detailCell;
  }

<<<<<<< HEAD
  /**
   * creates delete cell in the book list view row of the book of the given isbn
   * @param {String} isbn - unique identification number of book that the button is for
   */
  createDeleteCell(isbn) {
=======
  createDeleteCell (isbn) {
>>>>>>> parent of d7a1dea (controller and bookview for search button changed)
    const $deleteCell = document.createElement("td");
    const $link = document.createElement("a");
    $link.classList.add("fas", "fa-trash", "text-primary", "remove-button");
    $link.setAttribute("data-isbn", isbn);

    $deleteCell.appendChild($link);

    return $deleteCell;
  }

  /**
   * selects the detail buttons in the book list view and binds the callback meant to be triggered when clicking the button
   * @param {Function} callback - function to be bound
   */
  bindDetailButtonClick(callback) {
    const $detailButtons = document.querySelectorAll(".detail-button");
    $detailButtons.forEach(buttonItem => {
      buttonItem.addEventListener("click", event => {
        callback(event);
      });
    });
  }

  
  /**
   * selects the delete buttons in the book list view and binds the callback meant to be triggered when clicking the button
   * @param {Function} callback - function to be bound
   */
  bindRemoveButtonClick(callback) {
    const $removeButtons = document.querySelectorAll(".remove-button");
    $removeButtons.forEach(buttonItem => {
      buttonItem.addEventListener("click", event => {
        callback(event);
      });
    });
  }

  
  /**
   * selects the search button in the book list view and binds the callback meant to be triggered when clicking the button
   * @param {Function} callback - function to be bound
   */
  bindSearchButtonClick(callback) {
    const searchButton = document.getElementById("search-button");
    searchButton.addEventListener("click", () => {
      callback();
    })
  }

  
  /**
   * selects the stop search button in the book list view and binds the callback meant to be triggered when clicking the button
   * @param {Function} callback - function to be bound
   */
  bindStopSearchButtonClick(callback) {
    const stopSearchButton = document.getElementById("stop-search-button");
    stopSearchButton.addEventListener("click", () => {
      callback();
    })
  }

  /**
   * returns the input of the search input field
   */
  getSearch() {
    const searchText = document.getElementById("inputSearch").value;
    const searchCategory = document.getElementById("searchFilter").value;
    return [searchText, searchCategory];
  }

  /**
   * shows a message box with the error message in the view 
   * @param {Error} error - error message
   */
  searchFailed(error) {
    if (error) {
      this.messageBox.showMessage(error, "alert-danger");
    }

  }

  /**
   * removes the book from the book list view and triggers the animaton of the delete process, as well as the removal of the book from the storage
   * @param {String} isbn - unique identification number for each book 
   */
  removeBook(isbn) {
    const $bookToRemove = document.querySelector(`[data-isbn="${isbn}"]`);

    const remove = () => {
      $bookToRemove.remove();
    }

    this.animater.moveToRight($bookToRemove, remove);
  }

}

export {BooksList};