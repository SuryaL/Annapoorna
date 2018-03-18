
import './popup.scss';
import './popup.default.scss';

/**
 * Popup - Popup Dialog
 */
let PopupProvider = function () {
  var defaults = this.defaults = {
    templateUrl: '',
    template: '<div></div>',
    resolve: {},
    controller: '',
    scope: '',
    showCloseButton: true,
    closeOnEscape: true,
    closeOnOverlayClick: true,
    overlay: true,
    themeClass: '',
    openingClass: 'stax-popup-content-opening',
    closingClass: 'stax-popup-content-closing',
    openingOverlayClass: 'stax-popup-overlay-opening',
    closingOverlayClass: 'stax-popup-overlay-closing',
    bodyClass: 'stax-popup-open',
    skipStack : false
  };

  /**
   * [setDefaults overriding defaults]
   * @param {[Object]} options [new defaults]
   */
  this.setDefaults = function(options) {
    angular.extend(this.defaults, options);
  };

  this.$get = function($controller, $timeout, $rootScope, $injector, $compile, $window, $document, $q) {
    'ngInject'
    var modalCounter = 0;
    var incrementalId = 0;
    var isClosing = false;
    var style = (document.body || document.documentElement).style;
    var animationEndSupport = angular.isDefined(style.animation) || angular.isDefined(style.WebkitAnimation) || angular.isDefined(style.MozAnimation) || angular.isDefined(style.MsAnimation) || angular.isDefined(style.OAnimation);
    var animationEndEvent = 'animationend webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend';
    var $body = angular.element(document).find('body');
    var $html = angular.element(document).find('html');
    var stack = [];

    function onKeydown(event) {
      if (event.keyCode === 27) {
        close();
      }
    }

    function getScrollBarWidth() {
      var scrollDiv = document.createElement('div');
      scrollDiv.style.cssText = 'width: 99px; height: 99px; overflow: scroll; position: absolute; top: -9999px;';
      document.body.appendChild(scrollDiv);
      var size = scrollDiv.offsetWidth - scrollDiv.clientWidth;
      document.body.removeChild(scrollDiv);
      return size;
    }

    function hasScrollbars() {
      return $body[0].scrollHeight > $window.innerHeight;
    }

    function getTemplatePromise(options) {
      var deferred = $q.defer();
      deferred.resolve(options.template);
      return deferred.promise;
    }

    function getResolvePromises(resolves) {
      var promisesArr = [];
      angular.forEach(resolves, function(value) {
        promisesArr.push($q.when($injector.invoke(value)));
      });
      return promisesArr;
    }

    function showCleanUp ($modal) {
      var elementId = $modal.attr('id');
      $rootScope.$emit('$popup.shown', elementId);
      $rootScope.$emit('$popup.shown.'+elementId, elementId);
    }

    function showModal (modal) {
      var $modal = angular.element(modal);
      var options = $modal.data('options');
      if (animationEndSupport) {
        var content = angular.element(modal.children[0]);

        $modal.removeClass ('hidden')
        if (options.overlay) {
          var overlay = angular.element(modal.children[0]);
          overlay.removeClass(options.closingOverlayClass).addClass(options.openingOverlayClass);
          content = angular.element(modal.children[1]);
        }
        content.unbind(animationEndEvent).bind(animationEndEvent, function() {
          showCleanUp($modal);
        }).removeClass(options.closingClass).addClass(options.openingClass);
      } else {
        showCleanUp($modal);
      }
    }

    function showAll () {
      var modals = document.querySelectorAll('.stax-popup.hidden');
      angular.forEach (modals, function (modal) {
        showModal(modal);
      });
    }

    function hideCleanUp ($modal) {
      var elementId = $modal.attr('id');
      var options = $modal.data('options');
      isClosing = false;
      if (modalCounter === 0) {
        $body.removeClass(options.bodyClass);
        $html.css('margin-right', '');
      }
      $rootScope.$emit('$popup.hidden', elementId);
      $rootScope.$emit('$popup.hidden.'+elementId, elementId);
    }

    function hideModal (modal) {
      var $modal = angular.element(modal);
      var options = $modal.data('options');
      isClosing = true;

      if (animationEndSupport) {
        var content = angular.element(modal.children[0]);
        if (options.overlay) {
          var overlay = angular.element(modal.children[0]);
          overlay.addClass(options.closingOverlayClass);
          content = angular.element(modal.children[1]);
        }
        content.unbind(animationEndEvent).bind(animationEndEvent, function() {
          $modal.addClass('hidden');
          hideCleanUp($modal);
        }).removeClass(options.openingClass).addClass(options.closingClass);
      } else {
        hideCleanUp($modal);
      }
    }

    function hideAll () {
      var modals = document.querySelectorAll('.stax-popup');
      angular.forEach (modals, function (modal) {
        hideModal(modal);
      });
    }

    function cleanUp($modal, data, correct) {
      var elementId = $modal.attr('id');
      var options = $modal.data('options');
      $modal.scope().$destroy();
      $modal.remove();
      isClosing = false;
      if (modalCounter === 0) {
        $body.removeClass(options.bodyClass);
        $html.css('margin-right', '');
      }
      $rootScope.$emit('$popup.closed', elementId);
      $rootScope.$emit('$popup.closed.'+elementId, data, correct);
    }

    function closeModal(modal, data, correct) {
      var $modal = angular.element(modal);
      var options = $modal.data('options');
      isClosing = true;
      $modal.unbind('click');

      if (modalCounter === 1) {
        $document.unbind('keydown');
      }

      modalCounter -= 1;

      if (animationEndSupport) {
        var content = angular.element(modal.children[0]);
        if (options.overlay) {
          var overlay = angular.element(modal.children[0]);
          overlay.addClass(options.closingOverlayClass);
          content = angular.element(modal.children[1]);
        }
        content.unbind(animationEndEvent).bind(animationEndEvent, function() {
          content.remove();
          cleanUp($modal, data, correct);
        }).removeClass(options.openingClass).addClass(options.closingClass);
      } else {
        cleanUp($modal, data, correct);
      }
    }

    function closeAll(data, correct) {
      var modals = document.querySelectorAll('.stax-popup');
      angular.forEach(modals, function(modal) {
        closeModal(modal, data, correct);
      });
    }

    // public API

    /**
     * open a modal
     * @param  {[object]} opts [modal params]
     * @return Promise
     */
    function open(opts) {

      function closeByAction(event) {
        var overlay = angular.element(event.target).hasClass('stax-popup-overlay');
        var closeBtn = angular.element(event.target).hasClass('stax-popup-close');

        if ((overlay && options.closeOnOverlayClick) || closeBtn) {
          close(null, modal.attr('id'), false);
        }
      }

      function execOpen($modal) {
        var defer = $q.defer();
        var htmlTemplate;
        getTemplatePromise(options).then(function(template) {
          htmlTemplate = template;
          return $q.all(getResolvePromises(options.resolve));
        }).then(function(locals) {
          if (!isClosing) {
            var data = {};
            var resolveCounter = 0;
            var ctrl;
            angular.forEach(options.resolve, function(value, key) {
              data[key] = locals[resolveCounter];
              resolveCounter += 1;
            });
            scope.$modal = $modal;
            data.$scope = scope;
            if (options.controller) {
              ctrl = $controller(options.controller, data);
            }
            contentData.append($compile(htmlTemplate)(scope));
            $rootScope.$emit('$popup.opened', modal);
            defer.resolve();
          } else {
            defer.reject();
          }
        }).catch((err)=>{
            defer.reject(err);
        });
        return defer.promise;
      }

      var options = angular.copy(defaults);
      opts = opts || {};
      angular.extend(options, opts);
      modalCounter += 1;
      incrementalId += 1;

      $body.addClass(options.bodyClass);

      if (hasScrollbars()) {
        $html.css('margin-right', getScrollBarWidth() + 'px');
      }

      var scope = (options.scope || $rootScope).$new();
      var modal = angular.element('<div id="popup-' + incrementalId + '" class="stax-popup"></div>').addClass(options.themeClass);
      modal.data('options', options);
      var content = angular.element('<div>').addClass('stax-popup-content');

      if (options.showCloseButton) {
        var closeButton = angular.element('<div>').addClass('stax-popup-close');
        content.append(closeButton);
      }

      if (options.closeOnEscape) {
        $document.bind('keydown', onKeydown);
      }

      var contentData = angular.element('<div>').addClass('stax-popup-data');

      if (options.overlay) {
        var overlay = angular.element('<div>').addClass('stax-popup-overlay').addClass(options.openingOverlayClass);
        modal.append(overlay);
      }

      content.append(contentData);
      content.addClass(options.openingClass);

      modal.bind('click', closeByAction);
      modal.append(content);
      $body.append($compile(modal)(scope));
      var id = 'popup-'+incrementalId;
      var $modal = {
        id: id,
        cancel: function() {
          return $q(function (resolve, reject) {
            close (null, id, false);
            $rootScope.$on ('$popup.closed.' + id, function (event, data, correct) {
              if (!correct) {
                resolve ();
              } else {
                reject (data);
              }
            });
          });
        },
        canceled: function() {
          return $q(function (resolve, reject) {
            $rootScope.$on ('$popup.closed.' + id, function (event, data, correct) {
              if (!correct) {
                resolve ();
              } else {
                reject (data);
              }
            });
          });
        },
        close: function(data) {
          return $q(function (resolve, reject) {
            close (data, id, true);
            $rootScope.$on ('$popup.closed.' + id, function (event, data, correct) {
              if (correct) {
                resolve (data);
              } else {
                reject ();
              }
            });
          });
        },
        closed: function(data) {
          return $q(function (resolve, reject) {
            $rootScope.$on ('$popup.closed.' + id, function (event, data, correct) {
              resolve (data);
            });
          });
        },
        hide: function () {
          return $q(function (resolve, reject){
            hide (id);
            $rootScope.$on ('$popup.hidden.' + id, function (event, id) {
              resolve (id);
            });
          });
        },
        hidden: function () {
          return $q(function (resolve, reject){
            $rootScope.$on ('$popup.hidden.' + id, function (event, id) {
              resolve (id);
            });
          });
        },
        show: function () {
          return $q(function (resolve, reject){
            show (id);
            $rootScope.$on ('$popup.shown.' + id, function (event, id) {
              resolve (id);
            });
          });
        },
        shown: function () {
          return $q(function (resolve, reject){
            $rootScope.$on ('$popup.shown.' + id, function (event, id) {
              resolve (id);
            });
          });
        },
        result: function () {
          return $q(function (resolve, reject){
            $rootScope.$on ('$popup.closed.' + id, function (event, data, correct) {
              if (correct) {
                resolve (data);
              } else {
                reject ();
              }
            });
          });
        }
      };

      // open the dialog
      var openPromise = execOpen($modal);
      var opened = angular.extend({
        opened: function () { return openPromise; }
      }, $modal);
      if (!options.skipStack) {
        stack.push(opened);
      }
      return opened;
    }

    /**
     * close
     * @param  {Object} data some data to be closed and force a resolve
     * @param  {Number} id the id of the modal to be closed
     * @param  {Object} correct was closed by success close and not cancel
     */
    function close(data, id, correct) {
      var modal = document.getElementById(id);
      if (modal) {
        closeModal(modal, data, correct);
      } else {
        closeAll(data, correct);
      }
    }

    /**
     * hide hide a specific modal otherwise hide all opened
     * @param  {Number} id the id of the modal to be hidden
     */
    function hide(id) {
      var modal = document.getElementById(id);
      if (modal) {
        hideModal (modal);
      } else {
        hideAll();
      }
    }

    /**
     * show show a specific modal otherwise show all
     * @param  {[type]} id [description]
     * @return {[type]}    [description]
     */
    function show(id) {
      var modal = document.getElementById(id);
      if (modal) {
        showModal (modal);
      } else {
        showAll();
      }
    }

    /**
     * hasOpened the page has opened modals
     * @return {Boolean} currently has some dialogs open
     */
    function hasOpened () {
      return document.querySelectorAll('.stax-popup').length > 0;
    }

    return {
      hasOpened: function () {
        return hasOpened();
      },
      open: function(options) {
        return open(options);
      },
      cancel: function (id) {
        var idStr = (id) ? ('.' + id) : '';
        return $q(function (resolve, reject) {
          close(null, id, false);
          $rootScope.$on ('$popup.closed' + idStr, function (event, data, correct) {
            if (!correct) {
              resolve ();
            } else {
              reject (data);
            }
          });
        });
      },
      canceled: function (id) {
        var idStr = (id) ? ('.' + id) : '';
        return $q(function (resolve, reject) {
          $rootScope.$on ('$popup.closed' + idStr, function (event, data, correct) {
            if (!correct) {
              resolve ();
            } else {
              reject (data);
            }
          });
        });
      },
      close: function(data, id) {
        return $q(function (resolve, reject) {
          close(data, id, true);
          $rootScope.$on ('$popup.closed.' + id, function (event, data, correct) {
            if (correct) {
              resolve (data);
            } else {
              reject ();
            }
          });
        });
      },
      closed: function(id) {
        var idStr = (id) ? ('.' + id) : '';
        return $q(function (resolve, reject) {
          $rootScope.$on ('$popup.closed' + idStr, function (event, data, correct) {
            if (correct) {
              resolve (data);
            } else {
              reject ();
            }
          });
        });
      },
      pop: function() {
        var dialog = stack.pop();
        return close(null, dialog.id);
      },
      shift: function() {
        var dialog = stack.shift();
        return close(null, dialog.id);
      },
      hide: function(id) {
        return $q(function (resolve, reject){
          hide(id);
          $rootScope.$on ('$popup.hidden.' + id, function (event, id) {
            resolve (id);
          });
        });
      },
      hidden: function (id) {
        var idStr = (id) ? ('.' + id) : '';
        return $q(function (resolve, reject){
          $rootScope.$on ('$popup.hidden' + idStr, function (event, id) {
            resolve (id);
          });
        });
      },
      show: function(id) {
        return $q(function (resolve, reject){
          show (id);
          $rootScope.$on ('$popup.shown.' + id, function (event, id) {
            resolve (id);
          });
        });
      },
      shown: function () {
        var idStr = (id) ? ('.' + id) : '';
        return $q(function (resolve, reject){
          $rootScope.$on ('$popup.shown' + idStr, function (event, id) {
            resolve (id);
          });
        });
      },
      getDefaults: function() {
        return angular.copy(defaults);
      },
      getStack: function() {
        return stack;
      }
    };
  };
};

export default PopupProvider;
