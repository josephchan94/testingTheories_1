angular.module('controller', [])

//controller setup
.controller('igCtrl', function($scope, Instagram){ //pass in scope
  var id = '8e8390095f1f4b5c82a187442cc5bacc';
  var rdi = 'http://ig.bruinmobile.com';
  $scope.auth0='https://instagram.com/oauth/authorize/?client_id='+ id +'&redirect_uri='+ rdi +'&response_type=token';
  $scope.loggedin=function(){ //this function is called when you click button in index.html with ng-click
    console.log('loggedin');
  }
	var currentURL = window.location.href; //grabs the current url and puts it in var currentURL
  if(!currentURL.match("access_token"))return; // if no access token in currentURL, do nothing
  var at = currentURL.slice(currentURL.indexOf('access_token')); // slices currentURL to get active token
	console.log(at);

  Instagram.get($scope.numPhotos, $scope.hashtag).success(function(response) { //Instagram factory init. .get is a property of Instagram factory, it's a function. It gets the number of images posted back, and the hashtag.
    $scope.images=response.data; //IG function returns a promise, when promise is .success, , returns function as parameter
    console.log($scope.images);
  });
}) // dont need semicolon after ctrl

factory('Instagram', ['$http',
	function($http) {
		var base = "https://api.instagram.com/v1"; // base ig name.
		var clientId = '8e8390095f1f4b5c82a187442cc5bacc'; // developer id.
		return {
			'get': function(count, hashtag) {
				var request = '/tags/' + hashtag + '/media/recent'; // input hashtag
				var url = base + request;
				var config = {
					'params': {
						'client_id': clientId,
						'count': count,
						'callback': 'JSON_CALLBACK'
					}
				};
				return $http.jsonp(url, config); // gets json file from the url its passed to
			}
		};
	}
]);

// <input type = "text" ng-model = "variablename">
// variable can accessed to a $scope.variablename
// add a button to do refresh & randomizer.
