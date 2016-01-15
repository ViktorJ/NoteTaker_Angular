(function (noteApp) {
"use strict";
    
angular.module('NoteTaker').factory('Note', ['$http', function($http){
    
    var URL = 'http://localhost:4500/api/notes/';
    var token = localStorage.getItem("loginCookie");
    var Note = {};
    
    /**
    * Get all notes from a user
    *
    * @return the response data from the server
    */
    Note.getNotes = function(){
        var request = {
            method: "GET",
            url: URL,
            headers: {"authentication-token": token}
        };

        return $http(request)
            .then(function(response){
                return response.data;
            }, function(response){
                 console.log(response);
                 throw response.status + "  : " + response.statusText;
            });
    };
    
    /**
    * Get note based on id
    *
    * @param id, the id of the note
    * @return the response data from the server
    */
    Note.getNoteById = function(id){
        var request = {
            method: "GET",
            url: URL + id,
            headers: {"authentication-token": token}
        };

        return $http(request)
            .then(function(response){
                return response.data;
            }, function(response){
                 console.log(response);
                 throw response.status + "  : " + response.statusText;
            });
    };
    
    /**
    * Deletes note
    *
    * @param id, the id of the note
    * @return the response data from the server
    */
    Note.deleteNote = function(id){
        var request = {
            method: "DELETE",
            url: URL + id,
            headers: {"authentication-token": token}
        };

        return $http(request)
            .then(function(response){
                return response.data;
            }, function(response){
                 console.log(response);
                 throw response.status + "  : " + response.statusText;
            });
    };
    
    /**
    * Updates a note
    *
    * @param id, the id of the note
    * @param data, the data sent to the server
    * @return the response data from the server
    */
    Note.updateNote = function(id, data){
        var request = {
            method: "PUT",
            url: URL + id,
            data: data,
            headers: {"authentication-token": token}
        };
        
        return $http(request)
            .then(function(response){
                return response.data;
            }, function(response){
                 console.log(response);
                 throw response.status + "  : " + response.statusText;
            });
    };
    
    /**
    * Adds a note
    *
    * @param data, the data sent to the server
    * @return the response data from the server
    */
    Note.addNote = function(data){
        var request = {
            method: "POST",
            url: URL,
            data: data,
            headers: {"authentication-token": token}
        };
        
        return $http(request)
            .then(function(response){
                return response.data;
            }, function(response){
                 console.log(response);
                 throw response.status + "  : " + response.statusText;
            });
    };
    
    //API
    return Note;
}]);
    
}(window.noteApp || (window.noteApp = {})));