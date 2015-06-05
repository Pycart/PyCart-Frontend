'use strict';

angular.module('myApp.itemDetail', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/items_detail/:itemId', {
            templateUrl: 'items/item-detail/item-detail.html',
            controller: 'ItemDetailCtrl'
        });
    }])

    .controller('ItemDetailCtrl', ['$scope', '$http', '$routeParams', '$location', 'Restangular', function ($scope, $http, $routeParams, $location, Restangular) {
        $scope.itemId = $routeParams.itemId;
        $scope.editing = false;
        Restangular.one('items_detail', $scope.itemId).customGET().then(function (item) {
            $scope.item = item;
        });
    }]);
