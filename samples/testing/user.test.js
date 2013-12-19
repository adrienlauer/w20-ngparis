/*
 * Copyright (c) 2013 by PSA Peugeot Citroën. All rights reserved
 */

var userController, $scope;

beforeEach(function () {
    module('user');
    inject(function ($injector, $controller, $rootScope) {
        serviceMock = jasmine.createSpyObj('usersService', [ 'usersResource' ]);

        $scope = $rootScope.$new();

        userController = $controller('UserController', {
            $scope: $scope,
            UsersService: serviceMock
        });
    });
});

describe("the user controller", function () {
    it("should have empty users collection when initialized", function () {
        expect($scope.users).toBeDefined();
        expect($scope.users.length).toEqual(0);
    });

    it("should be able to add items to the users collection", function () {
        $scope.firstName = 'Robert';
        $scope.lastName = 'SMITH';
        $scope.birthDate = 1386928983127;
        $scope.addUser();

        expect($scope.users.length).toEqual(1);
        expect($scope.users).toContain({
            id: 1,
            firstName: 'Robert',
            lastName: 'SMITH',
            birthDate: 1386928983127
        });
    });

    it("should be able to clear the users collection", function () {
        $scope.users.push({
            id: 1,
            firstName: 'Robert',
            lastName: 'SMITH',
            birthDate: 1386928983127
        });

        expect($scope.users.length).toEqual(1);
        $scope.clearUsers();
        expect($scope.users.length).toEqual(0);
    });

    it("should be able to load data to the users collection", function () {
        serviceMock.usersResource.query = jasmine.createSpy().andCallFake(function (callback) {
            callback([
                {
                    id: 1,
                    firstName: 'Robert',
                    lastName: 'SMITH',
                    birthDate: 1386928983127
                }
            ]);
        });
        $scope.loadUsers();

        expect($scope.users.length).toEqual(1);
        expect($scope.users).toContain({
            id: 1,
            firstName: 'Robert',
            lastName: 'SMITH',
            birthDate: 1386928983127
        });

        $scope.firstName = 'Anna';
        $scope.lastName = 'O\'HARA';
        $scope.birthDate = 1386928983127;
        $scope.addUser();

        expect($scope.users.length).toEqual(2);
        expect($scope.users).toContain({
            id: 1,
            firstName: 'Robert',
            lastName: 'SMITH',
            birthDate: 1386928983127
        }, {
            id: 2,
            firstName: 'Anna',
            lastName: 'O\'HARA',
            birthDate: 1386928983127
        });
    });
});
