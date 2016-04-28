/**
 * Created by qianmoxie on 3/28/16.
 */
(function () {

    angular
        .module('onlineApp')
        .directive('courseCard',courseCard)
        .controller('courseCardCtrl',ccCtrl);

    function courseCard (){
        return{
            restrict: 'EA',
            templateUrl: '/common/directives/courseCard/courseCard.html',
            controller:'courseCardCtrl',
            scope:{
                course:'=?',
                chistory:'=?'
            }
        };
    };

    ccCtrl.$inject = ['$scope']
    function ccCtrl ($scope){
        if(!$scope.course){
           $scope.progress = ($scope.chistory.watched / $scope.chistory.course.videos.length) * 100;

           $scope.course = $scope.chistory.course;
        }
        var length = 0;
        $scope.course.videos.forEach(function(video){
            length += video.length;
        });
        $scope.course.length = length;
    }

}())