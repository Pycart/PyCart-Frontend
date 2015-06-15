var app = angular.module('myApp.stock_records_view', ['ngRoute']);

app.config(function($routeProvider) {
    $routeProvider
        .when('/stock_records', {
        templateUrl: 'stock_records_view/stock_records_view.html',
        controller: 'StockRecordsCtrl'
  });
});

app.controller('StockRecordsCtrl', ['$scope', 'Restangular', function ($scope, Restangular) {

    Restangular.all('stock_record').customGET().then(function (data) {
        $scope.records=data;
    })
}]);
