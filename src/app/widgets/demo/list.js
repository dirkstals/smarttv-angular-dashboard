(function(window, angular, undefined){
    
    'use strict';

    /**
     * Create a new module and
     * attach all dependencies
     */
    angular
        .module('dashboard')
        .controller('list', ['$scope', 'widgetService', controller]);


    /**
     * @function controller
     * @private
     */
    function controller($scope, widgetService){

        $scope.title = 'List';
        $scope.widgetType = 'list';
            
        widgetService.heartbeat(function(status){

            $scope.lastUpdated = status.hours + ':' + status.minutes;

            $scope.update([
                {
                    'description': 'This looks like a list',
                    'value': 'Oh hell, it IS a list!'
                },
                {
                    'description': 'With multiple items indeed',
                    'value': 'My day just got better.'
                }
            ]);
            
        }, 1 * 60 * 1000 ); // 1 minutes
    }


})(window, window.angular);