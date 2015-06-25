'use strict';

angular.module('myApp.item')

    .service('ItemDetailModal', ['$modal', function ($modal) {
        return {
            open: function (item) {
                $modal.open({
                    templateUrl: 'items/item-detail/item-detail.html',
                    controller: function ($scope, Item) {

	                    $scope.item = item;

	                    //A Quantity of 0 here will effectively delete the item from your current order.
	                    //Also, if the user is not logged in, they won't be able to add items to an order.
	                    $scope.addItem = function (item, quantity) {
		                    Item.add_to_cart($scope.item, quantity).then(function () {
			                    alert("Item added to cart!");
		                    }, function (error) {
			                    alert("There was an error adding your item"); //TODO add a decent error alert here too
		                    })
	                    };

	                    //TODO add cancel, update and place current order functionality (need to be able to view the current cart)

                    }
                });
            }
        };
    }]);