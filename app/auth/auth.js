angular.module('myApp.auth', ['ngRoute']).
    service('UserService', ['$rootScope', 'Restangular',  function ($rootScope, Restangular) {
        this.create = function (email, first_name, last_name) {
            this.email = email;
            this.first_name = first_name;
            this.last_name = last_name;
        };

        this.destroy = function () {
            this.email = null;
            this.first_name = null;
            this.last_name = null;
        };

        this.get = function () {
            var token = sessionStorage.getItem('token');
            if (token) {
                Restangular.setDefaultHeaders({Authorization: 'Token ' + token});
                Restangular.one('auth/me').customGET().then(function (data) {
                    this.email = data.email;
                    this.first_name = data.first_name;
                    this.last_name = data.last_name;
                });
            }
            $rootScope.user = {
                'email': this.email,
                'first_name': this.first_name,
                'last_name': this.last_name
            };
            return $rootScope.user
        };

    }
    ]).
    factory('AuthFactory', ['$http', 'UserService', 'Restangular', function
        ($http, UserService, Restangular) {

        /*
         This is the base authentication service. This will reach out to the backend and do the authentication.
         This is where the AppCtrl looks to see if a user is authenticated. Services come here to run the login and logout functions.
         */
        var authService = {};

        authService.login = function (credentials) {
            return Restangular.one('auth/login').customPOST(credentials).then(function (key) {

                // Sets the default header so the backend knows which user is authenticated.
                Restangular.configuration.defaultHeaders.authorization = 'Token ' + key.auth_token;

                return Restangular.all('auth/me').customGET().then(function (data) {

                    // Save key to local storage once it works.
                    sessionStorage.setItem('token', key.auth_token);

                    // Create session.
                    UserService.create(data.email, data.first_name, data.last_name);
                    UserService.get();
                    return data;
                });

            });
        };

        authService.logout = function () {
            return Restangular.one('auth/logout').customPOST().then(function () {
                // Removes local storage key for token and destroys the token.
                Restangular.configuration.defaultHeaders.authorization = '';
                sessionStorage.removeItem('token');
                UserService.destroy();
                UserService.get();
                return true
            }, function (error) {
                // Removes it anyways as we will have them reloggin.
                Restangular.configuration.defaultHeaders.authorization = '';
                sessionStorage.removeItem('token');
                UserService.destroy();
                UserService.get();
                return error
            });
        };
        authService.signup = function (registration) {
            return Restangular.one('auth/register').customPOST(registration).then(function (data) {
                var credentials = {
                    'email' : registration.email,
                    'password' : registration.password
                };
                return authService.login(credentials).then(function (data) {
                    return data;
                });
            });
        };

        return authService;
    }]);