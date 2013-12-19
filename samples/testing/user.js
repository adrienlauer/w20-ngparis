/*
 * Copyright (c) 2013 by PSA Peugeot Citroën. All rights reserved
 */

define([
    'require',

    '{w20-core}/libext/angular/angular',
    '{w20-core}/libext/angular/angular-resource'
], function (require, angular) {
    var module = angular.module('user', [ 'ngResource' ]);

    module.factory('UsersService', [ '$resource', function($resource) {
        return {
            usersResource: $resource(require.toUrl('{basic}/data/users.json'))
        };
    }]);

    module.controller('UserController', [ '$scope', 'UsersService', function ($scope, usersService) {
        var userId = 0,
            Users = usersService.usersResource;

        $scope.users = [];

        $scope.addUser = function () {
            $scope.users.push({
                id: ++userId,
                firstName: $scope.firstName,
                lastName: $scope.lastName,
                birthDate: $scope.birthDate
            });
        };

        $scope.loadUsers = function () {
            Users.query(function (result) {
                userId = 0;

                for (var i = 0; i < result.length; i++)
                    if (result[i].id > userId)
                        userId = result[i].id;

                $scope.users = result;
            });
        };

        $scope.clearUsers = function () {
            $scope.users = [];
            userId = 0;
        };
    } ]);

    return {
        angularModules: [ 'user' ]
    };
});
