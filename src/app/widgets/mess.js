(function(window, angular, undefined){
    
    'use strict';

    /**
     * Create a new module and
     * attach all dependencies
     */
    angular
        .module('messWidget', [])
        .service('messService', ['$http', '$timeout', service])
        .controller('mess', ['$scope', 'widgetService', 'messService', controller]);

    /**
     * @function service
     * @private
     */
    function service($http){

        /**
         * @function getData
         * @public
         */
        this.getData = function(callback) {
            
            $http.get('http://ishetlekkerindemess.be').success(function(result){

                var items = [];

                $(result.replace(/\ssrc="\S*/g, "")).find('.item').each(function(key, item) {
                    
                    items.push({
                        'description'   : $(item).find('img').attr('alt'),
                        'value'         : $(item).text().trim()
                    });
                });
                
                callback(items);
            });
        };
    }

    /**
     * @function controller
     * @private
     */ 
    function controller($scope, widgetService, messService){
        
        $scope.title = "Vandaag in de Mess";

        widgetService.heartbeat(function(status){
     
            $scope.status = status;

            messService.getData(function(data){
                
                $scope.list = data;
            });
        }, 1 * 60 * 60 * 1000); // 1 hour
    }
        
})(window, window.angular);