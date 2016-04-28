/**
 * Created by qianmoxie on 4/8/16.
 */
(function(){
    angular
        .module('onlineApp')
        .controller('verifyCtrl', verifyCtrl);
    verifyCtrl.$inject = ['$state','authentication','$stateParams','userR','$rootScope'];
    function verifyCtrl($state, authentication,$stateParams,userR,$rootScope) {
        var vm = this;
        vm.verfied = authentication.isVerified();

        if(!vm.verfied && $stateParams.token){

            authentication.verify($stateParams.token).then(function(){
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
                $state.go('home')
            });
        }
    }
}())