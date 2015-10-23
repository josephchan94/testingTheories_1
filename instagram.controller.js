angular.module('controller', [])

//controller setup
.controller('igCtrl', function($scope, Instagram, alltheIDs){ //pass in scope
  var rdi = 'http://ig.bruinmobile.com';
  $scope.auth0='https://instagram.com/oauth/authorize/?client_id='+ alltheIDs.clientid +'&redirect_uri='+ rdi +'&response_type=token';
  $scope.loggedin=function(){ //this function is called when you click button in index.html with ng-click
    console.log('loggedin');
  }

  $scope.updatePhotosHashtag = function() {
    Instagram.get($scope.numPhotos, $scope.hashtag).success(function(response) { //Instagram factory init. .get is a property of Instagram factory, it's a function. It gets the number of images posted back, and the hashtag.
    $scope.images=response.data; //IG function returns a promise, when promise is .success, , returns function as parameter
    console.log($scope.images);
  });
};
$scope.likeimage = function(image) { // this function is get the image id and pass it to Instagram factory
  var id = image.id;
  Instagram.like(id);
  console.log(id);
};
}) // dont need semicolon after ctrl

.factory('Instagram', ['$http', 'alltheIDs' // alltheIDs is a string here
function($http, alltheIDs) { // alltheIDs is a variable
  var base = "https://api.instagram.com/v1"; // base ig name.
  var clientId = '8e8390095f1f4b5c82a187442cc5bacc'; // my developer id.
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
    },
    like: function(ImageID){ // renaming the ID from $scope.likeimage's image.id
    var base = "https://api.instagram.com/v1/media/";
    var url = base + ImageID + "/likes"; // creates the like
    var parameters = {
      ACCESS_TOKEN: alltheIDs.accesstoken
    };
    $http.post(url, parameters) //passing in the URL from like, and passing clientId
    .then(function(data) {// passes in data, but do nothing with response.
      console.log('successful like!'); //logs successful like. function is called when done.
    });
  }
};
}])
.factory('alltheIDs', function(){
  var clientid = '8e8390095f1f4b5c82a187442cc5bacc';
  var currentURL = window.location.href; //grabs the current url and puts it in var currentURL
    var accesstoken = currentURL.slice(currentURL.indexOf('access_token')); // slices currentURL to get access token
  console.log(accesstoken);
  return{
    clientid: clientid, accesstoken:at // accesstoken is grabbing from at. clientid is pulling from the var on line 56.
  }
}

);

// <input type = "text" ng-model = "variablename">
// variable can accessed to a $scope.variablename
// add a button to do refresh & randomizer.
