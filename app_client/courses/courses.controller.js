/**
 * Created by qianmoxie on 3/31/16.
 */
(function (){
    var app = angular.module('onlineApp');
    app.controller('courseCtrl',courseCtrl);
    app.filter('coursefilter',function(){
        return function (input,name){
            input = input || [];
            var out = [];
            if (name == 'All'){
                return input;
            }else{
                input.forEach(function(data){
                    if(data.labels.indexOf(name) > -1){
                        out.push(data);
                    }
                });
                return out;
            }
        }
    });
    courseCtrl.$inject = ['coursesR','$state','$scope','$filter','helpers'];
    function courseCtrl (coursesR,$state,$scope,$filter,helpers){
        var vm = this;

        vm.labels = ['All'];
        helpers.labels.forEach(function(name){
            vm.labels.push(name);
        })
        vm.sorttime = true;
        vm.top = true;
        vm.date = -1;
        vm.popular = -1;
        vm.set = false;
        vm.searchtext = '';
        if($state.params.search){
            vm.searchtext = $state.params.search;
            $state.transitionTo('courses', {search: ''}, { notify: false });
        }
        vm.filter = 'All';


        $scope.$watch('scrollPos',function(newval,oldval){
            if(vm.set == false){
                if(newval >70){
                    if($scope.scrolldown == true){
                        vm.top = false;
                    }
                }else{
                    vm.top = true;
                }
            }
        })

        vm.sortdate = function (){
            if (!vm.sorttime){
                vm.sorttime = true;
            }else{
                vm.date = -1 * vm.date;
            }
            vm.courses = coursesR.query({id:'',date: vm.date, search: vm.searchtext});

            vm.courses.$promise.then(function(){
                vm.backup = vm.courses;
                vm.courses = $filter('coursefilter')(vm.backup,vm.filter);
            })


        }
        vm.getlabel = function(name){
            vm.filter = name;
            vm.courses = $filter('coursefilter')(vm.backup,name);
        }
        vm.setpopular = function(){
            if(vm.sorttime){
                vm.sorttime = false;
            }else{
                vm.popular = -1 * vm.popular;
            }
            vm.courses = coursesR.query({id:'', search: vm.searchtext,popular:vm.popular});
            vm.courses.$promise.then(function(){
                vm.backup = vm.courses;
                vm.courses = $filter('coursefilter')(vm.backup,vm.filter);
            })

        }
        vm.clear = function(){
            vm.searchtext = '';

            if (vm.sorttime == true){
                vm.courses = coursesR.query({id:'',date: vm.date, search: vm.searchtext});
                vm.courses.$promise.then(function(){
                    vm.backup = vm.courses;
                    vm.courses = $filter('coursefilter')(vm.backup,vm.filter);
                })
            }else{
                vm.courses = coursesR.query({id:'',date:vm.date, search: vm.searchtext,popular:vm.popular});
                vm.courses.$promise.then(function(){
                    vm.backup = vm.courses;
                    vm.courses = $filter('coursefilter')(vm.backup,vm.filter);
                })

            }

        }
        vm.search = function(){
            if (vm.sorttime == true){
                vm.courses = coursesR.query({id:'',date: vm.date, search: vm.searchtext});
            }else{
                vm.courses = coursesR.query({id:'',date:vm.date, search: vm.searchtext,popular:vm.popular});
            }
            vm.backup = vm.courses;
        }
        vm.toggleTop = function(){
          if(vm.top == true){
              vm.set = true;
          }else{
              vm.set = false;
          }
          vm.top = !vm.top;
        };
        vm.courses = coursesR.query({id:'',date: vm.date, search: vm.searchtext, popular:vm.popular});
        vm.backup = vm.courses;
    };
}());