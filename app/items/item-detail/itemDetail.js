'use strict';

angular.module('myApp.itemDetail', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/items_detail/:itemId', {
            templateUrl: 'items/item-detail/item-detail.html',
            controller: 'ItemDetailCtrl'
        });
    }])

    .controller('ItemDetailCtrl', ['$scope','$routeParams', 'Restangular', function ($scope, $routeParams, Restangular) {
        $scope.itemId = $routeParams.itemId;
        Restangular.one('items_detail', $scope.itemId).customGET().then(function (item) {
            $scope.item = item;
        });
    }]);
