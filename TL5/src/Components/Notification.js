import React, {Component} from "react";
import {toast} from "react-toastify";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../Toast.css"

/** 
 * @class  Notification - Represents a warning or success popup that appears either when user made wrong inputs in the 
 * AddBook View or when users added a book successfully. 
 * @extends Component 
 */
class Notification extends Component {
    
  /**
   * Displays a message box with a warning message to the user. 
   * 
   * @param {string} message - The message to be displayed to the user.
   */
    showWarning(message) {
      toast.warn(message, {
        className: "alert-warning"
      })
    }

    /**
     * Displays a message box with a success message to the user.
     * 
     * @param {string} message - The message to be displayed to the user.
     */
    showSuccess(message) {
      toast.success(message, {
      className: "alert-success"
      })
    }
   
    
    /**
     * Renders the popup message. 
     * 
     * @returns {Component} - The Notification component.
     */
    render(){
      return (
        <div>
          <ToastContainer position="top-right" autoClose={3000}/>
        </div>
      )
    }
}

/**
 * @exports Notification
 */
export default Notification;
