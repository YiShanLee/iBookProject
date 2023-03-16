import filterBooksBySearch from "../src/utils/filterBooksBySearch";

const mockBooks = [{title: "mockTitle1", isbn: "1111111111"}, {title: "mockTitle2", isbn: "1111111112"}, {title: "mockTitle3", isbn: "1111111113"}];
const mockSearchInput = {searchText: "mockTitle1", searchOption: "title"};
const mockSearchInputThatMatchesAll = {searchText: "111", searchOption: "isbn"};

describe("test suite for filterBooksByResearch", () => {
    test("filterBooksBySearch returns all books not matching input",() => {
        //when + then
        expect(filterBooksBySearch(mockBooks, mockSearchInput)).toEqual([{title: "mockTitle2", isbn: "1111111112"}, {title: "mockTitle3", isbn: "1111111113"}]);
    });
    
    test("filterBooksBySearch returns all books if no book matches the input", () => {
        //when + then
        expect(filterBooksBySearch(mockBooks, {searchText: "nicht vorhanden", searchOption: "title"})).toEqual(mockBooks);
    });
    
    test("filterBooksBySearch returns an empty list upon receiving no input", () => { 
        //when + then
        expect(filterBooksBySearch([], mockSearchInput)).toEqual([]);
    });
    
    test("filterBooksBySearch returns an empty list if every book in storage matches the input", () => {
        //when + then
        expect(filterBooksBySearch(mockBooks,mockSearchInputThatMatchesAll)).toEqual([]);
    });
});

