/**
 * PopupDirective
 * @param  {Object} $popup the popup provider
 * @return {Object}        directive configuration
 */
let PopupDirective = function($popup) {
  'ngInject';
  return {
    restrict: 'A',
    link: function(scope, element, attrs) {
      var modal;
      var options;
      // Trigger
      element.on(attrs.trigger || 'click', function() {
        options = $popup.getDefaults();
        angular.forEach(Object.keys(options), function(key) {
          if (angular.isDefined(attrs[key])) {
            //TODO fix this, it sucks bad
            if (attrs[key] === 'true') {
              options[key] = true;
            } else if (attrs[key] === 'false') {
              options[key] = false;
            } else {
              options[key] = attrs[key];
            }
          }
        });
        modal = $popup.open(options);
      });

      // Garbage collection
      scope.$on('$destroy', function() {
        if (modal) {
          modal.opened.then(function() {
            modal.close();
            modal = null;
          });
        } else {
          modal = null;
        }
        options = null;
      });
    }
  };
};

export default PopupDirective;
