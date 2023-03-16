class BookDetail {
  constructor() {
    this.$viewSpace = document.querySelector("#viewSpace");

  }
  
  /**
   * creates the fundamental detail view and adds the details of one book to the view
   * @param {Object} book - parameter of one book 
   */
  renderView(book) {
    let view = "";

    if (!book) {
      view = `
          <div class="container mt-4">
              <div class="alert  alert-warning">
                  No Book selected!!!
              </div>
          </div>
          `;
      this.$viewSpace.innerHTML = view;
      return;
    }

    view = `
        <div class="container mt-4">
        <div class="card mx-auto" style="max-width: 25rem;">
          <i class="fas fa-book-reader text-primary mt-4 mx-auto" style="font-size: 70px"></i>
        <div class="card-body">
          <div class="text-center">Author: ${book.author}</div>
          <div class="text-center">Title: ${book.title}</div>
          <div class="text-center">ISBN: ${book.isbn}</div>
  
          <hr />
          <div>
            ${book.description}
          </div>
        </div>
      </div>
        <div />
          `;

    this.$viewSpace.innerHTML = view;
  }

}

export {BookDetail};
