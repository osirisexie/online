/**
 * Created by qianmoxie on 3/7/16.
 */
(function(){
    angular
        .module('onlineApp')
        .controller('videoCtrl', videoCtrl);

    videoCtrl.$inject = ['videoData','$timeout','authentication','$rootScope','finishVideo','videoR'];
    function videoCtrl(videoData,$timeout,authentication,$rootScope,finishVideo,videoR){
        var vm = this;
        vm.vlist = $rootScope.videos;
        $rootScope.$watch('user',function(a,b){

            vm.vlist = $rootScope.videos;
        });
        vm.submitting = false;
        videoData.videos()
            .success(function (data) {
                vm.videos = data;
            })
        vm.onSubmit = function () {
            vm.submitting = true;
            vm.addVideo(vm.formData);
            videoData.videos().success(function(data){
                vm.videos = data;
                $timeout(function(){
                    vm.submitting = false;
                },500);

            });
        };
        vm.addVideo = function(formData){

            videoData.addVideo({
                title: formData.title,
                description: formData.description,
                videoid: formData.videoid,
                length: formData.length
            })
                .success(function(data){

                })
            return false;
        };

        vm.finish = function(vid){
            finishVideo.update({uid:$rootScope.user._id, vid:vid});
        };

        vm.deleteVideo = function(vid){
            var del = videoR.delete({id:vid});
            del.$promise.then(function(){
                vm.videos = videoR.query();
            })
        }
    }

})();

