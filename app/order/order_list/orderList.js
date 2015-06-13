
angular.module('myApp.orderList', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/orderList', {
            templateUrl: 'order/order_list/order-list.html',
            controller: 'OrderListCtrl'
        });
    }])

    .controller('OrderListCtrl', ['$scope', 'Restangular', function($scope, Restangular){

        // what should be passed to Restangular.all ??
        Restangular.all('allOrdersList').customGET().then(function (data){
            $scope.orders = data.results;
        });
    }
]);
