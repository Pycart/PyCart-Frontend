'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ngRoute',
  'myApp.view1',
  'myApp.view2',
  'myApp.version',
  'myApp.auth',
  'myApp.landing',
  'restangular'
])
    .config(['$routeProvider', 'RestangularProvider', function ($routeProvider, RestangularProvider) {
        $routeProvider.otherwise({redirectTo: '/landing'});

        RestangularProvider.setBaseUrl('http://localhost:8001'); // or the purpose o user setup, this will run on localhost of their machine
    }])

    .controller('AppCtrl', function ($scope, user, $location, Restangular) {
        if (sessionStorage.getItem('DjangoAuthToken')) {
            var token = sessionStorage.getItem('DjangoAuthToken');
            Restangular.setDefaultHeaders({Authorization: 'Token ' + token});
            user.getInfo().then(function () {
                $scope.user = user.info;
                $location.path('/landing');
            });
        }

        if (user.info.id == '') {
            $location.path('/landing');
        }

        $scope.logout = function () {
            user.logout();
            $scope.user = null;
            $location.path('/landing');
        };

        $scope.$on("user-updated", function () {
            $scope.user = user.info;
        });
        //Locks down all routes. This would require you to log in.
        $scope.$on('$routeChangeStart', function () {
            if ((user.info != null && user.info.id == '') || user.info == null) {
                $location.path('/landing');
            }
        });

    });
