(function(window, angular, undefined){
    
    'use strict';

    /**
     * Create a new module and
     * attach all dependencies
     */
    angular
        .module('dashboard')
        .service('memeService', ['$http', service])
        .controller('meme', ['$scope', 'widgetService', 'memeService', controller]);


    /**
     * @function controller
     * @private
     */
    function controller($scope, widgetService, memeService){

        $scope.header = false;
        $scope.footer = false;
        $scope.widgetType = 'image';
            
        widgetService.heartbeat(function(status){

            $scope.lastUpdated = status.hours + ':' + status.minutes;

            memeService.getData($scope.update);
            
        }, 5 * 60 * 1000 ); // 5 minutes
    }

    /**
     * @function service
     * @private
     */
    function service($http){

        // What meme to show
        var meme = 'Business-Cat';

        // The Memegenerator API
        var server = 'http://version1.api.memegenerator.net/';

        // parameters
        var parameters = 'Instances_Select_ByPopular?languageCode=en&urlName=' + meme + '&days=30';

        /**
         * @function _shuffle
         * @private
         */
        var _shuffle = function(a,b,c,d){
            
            c=a.length;while(c)b=Math.random()*c--|0,d=a[c],a[c]=a[b],a[b]=d
        };


        /**
         * @function getData
         * @public
         */
        var getData = function(callback) {
            
            $http.get(server + parameters).success(function(data){
                
                _shuffle(data.result);
                
                callback(data.result[0].instanceImageUrl);
            });
        };

        return {
            getData : getData
        };
    };


})(window, window.angular);