const filterBooksBySearch = (books, searchInput) => {
  const notFoundBooks = books.filter(book => {
    const { searchOption } = searchInput;
    if (!book[searchOption].includes(searchInput.searchText)) {
      return book;
    }
  });

  return notFoundBooks;
};

export default filterBooksBySearch;
