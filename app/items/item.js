'use strict';

angular.module('myApp.item', ['ngRoute'])

.service('Item', ['$http', 'BaseUrl', function ($http, BaseUrl) {
		this.getList = function () {
			return $http.get(BaseUrl + this.urls.items_list)
		};

		this.getOne = function (item) {
			return $http.get(BaseUrl + this.urls.items_list + item + '/')
		};

		this.searchList = function (search) {
			return $http.get(BaseUrl + this.urls.items_search, {params: {search: search}})
		};

		this.create = function () {

		};

		this.delete = function () {

		};

		this.update = function () {

		};

		this.addToCart = function (item, quantity) {
			return $http.put(BaseUrl + this.urls.add_to_cart, {"items":[item.id], "quantity":[quantity]})
		};

		this.urls = {
			items_list: 'items/',
			items_search: 'items/search/',
			add_to_cart: 'cart/add/'
		}
	}]);
