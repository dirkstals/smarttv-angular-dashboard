(function(window, angular, undefined){

    'use strict';

    /**
     * Create a new module and
     * attach all dependencies
     */
    angular
        .module('radioplusWidget', [])
        .factory('radioplusSocket', factory)
        .service('radioplusService', ['radioplusSocket', service])
        .controller('radioplus', ['$scope', 'widgetService', 'radioplusService', controller]);


    /**
     * @function controller
     * @private
     */
    function controller($scope, widgetService, radioplusService){

        /**
         * @type {string} 
         * @public
         */
        var template = [
            '<ul>',
                '<li ng-repeat="channel in channels">{{channel.name}}',
                    '<ul>',
                        '<li ng-repeat="error in channel.errors">{{error.key}} : {{error.value}}</li>',
                    '</ul>',
                '</li>',
            '</ul>'
        ].join('');

        /**
         * @function _updateData
         * @private
         */
        var _updateData = function(data){

            $scope.online = true;
            $scope.channels = data;
            
            if(window.debug){

                angular.forEach(data, function(channel){

                    if(channel.errors.length > 0){

                        angular.forEach(channel.errors, function(error){

                            console.log(channel.name, error.key, error.original);
                        });
                    }
                });
            }
        };

        radioplusService.init(_updateData);
        
        widgetService.heartbeat(function(status){ 

            $scope.status = status.hours + ':' + status.minutes;

            radioplusService.heartbeatFunction(_updateData); 

        }, 1 * 60 * 1000); // 1 minute
    

        $scope.title = 'Radioplus';
        $scope.customTemplate = template;
    }


    /**
     * @function factory
     * @private
     */
    function factory(){

        var socket = io.connect('http://radioplusnode.vrt.be', {
            'reconnect':false, 
            'reconnection delay': 5000, 
            'reconnection limit': 0, 
            'max reconnection attempts':0,
            transports: ['websocket']
        });

        return socket;
    }

    /**
     * @function service
     * @private
     */
    function service(socket){

        /**
         * @type {boolean} 
         * @private
         */
         var online = false;


        /**
         * @type {boolean} 
         * @private
         */
         var socketStarted = false;

        /**
         * @function _parseDate
         * @private
         */
        var _parseDate = function(d){

            return d ? ( Math.ceil( ( new Date( ( new Date() ).getTime() - ( new Date( d ) ).getTime() ) ) / ( 1000 * 60 ) ) ) : 0;
        };

        /**
         * @function _parseCurrentState
         * @private
         */
        var _parseCurrentState = function(result){

            var relevantInformation = [];

            angular.forEach(result, function(channel){

                var errors = [];
    /*
                if( channel.data.feed.length && parseDate( channel.data.feed[0].data.timestamp ) < ( -60 * 6 ) ){

                    errors.feed = 'laatste tweet is langer dan 6 uur geleden';
                }
    */          
                var newsMinutesGoneby = _parseDate( channel.channel.news.startTimestamp );

                if( newsMinutesGoneby > 120 ){

                    errors.push(
                        {
                            key      : 'nieuws',
                            value    : 'laatste nieuws is ' + newsMinutesGoneby + ' minuten geleden',
                            original : channel.channel.news 
                        }
                    );
                }

                if( _parseDate( channel.data.program.startTime ) < 0 ||  _parseDate( channel.data.program.endTime ) > 0 ){

                    errors.push(
                        {
                            key      : 'programma',
                            value    : 'programma uren kloppen niet',
                            original : channel.data.program
                        }
                    );
                }

                if( channel.data.program.playlist.length){

                    var playlistMinutesGoneby = _parseDate( channel.data.program.playlist[0].timestamp )

                    if( playlistMinutesGoneby > 15 ){

                        errors.push(
                            {
                                key      : 'playlistitem',
                                value    : 'Laatste playlist item is ' + playlistMinutesGoneby + ' minuten geleden',
                                original : channel.data.program.playlist
                            }
                        );
                    }
                }else{

                    errors.push(
                        {
                            key      : 'playlist',
                            value    : 'Geen playlist beschikbaar',
                            original : channel.data.program
                        }
                    );
                }

                if( channel.data.song ){

                    var songMinutesGoneby = _parseDate( channel.data.song.timestamp )

                    if( songMinutesGoneby > 15 ){

                        errors.push(
                            {
                                key      : 'song',
                                value    : 'Laatste song is ' + songMinutesGoneby + ' minuten geleden',
                                original : channel.data.song
                            }
                        );
                    }
                }

                // latestOndemand : channel.data.ondemandnew.length ? _parseDate( channel.data.ondemandnew[0].startTime ) : null,
                if( errors.length > 0 ){

                    relevantInformation.push(
                        {
                            name   : channel.channel.info.name,
                            errors : errors
                        }
                    );
                }
            });

            return relevantInformation;
        };


        /**
         * @function _checkSocketState
         * @private
         */
        var _checkSocketState = function(){

            if( !socket.socket.connected && !socket.socket.connecting ){

                online = false;
                
                socket.socket.disconnect();
                setTimeout(socket.socket.connect, 4000);
            }else{

                online = true;
            }
        };

        /**
         * @function _getCurrentState
         * @private
         */
        var _getCurrentState = function(callback){
            
            socket.emit('getCurrentState', function(result){

                callback(_parseCurrentState(result));
            });
        };

        /**
         * @function init
         * @public
         */
        var init = function( callback ) {

            socket.on('connect', function(){

                socketStarted = true;
                online = true;
            });

            socket.on('currentState', function( result ){
                callback(_parseCurrentState( result ) );
            });

        };

        /**
         * @function onHeartbeat
         * @public
         */
        var heartbeatFunction = function( callback ) {

            if( socketStarted ){

                _checkSocketState();
                _getCurrentState(callback);
            }
        };

        return {
            init: init,
            heartbeatFunction: heartbeatFunction
        };
    }

})(window, window.angular);