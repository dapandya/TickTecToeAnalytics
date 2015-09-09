/**
 * App Router: Similar behavior to common mvc framework routers (like backbonejs Router)
 * Executes a related view based on App Route change
 */
(function ($) {

  var _ = require('_'),

    MainView = require('MainView'),
    PlayerView = require('PlayerView'),
    GameView = require('GameView'),
    currentActiveView,
    EVENT_ROUTE_CHANGE = 'route:change';

  /**
   * @constructor
   */
  function Router($outlet) {
    var routes = {
      'games': mainView,
      'default': mainView,
      'players': playersView,
      'player': playerView,
      'game': gameView,
      'me': playerView,
      'settings': settingsView,
      '*': _404View
    }

    /**
     * Renders MainView
     * @param params
     */
    function mainView(params) {
      currentActiveView = new MainView($outlet, params);
      currentActiveView.init();
    }

    function gameView(params) {
      currentActiveView = new GameView($outlet, params);
      currentActiveView.init();
    }

    function playersView() {
      _noView();
    }

    function playerView(params) {
      currentActiveView = new PlayerView($outlet, params);
      currentActiveView.init();
    }

    function meView() {
      _noView();
    }

    function settingsView() {
      _noView();
    }


    /**
     * Renders 404 page
     * @param params
     * @private
     */
    function _404View(params) {
      _.render('tmpl-404View', {message: '404: page not found!'}, $outlet);
      currentActiveView = null;
    }

    /**
     * Not implemented yet
     * @param params
     * @private
     */
    function _noView() {
      _.render('tmpl-404View', {message: 'Not Implemented yet!'}, $outlet);
      currentActiveView = null;
    }

    /**
     * Hook for postRoute Change
     */
    function postRouteChange() {
      // intentionally left blank
      // add needed code here.. tracking?
    }

    /**
     * Hook for preRoute Change
     */
    function preRouteChange() {
      if(currentActiveView) {
        // deinitialize the last active view
        currentActiveView.deinit();
      }
    }

    /**
     * Handles route change.
     * Will try to match route or else fallback to 404
     * @param evt
     */
    function handleRouteChange(evt) {
      var params = _.getSearchParams(),
        page = params.page,
        pageFunction = routes[page];


      preRouteChange();

      if(!page) {
        // render default route
        routes.default(params);
      } else if(!pageFunction) {
        // did not find any matching route.. render 404 route
        _404View(params);
      } else {
        pageFunction(params);
      }

      postRouteChange();
    }

    /**
     * Initialize the router
     */
    function init () {
      // bind events
      _.eventBus.on(EVENT_ROUTE_CHANGE, handleRouteChange);
      window.onpopstate = handleRouteChange;

      // trigger route handle
      handleRouteChange();
    }

    // init
    init();
  }

  exports.Router = Router;

}($));