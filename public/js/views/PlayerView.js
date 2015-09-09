/**
 * Player view
 */
(function ($) {
  'use strict';

  var _ = require('_'),
    Filters = require('Filters'),
    DataCache = require('DataCache');

  /**
   * @constructor
   */
  function PlayerView ($outlet) {
    var $actions,
      TMPL = 'tmpl-playerView',
      TMPL_GAME_ROWS = 'tmpl-gameRows',
      TMPL_PROFILE_INFO = 'tmpl-profileInfo',
      SEL_GAME_INFO = '.games-info',
      SEL_PROFILE_INFO = '.profile-info',
      SEL_FILTERS = '.view-filters',
      subViews = {},
      URL_PLAYER = '/api/players?id',
      URL_FILTERS = '/api/common';

    /**
     * Initialize / bind events..
     */
    function init () {
      render();
      bindEvents();
      renderPlayerView();
    }

    function fetchPlayer() {
      var params = _.getSearchParams();
        //url = URL_PLAYER.replace('$filterState$', subViews.filtersComp.serialize()).replace('$playerId$', ''/*params.id*/);
      return DataCache().get(URL_PLAYER);
    }

    function renderPlayerView() {
      fetchPlayer().then(function(data) {
        _.render(TMPL_GAME_ROWS, {games: data.games}, $outlet.find(SEL_GAME_INFO).first());
        _.render(TMPL_PROFILE_INFO, data.profile, $outlet.find(SEL_PROFILE_INFO).first());
      });
    }

    function deinit() {
    }

    /**
     * Bind view events
     */
    function bindEvents () {
      $outlet.find(SEL_GAME_INFO).on('click', '[data-href]', function(evt) {
        _.navigateUrl(evt, $(evt.target).closest('[data-href]').data('href'));
      });
    }

    function render () {
      _.render(TMPL, null, $outlet);
    }

    this.init = init;
    this.deinit = deinit;
  }

  exports.PlayerView = PlayerView;
}($));

