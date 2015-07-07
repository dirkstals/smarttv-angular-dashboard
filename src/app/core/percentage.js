(function(window, angular, undefined){
    
    'use strict';

    /**
     * Create a new module and
     * attach all dependencies
     */
    angular
        .module('percentage', [])
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
        var controller = function($scope, $element){

            var bow = 120,
                width, height,
                arc, gauge,
                updatedDate,
                sprintchart,
                completionText,
                percentageText,
                className = 'sprintchart';

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
            }

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
                    .style("font-size","34px")
                    .style("font-weight","bold")
                    .attr('y', 10)
                    .attr('fill', 'white');
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
            }

            /**
             * @function update
             * @public
             */
            $scope.update = function(data){

                gauge
                    .transition()
                    .duration(750)
                    .call(_arcTween, _convertValue(data));

                completionText
                    .text(Math.round(data) + '%');
            };

            window.addEventListener ? 
            window.addEventListener("load", _load, false) : 
            window.attachEvent && window.attachEvent("onload", _load);

        };


        return {
            controller : ['$scope', '$element', controller]
        }
    }

})(window, window.angular);