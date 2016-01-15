(function (noteApp) {
"use strict";
    
angular.module('NoteTaker').controller('NotesController', ['$scope', '$http', 'Note', function($scope, $http, Note){
    
    $scope.notes = {};
    $scope.noteData = {};
    var currentNote = null;
    var token = localStorage.getItem("loginCookie");
    
    getNotes();
    
    /*
    * Get all notes
    *
    */
    function getNotes(){
        Note.getNotes().then(function(response){
                $scope.notes = response;
            }, function(response){
                 console.log(response);
                 throw response.status + "  : " + response.statusText;
        });
    }
    
    /**
    * Get note by id
    *
    */
    $scope.getNoteById = function(note){
        currentNote = note;
        var newNote = $scope.noteData;
        
        Note.getNoteById(note.id)
            .then(function(response){
                newNote.title = response.title;
                newNote.text = response.text;
            }, function(response){
                 console.log(response);
                 throw response.status + "  : " + response.statusText;
            });
    };
    
    /**
    * Delete note
    *
    */
    $scope.deleteNote = function(){
        if(currentNote){
            Note.deleteNote(currentNote.id)
                .then(function(response){
                    for(var i = 0; i < $scope.notes.length; i++){
                        if($scope.notes[i].id == currentNote.id){
                            $scope.notes.pop($scope.notes[i]);
                        }
                    }
                    currentNote = null;
                }, function(response){
                     console.log(response);
                     throw response.status + "  : " + response.statusText;
                });
            $scope.noteData = {};
        }
    };
    
    /**
    * Updates a note
    *
    */
    $scope.updateNote = function(){
        var noteData = $scope.noteData;
        var data = {"noteData":{"id":currentNote.id,"userId":token,"title":$scope.noteData.title,"text":$scope.noteData.text,"_sourceData":{"title":currentNote.title,"text":currentNote.text,"userId":token,"id":currentNote.id}}};
        
        Note.updateNote(currentNote.id, data)
            .then(function(response){
                for(var i = 0; i < $scope.notes.length; i++){
                    if($scope.notes[i].id == currentNote.id){
                        $scope.notes[i].title = noteData.title;
                        $scope.notes[i].text = noteData.text;
                    }
                }
                currentNote = null;
            }, function(response){
                 console.log(response);
                 throw response.status + "  : " + response.statusText;
            });
        $scope.noteData = {};
    };
    
    /**
    * Add note
    *
    */
    $scope.addNote = function(){
        var data = {"noteData":{"title":$scope.noteData.title,"text":$scope.noteData.text}};
        
        Note.addNote(data)
            .then(function(response){
                $scope.notes.push(response)
            }, function(response){
                 console.log(response);
                 throw response.status + "  : " + response.statusText;
            });
        $scope.noteData = {};
    };
    
    /**
    * Updates a selected note, if no note is selected a new note is created
    *
    */
    $scope.saveNote = function(){
        if(!currentNote){
            $scope.addNote();
        } else {
            $scope.updateNote();
        }
    };
    
    /**
    * Clears data to create a new note
    *
    */
    $scope.newNote = function(){
        $scope.noteData = {};
        currentNote = null;
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
    
}]);
    
}(window.noteApp || (window.noteApp = {})));