'use strict';

angular.module('myApp.auth.logout', ['ngRoute'])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/logout/', {
            templateUrl: 'auth/logout/logout.html',
            controller: 'LogoutCtrl'
        });
    }])

    .controller('LogoutCtrl', ['$scope', 'AuthFactory', '$location',
        function ($scope, AuthFactory, $location) {
            $scope.submit = function () {
                AuthFactory.logout();
                $location.path('/');
            };
        }]);