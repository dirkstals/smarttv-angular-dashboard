(function(window, angular, undefined){

    'use strict';

    /**
     * Create a new module and
     * attach all dependencies
     */
    angular
        .module('trafficWidget', [])
        .controller('traffic', ['$scope', 'widgetService', controller]);

    /**
     * @function controller
     * @private
     */
    function controller($scope, widgetService){

        var map, 
            trafficLayer,
            mapOptions = { 
                zoom: 9, 
                disableDefaultUI: true
            };
        
        /**
         * @type {string} 
         * @public
         */
        var template = [
            '<figure id="traffic"></figure>'
        ].join('');


        /**
         * @function _renderGoogleMaps
         * @private
         */
        var _renderGoogleMaps = function() { 
            
            mapOptions.center    = new google.maps.LatLng(51.0295206, 4.4001932);
            mapOptions.mapTypeId = google.maps.MapTypeId.ROADMAP;

            map = new google.maps.Map(document.getElementById('traffic'), mapOptions); 

            trafficLayer = new google.maps.TrafficLayer(); 
            trafficLayer.setMap(map); 
        } 


        /**
         * @function _reloadTiles
         * @private
         */
        var _reloadTiles = function () {
            var tiles = $("#traffic").find("img");
            for (var i = 0; i < tiles.length; i++) {
                var src = $(tiles[i]).attr("src");
                if (/googleapis.com\/vt\?pb=/.test(src)) {              
                    var new_src = src.split("&ts")[0] + '&ts=' + (new Date()).getTime();
                    $(tiles[i]).attr("src", new_src);                                                   
                }               
            }
        }

        window.initGoogleMaps = function(){

            google.maps.event.addDomListener(window, 'load', _renderGoogleMaps); 
        };

        $scope.title = "Google Traffic Maps";
        $scope.header = false;
        $scope.footer = false;
        $scope.customTemplate = template;

        widgetService.heartbeat(_reloadTiles, 1 * 60 * 1000 ); // 1 minute

        var script = document.createElement('script');

        script.type = 'text/javascript';
        script.src = 'https://maps.googleapis.com/maps/api/js?v=3.exp&language=nl&callback=initGoogleMaps';

        document.body.appendChild(script);
    }


})(window, window.angular);