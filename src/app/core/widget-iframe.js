(function(window, angular, undefined){
    
    'use strict';

    /**
     * Create a new module and
     * attach all dependencies
     */
    angular
        .module('widget')
        .directive('ngWidgetIframe', directive);


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
            '<style>',
                'iframe.iframe{',
                    'transform: scale({{scale}});',
                    '-webkit-transform: scale({{webkitscale}});',
                    '-webkit-transform-origin: 0 0;',
                    'transform-origin: 0 0;',
                    'width: {{width}};',
                    'height: {{height}};',
                    'position: absolute;',
                    'left: 0px;',
                    'right: 0px;',
                    'top: {{top}};',
                    'background-color : #FFF;',
                '}',
            '</style>',
            '<iframe ng-src="{{url}}" class="iframe" frameBorder="0" width="100%">'
        ].join('');


        /**
         * @function controller
         * @private
         */
        var controller = function($scope, $element, $sce, $http, widgetService){

            /**
             * variables
             */
            var widgetType,
                attributes,
                element,
                parentAttributes,
                title,
                scale,
                updateInterval,
                rows,
                width,
                top,
                height;


            /**
             * @function _init
             * @private
             */
            var _init = function(){

                widgetType = 'iframe';
                element = $element[0].parentNode.parentNode;
                attributes = element.attributes;
                parentAttributes = element.parentNode.parentNode.attributes;
                title = attributes['widget-title'] ? attributes['widget-title'].value : 'Iframe';
                scale = attributes['widget-scale'] ? parseFloat(attributes['widget-scale'].value) : 1;
                scale = $scope.widgetScale ? $scope.widgetScale : scale;
                updateInterval = attributes['widget-update'] ? parseInt(attributes['widget-update'].value) : false;
                rows = parentAttributes['md-rowspan'] ? parseInt(parentAttributes['md-rowspan'].value) : 1;
                width = 'calc(' + (100 / scale) + '% - ' + (0 / scale) + 'px)';
                top = ($scope.header ? 48 : 0) + 'px';
                height = 'calc(' + (100 / scale) + '% - ' + (($scope.header ? 48 : 0) + ($scope.footer ? 48 : 0) / scale) + 'px)';


                if(updateInterval){

                    widgetService.heartbeat(_heartbeat, updateInterval);
                }
            }

            /**
             * @function update
             * @public
             */
            var update = function(data){

                $scope.url = $sce.trustAsResourceUrl(data);
            };


            /**
             * @function _heartbeat
             * @private
             */
            var _heartbeat = function(status){

                $scope.update($element[0].attributes['widget-url'].value);

                $scope.lastUpdated = status.hours + ':' + status.minutes;
            };


            /**
             * Initialize controller
             */
            _init();


            /**
             * expose data to scope
             */
            $scope.title = title;
            $scope.widgetType = widgetType;
            $scope.scale = 
            $scope.webkitscale = 
            $scope.zoom = scale;
            $scope.width = width;
            $scope.height = height;
            $scope.top = top;
            $scope.update = update;
        }

        return {
            template : template,
            controller: ['$scope', '$element', '$sce', '$http', 'widgetService', controller]
        };
    }

})(window, window.angular);