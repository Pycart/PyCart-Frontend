'use strict';

angular.module('myApp.auth.login', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/login/', {
            templateUrl: 'auth/login/login.html',
            controller: 'LoginCtrl'
        });
    }])

.controller('LoginCtrl', ['$scope', 'AuthFactory', '$location', function($scope, AuthFactory, $location) {
        // Initializes the credential fields
        $scope.resetLoginField = function () {
            $scope.credentials = {
                email: '',
                password: ''
            };
        };

        $scope.resetLoginField();

        $scope.submit = function (credentials) {
          AuthFactory.login(credentials).then(function () {
              if ($scope.redirectLoginPath) {
                  $location.path($scope.redirectLoginPath);
                  $scope.redirectLoginPath = null;
              } else {
                  $location.path('/');
              }
              $scope.resetLoginField();
          }, function(data) {
              $scope.resetLoginField();
          });
        };
}]);