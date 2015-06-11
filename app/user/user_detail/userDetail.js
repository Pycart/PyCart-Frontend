angular.module('myApp.userDetail', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/userDetail/:userId',{
            templateUrl: 'user/user_detail/user-detail.html',
            controller: 'UserDetailCtrl'
        });
    }])

    .controller('UserDetailCtrl', ['$scope','$routeParams', 'Restangular', function($scope, $routeParams, Restangular) {
        $scope.userId = $routeParams.userId;
        Restangular.one('user_dashboard', $scope.userId).customGET().then(function(user) {
            $scope.user = user;
        });
    }]);