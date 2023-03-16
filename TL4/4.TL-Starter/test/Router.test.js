import Router from "../src/controller/Router";
import NotFound from "../src/view/NotFound";
import NavUpdater from "../src/userInterface/NavUpdater";

jest.mock("../src/view/NotFound");
jest.mock("../src/userInterface/NavUpdater");

describe("Router test suite", () => {
    beforeEach(() => {
        NotFound.mockClear();
        NavUpdater.mockClear();
    })

    //Zeile 5 - 15
    test("initialisation of Router calls constructor of NotFound once", () => {
        //given + when
        const router = new Router();
        //then
        expect(NotFound).toHaveBeenCalledTimes(1);
    })

    test("initialisation of Router calls constructor of NavUpdater once", () => {
        //given + when
        const router = new Router();
        //then
        expect(NavUpdater).toHaveBeenCalledTimes(1);
    })

    //Zeile 16 - 39
    test("method determineCurrentRouteAndExecuteCallback of Router is called if hash changes occur once", () => {
        //given
        const router = new Router();
        router.determineCurrentRouteAndExecuteCallback = jest.fn();
        //when
        window.onhashchange();
        //then
        expect(router.determineCurrentRouteAndExecuteCallback).toHaveBeenCalledTimes(1);
    })

    test("routes in Router instance are empty upon initialisation of router", () => {
        //given + when
        const router = new Router();
        //then
        expect(router.routes.length).toBe(0);
    })

    // testen von determineCurrentRouteAndExecuteCallback (lines 16 - 38)
    test("hash in location is replaced with books hash if empty upon calling determineCurrentRouteAndExecuteCallback", () => {
        //given
        location.hash = "";
        const router = new Router();
        //when
        router.determineCurrentRouteAndExecuteCallback();
        //then
        expect(location.hash).toEqual("#/books");
    });

    test("hash in location is not changed if valid upon calling determineCurrentRouteAndExecuteCallback", () => {
        //given
        location.hash = "#/details";
        const router = new Router();
        //when
        router.determineCurrentRouteAndExecuteCallback();
        //then
        expect(location.hash).toEqual("#/details");
    });

    test("hash in location is not changed if unvalid upon calling determineCurrentRouteAndExecuteCallback", () => {
        //given
        location.hash = "#/undefinedHash";
        const router = new Router();
        //when
        router.determineCurrentRouteAndExecuteCallback();
        //then
        expect(location.hash).toEqual("#/undefinedHash");
    });

    test("navUpdater in Router calls updateActiveInNav if determineCurrentRouteAndExecuteCallback is called once", () => { //TODO
        //given
        location.hash = "#/books";
        const router = new Router();
        router.addRoute("#/books", jest.fn());      
        const mockNavUpdaterInstance = NavUpdater.mock.instances[0];
        const mockUpdateActiveInNav = mockNavUpdaterInstance.updateActiveInNav;
        //when
        router.determineCurrentRouteAndExecuteCallback();       
        //then
        expect(mockUpdateActiveInNav).toHaveBeenCalledTimes(1);
    })

    test("notFoundView is rendered once in Router if the foundRouteObject is invalid", () => {
        //given
        const router = new Router();
        const mockNotFoundViewInstance = NotFound.mock.instances[0];
        const mockRenderView = mockNotFoundViewInstance.renderView;
        //when
        router.determineCurrentRouteAndExecuteCallback();        
        //then
        expect(mockRenderView).toHaveBeenCalledTimes(1);
    })

    // testen von addRoute (lines 40 - 43)
    test("routes in Router contain a route if it has previously been pushed on it", () => {
        //given
        const router = new Router();
        const routeToBePushed = "aRoute";
        const callBackToBePushed = jest.fn();
        const expectedObject = {
            "route": routeToBePushed,
            "callback": callBackToBePushed
        };
        //when
        router.addRoute(routeToBePushed, callBackToBePushed);        
        //then
        expect(router.routes).toContainEqual(expectedObject);
    });

    test("length of routes array in Router increases by 1 if a new route is pushed on it", () => {
       //given
        const router = new Router();
        const lengthOfRouteArray = router.routes.length;
        // when
        router.addRoute("aRoute", jest.fn());
        // then
        expect(router.routes.length).toBe(lengthOfRouteArray + 1);
    });
});