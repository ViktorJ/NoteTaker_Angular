(function (noteApp) {
"use strict";
    
angular.module('NoteTaker').controller('LoginController', ['$scope', '$http', '$window', 'User', function($scope, $http, $window, User){
    $scope.user = {};
    $scope.msg = "";
    
    /**
    * Add a new user
    *
    */
    $scope.addUser = function(){
        var user = $scope.user;
        User.addUser(user)
            .then(function(response){
                if(response === 201){
                    $scope.msg = "Account created, please log in to access the notes.";
                } 
            }, function(response){
                 console.log(response);
                 throw response.status + "  : " + response.statusText;
            });
        $scope.user = {};
    };
    
    /**
    * Login an user
    *
    */
    $scope.loginUser = function(){
        var user = $scope.user;
          
        User.loginUser(user)
                .then(function(response){
                    localStorage.setItem("loginCookie", response.data);
                    $window.location = 'index.html#/notes';
                }, function(response){
                     console.log(response);
                     throw response.status + "  : " + response.statusText;
                });
        $scope.user = {};
    };
    
    /**
    * Logout user
    *
    */
    $scope.logoutUser = function(){
        $window.location = 'index.html#/home';
        localStorage.removeItem("loginCookie");
    };
    
    /**
    * Check if user is logged in
    *
    * @return true if user is logged in, otherwise false
    */
    $scope.isLoggedIn = function(){
        var loggedIn = false;
        
        if(localStorage.length === 1){
            loggedIn = true;
        }
        return loggedIn;
    };
    
    /**
    * return true if $scope.msg is not an empty string, otherwise return false
    */
    $scope.isMsg = function(){
        if(!$scope.msg == ""){
            return true;
        } else {
            return false;
        }
    };
    
}]);
    
}(window.noteApp || (window.noteApp = {})));