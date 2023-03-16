import firebase from 'firebase/app';
import 'firebase/firestore';
import "regenerator-runtime/runtime";

/**
 * @class Database - Represents the book storage of the iBooks application.
 */
class Database {

  /**
   * Creates a connection to the database and a connection to the book collection within the firestore database.
   * 
   * If the defined collection does not exist in the database, it is automatically created.
   * @constructor 
   */ 
  constructor() {
    this.firebaseConfig = {
      apiKey: process.env.apiKey,
      authDomain: process.env.authDomain,
      projectId: process.env.projectId,
      storageBucket: process.env.storageBucket,
      messagingSenderId: process.env.messagingSenderId,
      appId: process.env.appId
    }

    if (!firebase.apps.length) {
      firebase.initializeApp(this.firebaseConfig);
    }

    this.db = firebase.firestore();
    this.bookCollection = this.db.collection("Books");

  }


  /**
   * Adds a book to the book collection of the firestore database.
   * 
   * @param {Object} book  - The book object that was created according to the user.
   * input in the input fields of the form in the addBook view.
   * 
   */
  addBook(book) {
    const timestamp = firebase.firestore.FieldValue.serverTimestamp;
    this.bookCollection.doc(book.isbn)
      .set({
        title: book.title,
        author: book.author,
        isbn: book.isbn,
        description: book.description,
        rating: book.rating,
        timestamp: timestamp()
      })
  }

  /**
   * Searches for a book from the database.
   * 
   * @async
   * @param {string} isbn - The isbn of the book to be searched for.
   */
    async getBook(isbn) {
      let book;
      await this.bookCollection.doc(isbn).get()
        .then(doc => {
          if (doc.exists) {
            book = doc.data();
          }
        })
        .catch(error => console.error("An error occured whie fetching the book: ", error))

        return book; 
    }

  /**
   * Deletes a book from the database.
   * 
   * @param {string} isbn - The isbn of the book to be deleted. 
   */
  deleteBook(isbn) {
    this.bookCollection.doc(isbn)
      .delete()
      .catch((error) => console.error("An error occurrred while deleting the book.", error));
  }

  /**
   * Updates the rating of a book according to the stars that the user clicked in the BookList view.
   * 
   * @param {Object} book - The book of which the rating is updated.
   * @param {number} rating  - The new rating of the book.
   */
  updateBookRating(book, rating) {
    this.bookCollection.doc(book.isbn)
      .set({
        title: book.title,
        author: book.author,
        isbn: book.isbn,
        description: book.description,
        rating: rating,
        timestamp: book.timestamp
      })
  }

  /**
   * Retreives all books from the database.
   * 
   * @async 
   * @returns A list of book objects within the database.
   */
  async getBooks() {
    let bookList = [];
    await this.bookCollection.orderBy("timestamp", "desc").get()
      .then(snapshot => {
        snapshot.forEach(doc => {
          bookList.push(doc.data());
        });
      })
      .catch(error => console.error("An error occurred while fetching the books", error));
    return bookList;
  }
}

/**
 * Declares a Singleton for the database, so that only one instance of the class is used.
 * 
 * @const 
 * @type {Object}
 */
const databaseSingleton = new Database();
Object.freeze(databaseSingleton);

/**
 * @exports databaseSingleton
 */
export default databaseSingleton;