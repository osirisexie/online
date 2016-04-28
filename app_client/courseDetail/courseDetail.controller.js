/**
 * Created by qianmoxie on 3/9/16.
 */
(function () {
    angular
        .module('onlineApp')
        .controller('courseDetailCtrl',courseDetailCtrl)


    courseDetailCtrl.$inject = ['$rootScope','$stateParams','courseData','helpers','videoData','coursesR','$uiViewScroll','enrollR','userR','productByCourse','$scope', 'Upload', '$timeout'];
    function courseDetailCtrl ($rootScope,$stateParams,courseData, helpers,videoData,coursesR,$uiViewScroll, enrollR,userR,productByCourse,$scope, Upload, $timeout){
        var vm = this;
        vm.labels = helpers.labels;
        vm.addlabel = function (name){
            if(vm.course.labels.indexOf(name) == -1){
                vm.course.labels.push(name);
            }
        };
        vm.removelabel = function(key){
            vm.course.labels.splice(key,1);
        };

        vm.user = $rootScope.user;
        vm.uplist = $rootScope.products;
        vm.courselist = $rootScope.courses;
        $rootScope.$watch('user',function(a,b){
            vm.user = $rootScope.user;
            vm.uplist = $rootScope.products;
            vm.courselist = $rootScope.courses;
        })

        vm.courseid = $stateParams.courseid;
        vm.activatenum = [];
        vm.course = coursesR.get({id: vm.courseid});
        vm.course.$promise.then(function(){
            vm.course.videos.forEach(function (data) {
                vm.activatenum.push(false);
                vm.activatenum[0] = true;
            });
            if(vm.course.cover){
                vm.coverurl = vm.course.cover;
            }
        });
        vm.products = productByCourse.query({cid:vm.courseid});
        vm.products.$promise.then(function () {
            vm.products.forEach(function (data) {
                data.videonum = 0;
                data.totaltime = 0;
                data.courses.forEach(function(course){
                    data.videonum = data.videonum + course.videos.length;
                    course.videos.forEach(function(video){
                        data.totaltime = data.totaltime + video.length;
                    })
                })
            })
        })
        vm.activate = function (key) {
            vm.activatenum[key] = !vm.activatenum[key];
        };
        vm.scroll = function(name){
            var ele = document.querySelectorAll("#"+name);
            console.log(ele);
            $uiViewScroll(ele);
        };
        //helpers.getData(courseData,'courseDetail',vm,vm.courseid);
        helpers.getVideos(videoData,vm);
        vm.onEditVideo = function (){
            updateVideo();
        };

        function updateVideo (){
            var videolist = []
            vm.course.videos.forEach(function(item){
                videolist.push(item._id);
            });
            courseData.editVideos(vm.courseid, {
                    videos: videolist,
                })
                .success(function () {
                    console.log('success');
                });

            return false;
        };

        vm.addVideos = function(){
            vm.formData.videos.forEach(function(item){
               vm.course.videos.push(JSON.parse(item));
            });
        };

        vm.remove = function(index){
            vm.course.videos.splice(index,1);
        };

        vm.enroll = function(pid){
            if(vm.user) {
                enrollR.update({uid: vm.user._id, pid: pid}).$promise.then(function(){
                    var user = userR.get({id: vm.user._id}, function () {
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
                })
            }
        }

        vm.onEdit = function(){
            vm.course.$update({id:vm.courseid});
            vm.course.$promise.then(function(){
                console.log('success');
            })
        }
        vm.uploadFiles = function(file, errFiles) {

            vm.f = file;
            vm.errFile = errFiles && errFiles[0];
            if (file) {
                file.upload = Upload.upload({
                    url: '/api/upload',
                    data: {file: file,'id':vm.courseid}
                });

                file.upload.then(function (response) {
                    vm.coverurl = response.data.fname;
                    $timeout(function () {
                        file.result = response.data;
                    });
                }, function (response) {
                    if (response.status > 0)
                        vm.errorMsg = response.status + ': ' + response.data;
                }, function (evt) {
                    file.progress = Math.min(100, parseInt(100.0 *
                        evt.loaded / evt.total));
                });
            }
        };
    }

})();