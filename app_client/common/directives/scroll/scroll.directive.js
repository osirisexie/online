/**
 * Created by qianmoxie on 3/15/16.
 */
(function () {
    angular
        .module('onlineApp')
        .directive('scrolly',function () {
            return {
                restrict: 'EAC',
                link: function (scope, element, attrs) {
                    var raw = element[0];
                    scope.scrollPos = raw.scrollTop;
                    element.bind('scroll', function () {
                        //console.log('in scroll');
                        if(raw.scrollTop > scope.scrollPos){
                            scope.scrolldown = true;
                            scope.$apply();
                        }else{
                            scope.scrolldown = false;
                            scope.$apply();
                        };
                        scope.scrollPos = raw.scrollTop;
                        //console.log(scope.scrollPos);
                        scope.$apply();
                    });
                }
            };
        });
})();