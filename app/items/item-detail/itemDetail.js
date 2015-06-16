'use strict';

angular.module('myApp.itemDetail', ['ngRoute'])

    .service('ItemDetailModal', ['$modal', function ($modal) {
        return {
            open: function (item) {
                $modal.open({
                    templateUrl: 'items/item-detail/item-detail.html',
                    controller: function ($scope) {
                        $scope.item = item;
                        $scope.select = function () {
                            $scope.addToCart += $scope.item;
                            $modal.close($scope.addToCart);
                        };
                    }
                });
            }
        };
    }]);