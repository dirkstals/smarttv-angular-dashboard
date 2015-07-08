(function(window, angular, undefined){
    
    'use strict';

    /**
     * Create a new module and
     * attach all dependencies
     */
    angular
        .module('widget')
        .controller('clock', ['$scope', 'widgetService', controller])
        .directive('ngWidgetClock', directive);


    /**
     * @function controller
     * @private
     */
    function controller($scope, widgetService){

        $scope.title = 'Klok';
        $scope.footer = false;
        $scope.widgetType = 'clock';

        widgetService.heartbeat(function(status){

            $scope.data = {
                date: status.day + ' ' + status.month + ' ' + status.year,
                time: status.hours + ':' + status.minutes + ':' + status.seconds
            };

        }, 1000 ); // 1 second
    }



    /**
     * @function directive
     * @private
     */
    function directive(){

        /**
         * @type {string} 
         * @public
         */
        var template = [            
            '<h3 class="center">{{ data.date }}</h3>',
            '<h4>{{ data.time }}</h4>',
        ].join('');


        return {
            template : template
        };
    }

})(window, window.angular);