'use strict';

angular.module('myApp.orders.checkout', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/checkout', {
            templateUrl: 'orders/checkout/checkout.html',
            controller: 'CheckoutCtrl'
        });
    }])

    .controller('CheckoutCtrl', ['$scope', 'Restangular', function ($scope, Restangular) {
        Restangular.one('cart/').customGET().then(function (data) {
                $scope.cart = data;
        });

        $scope.process = function() {
            var card = {
                "number": $scope.checkout.cc,
                "exp_month": $scope.checkout.expMonth,
                "exp_year": $scope.checkout.expYear,
                "cvc": $scope.checkout.cvc
            };

            Restangular.one('cart/checkout').customPOST(card).then(function (data) {

            });
        }
    }]);