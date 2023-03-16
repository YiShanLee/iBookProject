import Animater from "../userInterface/Animater";

class BooksList {
  constructor() {
    this.$viewSpace = document.querySelector("#viewSpace");
    this.animater = new Animater();
  }

  renderView(books) {
    const view = `
      <div class="container mt-4">
        ${this.renderSearchBar()}
        <table class="table table-striped mt-5">
        <thead>
          <tr>
            <th>Titel</th>
            <th>Author</th>
            <th>ISBN</th>
            <th>Detail</th>
            <th>Delete</th>
            <th>Rate</th>
          </tr>
        </thead>
        <tbody id="book-list"></tbody>
      </table>
      <div class="container mt-4">  
        `;

    this.$viewSpace.innerHTML = view;
    this.addBooksToTable(books);
  }

  renderSearchBar() {
    return `
      <div class="form-row">
        <div class="form-group col-sm-5">
          <input type="text" class="form-control" id="inputSearchText" placeholder="Search Text">
        </div>
        <div class="form-group col-sm-3">
          <select id="inputSearchOption" class="form-control">
            <option value="title" selected>Title</option>
            <option value="author">Author</option>
            <option value="isbn">ISBN</option>
          </select>
        </div>
        <div class="form-group col-6 col-sm-2">
        <button type="submit" id="search-button" class="btn btn-primary btn-block"><i class="fa fa-search"></i></button>
        </div>
        <div class="form-group col-6 col-sm-2">
        <button type="submit" id="search-reset-button" class="btn btn-secondary btn-block">X</button>
        </div>
      </div>
    `;
  }

  hideNotFoundBooks(notFoundBooks) {
    notFoundBooks.forEach(notFoundBook => {
      const $bookToHide = document.querySelector(
        `[data-isbn="${notFoundBook.isbn}"]`
      );
      $bookToHide.classList.add("d-none");
    });
  }

  clearSearch() {
    const $bookList = document.getElementById("book-list");

    $bookList.childNodes.forEach($bookListChild => {
      $bookListChild.classList.remove("d-none");
    });

    document.getElementById("inputSearchText").value = "";
  }

  addBooksToTable(books) {
    books.forEach(book => {
      this.addBookAsTableRow(book, true);
    });
  }

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
    const $ratingCell = this.createRatingCell(book.isbn, book.rating);

    $row.appendChild($detailCell);
    $row.appendChild($deleteCell);
    $row.appendChild($ratingCell);

    $bookList.insertBefore($row, $bookList.firstChild);
  }

  createRatingCell(isbn, rating){
    const $ratingCell = document.createElement("td");
    
    for (let i = 1; i<=5; i++){
      const $link = document.createElement("a");
      $link.setAttribute("data-isbn", isbn);
      $link.setAttribute("data-rating", i);
      $link.classList.add("fas", "fa-star", "text-primary", "rating-button");
      $ratingCell.appendChild($link);
    }
    
    this.updateRating(isbn, rating, $ratingCell);

    return $ratingCell;
  }

  createDetailCell(isbn) {
    const $detailCell = document.createElement("td");
    const $link = document.createElement("a");
    $link.setAttribute("data-isbn", isbn);
    $link.classList.add("fas", "fa-eye", "text-primary", "detail-button");

    $detailCell.appendChild($link);

    return $detailCell;
  }

  createDeleteCell(isbn) {
    const $deleteCell = document.createElement("td");
    const $link = document.createElement("a");
    $link.classList.add("fas", "fa-trash", "text-primary", "remove-button");
    $link.setAttribute("data-isbn", isbn);

    $deleteCell.appendChild($link);

    return $deleteCell;
  }

  getSearchInput() {
    const $searchTextField = document.getElementById("inputSearchText");
    const $searchOptionField = document.getElementById("inputSearchOption");

    return {
      searchText: $searchTextField.value,
      searchOption: $searchOptionField.value
    };
  }

  bindSearchButtonClick(callback) {
    const $searchButton = document.getElementById("search-button");

    $searchButton.addEventListener("click", event => {
      callback(event);
    });
  }

  bindSearchResetButtonClick(callback) {
    const $searchResetButton = document.getElementById("search-reset-button");

    $searchResetButton.addEventListener("click", event => {
      callback(event);
    });
  }

  bindRatingButtonClick(callback) {
    const $ratingButtons = document.querySelectorAll(".rating-button");

    $ratingButtons.forEach($ratingButton => {
      $ratingButton.addEventListener("click", event => {
        callback(event);
      });
    });
  }

  bindDetailButtonClick(callback) {
    const $detailButtons = document.querySelectorAll(".detail-button");

    $detailButtons.forEach($detailButton => {
      $detailButton.addEventListener("click", event => {
        callback(event);
      });
    });
  }

  bindRemoveButtonClick(callback) {
    const $removeButtons = document.querySelectorAll(".remove-button");

    $removeButtons.forEach($removeButton => {
      $removeButton.addEventListener("click", event => {
        callback(event);
      });
    });
  }

  removeBook(isbn) {
    const $bookToRemove = document.querySelector(`[data-isbn="${isbn}"]`);

    const remove = () => {
      $bookToRemove.remove();
    };

    this.animater.moveToRight($bookToRemove, remove);
  }

  updateRating(isbn, newRating, node = document.querySelector(`[data-isbn="${isbn}"]`).lastChild){
    const $updateButtons =  node.childNodes;
    
    const buttonArray = Array.from($updateButtons);

    buttonArray.forEach($updateButton => {    
      const rating = $updateButton.getAttribute("data-rating");  
      if(rating <= newRating){
        $updateButton.classList.remove("text-primary");
        $updateButton.classList.add("text-warning");
      } else {
        $updateButton.classList.remove("text-warning");
        $updateButton.classList.add("text-primary");
      }
    });
  }
}

export default BooksList;