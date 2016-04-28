/**
 * Created by qianmoxie on 4/11/16.
 */
(function () {

    angular
        .module('onlineApp').directive('vimeoctrl',['$window',function ($window) {

            return {
                restrict: 'EA',
                replace: true,
                scope: {
                },
                link: function (scope) {
                    //vimeo controller
                    var pl = document.getElementById('player1');
                    var cele =  document.getElementById("chapters");
                    var vm = scope.$parent.vm;
                    vm.test='x';
                    if(pl){
                        vm.video.$promise.then(function(){
                            vm.h = document.getElementById('player1').offsetHeight;
                            cele.style.height= vm.h+'px';
                        });
                    }
                    if(pl) {
                        vm.sec = 0;
                        vm.active = -1;
                        var player = $f(document.getElementById('player1'));

                        document.getElementById('player1').onload = function () {
                        }
                        player.addEvent('ready', function () {
                            player.addEvent('playProgress', onPlayProgress);
                            1
                        });
                        function onPlayProgress(data) {
                            vm.sec = data.seconds;
                            scope.$apply();
                            vm.active = seekkey(vm.video.chapters, vm.sec);

                        }

                        function seekkey(chapters, sec) {
                            var n = chapters.length - 1;
                            for (i = n; i >= 0; i--) {

                                if (sec >= chapters[i].secs) {
                                    return i;
                                    break;
                                }
                            }
                        };
                        vm.seek = function (val, key) {
                            player.api('seekTo', val);
                            player.api('play');
                            vm.active = key;


                        };
                        //set height
                        var w = angular.element($window);
                        w.bind('resize', function () {
                            vm.h = document.getElementById('player1').offsetHeight;
                            cele.style.height = vm.h + 'px';
                        });
                        scope.$watch(function () {
                            return vm.active;
                        }, function (value) {
                            cele.scrollTop = (vm.active - 2) * 66;
                        });
                    }
                }
            };
        }]);


}())