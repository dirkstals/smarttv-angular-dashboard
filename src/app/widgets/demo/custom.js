
(function(window, angular, undefined){
    
    'use strict';

    /**
     * Add a new controller to the dashboard module
     * add the dependency $scope
     */
    angular
        .module('dashboard')
        .controller('mycontrollername', ['$scope', controller]);


    /**
     * @function controller
     * @private
     */
    function controller($scope){

        $scope.title = 'My first Widget';
        $scope.data = '1337';
        $scope.status = 'Such wow';
    }

})(window, window.angular);