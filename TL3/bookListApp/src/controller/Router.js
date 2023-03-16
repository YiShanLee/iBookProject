import {NotFound} from "../view/NotFound"
import {NavUpdater} from "../userInterface/NavUpdater"


class Router {
  constructor() {
    this.routes = [];
    this.notFoundView = new NotFound();
    this.navUpdater = new NavUpdater();

    window.onhashchange = () => {
      this.determineCurrentRouteAndExecuteCallback();
    };
  }


  determineCurrentRouteAndExecuteCallback() {
    const hash = location.hash;

    if (hash === "") {
      location.hash = "#/books";
      location.reload();
    }

    let foundRouteObject;
    
    this.routes.forEach(routeItem => {
      const routeObject = routeItem;
      if (hash.includes(routeObject.route)) {
        foundRouteObject = routeObject;
      }
    });

    if (foundRouteObject) {
      foundRouteObject.callback(); //?? was macht das 
      this.navUpdater.updateActiveInNav(hash);
    } else {
      this.notFoundView.renderView();
    }
  }

  

  addRoute(route, callback) {
    this.routes.push({ route, callback });
  }

}

export {Router};