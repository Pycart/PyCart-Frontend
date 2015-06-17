angular.module('myApp.saveCardsDetail', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/saveCardsDetail/:cardId',{
            templateUrl: 'save_cards/save_cards_detail/save-cards-detail.html',
            controller: 'SaveCardsDetailCtrl'
        });
    }])

    .controller('SaveCardsDetailCtrl', ['$scope','$routeParams', 'Restangular', function($scope, $routeParams, Restangular) {
        $scope.cardId = $routeParams.cardId;
        Restangular.one('saved_card', $scope.cardId).customGET().then(function(saved_card) {
            $scope.saved_card = saved_card;
        });

    }]);