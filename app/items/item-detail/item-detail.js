'use strict';

angular.module('myApp.itemDetail', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/item-detail', {
    templateUrl: 'items/item-detail/item-detail.html',
    controller: 'ItemDetailCtrl'
  });
}])

.controller('ItemDetailCtrl', [function() {
    Restangular.one('item', $scope.itemId).customGET().then(function (item) {
            $scope.item = item;
        });
}]);