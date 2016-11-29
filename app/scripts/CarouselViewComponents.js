/**
 * @description the components utilized by carousel-view.html
 * @author Akshay Abraham
 */

(function () {
   'use strict';
}());

var app = angular.module('sample-project');

app.controller('CarouselViewController', ['$http', '$scope', '$timeout', function ($http, $scope, $timeout) {
    //TODO
    $scope.init = function () {
        $scope.info = {
            playList: []
        };
        $scope.showHistory = false;
    };

    $scope.init();
}]);

/**
 * @description a directive to render a carousel view containing scope.video clips
 * @author Akshay Abraham
 *
 * @usage <carousel ng-modal="obj-array" ng-show="boolean" json-path="json" response-name="string"/>
 */
app.directive('carousel',['$http', '$log', '$timeout', function($http, $log, $timeout) {
    return {
        restrict: 'E',
        scope: {
            ngModel: '=',
            jsonPath: '@',
            responseName: '@',
            playList: '='
        },
        templateUrl: 'scripts/carousel-template.html',
        link: function(scope, elm, attrs, controllers, transclude) {
            /**
             * @description This method is called when the user presses the 'Esc' key while viewing a scope.video
             */
            scope.keyboardVideoActions = function (event) {
                if (event.keyCode === 27) {
                    scope.isVideoSelected = false;

                    scope.video.trigger('pause');
                    scope.video[0].currentTime = 0;
                    scope.videoCarousel.focus();
                } else if (event.keyCode === 32) {
                    scope.togglePlayer();
                } else if (event.keyCode === 70) {
                    scope.enterFullscreen();
                }
            };

            /**
             * @description This method is called on initialization of the controller
             */
            scope.init = function () {
                scope.videoCarousel = $(elm).find('.video-carousel');
                scope.overlayContent = $(elm).find('.content');
                scope.video = $(elm).find('video');
                scope.isPlay = false;
                scope.isFullscreen = false;
                scope.progressVal = 0;

                scope.width = 219;

                if (scope.jsonPath) {
                    $http.get(scope.jsonPath).then(function (res) {
                        scope.videoList = res.data[scope.responseName] || [];
                        scope.activeIndex = 0;
                        scope.selectedVideo = scope.videoList[0];
                        scope.videoCarousel.focus();
                    });
                } else if (scope.playList) {
                    scope.videoList = scope.playList;
                    scope.activeIndex = 0;
                    scope.selectedVideo = scope.videoList[0];
                    scope.videoCarousel.focus();
                } else {
                    $log.error('Either jsonPath or dataList is required');
                }
            };

            /**
             * @description This method is called whenever the user tries to navigate through the carousel with the left and right arrows
             */
            scope.navigate = function(event) {
                event.preventDefault();

                if (event.keyCode === 39) {
                    scope.activeIndex = scope.activeIndex === (scope.videoList.length - 1) ? 0 : (scope.activeIndex + 1);
                    scope.videoCarousel.animate({ scrollLeft: event.target.clientWidth * Math.floor((scope.width * scope.activeIndex)/event.target.clientWidth)}, "fast");
                } else if (event.keyCode === 37) {
                    scope.activeIndex = scope.activeIndex === 0 ? (scope.videoList.length - 1) : (scope.activeIndex - 1);
                    scope.videoCarousel.animate({ scrollLeft: event.target.clientWidth * Math.floor((scope.width * scope.activeIndex)/event.target.clientWidth)}, "fast");
                } else if (event.keyCode === 13) {
                    scope.playVideo();
                }

                scope.selectedVideo = scope.videoList[scope.activeIndex];
            };

            /**
             * @description This method is called when the user clicks on the 'Play scope.video' button or the user presses enter when a scope.video is selected in the carousel
             */
            scope.playVideo = function () {
                scope.isVideoSelected = true;

                if (scope.ngModel) {
                    scope.ngModel.push(scope.videoList[scope.activeIndex]);
                }

                $timeout(function () {
                    scope.overlayContent.focus();
                }, 100);
            };

            /**
             * @description This method is called when the user manually selects a scope.video off the carousel
             */
            scope.selectVideo = function(index) {
                scope.activeIndex = index;
                scope.selectedVideo = scope.videoList[scope.activeIndex];
                scope.videoCarousel.animate({ scrollLeft: event.target.clientWidth * Math.floor((scope.width * scope.activeIndex)/event.target.clientWidth)}, "fast");
            };

            /**
            * @description This method plays or pauses the video
            */
            scope.togglePlayer = function(event) {
                scope.isPlay = !scope.isPlay;
                scope.video[0][scope.isPlay ? 'play' : 'pause']();
            };

            /**
             * @description This method triggers fullscreen mode
             */
            scope.enterFullscreen = function(event) {
                scope.video[0].webkitRequestFullscreen();
            }

            scope.init();

            elm.find('video').on('timeupdate', function () {
               scope.$apply(function () {
                   scope.progressVal = Math.floor((scope.video[0].currentTime / scope.video[0].duration) * 100);
               });
            });
        }
    };
}]);

/**
 * @description a filter to return a trusted URL
 * @author Akshay Abraham
 */
app.filter('trustUrl',['$sce', function($sce) {
    return function (url) {
        return $sce.trustAsResourceUrl(url);
    };
}]);