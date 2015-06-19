'use strict';

angular.module('myApp.itemDetail', ['ngRoute', 'ui.bootstrap'])

    .service('ItemDetailModal', ['$modal', function ($modal) {
        return {
            open: function (item) {
                $modal.open({
                    templateUrl: 'items/item-detail/item-detail.html',
                    controller: 'ItemDetailModalCtrl',
                    resolve: {
                        item: function () {
                            return item;
                        }
                    }
                });
            }
        };
    }])

    .controller('ItemDetailModalCtrl', ['$scope', 'item', 'Restangular', function ($scope, item, Restangular) {

        Restangular.one('items/', item).customGET().then(function (data) {
            $scope.item = data;
        });

        //A Quantity of 0 here will effectively delete the item from your current order.
        //Also, if the user is not logged in, they won't be able to add items to an order.
        $scope.addItem = function (item, quantity) {
            Restangular.one('cart/update/').customPUT({"items":[item.id], "quantity":[quantity], 'increment': true}).then(function () {
                alert("Item added to cart!");
            }, function (error) {
                alert("There was an error adding your item"); //TODO add a decent error alert here too
            })
        };

        //TODO add cancel, update and place current order functionality (need to be able to view the current cart)

    }]);