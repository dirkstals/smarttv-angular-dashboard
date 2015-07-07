(function(window, angular, undefined){
    
    'use strict';

    /**
     * Create a new module and
     * attach all dependencies
     */
    angular
        .module('testWidget', [])
        .controller('randomTest', ['$scope', '$document', 'widgetService', controller]);


    /**
     * @function controller
     * @private
     */
    function controller($scope, $document, widgetService){

        $scope.title = 'randomTest';
        $scope.widgetType = 'value';
            
        widgetService.heartbeat(function(status){

            $scope.status = status.hours + ':' + status.minutes;

            $scope.update(Math.round(100 * Math.random()));
            
        }, 1 * 60 * 1000 ); // 1 minutes
    }


})(window, window.angular);