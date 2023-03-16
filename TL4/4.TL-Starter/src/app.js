import Controller from "./controller/Controller";

// Just for testing purposes
const testData = [
  {
    author: "Max",
    title: "Hello World",
    isbn: "1234567891",
    description:
      "First Lorem ipsum dolor sit amet, consetetur sadipscing elitr,sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat,  sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.  "
  },
  {
    author: "Fritz",
    title: "Hello Dave",
    isbn: "1234567892",
    description:
      "Second  Lorem ipsum dolor sit amet, consetetur sadipscing elitr,sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat,  sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.  "
  },
  {
    author: "Mike",
    title: "Crazy Game",
    isbn: "1234567893",
    description:
      "Third Lorem ipsum dolor sit amet, consetetur sadipscing elitr,sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat,  sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.  "
  }
];
// localStorage.setItem("books", JSON.stringify(testData));

// Start the app
document.addEventListener("DOMContentLoaded", () => {
  new Controller();
});
