'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ngRoute',
  'myApp.itemList',
  'myApp.view1',
  'myApp.view2',
  'myApp.version',
  'restangular'
])
    .config(['$routeProvider', 'RestangularProvider', function ($routeProvider, RestangularProvider) {
        $routeProvider.otherwise({redirectTo: '/'});

        RestangularProvider.setBaseUrl('http://localhost:8001'); // for the purpose of user setup, this will run on localhost of their machine
    }]);

    //.controller('AppCtrl', function ($scope, User, $location, Restangular) {
    //    if (sessionStorage.getItem(User.authToken)) {
    //        var token = sessionStorage.getItem(User.authToken);
    //        Restangular.setDefaultHeaders({Authorization: 'Token ' + token});
    //        User.getInfo().then(function () {
    //            $scope.user = User.info;
    //            $location.path('/');
    //        });
    //    }
    //
    //    if (User.info.id == '') {
    //        $location.path('/');
    //    }
    //
    //    $scope.logout = function () {
    //        User.logout();
    //        $scope.user = null;
    //        $location.path('/');
    //    };
    //
    //    $scope.$on("user-updated", function () {
    //        $scope.user = User.info;
    //    });
    //    //Locks down all routes. This would require you to log in.
    //    $scope.$on('$routeChangeStart', function () {
    //        if ((User.info != null && User.info.id == '') || User.info == null) {
    //            $location.path('/');
    //        }
    //    });
    //
    //});
