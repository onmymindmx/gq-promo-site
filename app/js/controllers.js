'use strict';

/* Controllers */

angular.module('myApp.controllers', [])
  .controller('instagram', ['$scope', 'instagram', function($scope, instagram) {
  	$scope.foto = 'Hola';

  	instagram.fetchHashTag(function(data){
  		var maximum = data.length;
  		var minimum = 0;
  		var randomnumer = Math.floor(Math.random() * (maximum - 1)) + minimum;
  		$scope.pic = data[randomnumer];
  	});
  }]);
