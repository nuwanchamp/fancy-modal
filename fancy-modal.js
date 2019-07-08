(function (factory) {
    typeof define === 'function' && define.amd ? define(factory) :
    factory();
}(function () { 'use strict';

    var fancyHTML = "\n<div class=\"modal fade fm fm-success st-modal-success\" id=\"\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"exampleModalLabel\" >\n    <div class=\"modal-dialog modal-dialog-zoom\" role=\"document\">\n        <div class=\"modal-content border-0\">\t\t\t\t\t\n            <div class=\"modal-header py-0 border-0 pt-1\">\n                <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-lab=\"\" el=\"Close\">\n                    <span aria-hidden=\"true\">\xD7</span>\n                </button>\n            </div>\n            <div class=\"modal-body\">\n                <div class=\"container-fluid\">\n                    <div class=\"row\">\n                        <div class=\"col-sm-3 icon-sector\"> \n                            <div class=\"d-flex align-items-center justify-content-center h-100\">\n                                <div class=\"st-icon d-flex justify-content-center align-items-center rounded-circle\">\n                                    <i class=\"fas fa-check\"></i>\n                                </div>\n                            </div>\n                        </div>\n                        <div class=\"col-sm-9 content-sector\">\n                            <h5>Item Removed</h5>\t\t\t\t\t\t\t\t\n                            <p class=\"text-muted\">Item has Removed from your cart successfully</p>\t\n                        </div>\n                    </div>\n                </div>\n            </div>\n            <div class=\"modal-footer bg-light rounded-bottom mt-4\">\n                <button data-id=\"fm-cancelButton\" id=\"\" type=\"button\" class=\"btn btn-outline-secondary \" data-dismiss=\"modal\">Ok</button>\n            </div>\n        </div>\n    </div>\n</div>\n";

    function _typeof(obj) {
      if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
        _typeof = function (obj) {
          return typeof obj;
        };
      } else {
        _typeof = function (obj) {
          return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
        };
      }

      return _typeof(obj);
    }

    function _classCallCheck(instance, Constructor) {
      if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
      }
    }

    function _defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }

    function _createClass(Constructor, protoProps, staticProps) {
      if (protoProps) _defineProperties(Constructor.prototype, protoProps);
      if (staticProps) _defineProperties(Constructor, staticProps);
      return Constructor;
    }

    function _defineProperty(obj, key, value) {
      if (key in obj) {
        Object.defineProperty(obj, key, {
          value: value,
          enumerable: true,
          configurable: true,
          writable: true
        });
      } else {
        obj[key] = value;
      }

      return obj;
    }

    function _objectSpread2(target) {
      for (var i = 1; i < arguments.length; i++) {
        if (i % 2) {
          var source = arguments[i] != null ? arguments[i] : {};
          var ownKeys = Object.keys(source);

          if (typeof Object.getOwnPropertySymbols === 'function') {
            ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) {
              return Object.getOwnPropertyDescriptor(source, sym).enumerable;
            }));
          }

          ownKeys.forEach(function (key) {
            _defineProperty(target, key, source[key]);
          });
        } else {
          Object.defineProperties(target, Object.getOwnPropertyDescriptors(arguments[i]));
        }
      }

      return target;
    }

    var $ = jQuery;
    /**
     * --------------------------------------------------------------------------
     * Bootstrap (v4.1.0): util.js
     * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
     * --------------------------------------------------------------------------
     */

    var Util = function ($) {
      /**
       * ------------------------------------------------------------------------
       * Private TransitionEnd Helpers
       * ------------------------------------------------------------------------
       */
      var TRANSITION_END = 'transitionend';
      var MAX_UID = 1000000;
      var MILLISECONDS_MULTIPLIER = 1000; // Shoutout AngusCroll (https://goo.gl/pxwQGp)

      function toType(obj) {
        return {}.toString.call(obj).match(/\s([a-z]+)/i)[1].toLowerCase();
      }

      function getSpecialTransitionEndEvent() {
        return {
          bindType: TRANSITION_END,
          delegateType: TRANSITION_END,
          handle: function handle(event) {
            if ($(event.target).is(this)) {
              return event.handleObj.handler.apply(this, arguments); // eslint-disable-line prefer-rest-params
            }

            return undefined; // eslint-disable-line no-undefined
          }
        };
      }

      function transitionEndEmulator(duration) {
        var _this = this;

        var called = false;
        $(this).one(Util.TRANSITION_END, function () {
          called = true;
        });
        setTimeout(function () {
          if (!called) {
            Util.triggerTransitionEnd(_this);
          }
        }, duration);
        return this;
      }

      function setTransitionEndSupport() {
        $.fn.emulateTransitionEnd = transitionEndEmulator;
        $.event.special[Util.TRANSITION_END] = getSpecialTransitionEndEvent();
      }
      /**
       * --------------------------------------------------------------------------
       * Public Util Api
       * --------------------------------------------------------------------------
       */


      var Util = {
        TRANSITION_END: 'bsTransitionEnd',
        getUID: function getUID(prefix) {
          do {
            // eslint-disable-next-line no-bitwise
            prefix += ~~(Math.random() * MAX_UID); // "~~" acts like a faster Math.floor() here
          } while (document.getElementById(prefix));

          return prefix;
        },
        getSelectorFromElement: function getSelectorFromElement(element) {
          var selector = element.getAttribute('data-target');

          if (!selector || selector === '#') {
            selector = element.getAttribute('href') || '';
          }

          try {
            var $selector = $(document).find(selector);
            return $selector.length > 0 ? selector : null;
          } catch (err) {
            return null;
          }
        },
        getTransitionDurationFromElement: function getTransitionDurationFromElement(element) {
          if (!element) {
            return 0;
          } // Get transition-duration of the element


          var transitionDuration = $(element).css('transition-duration');
          var floatTransitionDuration = parseFloat(transitionDuration); // Return 0 if element or transition duration is not found

          if (!floatTransitionDuration) {
            return 0;
          } // If multiple durations are defined, take the first


          transitionDuration = transitionDuration.split(',')[0];
          return parseFloat(transitionDuration) * MILLISECONDS_MULTIPLIER;
        },
        reflow: function reflow(element) {
          return element.offsetHeight;
        },
        triggerTransitionEnd: function triggerTransitionEnd(element) {
          $(element).trigger(TRANSITION_END);
        },
        // TODO: Remove in v5
        supportsTransitionEnd: function supportsTransitionEnd() {
          return Boolean(TRANSITION_END);
        },
        isElement: function isElement(obj) {
          return (obj[0] || obj).nodeType;
        },
        typeCheckConfig: function typeCheckConfig(componentName, config, configTypes) {
          for (var property in configTypes) {
            if (Object.prototype.hasOwnProperty.call(configTypes, property)) {
              var expectedTypes = configTypes[property];
              var value = config[property];
              var valueType = value && Util.isElement(value) ? 'element' : toType(value);

              if (!new RegExp(expectedTypes).test(valueType)) {
                throw new Error("".concat(componentName.toUpperCase(), ": ") + "Option \"".concat(property, "\" provided type \"").concat(valueType, "\" ") + "but expected type \"".concat(expectedTypes, "\"."));
              }
            }
          }
        }
      };
      setTransitionEndSupport();
      return Util;
    }($);

    var $$1 = jQuery;
    /**
     * --------------------------------------------------------------------------
     * Bootstrap (v4.1.0): modal.js
     * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
     * --------------------------------------------------------------------------
     */

    var Modal = function ($) {
      /**
       * ------------------------------------------------------------------------
       * Constants
       * ------------------------------------------------------------------------
       */
      var NAME = 'modal';
      var VERSION = '4.1.0';
      var DATA_KEY = 'bs.modal';
      var EVENT_KEY = ".".concat(DATA_KEY);
      var DATA_API_KEY = '.data-api';
      var JQUERY_NO_CONFLICT = $.fn[NAME];
      var ESCAPE_KEYCODE = 27; // KeyboardEvent.which value for Escape (Esc) key

      var Default = {
        backdrop: true,
        keyboard: true,
        focus: true,
        show: true
      };
      var DefaultType = {
        backdrop: '(boolean|string)',
        keyboard: 'boolean',
        focus: 'boolean',
        show: 'boolean'
      };
      var Event = {
        HIDE: "hide".concat(EVENT_KEY),
        HIDDEN: "hidden".concat(EVENT_KEY),
        SHOW: "show".concat(EVENT_KEY),
        SHOWN: "shown".concat(EVENT_KEY),
        FOCUSIN: "focusin".concat(EVENT_KEY),
        RESIZE: "resize".concat(EVENT_KEY),
        CLICK_DISMISS: "click.dismiss".concat(EVENT_KEY),
        KEYDOWN_DISMISS: "keydown.dismiss".concat(EVENT_KEY),
        MOUSEUP_DISMISS: "mouseup.dismiss".concat(EVENT_KEY),
        MOUSEDOWN_DISMISS: "mousedown.dismiss".concat(EVENT_KEY),
        CLICK_DATA_API: "click".concat(EVENT_KEY).concat(DATA_API_KEY)
      };
      var ClassName = {
        SCROLLBAR_MEASURER: 'modal-scrollbar-measure',
        BACKDROP: 'modal-backdrop',
        OPEN: 'modal-open',
        FADE: 'fade',
        SHOW: 'show'
      };
      var Selector = {
        DIALOG: '.modal-dialog',
        DATA_TOGGLE: '[data-toggle="modal"]',
        DATA_DISMISS: '[data-dismiss="modal"]',
        FIXED_CONTENT: '.fixed-top, .fixed-bottom, .is-fixed, .sticky-top',
        STICKY_CONTENT: '.sticky-top',
        NAVBAR_TOGGLER: '.navbar-toggler'
        /**
         * ------------------------------------------------------------------------
         * Class Definition
         * ------------------------------------------------------------------------
         */

      };

      var Modal =
      /*#__PURE__*/
      function () {
        function Modal(element, config) {
          _classCallCheck(this, Modal);

          this._config = this._getConfig(config);
          this._element = element;
          this._dialog = $(element).find(Selector.DIALOG)[0];
          this._backdrop = null;
          this._isShown = false;
          this._isBodyOverflowing = false;
          this._ignoreBackdropClick = false;
          this._scrollbarWidth = 0;
        } // Getters


        _createClass(Modal, [{
          key: "toggle",
          // Public
          value: function toggle(relatedTarget) {
            return this._isShown ? this.hide() : this.show(relatedTarget);
          }
        }, {
          key: "show",
          value: function show(relatedTarget) {
            var _this = this;

            if (this._isTransitioning || this._isShown) {
              return;
            }

            if ($(this._element).hasClass(ClassName.FADE)) {
              this._isTransitioning = true;
            }

            var showEvent = $.Event(Event.SHOW, {
              relatedTarget: relatedTarget
            });
            $(this._element).trigger(showEvent);

            if (this._isShown || showEvent.isDefaultPrevented()) {
              return;
            }

            this._isShown = true;

            this._checkScrollbar();

            this._setScrollbar();

            this._adjustDialog();

            $(document.body).addClass(ClassName.OPEN);

            this._setEscapeEvent();

            this._setResizeEvent();

            $(this._element).on(Event.CLICK_DISMISS, Selector.DATA_DISMISS, function (event) {
              return _this.hide(event);
            });
            $(this._dialog).on(Event.MOUSEDOWN_DISMISS, function () {
              $(_this._element).one(Event.MOUSEUP_DISMISS, function (event) {
                if ($(event.target).is(_this._element)) {
                  _this._ignoreBackdropClick = true;
                }
              });
            });

            this._showBackdrop(function () {
              return _this._showElement(relatedTarget);
            });
          }
        }, {
          key: "hide",
          value: function hide(event) {
            var _this2 = this;

            if (event) {
              event.preventDefault();
            }

            if (this._isTransitioning || !this._isShown) {
              return;
            }

            var hideEvent = $.Event(Event.HIDE);
            $(this._element).trigger(hideEvent);

            if (!this._isShown || hideEvent.isDefaultPrevented()) {
              return;
            }

            this._isShown = false;
            var transition = $(this._element).hasClass(ClassName.FADE);

            if (transition) {
              this._isTransitioning = true;
            }

            this._setEscapeEvent();

            this._setResizeEvent();

            $(document).off(Event.FOCUSIN);
            $(this._element).removeClass(ClassName.SHOW);
            $(this._element).off(Event.CLICK_DISMISS);
            $(this._dialog).off(Event.MOUSEDOWN_DISMISS);

            if (transition) {
              var transitionDuration = Util.getTransitionDurationFromElement(this._element);
              $(this._element).one(Util.TRANSITION_END, function (event) {
                return _this2._hideModal(event);
              }).emulateTransitionEnd(transitionDuration);
            } else {
              this._hideModal();
            }
          }
        }, {
          key: "dispose",
          value: function dispose() {
            $.removeData(this._element, DATA_KEY);
            $(window, document, this._element, this._backdrop).off(EVENT_KEY);
            this._config = null;
            this._element = null;
            this._dialog = null;
            this._backdrop = null;
            this._isShown = null;
            this._isBodyOverflowing = null;
            this._ignoreBackdropClick = null;
            this._scrollbarWidth = null;
          }
        }, {
          key: "handleUpdate",
          value: function handleUpdate() {
            this._adjustDialog();
          } // Private

        }, {
          key: "_getConfig",
          value: function _getConfig(config) {
            config = _objectSpread2({}, Default, {}, config);
            Util.typeCheckConfig(NAME, config, DefaultType);
            return config;
          }
        }, {
          key: "_showElement",
          value: function _showElement(relatedTarget) {
            var _this3 = this;

            var transition = $(this._element).hasClass(ClassName.FADE);

            if (!this._element[0].parentNode || this._element[0].parentNode.nodeType !== Node.ELEMENT_NODE) {
              // Don't move modal's DOM position
              document.body.appendChild(this._element[0]);
            }

            this._element[0].style.display = 'block';

            this._element[0].removeAttribute('aria-hidden');

            this._element[0].scrollTop = 0;

            if (transition) {
              Util.reflow(this._element[0]);
            }

            $(this._element[0]).addClass(ClassName.SHOW);

            if (this._config.focus) {
              this._enforceFocus();
            }

            var shownEvent = $.Event(Event.SHOWN, {
              relatedTarget: relatedTarget
            });

            var transitionComplete = function transitionComplete() {
              if (_this3._config.focus) {
                _this3._element.focus();
              }

              _this3._isTransitioning = false;
              $(_this3._element).trigger(shownEvent);
            };

            if (transition) {
              var transitionDuration = Util.getTransitionDurationFromElement(this._element);
              $(this._dialog).one(Util.TRANSITION_END, transitionComplete).emulateTransitionEnd(transitionDuration);
            } else {
              transitionComplete();
            }
          }
        }, {
          key: "_enforceFocus",
          value: function _enforceFocus() {
            var _this4 = this;

            $(document).off(Event.FOCUSIN) // Guard against infinite focus loop
            .on(Event.FOCUSIN, function (event) {
              if (document !== event.target && _this4._element !== event.target && $(_this4._element).has(event.target).length === 0) {
                _this4._element.focus();
              }
            });
          }
        }, {
          key: "_setEscapeEvent",
          value: function _setEscapeEvent() {
            var _this5 = this;

            if (this._isShown && this._config.keyboard) {
              $(this._element).on(Event.KEYDOWN_DISMISS, function (event) {
                if (event.which === ESCAPE_KEYCODE) {
                  event.preventDefault();

                  _this5.hide();
                }
              });
            } else if (!this._isShown) {
              $(this._element).off(Event.KEYDOWN_DISMISS);
            }
          }
        }, {
          key: "_setResizeEvent",
          value: function _setResizeEvent() {
            var _this6 = this;

            if (this._isShown) {
              $(window).on(Event.RESIZE, function (event) {
                return _this6.handleUpdate(event);
              });
            } else {
              $(window).off(Event.RESIZE);
            }
          }
        }, {
          key: "_hideModal",
          value: function _hideModal() {
            var _this7 = this;

            this._element[0].style.display = 'none';

            this._element[0].setAttribute('aria-hidden', true);

            this._isTransitioning = false;

            this._showBackdrop(function () {
              $(document.body).removeClass(ClassName.OPEN);

              _this7._resetAdjustments();

              _this7._resetScrollbar();

              $(_this7._element).trigger(Event.HIDDEN);
            });
          }
        }, {
          key: "_removeBackdrop",
          value: function _removeBackdrop() {
            if (this._backdrop) {
              $(this._backdrop).remove();
              this._backdrop = null;
            }
          }
        }, {
          key: "_showBackdrop",
          value: function _showBackdrop(callback) {
            var _this8 = this;

            var animate = $(this._element).hasClass(ClassName.FADE) ? ClassName.FADE : '';

            if (this._isShown && this._config.backdrop) {
              this._backdrop = document.createElement('div');
              this._backdrop.className = ClassName.BACKDROP;

              if (animate) {
                $(this._backdrop).addClass(animate);
              }

              $(this._backdrop).appendTo(document.body);
              $(this._element).on(Event.CLICK_DISMISS, function (event) {
                if (_this8._ignoreBackdropClick) {
                  _this8._ignoreBackdropClick = false;
                  return;
                }

                if (event.target !== event.currentTarget) {
                  return;
                }

                if (_this8._config.backdrop === 'static') {
                  _this8._element.focus();
                } else {
                  _this8.hide();
                }
              });

              if (animate) {
                Util.reflow(this._backdrop);
              }

              $(this._backdrop).addClass(ClassName.SHOW);

              if (!callback) {
                return;
              }

              if (!animate) {
                callback();
                return;
              }

              var backdropTransitionDuration = Util.getTransitionDurationFromElement(this._backdrop);
              $(this._backdrop).one(Util.TRANSITION_END, callback).emulateTransitionEnd(backdropTransitionDuration);
            } else if (!this._isShown && this._backdrop) {
              $(this._backdrop).removeClass(ClassName.SHOW);

              var callbackRemove = function callbackRemove() {
                _this8._removeBackdrop();

                if (callback) {
                  callback();
                }
              };

              if ($(this._element).hasClass(ClassName.FADE)) {
                var _backdropTransitionDuration = Util.getTransitionDurationFromElement(this._backdrop);

                $(this._backdrop).one(Util.TRANSITION_END, callbackRemove).emulateTransitionEnd(_backdropTransitionDuration);
              } else {
                callbackRemove();
              }
            } else if (callback) {
              callback();
            }
          } // ----------------------------------------------------------------------
          // the following methods are used to handle overflowing modals
          // todo (fat): these should probably be refactored out of modal.js
          // ----------------------------------------------------------------------

        }, {
          key: "_adjustDialog",
          value: function _adjustDialog() {
            var isModalOverflowing = this._element.scrollHeight > document.documentElement.clientHeight;

            if (!this._isBodyOverflowing && isModalOverflowing) {
              this._element.style.paddingLeft = "".concat(this._scrollbarWidth, "px");
            }

            if (this._isBodyOverflowing && !isModalOverflowing) {
              this._element.style.paddingRight = "".concat(this._scrollbarWidth, "px");
            }
          }
        }, {
          key: "_resetAdjustments",
          value: function _resetAdjustments() {
            this._element[0].style.paddingLeft = '';
            this._element[0].style.paddingRight = '';
          }
        }, {
          key: "_checkScrollbar",
          value: function _checkScrollbar() {
            var rect = document.body.getBoundingClientRect();
            this._isBodyOverflowing = rect.left + rect.right < window.innerWidth;
            this._scrollbarWidth = this._getScrollbarWidth();
          }
        }, {
          key: "_setScrollbar",
          value: function _setScrollbar() {
            var _this9 = this;

            if (this._isBodyOverflowing) {
              // Note: DOMNode.style.paddingRight returns the actual value or '' if not set
              //   while $(DOMNode).css('padding-right') returns the calculated value or 0 if not set
              // Adjust fixed content padding
              $(Selector.FIXED_CONTENT).each(function (index, element) {
                var actualPadding = $(element)[0].style.paddingRight;
                var calculatedPadding = $(element).css('padding-right');
                $(element).data('padding-right', actualPadding).css('padding-right', "".concat(parseFloat(calculatedPadding) + _this9._scrollbarWidth, "px"));
              }); // Adjust sticky content margin

              $(Selector.STICKY_CONTENT).each(function (index, element) {
                var actualMargin = $(element)[0].style.marginRight;
                var calculatedMargin = $(element).css('margin-right');
                $(element).data('margin-right', actualMargin).css('margin-right', "".concat(parseFloat(calculatedMargin) - _this9._scrollbarWidth, "px"));
              }); // Adjust navbar-toggler margin

              $(Selector.NAVBAR_TOGGLER).each(function (index, element) {
                var actualMargin = $(element)[0].style.marginRight;
                var calculatedMargin = $(element).css('margin-right');
                $(element).data('margin-right', actualMargin).css('margin-right', "".concat(parseFloat(calculatedMargin) + _this9._scrollbarWidth, "px"));
              }); // Adjust body padding

              var actualPadding = document.body.style.paddingRight;
              var calculatedPadding = $(document.body).css('padding-right');
              $(document.body).data('padding-right', actualPadding).css('padding-right', "".concat(parseFloat(calculatedPadding) + this._scrollbarWidth, "px"));
            }
          }
        }, {
          key: "_resetScrollbar",
          value: function _resetScrollbar() {
            // Restore fixed content padding
            $(Selector.FIXED_CONTENT).each(function (index, element) {
              var padding = $(element).data('padding-right');

              if (typeof padding !== 'undefined') {
                $(element).css('padding-right', padding).removeData('padding-right');
              }
            }); // Restore sticky content and navbar-toggler margin

            $("".concat(Selector.STICKY_CONTENT, ", ").concat(Selector.NAVBAR_TOGGLER)).each(function (index, element) {
              var margin = $(element).data('margin-right');

              if (typeof margin !== 'undefined') {
                $(element).css('margin-right', margin).removeData('margin-right');
              }
            }); // Restore body padding

            var padding = $(document.body).data('padding-right');

            if (typeof padding !== 'undefined') {
              $(document.body).css('padding-right', padding).removeData('padding-right');
            }
          }
        }, {
          key: "_getScrollbarWidth",
          value: function _getScrollbarWidth() {
            // thx d.walsh
            var scrollDiv = document.createElement('div');
            scrollDiv.className = ClassName.SCROLLBAR_MEASURER;
            document.body.appendChild(scrollDiv);
            var scrollbarWidth = scrollDiv.getBoundingClientRect().width - scrollDiv.clientWidth;
            document.body.removeChild(scrollDiv);
            return scrollbarWidth;
          } // Static

        }], [{
          key: "_jQueryInterface",
          value: function _jQueryInterface(config, relatedTarget) {
            return this.each(function () {
              var data = $(this).data(DATA_KEY);

              var _config = _objectSpread2({}, Modal.Default, {}, $(this).data(), {}, _typeof(config) === 'object' && config);

              if (!data) {
                data = new Modal(this, _config);
                $(this).data(DATA_KEY, data);
              }

              if (typeof config === 'string') {
                if (typeof data[config] === 'undefined') {
                  throw new TypeError("No method named \"".concat(config, "\""));
                }

                data[config](relatedTarget);
              } else if (_config.show) {
                data.show(relatedTarget);
              }
            });
          }
        }, {
          key: "VERSION",
          get: function get() {
            return VERSION;
          }
        }, {
          key: "Default",
          get: function get() {
            return Default;
          }
        }]);

        return Modal;
      }();
      /**
       * ------------------------------------------------------------------------
       * Data Api implementation
       * ------------------------------------------------------------------------
       */


      $(document).on(Event.CLICK_DATA_API, Selector.DATA_TOGGLE, function (event) {
        var _this10 = this;

        var target;
        var selector = Util.getSelectorFromElement(this);

        if (selector) {
          target = $(selector)[0];
        }

        var config = $(target).data(DATA_KEY) ? 'toggle' : _objectSpread2({}, $(target).data(), {}, $(this).data());

        if (this.tagName === 'A' || this.tagName === 'AREA') {
          event.preventDefault();
        }

        var $target = $(target).one(Event.SHOW, function (showEvent) {
          if (showEvent.isDefaultPrevented()) {
            // Only register focus restorer if modal will actually get shown
            return;
          }

          $target.one(Event.HIDDEN, function () {
            if ($(_this10).is(':visible')) {
              _this10.focus();
            }
          });
        });

        Modal._jQueryInterface.call($(target), config, this);
      });
      /**
       * ------------------------------------------------------------------------
       * jQuery
       * ------------------------------------------------------------------------
       */
      // $.fn[NAME] = Modal._jQueryInterface
      // $.fn[NAME].Constructor = Modal
      // $.fn[NAME].noConflict = function () {
      //   $.fn[NAME] = JQUERY_NO_CONFLICT
      //   return Modal._jQueryInterface
      // }

      return Modal;
    }($$1);

    function Fancymodal(title, text) {
      this.title = title;
      this.text = text;
      this.init();
    }

    Fancymodal.prototype = {
      constructor: Fancymodal,
      init: function init() {
        if (typeof jQuery === 'undefined') {
          console.error('Fancymodal: dependency (jQuery) not found.');
          return;
        }

        jQuery('body').append(fancyHTML);
        var bs_modal = new Modal(jQuery('.modal'));
        bs_modal.show();
      }
    };

    function famo(title, text) {
      return new Fancymodal(title, text);
    }

    famo('hello', 'world');

}));
