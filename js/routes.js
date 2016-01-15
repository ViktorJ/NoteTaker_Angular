(function (noteApp) {
"use strict";
    
angular.module('NoteTaker').config(function($routeProvider){
    $routeProvider
        .when('/home', {
            templateUrl: 'templates/home.html'
        })
    
        .when('/notes', {
            templateUrl: 'templates/notes.html',
            controller: 'NotesController'
        })
    
        .when('/about', {
            templateUrl: 'templates/about.html'
        })
    
        .otherwise({
            redirectTo: '/home'
        });
});
    
    
}(window.noteApp || (window.noteApp = {})));