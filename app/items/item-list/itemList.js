'use strict';

angular.module('myApp.itemList', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/itemList', {
            templateUrl: 'items/item-list/item-list.html',
            controller: 'ItemListCtrl'
        });
    }])

    .controller('ItemListCtrl', ['$scope', 'Restangular', function ($scope, Restangular) {
        Restangular.all('items_list/').customGET().then(function (data) {
           $scope.items = data.results;
        });
    }]);