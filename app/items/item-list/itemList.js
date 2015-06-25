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

    .controller('ItemListCtrl', ['$scope', '$routeParams', 'Restangular', 'ItemDetailModal', function ($scope, $routeParams, Restangular, ItemDetailModal) {

        $scope.itemId = $routeParams.itemId;

        if ($routeParams.searchTerm) {
            $scope.searchTerm = $routeParams.searchTerm;
            Restangular.all('items/search/?search=' + $scope.searchTerm).customGET().then(function (data) {
                $scope.items = data.results;
            });
        } else {
            Restangular.all('items/').customGET().then(function (data) {
                $scope.items = data.results;
            });
        }

        $scope.openDetailModal = function (idx) {
            ItemDetailModal.open($scope.items[idx]['id']);
        };

    }]);