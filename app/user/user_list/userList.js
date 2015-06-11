
angular.module('myApp.userList', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/userList', {
            templateUrl: 'user/user_list/user-list.html',
            controller: 'UserListCtrl'
        });
    }])

    .controller('UserListCtrl', ['$scope', 'Restangular', function($scope, Restangular) {

        Restangular.all('ShopUserList').customGET().then(function (data) {
            $scope.users = data.results;
        });
    }

 ]);