'use strict';

angular.module('myApp.itemDetail', ['ngRoute', 'ui.bootstrap'])

    .service('ItemDetailModal', ['$modal', function ($modal) {
        return {
            open: function (item) {
                $modal.open({
                    templateUrl: 'items/item-detail/item-detail.html',
                    controller: 'ItemDetailModalCtrl',
                    resolve: {
                        itm: function () {
                            return item;
                        }
                    }
                });
            }
        };
    }])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/itemDetail/:itemId', {
            templateUrl: 'items/item-list/item-list.html',
            controller: 'ItemDetailModalCtrl'
        });
    }])

    .controller('ItemDetailModalCtrl', ['$scope', 'Restangular', '$routeParams', function ($scope, Restangular, $routeParams) {
        $scope.addToCart = [];

        $scope.itemId = $routeParams.itemId;
        Restangular.one('items_detail', $scope.itemId).customGET().then(function (item) {
            $scope.item = item
        });

        $scope.select = function () {
            $scope.addToCart += $scope.item;
            $modal.close($scope.addToCart);
        };
    }]);