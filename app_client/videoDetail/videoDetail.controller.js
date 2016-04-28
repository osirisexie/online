/**
 * Created by qianmoxie on 3/7/16.
 */
(function(){
    angular
        .module('onlineApp')
        .controller('videoDetailCtrl', videoDetailCtrl);



    videoDetailCtrl.$inject = ['$stateParams','videoData','videoR','coursesR','$sce'];
    function videoDetailCtrl($stateParams,videoData,videoR,coursesR,$sce){
        var vm = this;
        vm.flag = false;
        vm.videoid = $stateParams.id;
        vm.video = videoR.get({id:vm.videoid});
        vm.video.$promise.then(function(){
           var videoUrl = "https://player.vimeo.com/video/"+vm.video.videoid+"?api=1&player_id=player1";
            vm.url = $sce.trustAsResourceUrl(videoUrl);
            vm.flag = true;
            if($stateParams.courseid){
                vm.courseid = $stateParams.courseid;
                vm.course = coursesR.get({id: $stateParams.courseid});
                vm.course.$promise.then(function(){

                    vm.cvideos = vm.course.videos;
                    for(i=0; i<vm.cvideos.length;i++){
                        if (vm.video._id==vm.cvideos[i]._id){
                            vm.vindex = i;
                            break;
                        }
                    }
                    vm.prevideo = i==0?null:vm.cvideos[i-1];
                    vm.nexvideo = i==(vm.cvideos.length-1)?null:vm.cvideos[i+1];
                    vm.cvideos.forEach(function(video){
                        video.course = vm.courseid;
                        video.currentid = vm.videoid;
                    })
                });
            }
        });
        //editVideo
        vm.onEdit = function () {
            vm.submitting = true;
            vm.video.$update({id: vm.videoid});
            vm.video.$promise.then(function(){
                vm.submitting = false;
                console.log('success')
            })
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





        //get courseinfo



        vm.error = '';
        vm.search = '';
        videoData.videos()
            .success(function (data) {
                vm.videos = data;
            });
        vm.onAddChapter = function(){
            if(vm.formData && vm.formData.Ctitle && vm.formData.Csecs){
                vm.error ='';
                vm.attachChapter(vm.formData);
            }else{
                vm.error = 'All fields required';
            }
        };

        vm.remove = function(data){
            vm.video.chapters.splice(data,1);
        };

        vm.onUpdateChapter = function(){
            vm.onEditchapter(vm.video.chapters);
        };


        vm.onEditchapter = function(data){
            videoData.editChapter($stateParams.id,{
                chapters: data
            })
                .success(function () {
                    alert('Success');
                });
            return false;
        };
        vm.attachChapter = function(data){
            vm.video.chapters.push({
                title: data.Ctitle,
                secs: data.Csecs
            });
            return false;
        };



    }

})();

