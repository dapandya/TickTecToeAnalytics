/**
 * Base view: All views / controllers should inherit from
 */
(function ($) {
  'use strict';

  /**
   * @constructor
   */
  function BaseView () {
  }

  /**
   * Deinitialize all the subviews
   */
  BaseView.prototype.deinit = function () {
    this.views.forEach(function(view) {
      view.deinit();
    });
  };

  exports.BaseView = BaseView;
}($));

