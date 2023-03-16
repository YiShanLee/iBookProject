import React, {Component} from 'react'
import { Link } from 'react-router-dom'
import "../bootstrap.default.css"

/**
 * @class Not Found - Represents the NotFound view that appears, when the user types a non-existent route in the URI field.
 * @extends Component
 */
class NotFound extends Component {

    /**
     * Renders the NotFound view that contains a Not-Found message as well as an icon and a link to the BookList view.
     * 
     * @returns {Component} - The NotFound view component.
     */
    render() {
        return (
            <div className="container m-4 mw-100 text-center">
                <h1>404 - Not Found</h1>
                <i className="fas fa-link" style={{color:"#78C2AD"}}></i>
                <Link className="m-2" to="/booklist">Back to book list</Link>
            </div>
        )
    }
}

/**
 * @exports NotFound
 */
export default NotFound
