/**
 * Main view / Games view
 */
(function ($) {
  'use strict';

  var _ = require('_'),
    Filters = require('Filters'),
    DataCache = require('DataCache');

  /**
   * @constructor
   */
  function MainView ($outlet) {
    var TMPL = 'tmpl-mainView',
      TMPL_GAME_ROWS = 'tmpl-gameRows',
      SEL_CONTENT = '.view-content',
      SEL_FILTERS = '.view-filters',
      subViews = {},
      URL_GAMES = '/api/games?$filterState$',
      URL_FILTERS = '/api/common';

    /**
     * Initialize / bind events..
     */
    function init () {
      render();
      initializeFilterComp();

      bindEvents();
      renderGames();
    }

    /**
     * Fetches game data
     * @returns {*}
     */
    function fetchGames() {
      var url = URL_GAMES.replace('$filterState$', subViews.filtersComp.serialize());
      return DataCache().get(url);
    }

    /**
     * Renders Games
     */
    function renderGames() {
      fetchGames().then(function(data) {
        _.render(TMPL_GAME_ROWS, {games: data}, $outlet.find(SEL_CONTENT).first());
      });
    }

    /**
     * Initializes the filter comp
     */
    function initializeFilterComp() {
      subViews.filtersComp = new Filters($outlet.find(SEL_FILTERS).first());

      DataCache().get(URL_FILTERS).then(function(data) {
        subViews.filtersComp.setState(data);
      });
    }


    function deinit() {
      $(subViews.filtersComp).off();
    }

    /**
     * Bind view events
     */
    function bindEvents () {
      $(subViews.filtersComp).on('state:changed', renderGames);

      $outlet.find(SEL_CONTENT).on('click', '[data-href]', function(evt) {
        _.navigateUrl(evt, $(evt.target).closest('[data-href]').data('href'));
      });
    }

    function render () {
      _.render(TMPL, null, $outlet);
    }

    this.init = init;
    this.deinit = deinit;
  }

  exports.MainView = MainView;
}($));

