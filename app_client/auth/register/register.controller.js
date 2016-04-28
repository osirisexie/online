(function () {

  angular
    .module('onlineApp')
    .controller('registerCtrl', registerCtrl);

  registerCtrl.$inject = ['$location','authentication','$state'];
  function registerCtrl($location, authentication,$state) {
    var vm = this;

    vm.pageHeader = {
      title: 'Create a new Loc8r account'
    };

    vm.credentials = {
      name : "",
      email : "",
      password : ""
    };

    vm.returnPage = $location.search().page || '/';

    vm.onSubmit = function () {
      vm.formError = "";
      if (!vm.credentials.name || !vm.credentials.email || !vm.credentials.password) {
        vm.formError = "All fields required, please try again";
        return false;
      } else {
        vm.doRegister();
      }
    };

    vm.doRegister = function() {
      vm.formError = "";
      authentication
        .register(vm.credentials)
        .error(function(err){
          vm.formError = err;
        })
        .then(function(){
          $state.go('verify');
        });
    };

  }

})();