(function(window, angular, undefined){
    
    'use strict';

    /**
     * Create a new module and
     * attach all dependencies
     */
    angular
        .module('widget')
        .directive('ngWidgetPercentage', directive);


    /**
     * @function directive
     * @private
     */
    function directive(){


        /**
         * @function controller
         * @public
         */
        var controller = function($scope, $element, $document, $q){

            var bow = 120,
                width, height,
                arc, gauge,
                updatedDate,
                sprintchart,
                completionText,
                percentageText,
                className = 'sprintchart';


            var deferred = $q.defer(),
                promise = deferred.promise; 

            /**
             * @function _init
             * @private
             */
            var _init = function(){

                sprintchart = d3.select($element[0]);

                width  = $element[0].parentNode.clientWidth;
                height = $element[0].parentNode.clientHeight;

                var radius = (height / 2) - 40;
                
                arc = d3.svg.arc()
                    .innerRadius(radius * 0.6)
                    .outerRadius(radius)
                    .startAngle(_convertValue(0));
            };

            /** 
             * @function _load
             * @private
             */
            var _load = function(){
                _init();
                _render();            
            };

            /**
             * @function _convertValue
             * @private
             */
            var _convertValue = function (value) {

                return ((value * (2 * bow / 100)) - bow) / 180 * Math.PI;
            };

            /**
             * @function _render
             * @private
             */
            var _render = function(){

                var svg = sprintchart.append("svg")
                    .attr("width", width)
                    .attr("height", height)
                    .append("g")
                    .attr("transform", "translate(" + width / 2 + "," + ((height / 2) * 1.2) + ")")

                svg.append("path")
                    .datum({ endAngle: _convertValue(100) })
                    .style("fill", "#000000")
                    .style("opacity", 0.3)
                    .attr("d", arc);

                gauge = svg.append("path")
                    .datum({ endAngle: _convertValue(0) })
                    .style("fill", "white")
                    .attr("d", arc);

                completionText = svg.append("text")
                    .style("text-anchor", "middle")
                    .style("font-size","40px")
                    .style("font-weight","700")
                    .attr('y', 10)
                    .attr('fill', 'white');


                percentageText = svg.append("text")
                    .style("text-anchor", "middle")
                    .style("font-size","24px")
                    .style("font-weight","600")
                    .style("opacity","0.7")
                    .attr('y', 40)
                    .attr('fill', 'white')
                    .text('%');

                deferred.resolve();
            };


            /**
             * @function _arcTween
             * @private
             */
            var _arcTween = function(transition, newAngle) {

                transition.attrTween("d", function(d) {

                    var interpolate = d3.interpolate(d.endAngle, newAngle);

                    return function(t) {

                        d.endAngle = interpolate(t);

                        return arc(d);
                    };
                });
            };

            /**
             * @function update
             * @public
             */
            $scope.update = function(data){

                var value = isNaN(data) ? data.value : parseInt(data),
                    total = isNaN(data) ? data.total : 100;

                promise.then(function(){

                    gauge
                        .transition()
                        .duration(750)
                        .call(_arcTween, _convertValue(100 * value / total));

                    completionText
                        .text(Math.round(100 * value / total));

                    $scope.status = value + '/' + total;
                });
            };

            $document.ready(_load);
        };


        return {
            controller : ['$scope', '$element', '$document', '$q', controller]
        };
    }

})(window, window.angular);