/**
 * Catrancher app
 */
(function ($) {
  'use strict';


  var _ = require('_'),
    NavView = require('NavView'),
    Router = require('Router'),

    SEL_APP_OUTLET = '#app-outlet',
    SEL_NAV_OUTLET = '#navigation';

  /**
   * @constructor
   */
  function App() {
    var $outlet = $(SEL_APP_OUTLET),
      self = {};


    /**
     * initialize the app
     */
    function init() {
      new Router($outlet);
      new NavView($(SEL_NAV_OUTLET));
    }

    self.init = init;

    return self;
  }

  exports.App = App;
}($));

// Start the app
var App = require('App');
window.addEventListener('load', function () {
  var app = new App();
  app.init();
});
