(function(window, angular, undefined){
    
    'use strict';

    /**
     * Create a new module and
     * attach all dependencies
     */
    angular
        .module('widget')
        .controller('iframe', ['$scope', '$element', '$sce', 'widgetService', controller])
        .directive('ngWidgetIframe', directive);


    /**
     * @function controller
     * @private
     */
    function controller($scope, $element, $sce, widgetService){

        $scope.title = $element[0].attributes['widget-title'].value || 'Iframe';
        $scope.footer = true;
        $scope.widgetType = 'iframe';
        $scope.url = $sce.trustAsResourceUrl($element[0].attributes['widget-url'].value);

        var attributes = $element[0].attributes;
        var parentAttributes = $element[0].parentNode.parentNode.attributes

        var scale = attributes['widget-scale'] ? parseFloat(attributes['widget-scale'].value) : 1;
        var rows = parentAttributes['md-rowspan'] ? parseInt(parentAttributes['md-rowspan'].value) : 1;

        $scope.scale = $scope.webkitscale = $scope.zoom = scale;
        $scope.width = 'calc(' + (100 / scale) + '% - ' + (4 / scale) + 'px)';
        $scope.height = 'calc(' + (100 / scale) + '% - ' + (96 / scale) + 'px)';

        widgetService.heartbeat(function(status){

            $element[0].querySelector('iframe').contentWindow.location.reload(true);

            $scope.lastUpdated = status.hours + ':' + status.minutes;

        }, 1 * 60 * 1000 ); // 1 minute
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
            '<style>',
                'iframe.iframe{',
                    'zoom: {{zoom}};',
                    'transform: scale({{scale}});',
                    '-webkit-transform: scale({{webkitscale}});',
                    '-webkit-transform-origin: 0 0;',
                    'transform-origin: 0 0;',
                    'width: {{width}};',
                    'height: {{height}};',
                    'position: absolute;',
                    'left: 2px;',
                    'right: 2px;',
                    'top: 48px;',
                    'background-color : #FFF;',
                '}',
            '</style>',
            '<iframe ng-src="{{url}}" class="iframe" frameBorder="0" width="100%">'
        ].join('');

        return {
            template : template
        };
    }

})(window, window.angular);