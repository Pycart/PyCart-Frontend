'use strict';

angular.module('myApp.adminDashboard', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/admin', {
            templateUrl: 'admin_dashboard/admin_dashboard.html',
            controller: 'AdminDashboardCtrl'
        });
    }])

    .controller('AdminDashboardCtrl', ['$scope', 'Restangular', function ($scope, Restangular) {
        $scope.newItem = {
            options: [],
            tags: []
        };
        $scope.option = {};
        $scope.GetItemList = function () {
            Restangular.all('admin_dashboard/items').customGET().then(function (data) {
                $scope.ItemList = data;
            });
        };
        $scope.GetOptionList = function () {
            Restangular.all('admin_dashboard/options').customGET().then(function (data) {
                $scope.OptionList = data;
            });
        };
        $scope.GetStatusList = function () {
            Restangular.all('admin_dashboard/status').customGET().then(function (data) {
                $scope.StatusList = data;
            });
        };
        $scope.GetItemList();
        $scope.GetOptionList();
        $scope.GetStatusList();
        $scope.addItemForm = function () {
            $scope.showItemForm = true;
        };
        $scope.addOptionForm = function () {
            $scope.showOptionForm = true;
        };
        $scope.addTagToItem = function (tagName) {
                if (tagName != null) {
                    var tag = {name: tagName};
                    $scope.newItem.tags.push(tag);
                    $scope.tagName = null;
                }
        };
        $scope.addOptionToItem = function (optionName) {
                if (optionName != null) {
                    var option = {name: optionName};
                    $scope.newItem.options.push(option);
                    $scope.optionName = null;
                }
        };
        $scope.addItem = function (item) {
            //item.tags = [$scope.newItem.tags];
            Restangular.one('admin_dashboard/items').customPOST(item).then(function () {
                $scope.GetItemList();
                $scope.showItemForm = false;
                $scope.newItem = null;
            }, function (error) {
                alert("There was an error saving your item"); //TODO add a decent error alert
            })
        };
        $scope.clearItem = function () {
            $scope.newItem = null;
        };
        $scope.cancelItem = function () {
            $scope.newItem = null;
            $scope.showItemForm = false;
        };
        $scope.addOption = function (option) {
            Restangular.one('admin_dashboard/options').customPOST(option).then(function () {
                $scope.GetOptionList();
                $scope.showOptionForm = false;
                $scope.newOption = null;
            }, function (error) {
                alert("There was an error saving your option"); //TODO add a decent error alert
            })
        };
        $scope.cancelOption = function () {
            $scope.showOptionForm = false;
        };
        $scope.addStatus = function (status) {
            Restangular.one('admin_dashboard/status').customPOST(status).then(function (data) {
                $scope.GetStatusList();
            }, function (error) {
                alert("Error");//TODO add a decent error alert
            })
        };
    }]);






