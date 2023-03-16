import React,{Component} from 'react'
import { NavLink } from "react-router-dom";

/**
 * @class Nav - Reprsents the navigation bar where the user can switch between the BookList, the AddBook and the BookDetail view.
 * @extends Component
 */
class Nav extends Component{

    /**
     * Deactivates the detail tab.
     * 
     * @param {Object} event
     */
    handleClick(event) {
        event.preventDefault();
    }

    /**
     * Renders the navigation bar.
     * 
     * @returns {Component} - The Nav component.
     */
    render(){
        return (
            <ul className="nav nav-tabs nav-fill">
                <li className="nav-item">
                    <NavLink className="nav-link" to="/booklist">Book List</NavLink>
                </li>
                <li className="nav-item">
                    <NavLink className="nav-link" to="/addBook">Add Book</NavLink>
                </li>
                <li className="nav-item">
                    <NavLink className="nav-link" to="/bookdetail" onClick={this.handleClick}>Book Detail</NavLink>
                </li>
            </ul> 
        )
    }
}

/**
 * @exports Nav
 */
export default Nav;
