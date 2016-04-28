(function () {

  angular
    .module('onlineApp')
    .controller('navigationCtrl', navigationCtrl);

  navigationCtrl.$inject = ['$window', 'authentication','$rootScope','userR'];
  function navigationCtrl($window, authentication,$rootScope, userR) {
    var vm = this;

    //vm.currentPath = $location.path();
    vm.userinfo = authentication;
    if (authentication.isLoggedIn()) {
      var user = userR.get({id: authentication.currentUser().id}, function () {
        $rootScope.user = user;
        $rootScope.products = [];
        $rootScope.courses = [];
        $rootScope.videos = [];
        user.enroll.forEach(function (enroll) {
          $rootScope.products.push(enroll.product._id);
          enroll.product.courses.forEach(function (course) {
            $rootScope.courses.push(course._id);
            course.videos.forEach(function (video) {
              $rootScope.videos.push(video);
            })
          })
        })
      });
    }
    //vm.isLoggedIn = authentication.isLoggedIn();
    //
    //vm.currentUser = authentication.currentUser();
    //
    //
    //vm.logout = function() {
    //  authentication.logout();
    //  $window.location.reload();
    //};

  }
})();