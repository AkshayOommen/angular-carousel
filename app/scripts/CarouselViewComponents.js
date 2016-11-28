/**
 * @description the components utilized by carousel-view.html
 * @author Akshay Abraham
 */

(function () {
   'use strict';
}());

var app = angular.module('sample-project');

app.controller('CarouselViewController', ['$http', '$scope', '$timeout', function ($http, $scope, $timeout) {
    var videoCarousel,
        overlayContent,
        video;
    /**
     * @description This method is called when the user presses the 'Esc' key while viewing a video
     */
    $scope.exitVideoPlay = function (event) {
        if (event.keyCode === 27) {
            $scope.isVideoSelected = false;

            video.trigger('pause');
            video[0].currentTime = 0;
            videoCarousel.focus();
        }
    };

    /**
     * @description This method is called on initialization of the controller
     */
    $scope.init = function () {
        videoCarousel = $('.video-carousel');
        overlayContent = $('.content');
        video = $('video');

        $http.get('../app/scripts/videoList.json').then(function (res) {
            $scope.videoList = res.data.entries || [];
            $scope.activeIndex = 0;
            $scope.selectedVideo = $scope.videoList[0];
            videoCarousel.focus();
        });
    };

    /**
     * @description This method is called whenever the user tries to navigate through the carousel with the left and right arrows
     */
    $scope.navigate = function(event) {
        $scope.width = 223;
        if (event.keyCode === 39) {
            $scope.activeIndex = $scope.activeIndex === ($scope.videoList.length - 1) ? 0 : ($scope.activeIndex + 1);
            videoCarousel.animate({ scrollLeft: $scope.width * $scope.activeIndex}, "fast");
        } else if (event.keyCode === 37) {
            $scope.activeIndex = $scope.activeIndex === 0 ? ($scope.videoList.length - 1) : ($scope.activeIndex - 1);
            videoCarousel.animate({ scrollLeft: $scope.width * $scope.activeIndex}, "fast");
        } else if (event.keyCode === 13) {
            $scope.playVideo();
        }

        $scope.selectedVideo = $scope.videoList[$scope.activeIndex];
    };

    /**
     * @description This method is called when the user clicks on the 'Play video' button or the user presses enter when a video is selected in the carousel
     */
    $scope.playVideo = function () {
        $scope.isVideoSelected = true;
        $timeout(function () {
            overlayContent.focus();
        }, 100);
    };

    /**
     * @description This method is called when the user manually selects a video off the carousel
     */
    $scope.selectVideo = function(index) {
        $scope.activeIndex = index;
        $scope.selectedVideo = $scope.videoList[$scope.activeIndex];
    };

    $scope.init();
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