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
          }, function(data) {  //TODO: Alert that login has failed
              $scope.resetLoginField();
          });
        };
        $scope.signup = function (registration) {
            if (registration.password1 === registration.password2) {
                registration.password = registration.password1;
                delete registration.password2;
                delete registration.password1;

                AuthFactory.signup(registration).then(function () {
                    if ($scope.redirectLoginPath) {
                        $location.path($scope.redirectLoginPath);
                        $scope.redirectLoginPath = null;
                    } else {
                        $location.path('/');
                    }
                });
            }
            else {
                //TODO: add a failure notice that says that user passwords do not match
            }
        };
}]);