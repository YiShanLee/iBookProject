import React, {Component} from "react";
import AddBook from "./AddBook";
import Noticiation from "./Notification";
import BookDetail from "./BookDetail";
import BookList from "./BookListComponent/BookList";
import Nav from "./Nav";
import NotFound from "./NotFound";
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom"

/**
 * @class Main - Represents the different sites which can be reached via routing.
 * @extends Component
 */
class Main extends Component {

  /**
   * Renders the navbar and the view depending on the route.
   */
  render() {
    return ( 
      <Router>
        <Nav/> 
        <Noticiation/>
          <Switch>
            <Route exact path="/"><Redirect to="/booklist"/></Route>
            <Route exact path="/addbook" component={AddBook}/>
            <Route exact path="/booklist" component={BookList}/>
            <Route path="/bookdetail/:isbn" component={BookDetail}/>
            <Route  component={NotFound}/>
          </Switch>
      </Router>
    );
  }
}

/**
 * @exports Main
 */
export default Main;