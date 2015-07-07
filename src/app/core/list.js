(function(window, angular, undefined){
    
    'use strict';

    /**
     * Create a new module and
     * attach all dependencies
     */
    angular
        .module('list', [])
        .directive('ngWidgetList', directive);


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
            '<md-list>',
                '<md-list-item class="md-2-line" ng-repeat="item in list">',
                    '<div class="md-list-item-text">',
                        '<h3>{{ item.description }}</h3>',
                        '<p>{{ item.value }}</p>',
                    '</div>',
                    '<md-divider ng-if="!$last"></md-divider>',
                '</md-list-item>',
            '</md-list>'
        ].join('');


        /**
         * @function controller
         * @public
         */
        var controller = function(){
            console.log('list');
        };
        

        return {
            template : template,
            controller: controller
        };
    }

})(window, window.angular);