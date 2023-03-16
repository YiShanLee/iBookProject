import React, { Component } from "react";
import "./bootstrap.default.css";
import Header from "./Components/Header";
import Main from "./Components/Main";

/**
 * @class App - Represents the Header and the Main View of the whole application.
 * @extends Component
 */
export class App extends Component {

  /**
   * Renders the iBook Application.
   * @returns {Component}
   */
  render() {
    return (
      <>
        <Header />
        <Main />
      </>
    );
  }
}

/**
 * @exports App
 */
export default App;
