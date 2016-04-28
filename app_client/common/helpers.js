/**
 * Created by qianmoxie on 3/7/16.
 */
(function () {
    angular
        .module('onlineApp')
        .service('helpers', helpers);

    function helpers (){
        function getCourses(courseData,vm){
            courseData.courses()
                .success(function(data){
                    vm.courses = data;
                });
        };
        function getVideos(videoData, vm){
            videoData.videos()
                .success(function (data) {
                    vm.videos = data;
                });
        };
        function getProducts(productData, vm){
            productData.products()
                .success(function (data) {
                    vm.products = data;
                });
        };
        function getData(service, method, vm, para){
            service[method](para)
                .success(function(data){
                    vm[method] = data;
                });
        }

        function getUser(auth, resource, vm, param){
            var val =  resource.get({id:auth.currentUser().id});
            val.$promise.then(function(val){
                vm[param] = val[param];
            })
            return val;
        }

        function getListCourses (resource, list){
            var courses = [];
            list.forEach(function(id){
                var course = resource.get({id: id});
                course.$promise.then(function(){
                    courses.push(course);
                })
            })
            return courses;
        }

        function logoutHome ($rootScope,$scope, $state){
            $scope.user = $rootScope.user;
            $rootScope.$watch('user',function(){
                $scope.user = $rootScope.user;
            })
            $scope.$watch('user',function(newval, oldval){
                if((!newval && oldval)){
                    $state.go('home');
                }
            })
        }
        return {
            logoutHome: logoutHome,
            getCourses: getCourses,
            getVideos: getVideos,
            getProducts:getProducts,
            getData: getData,
            getUser: getUser,
            getListCourses: getListCourses,
            labels:['PYTHON','R','BEGINNER','ADVANCED']
        };
    }
})();