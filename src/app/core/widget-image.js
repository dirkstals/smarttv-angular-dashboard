(function(window, angular, undefined){
    
    'use strict';

    /**
     * Create a new module and
     * attach all dependencies
     */
    angular
        .module('widget')
        .directive('ngWidgetImage', directive);


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
            '<figure style="background: url({{data}}) 50% 50% no-repeat; background-size: contain;"></figure>',
        ].join('');


        /**
         * @function controller
         * @public
         */
        var controller = function($scope){
            
            /**
             * @function update
             * @public
             */
            $scope.update = function(data){
                $scope.data = data;
            };
        };
        

        return {
            template : template,
            controller: ['$scope', controller]
        };
    }

})(window, window.angular);