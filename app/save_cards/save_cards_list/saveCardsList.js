
angular.module('myApp.saveCardsList', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/saveCardsList', {
            templateUrl: 'save_cards/save_cards_list/save-cards-list.html',
            controller: 'SaveCardsListCtrl'
        });
    }])

    .controller('SaveCardsListCtrl', ['$scope', 'Restangular', function($scope, Restangular){

        Restangular.all('all_saved_cards').customGET().then(function (data){
            $scope.saved_cards = data.results;
        });
    }
]);
