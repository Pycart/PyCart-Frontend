'use strict';

angular.module('myApp.cart', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/dashboard/cart', {
            templateUrl: 'orders/cart/cart.html',
            controller: 'CartCtrl'
        });
    }])

    .controller('CartCtrl', ['$scope', '$location', 'Restangular', function ($scope, $location, Restangular) {
        $scope.getCart = function () {
            return Restangular.one('cart/').customGET().then(function (data) {
                $scope.cart = data;
            });
        };
        $scope.getCart();

        $scope.updateItem = function (id, quantity) {
            var itemUpdate = {
                'items': [id],
                'quantity': [quantity],
                'increment': false
            };

            Restangular.one('cart/update').customPUT(itemUpdate).then(function (data) {
                toastr.success(data);
                $scope.getCart();
            });
        };

        $scope.removeItem = function (id) {
            $scope.updateItem(id, 0);
        };

        $scope.checkout = function() {
            $location.path('/checkout');
        };

    }]);