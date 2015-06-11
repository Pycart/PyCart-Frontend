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

        $scope.form = false;
        $scope.editUser = function () {
            $scope.form = true;
        };

        $scope.cancelEdit = function () {
            $scope.form = false;
        };


        $scope.updateUser = function () {
            Restangular.one('user_dashboard', $scope.userId).customPUT($scope.user).then(function(user) {
                $scope.user = user;
                $scope.form = false;
            })
        }
    }]);