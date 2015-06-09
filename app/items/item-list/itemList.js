'use strict';

angular.module('myApp.itemList', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/itemList', {
            templateUrl: 'items/item-list/item-list.html',
            controller: 'ItemListCtrl'
        }).when('/search/:searchTerm', {
            templateUrl: 'items/item-list/item-list.html',
            controller: 'ItemListCtrl'
        });
    }])

    .controller('ItemListCtrl', ['$scope', '$routeParams', 'Restangular', function ($scope, $routeParams, Restangular) {

        if ($routeParams.searchTerm) {
            $scope.searchTerm = $routeParams.searchTerm;
            Restangular.all('items_search/?search=' + $scope.searchTerm).customGET().then(function (data) {
                $scope.items = data.results;
            });
        } else {
            Restangular.all('items_list/').customGET().then(function (data) {
                $scope.items = data.results;
            });
        }
    }]);