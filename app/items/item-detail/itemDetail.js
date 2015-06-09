'use strict';

angular.module('myApp.itemDetail', ['ngRoute', 'ui.bootstrap'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/itemDetail/:itemId', {
            templateUrl: 'items/item-detail/item-detail.html',
            controller: 'ItemDetailCtrl'
        });
    }])

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

    .controller('ItemDetailCtrl', ['$scope','$routeParams', 'Restangular', function ($scope, $routeParams, Restangular) {
        $scope.itemId = $routeParams.itemId;
        Restangular.one('items_detail', $scope.itemId).customGET().then(function (item) {
            $scope.item = item;
        });

    }])

    .controller('ItemDetailModalCtrl', ['$scope', 'itm', function ($scope, itm) {
        $scope.item = itm

    }]);
