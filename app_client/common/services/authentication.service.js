(function () {

  angular
    .module('onlineApp')
    .service('authentication', authentication);

  authentication.$inject = ['$http', '$window','$rootScope'];
  function authentication ($http, $window,$rootScope) {
    var user = '';
    var saveToken = function (token) {
      $window.localStorage['onlineclass-token'] = token;
    };

    var getToken = function () {

      return $window.localStorage['onlineclass-token'];

    };

    var isLoggedIn = function() {
      var token = getToken();

      if(token){

        var payload = JSON.parse($window.atob(token.split('.')[1]));

        return payload.exp > Date.now() / 1000;
      } else {
        return false;
      }
    };

    var isVerified = function(){
      var token = getToken();

      if(token){

        var payload = JSON.parse($window.atob(token.split('.')[1]));
        return payload.verified;
      } else {
        return false;
      }
    };

    var isAdmin = function(){
      var token = getToken();
      if(token){

        var payload = JSON.parse($window.atob(token.split('.')[1]));
        if(payload.admin){
          return payload.admin;
        }else{
          return false;
        }
      } else {
        return false;
      }
    }

    var currentUser = function() {
      if(isLoggedIn()){
        var token = getToken();
        var payload = JSON.parse($window.atob(token.split('.')[1]));
        return {
          id: payload._id,
          email : payload.email,
          name : payload.name,
          enroll: payload.enroll,

        };

      }
    };

    register = function(user) {
      return $http.post('/api/register', user).success(function(data){
        saveToken(data.token);
      });
    };

    login = function(user) {
      return $http.post('/api/login', user).success(function(data) {
        saveToken(data.token);
      });
    };

    logout = function() {
      $window.localStorage.removeItem('onlineclass-token');
      delete $rootScope.user;
      delete $rootScope.products;
      delete $rootScope.courses;
      delete $rootScope.videos;
    };

    verify = function(token){
      return $http.get('/api/verify/'+token).success(function(data) {
        var token = getToken();
        if(token){
          $window.localStorage.removeItem('onlineclass-token')
          saveToken(data.token);
        }else{
          saveToken(data.token);
        }
      });
    };

    return {
      user: null,
      currentUser : currentUser,
      saveToken : saveToken,
      getToken : getToken,
      isLoggedIn : isLoggedIn,
      isVerified : isVerified,
      register : register,
      login : login,
      verify : verify,
      logout : logout,
      isAdmin : isAdmin,
    };
  }


})();