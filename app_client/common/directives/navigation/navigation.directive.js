/**
 * Created by qianmoxie on 3/7/16.
 */
(function(){
    angular
        .module('onlineApp')
        .directive('navigation', navigation);

    function navigation(){
        return{
            restrict: 'EA',
            templateUrl: '/common/directives/navigation/navigation.template.html',
            controller:'navigationCtrl as navvm'
        };
    }

})();