(function(window, undefined){

    'use strict';

    /**
     * @function load
     * @private
     */
    var _load = function(){

        try {

            // For Samsung Smart Tv only
            var widgetAPI = new Common.API.Widget();
            widgetAPI.sendReadyEvent();
        } catch (e) {

            // For browsers
            window.debug = true;
        }
    };


    /**
     * listen for event and add the load handler
     * attach for IE
     */
    window.addEventListener ? 
    window.addEventListener("load", _load, false) : 
    window.attachEvent && window.attachEvent("onload", _load);


    /**
     * Create the main Angular Module
     */ 
    angular.module('dashboard', ['ngMaterial', 'widget']);

})(window);
