(function (noteApp) {
"use strict";

angular.module('NoteTaker').factory('User', ['$http', function($http){

    var URL = "http://localhost:4500/api/";
    var User = {};

    /**
    * Add new user
    *
    * @param data, the user info
    * @return response from the server
    */
    User.addUser = function(data){
        var request = {
    			method: "POST",
    			url: URL + "users/",
    			data: data
    		};

        return $http(request)
            .then(function(response){
                return response.status;
            }, function(response){
                 console.log(response);
                 throw response.status + "  : " + response.statusText;
            });
    };

    /**
    * Login an existing user
    *
    * @param data, the user info
    * @return response from the server
    */
    User.loginUser = function(data){
        var request = {
    			method: "POST",
    			url: URL + "login/",
    			data: data
    		};

        return $http(request).then(function(response){
             return response;
        }, function(response){
             throw response.status + "  : " + response.statusText;
        });
    };

    //API
    return User;
}]);

}(window.noteApp || (window.noteApp = {})));
