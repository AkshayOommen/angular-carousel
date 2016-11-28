/**
 * @description the main JS file of the application
 * @author Akshay Abraham
 */
(function () {
   'use strict';
}());

angular.module('sample-project', ['ui.router']).config(['$stateProvider', function ($stateProvider) {
    $stateProvider
    .state('carousel-view', {
        url: '/carousel-view',
        templateUrl: 'views/carousel-view.html',
        controller: 'CarouselViewController'
    });
}]);