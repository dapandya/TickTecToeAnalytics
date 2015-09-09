/**
 * Game View
 */
(function ($) {
  'use strict';

  var _ = require('_'),
    Filters = require('Filters'),
    DataCache = require('DataCache');

  /**
   * @constructor
   */
  function GameView ($outlet) {
    var TMPL_GAME_ROWS = 'tmpl-gameView',
      URL_GAME = '/api/games?id';

    /**
     * Initialize / bind events..
     */
    function init () {
      render();
      bindEvents();
    }

    /**
     * Bind events
     */
    function bindEvents () {
      $outlet.on('click', '[data-href]', function(evt) {
        _.navigateUrl(evt, $(evt.target).closest('[data-href]').data('href'));
      });
    }

    /**
     * Fetches game data
     * @returns {*}
     */
    function fetchGames() {
      return DataCache().get(URL_GAME);
    }

    /**
     * Renders game view
     */
    function render() {
      fetchGames().then(function(data) {
        _.render(TMPL_GAME_ROWS, data, $outlet);
      });
    }

    /**
     * no opp for now.
     * Do deinit here
     */
    function deinit() {
    }

    this.init = init;
    this.deinit = deinit;
  }

  exports.GameView = GameView;
}($));

