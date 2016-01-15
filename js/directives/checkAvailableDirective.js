(function (noteApp) {
"use strict";
    
angular.module('NoteTaker').directive('checkAvailable', ['$http', function($http){
    return {
        require: 'ngModel',
		link: function(scope, element, attribute, ctrl){
            ctrl.$validators.checkAvailable = function(modelValue, viewValue){
			     $http.get('http://localhost:4500/api/users/check-availability/' +  viewValue)
                .then(function(response){
                     if(response.data.available === false){
                        ctrl.$setValidity('checkAvailable', false);
                        return false;
                     } else {
                        ctrl.$setValidity('checkAvailable', true);
                        return true;
                     }
                }, function(response){
                     console.dir(response);
                     throw response.status + "  : " + response.statusText;
                });
		    };
        }
    };
}]);
    
}(window.noteApp || (window.noteApp = {})));