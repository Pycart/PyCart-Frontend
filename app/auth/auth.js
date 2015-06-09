angular.module('myApp.auth', ['ngRoute']).
    service('UserService', ['$rootScope', 'Restangular', function ($rootScope, Restangular) {
        this.create = function (email, first_name, last_name, is_staff) {
            this.email = email;
            this.first_name = first_name;
            this.last_name = last_name;
            this.is_staff = is_staff;
        };

        this.destroy = function () {
            this.email = null;
            this.first_name = null;
            this.last_name = null;
            this.is_staff = null;
        };

        this.get = function () {
            $rootScope.user = {
                'email': this.email,
                'first_name': this.first_name,
                'last_name': this.last_name,
                'is_staff': this.is_staff
            };
            return $rootScope.user
        }
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
                    UserService.create(data.email, data.first_name, data.last_name, data.is_staff);
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
                    'email': registration.email,
                    'password': registration.password
                };
                return authService.login(credentials).then(function (data) {
                    return data;
                });
            });
        };

        return authService;
    }]).service('RequireLogin', ['$rootScope', '$location', '$timeout', 'Restangular', 'UserService', function ($rootScope, $location, $timeout, Restangular, UserService) {

        $rootScope.$on('$routeChangeStart', function (event, next, current) {
            var nextPath = '/';
            try {
                nextPath = next.$$route.originalPath;
                var keys = next.$$route.keys[0];
            } catch (ex) {
              // means there are no route params.
            }
            var path = '';
            if (keys) {
                path = nextPath.slice(1, path.indexOf(':')) + next.params[next.$$route.keys[0]['name']];
            } else {
                path = nextPath;
            }
            var regex = /(\/admin([A-Za-z0-9-/:]*))|(\/dashboard([A-Za-z0-9-/:]*))/;

            var token = sessionStorage.getItem('token');
            if (token) {
                Restangular.configuration.defaultHeaders.authorization = 'Token ' + token;
                Restangular.all('auth/me').customGET().then(function (data) {
                    UserService.create(data.email, data.first_name, data.last_name, data.is_staff);
                    UserService.get();

                    if (regex.test(path) && $rootScope.user.is_staff === false) {
                        $location.path('/login');
                    }
                }, function (error) {
                    sessionStorage.removeItem('token');
                    $location.path('/login');
                });
            } else if (regex.test(path)) {
                $location.path('login/');
            }
        });
    }]);