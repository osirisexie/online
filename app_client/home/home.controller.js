/**
 * Created by qianmoxie on 3/3/16.
 */
angular
    .module('onlineApp')
    .controller('homeCtrl', homeCtrl);

homeCtrl.$inject = ['courseData','Upload','videoData','helpers','authentication','coursesR','$scope'];
function homeCtrl (courseData, Upload, videoData,helpers,authentication,coursesR,$scope){
    var vm = this;
    vm.labels = helpers.labels;
    vm.pageHeader = {
        title: 'Online Classroom'
    };
    vm.formData = {};
    vm.formData.labels = [];
    vm.addlabel = function (name){
        if(vm.formData.labels.indexOf(name) == -1){vm.formData.labels.push(name);}

    };
    vm.removelabel = function(key){
        vm.formData.labels.splice(key,1);
    };

    vm.courses = coursesR.query({id:'',popular: -1, search: ''});
    vm.coursesDate = coursesR.query({id:'',data: -1, search: ''})

    //helpers.getCourses(courseData,vm);
    helpers.getVideos(videoData,vm);
    vm.onSubmit = function(){
        vm.addCourse(vm.formData);
        vm.courses = coursesR.query({id:'',date: -1, search: ''});
    }
    
    vm.addCourse = function (formData) {
        courseData.addCourse({
            title: formData.title,
            description: formData.description,
            videos: formData.videos,
            labels: formData.labels
        })
            .success(function () {
                console.log('success');
            });
        return false;
    }



    vm.deleteCourse = function (cid){
        var del = coursesR.delete({id:cid});
        del.$promise.then(function(){
            vm.courses = coursesR.query({id:'',date: -1, search: ''});
        })
    }
}