(function() {
    "use strict";

    angular.module('issueTrackingSystemApp')
        .controller('HomeController', [
            '$scope',
            'projectsService',
            'issuesService',
            'notifyService',
            'authService',
            'usSpinnerService',
            'helperService',
            'PAGE_SIZE',
            'CURRENT_PAGE',
            function HomeController($scope, projectsService, issuesService, notifyService, authService, usSpinnerService, helperService, PAGE_SIZE, CURRENT_PAGE) {
                $scope.issuesParams = {
                    'startPage': 1,
                    'pageSize': PAGE_SIZE
                };

                // Reset current page
                $scope.customPagingParams.currentPage = CURRENT_PAGE;

                $scope.getAllUserRelatedIssues = function() {
                    usSpinnerService.spin('spinner-1');
                    issuesService.getUserRelatedIssues($scope.issuesParams)
                        .then(function(userIssues) {
                            usSpinnerService.stop('spinner-1');
                            $scope.userRelatedIssues = userIssues;
                            $scope.allIssues = userIssues.TotalPages * $scope.issuesParams.pageSize;
                        }, function(error) {
                            usSpinnerService.stop('spinner-1');
                        });
                };

                if (authService.isAuthenticated()) {
                    $scope.getAllUserRelatedIssues();
                }
                //$scope.getAllUserRelatedIssues();

                // Get all user related projects
                $scope.userProjects = [];
                $scope.userProjectsParams = {
                    'startPage': 1,
                    'pageSize': PAGE_SIZE
                };
                $scope.getUserRelatedProjects = function() {
                    usSpinnerService.spin('spinner-1');
                    projectsService.getUserAffiliatedProjects($scope.userProjectsParams)
                        .then(function(projects) {
                            usSpinnerService.stop('spinner-1');
                            $scope.userProjects = projects;
                            $scope.customPagingParams.collection = projects;
                            $scope.customPagingParams.numberOfPages = helperService.numberOfPages(projects.length, PAGE_SIZE);
                        }, function(error) {
                            usSpinnerService.stop('spinner-1');
                        });
                };

                if (authService.isAuthenticated()) {
                    $scope.getUserRelatedProjects();
                }
                //$scope.getUserRelatedProjects();
            }
        ]);
})();