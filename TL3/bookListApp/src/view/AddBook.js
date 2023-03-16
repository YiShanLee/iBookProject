import {
  Animater
} from "../userInterface/Animater"
import {
  MessageBox
} from "../userInterface/MessageBox"


class AddBook {
  constructor() {
    this.$viewSpace = document.querySelector("#viewSpace");
    this.animater = new Animater();
    this.messageBox = new MessageBox("#message-box", this.animater);

  }

  /**
   * creates the fundamental add book view 
   */
  renderView() {
    const view = `
          <div class="container mt-4">
              <form id="book-form">
                <div class="form-group">
                  <label for="author">Author</label>
                  <input type="text" id="author" class="form-control" />
                </div>
                <div class="form-group">
                  <label for="title">Titel</label>
                  <input type="text" id="title" class="form-control" />
                </div>
                <div class="form-group">
                  <label for="isbn">ISBN</label>
                  <input type="text" id="isbn" class="form-control" />
                </div>
                <div class="form-group">
                  <label for="description">Description</label>
                  <textarea class="form-control" id="description" rows="3"></textarea>
              </div>
                <button type="submit" class="btn btn-primary btn-block add-button">
                  <i class="fas fa-plus"></i> Add Book
                </button>
              </form>
          </div>
          `;

    this.$viewSpace.innerHTML = view;
  }

  /**
   * shows an success message box upon successful adding of a book and clears fields. Shows error message upon failure.
   * @param {Error} error - error message
   */
  addBook(error) {
    if (error) {
      this.messageBox.showMessage(error, "alert-danger");
      return;
    }
    this.messageBox.showMessage("Book Added", "alert-success");
    this.clearFields();
  }

  /**
   * selects the button in the add book view and binds the event to be triggered upon clicking the button
   * @param {Function} callback - function to be bound
   */
  bindAddBookButtonClick(callback) {
    const $addButton = document.querySelector(".add-button");

    $addButton.addEventListener("click", event => {
      callback(event);
    });
  }

  /**
   * clears the input fields in add book
   */
  clearFields() {
    document.querySelector("#title").value = "";
    document.querySelector("#author").value = "";
    document.querySelector("#isbn").value = "";
  }

  /**
   * selects all input fields and reads the input
   * @returns input of all fields
   */
  getFormInputs() {
    const title = document.querySelector("#title").value;
    const author = document.querySelector("#author").value;
    const isbn = document.querySelector("#isbn").value;
    const description = document.querySelector("#description").value;

    return {
      title,
      author,
      isbn,
      description
    };
  }


}

export {
  AddBook
};