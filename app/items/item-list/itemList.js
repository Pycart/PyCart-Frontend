'use strict';

angular.module('myApp.item')

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/itemList', {
            templateUrl: 'items/item-list/item-list.html',
            controller: 'ItemListCtrl'
        }).when('/search/:searchTerm', {
            templateUrl: 'items/item-list/item-list.html',
            controller: 'ItemListCtrl'
        });
    }])

    .controller('ItemListCtrl', ['$scope', '$routeParams', 'Restangular', 'ItemDetailModal', 'Item', function ($scope, $routeParams, Restangular, ItemDetailModal, Item) {

        if ($routeParams.searchTerm) {
            $scope.searchTerm = $routeParams.searchTerm;

			Item.searchList($scope.searchTerm).then(function (data) {
                $scope.items = data.results;
            });
        } else {
	        Item.getList().then(function (data) {
		        $scope.items = data.results;
	        });
        }

        $scope.openDetailModal = function (idx) {
            ItemDetailModal.open($scope.items[idx]['id']);
        };

    }]);