/**
 * Site Navigation component
 */
(function ($) {
  'use strict';

  var _ = require('_');

  /**
   * @constructor
   */
  function NavView ($outlet) {
    var $actions,
      TMPL = 'tmpl-nav',
      CLASS_SELECTED = 'selected';


    /**
     * Initialize / bind events..
     */
    function init () {
      render();
      $actions = $outlet.find('.app-navbar .nav-actions li a');
      bindEvents();
    }

    function deinit() {
      $actions.off();
    }

    /**
     * Bind view events
     */
    function bindEvents () {
      $actions.on('click', function(evt) {
        $actions.removeClass(CLASS_SELECTED);
        $(evt.target).closest('a').addClass(CLASS_SELECTED);
        // trigger route change
        _.navigateUrl(evt);
      });
    }

    function render () {
      _.render(TMPL, null, $outlet);
    }

    init();

    this.deinit = deinit;
  }

  exports.NavView = NavView;
}($));

