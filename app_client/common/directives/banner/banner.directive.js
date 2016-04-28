/**
 * Created by qianmoxie on 3/14/16.
 */
(function(){
    angular
        .module('onlineApp')
        .directive('banner', banner)
        .controller('bannerCtrl',['$scope','$state',function($scope,$state){
                $scope.performSearch = function(){
                    $state.go('courses',{search: $scope.search})
                }
         }]);

    function banner(){
        return{
            restrict: 'EA',
            templateUrl: '/common/directives/banner/banner.template.html',
            controller:'bannerCtrl'
        };
    }

})();