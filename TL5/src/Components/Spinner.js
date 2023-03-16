import React, {Component} from "react";
import "../bootstrap.default.css";

/** 
 * @class Spinner - Represents a loading indicator that appears whenever data from the backend is loaded.
 * @extends Component  
 */
class Spinner extends Component {
 
    /**
     * Renders the Spinner animation as well as the loading text.
     * 
     * @returns {Component} - The Spinner component.
     */
    render() {
        return(
            <div id="Ladebildschirm" className="row justify-content-center text-center p-5">
                <div className="spinner-grow text-info" role="status"></div>
                <h5 className="col-12 p-3">Loading...</h5> 
            </div>  
        )
    }
}

/**
 * @exports Spinner
 */
export default Spinner;