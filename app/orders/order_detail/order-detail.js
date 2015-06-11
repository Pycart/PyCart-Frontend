'use strict';

angular.module('myApp.orderDetail', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/orderDetail/:orderId', {
            templateUrl: 'orders/order_detail/order-detail.html',
            controller: 'OrderDetailCtrl'
        });
    }])

    .controller('OrderDetailCtrl', ['$scope','$routeParams', 'Restangular', function ($scope, $routeParams, Restangular) {
        $scope.orderId = $routeParams.orderId;
        Restangular.one('order_detail', $scope.orderId).customGET().then(function (order) {
            $scope.order = order;
        });
    }]);