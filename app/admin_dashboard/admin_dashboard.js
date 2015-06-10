'use strict';

angular.module('myApp.adminDashboard', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/admin', {
            templateUrl: 'admin_dashboard/admin_dashboard.html',
            controller: 'AdminDashboardCtrl'
        });
    }])

    .controller('AdminDashboardCtrl', ['$scope', 'Restangular', function ($scope, Restangular) {
        Restangular.all('admin_dashboard/items').customGET().then(function (data) {
            $scope.ItemList = data;
        });
        Restangular.all('admin_dashboard/options').customGET().then(function (data) {
            $scope.OptionList = data;
        });
        Restangular.all('admin_dashboard/status').customGET().then(function (data) {
            $scope.StatusList = data;
        });
    }]);





