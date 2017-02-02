'use strict';

// Articles controller
angular.module('articles').controller('ArticlesController', ['$scope', '$stateParams', '$location', 'Authentication', 'Articles',
  function ($scope, $stateParams, $location, Authentication, Articles) {
    $scope.authentication = Authentication;

    // Create new Article
    $scope.create = function (isValid) {
      $scope.error = null;

      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'articleForm');

        return false;
      }

      // Create new Article object
      var article = new Articles({
        title: this.title,
        content: this.content
      });

      // Redirect after save
      article.$save(function (response) {
        $location.path('articles/' + response._id);

        // Clear form fields
        $scope.title = '';
        $scope.content = '';
      }, function (errorResponse) {
        $scope.error = errorResponse.data.message;
      });
    };

    // Remove existing Article
    $scope.remove = function (article) {
      if (article) {
        article.$remove();

        for (var i in $scope.articles) {
          if ($scope.articles[i] === article) {
            $scope.articles.splice(i, 1);
          }
        }
      } else {
        $scope.article.$remove(function () {
          $location.path('articles');
        });
      }
    };

    // Update existing Article
    $scope.update = function (isValid) {
      $scope.error = null;

      if (!isValid) {
        console.log($scope.article);
        $scope.$broadcast('show-errors-check-validity', 'articleForm');

        return false;
      }

      var article = $scope.article;

      article.$update(function () {
        $location.path('articles/' + article._id);
      }, function (errorResponse) {
        $scope.error = errorResponse.data.message;
      });
    };

    // Find a list of Articles
    $scope.find = function () {
      $scope.articles = Articles.query();
    };

    // Find existing Article
    $scope.findOne = function () {
      $scope.article = Articles.get({
        articleId: $stateParams.articleId
      });
      $scope.article.$promise.then(function(val) {
        // console.log(nl2br(val.content));
        $scope.article.content = nl2br(val.content);
      });
    };

    // display line breaks
    function nl2br (str, is_xhtml) {
      // http://kevin.vanzonneveld.net
      // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
      // +   improved by: Philip Peterson
      // +   improved by: Onno Marsman
      // +   improved by: Atli Þór
      // +   bugfixed by: Onno Marsman
      // +      input by: Brett Zamir (http://brett-zamir.me)
      // +   bugfixed by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
      // +   improved by: Brett Zamir (http://brett-zamir.me)
      // +   improved by: Maximusya
      // *     example 1: nl2br('Kevin\nvan\nZonneveld');
      // *     returns 1: 'Kevin<br />\nvan<br />\nZonneveld'
      // *     example 2: nl2br("\nOne\nTwo\n\nThree\n", false);
      // *     returns 2: '<br>\nOne<br>\nTwo<br>\n<br>\nThree<br>\n'
      // *     example 3: nl2br("\nOne\nTwo\n\nThree\n", true);
      // *     returns 3: '<br />\nOne<br />\nTwo<br />\n<br />\nThree<br />\n'
      var breakTag = (is_xhtml || typeof is_xhtml === 'undefined') ? '<br ' + '/>' : '<br>'; // Adjust comment to avoid issue on phpjs.org display

      return (str + '').replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, '$1' + breakTag + '$2');
    }
  }
]);
