(function(window, angular, undefined){
    
    'use strict';

    /**
     * Create a new module and
     * attach all dependencies
     */
    angular
        .module('testWidget', [])
        .controller('randomTest', ['$scope', 'widgetService', controller]);


    /**
     * @function controller
     * @private
     */
    function controller($scope, widgetService){

        $scope.title = 'randomTest';
        $scope.widgetType = 'percentage';

        var _load = function(){

            widgetService.heartbeat(function(status){

                $scope.status = status;

                $scope.update(Math.round(100 * Math.random()));
                
            }, 1 * 60 * 1000 ); // 1 minutes

        }


        window.addEventListener ? 
        window.addEventListener("load", _load, false) : 
        window.attachEvent && window.attachEvent("onload", _load);

        
    }


})(window, window.angular);