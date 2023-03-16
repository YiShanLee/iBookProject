import React, { Component } from "react";

/** 
 * @class Header - Represents the Header of the iBooks application including the iBooks icon and the iBooks slogan.
 * @extends Component
 */
class Header extends Component {
    /**
     * Renders the Header and shows the icon as well as the slogan of the header. 
     * 
     * @returns {Component} - The Header component.
     */
    render() {
        return (
          <div className="jumbotron">
            <h1 className="display-3">
              <i className="fas fa-bookmark text-primary" id="jumbotron-icon"></i> iBooks
            </h1>
            <p className="lead">
              Die beste Buchverwaltungssoftware der Welt!!!
            </p>
          </div>
      
        )
    }
}

/**
 * @exports Header
 */
export default Header;