'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [

    'ngRoute',
    'myApp.auth',
    'myApp.auth.login',
    'myApp.auth.logout',
    'myApp.itemList',
    'myApp.itemDetail',
    'myApp.view1',
    'myApp.view2',
    'myApp.version',
    'restangular'

])
    .config(['$routeProvider', 'RestangularProvider', function ($routeProvider, RestangularProvider) {
        $routeProvider.otherwise({redirectTo: '/'});
        RestangularProvider.setBaseUrl('http://localhost:8001'); // for the purpose of user setup, this will run on localhost of their machine
        RestangularProvider.setRequestSuffix('/');
    }])

    .controller('AppCtrl', ['$scope', '$location', 'Restangular', 'UserService',
        function ($scope, $location, Restangular, UserService) {

            $scope.search = function (searchTerm) {
                $location.path('/search/' + searchTerm);
            };

            // Should only run the first time the page is loaded/refreshed.
            var loaded = false;
            if (!loaded) {
                loaded = true;
                var token = sessionStorage.getItem('token');
                console.log("pre-userservice");
                UserService.get();
            }

            $scope.login = function() {
                $location.path('/login/');
            };

            $scope.logout = function() {
                $location.path('/logout/');
            };

            /////////////////////////////////////////////////////////////////////////////////
            // Still need a way to lock down routes.
            // Can figure this out later once we decide which routes would require login.
            //
            ////Locks down all routes. This would require you to log in.
            // $scope.$on('$routeChangeStart', function () {
            //     if ((User.info != null && User.info.id == '') || User.info == null) {
            //         $location.path('/');
            //     }
            // });
            /////////////////////////////////////////////////////////////////////////////////

        }]);
