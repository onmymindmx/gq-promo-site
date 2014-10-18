'use strict';

/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.
angular.module('myApp.services', []).
  factory('instagram', ['$http', function($http){
  	return {
  		fetchHashTag: function(callback){
  			var endPoint = 'https://api.instagram.com/v1/tags/quintanaroo/media/recent?client_id=37943a0600174910ae37137b80c35f6b&callback=JSON_CALLBACK';

  			$http.jsonp(endPoint).success(function(response){
  				callback(response.data);
  			});
  		}
  	};
  }]);
