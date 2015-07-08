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
        var getData = function(callback) {
            
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

        return {
            getData : getData
        };
    }

    /**
     * @function controller
     * @private
     */ 
    function controller($scope, widgetService, messService){
        
        $scope.title = "Vandaag in de Mess";
        $scope.widgetType = 'list';

        widgetService.heartbeat(function(status){
     
            $scope.status = status.hours + ':' + status.minutes;

            messService.getData(function(data){
                
                $scope.data = data;
            });
        }, 1 * 60 * 60 * 1000); // 1 hour
    }
        
})(window, window.angular);