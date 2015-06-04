'use strict';

angular.module('myApp.searchItems', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/search/:searchTerm', {
    templateUrl: 'items/search-items/search-items.html',
    controller: 'SearchItemsCtrl'
  });
}])

.controller('SearchItemsCtrl', ['Restangular', '$scope', '$routeParams', function(Restangular, $scope, $routeParams) {
        $scope.searchTerm = $routeParams.searchTerm;
        Restangular.all('items_search/?search=' + $scope.searchTerm).customGET().then(function(data) {
            $scope.items = data.results;
        });


}]);