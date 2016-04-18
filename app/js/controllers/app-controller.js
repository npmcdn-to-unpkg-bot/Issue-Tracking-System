(function() {
    'use strict';
    // The AppController holds the presentation logic for the entire app (common for all screens)
    angular.module('issueTrackingSystemApp')
        .controller('AppController', [
            '$scope',
            '$location',
            'authService',
            'userProfileService',
            'projectsService',
            'identity',
            'notifyService',
            function AppController($scope, $location, authService, userProfileService, projectsService, identity, notifyService) {
                // Put the authService in the $scope to make it accessible from all screens
                $scope.authService = authService;

                // To choose from drop down when create new project or add new issue
                function getAllUsers () {
                    if (authService.isAuthenticated()) {
                        userProfileService.getAllUsers()
                            .then(function(users) {
                                //debugger;
                                $scope.allUsers = users;
                            });
                    }
                }

                getAllUsers();

                // Get all projects in the system
                function getAllProjects() {
                    if (authService.isAuthenticated()) {
                        projectsService.getAllProjects()
                            .then(function(allProjects) {
                                $scope.allProjects = allProjects;
                            });
                    }
                }

                getAllProjects();

                waitForLogin();

                $scope.logout = function() {
                    $scope.currentLoggedInUser = undefined;
                    authService.logout();
                    notifyService.showInfo('Logout successful');
                    waitForLogin();
                    $location.path('#/');
                };

                function waitForLogin() {
                    identity.getUser()
                        .then(function(user) {
                            //debugger
                            $scope.currentLoggedInUser = user;
                        });
                }

                $scope.footerYear = new Date();
            }]
        );
})();