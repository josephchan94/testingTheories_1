angular.module('controller', [])

//controller setup
.controller('igCtrl', function($scope, Instagram){ //pass in scope
  var id = '8e8390095f1f4b5c82a187442cc5bacc';
  var rdi = 'http://ig.bruinmobile.com';
  $scope.auth0='https://instagram.com/oauth/authorize/?client_id='+ id +'&redirect_uri='+ rdi +'&response_type=token';
  $scope.loggedin=function(){
    console.log('loggedin');
  }
	var currentURL = window.location.href;
  if(!currentURL.match("access_token"))return; // add return to make run only if access token is available
  var at = currentURL.slice(currentURL.indexOf('access_token'));
	console.log(at);



  Instagram.get(9, "bunny").success(function(response) {
    $scope.images=response.data; //IG function returns a promise, when promise is .success, , returns function as parameter
    console.log($scope.images);
  });

}) // dont need semi colon after ctrl

/* .factory('igService', function($http){      //pass in http to function to use it
  $http.get(url, function(data){               //http.get allows for http get request

  })
})
*/
.factory('Instagram', ['$http',
	function($http) {
		var base = "https://api.instagram.com/v1";
		var clientId = '8e8390095f1f4b5c82a187442cc5bacc';
		return {
			'get': function(count, hashtag) {
				var request = '/tags/' + hashtag + '/media/recent';
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
