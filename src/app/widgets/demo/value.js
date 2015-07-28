(function(window, angular, undefined){
    
    'use strict';

    /**
     * Create a new module and
     * attach all dependencies
     */
    angular
        .module('dashboard')
        .controller('value', ['$scope', 'widgetService', controller]);


    /**
     * @function controller
     * @private
     */
    function controller($scope, widgetService){

        $scope.title = 'Value';
        $scope.widgetType = 'value';
            
        widgetService.heartbeat(function(status){

            $scope.lastUpdated = status.hours + ':' + status.minutes;

            $scope.update(Math.round(100 * Math.random()));
            
        }, 1 * 60 * 1000 ); // 1 minutes
    }


})(window, window.angular);