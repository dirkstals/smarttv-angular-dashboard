(function(window, angular, undefined){
    
    'use strict';

    /**
     * Create a new module and
     * attach all dependencies
     */
    angular
        .module('sprintWidget', [])
        .service('sprintService', ['$http', service])
        .controller('sprint', ['$scope', '$document', 'widgetService', 'sprintService', controller]);



    /**
     * @function controller
     * @private
     */
    function controller($scope, $document, widgetService, sprintService){

        $scope.title = 'Sprint Status';
        $scope.widgetType = 'percentage';

        sprintService.getSprint(function(sprint){
            
            $scope.title = sprint.name + ' Status';
        })

        widgetService.heartbeat(function(status){

            $scope.status = status.hours + ':' + status.minutes;

            sprintService.getSprintData(function(data){

                $scope.update(data);    
            });
        }, 15 * 60 * 1000 ); // 15 minutes
    }


    /**
     * @function service
     * @private
     */
    function service($http){

        /**
         * auth token
         * genreated by btoa('username:password')
         * @type {string}
         * @private
         */
        var auth = 'c3RhbHNkaTo1MEJsb2NrJA==';

        /**
         * projectId
         * project id to get the latest sprint from
         * @type {number}
         * @private
         */
        var projectId = 67;

        /**
         * set global http basic authorization header
         */
        $http.defaults.headers.common[ 'Authorization' ] = 'Basic ' + auth;


        /**
         * getSprint
         * public function
         */
        var getSprint = function( callback ){

            $http.get( 'http://atlas.vrt.be/jira/rest/greenhopper/latest/sprintquery/' + projectId )
                .success( function( result ){

                    var sprints = result.sprints;
                    var sprint  = sprints[ sprints.length - 1 ];

                    callback( sprint );
                });
        };
        
        /**
         * onData
         * public function
         */
        var getSprintData = function( callback ) {
            
            this.getSprint(function(sprint){

                $http.get( 'http://atlas.vrt.be/jira/rest/greenhopper/latest/rapid/charts/sprintreport?rapidViewId=' +
                    projectId + '&sprintId=' + sprint.id )
                    .success( function( result ){

                        var sprint  = result.contents;
                        var total   = sprint.allIssuesEstimateSum.value;
                        var current = sprint.completedIssuesEstimateSum.value;

                        callback( 100 * current / total );
                    });
            });
        };

        return {
            getSprint: getSprint,
            getSprintData: getSprintData
        };
    }

})(window, window.angular);