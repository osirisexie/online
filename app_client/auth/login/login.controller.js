(function () {

  angular
    .module('onlineApp')
    .controller('loginCtrl', loginCtrl);

  loginCtrl.$inject = ['$state','authentication','$rootScope','userR'];
  function loginCtrl($location, authentication,$rootScope,userR) {
    var vm = this;

    vm.credentials = {
      email : "",
      password : ""
    };

    vm.onSubmit = function () {
      vm.formError = "";
      if (!vm.credentials.email || !vm.credentials.password) {
        vm.formError = "All fields required, please try again";
        return false;
      } else {
        vm.doLogin();
      }
    };

    vm.doLogin = function() {
      vm.formError = "";
      authentication
        .login(vm.credentials)
        .error(function(err){
          vm.formError = err;
        })
        .then(function(){

          var user = userR.get({id: authentication.currentUser().id},function(){
            $rootScope.user = user;
            $rootScope.products = [];
            $rootScope.courses = [];
            $rootScope.videos = [];
            user.enroll.forEach(function(enroll){
              $rootScope.products.push(enroll.product._id);
              enroll.product.courses.forEach(function(course){
                $rootScope.courses.push(course._id);
                course.videos.forEach(function(video){
                  $rootScope.videos.push(video);
                })
              })
            })
          });
          $location.go($rootScope.returnPage,$rootScope.returnParams);
        });
    };

  }

})();