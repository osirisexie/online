/**
 * Created by qianmoxie on 3/30/16.
 */
(function(){
    var app = angular.module('onlineApp');
    app
        .controller('userCtrl',userCtrl)
        .filter('courselist',function(){
            return function(input,list){
                var courses = [];
                if(input && list){
                    input.forEach(function(data){
                        if(list.indexOf(data.course._id)>-1){
                            courses.push(data);
                        }
                    })
                }

                return courses;
            }
        })
        .filter('totaltime',function(){
            return function(input){
                var time = 0;
                if(input){
                    input.forEach(function(data){
                        time = time + data.length;
                    })
                }
                return time;
            }
        });

    userCtrl.$inject = ['$rootScope','userR','authentication','helpers','$state','$scope','$interval'];
    function userCtrl ($rootScope,userR,authentication,helpers,$state,$scope,$interval){

        var vm = this;
        var words = ['python','R','Big Data','Machine Learning'];
        var num = Math.floor(Math.random()*4);
        var pre = num;
        vm.words = [words[num]];
        vm.now = true;
        vm.courses = [];
        vm.user = helpers.getUser(authentication,userR,vm,'chistory');
        vm.courselist = $rootScope.courses;
        $rootScope.$watch('user',function(){
            vm.courselist = $rootScope.courses;
        })
        helpers.logoutHome($rootScope,$scope,$state);
        vm.setnow = function(){
            vm.now = true;
        }
        vm.unsetnow = function(){
            vm.now = false;
        }

        //vm.course = coursesR.get({id: vm.courseid});
        $interval(updateword,5000);
        function updateword(){
            while(num == pre){
                num = Math.floor(Math.random()*4);
            }
            pre = num;
            vm.words = [words[num]];
        }


    };


}())