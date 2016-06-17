(function(angular) {
  'use strict';

  angular.module("email", ['angular-md5', 'ngMask'])

  .controller('MainCtrl', ['$scope', function($scope) {
    var self = this;

    this.model = {};

    this.copy = function(id) {
      var clipboard = new Clipboard('.copyButton', {
        target: function(trigger) {
          return document.getElementById('signature-container');
        }
      });
    }

    $scope.$watch(function() { return self.model.name }, function(v) {

      if (!v) {
        self.model.email = '';
        return;
      }
      var parts = v.split(' ');
      if (parts.length >= 2) {
        self.model.email = (parts[0] + '.' + parts[parts.length - 1]).toLowerCase();
      }

      if (parts.length == 1) {
        self.model.email = parts[0].toLowerCase();
      }

    });
  }]).directive('avatar', ['md5', function(md5) {

    return {
      restrict: 'A',
      scope: {
        avatar: "@"
      },
      link: function($scope, element) {
        var target = angular.element(element);
        var interval;

        target.css('display', 'none');
        $scope.$watch('avatar', function(v) {
          clearInterval(interval);
          interval = setTimeout(function() {
            var hash = md5.createHash(v);
            var src = 'http://0.gravatar.com/avatar/' + hash + '?s=60&d=mm&r=g';
            target.attr('src', src);
            target.css('display', 'block');
          }, 500);

        });
      }
    }

  }]).directive('dirtIt', function() {

    return {
      restrict: "A",
      require: "ngModel",
      link: function($scope, element, attr, ctrl) {
        var parent = angular.element(document.getElementById('email').parentElement);
        ctrl.$formatters.push(function(v) {        
          parent[v ? 'addClass' : 'removeClass']("is-dirty");
          return v;
        });
      }
    }

  });

})(angular);
