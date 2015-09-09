/**
 * Filters component
 */
(function ($) {
  'use strict';

  var _ = require('_');

  /**
   * @constructor
   */
  function Filters ($outlet) {
    var TMPL = 'tmpl-filters',
      filterSelection = {},
      filters;


    /**
     * Initialize / bind events..
     */
    function init () {
      render();
      bindEvents();
    }

    function deinit() {
      $outlet.off();
    }

    /**
     * Bind view events
     */
    function bindEvents () {
      $outlet.on('change', onStateChange);
    }

    /**
     * Render template
     */
    function render () {
      _.render(TMPL, {filters: filters}, $outlet);
    }

    /**
     * Handles state change
     * @param evt
     */
    function onStateChange(evt) {
      $(this).trigger('state:changed', filterSelection);
    }

    /**
     * Initializes filter state
     * @param fitlerState
     */
    function setState(fitlerState) {
      filters = fitlerState;
      render();
    }

    /**
     * Serializes the Filter state
     * @returns {string}
     */
    function serialize() {
      // TODO implement serialize method
      return '';
    }

    init();

    // public methods
    this.setState = setState;
    this.serialize = serialize;
    this.deinit = deinit;
  }

  exports.Filters = Filters;
}($));

