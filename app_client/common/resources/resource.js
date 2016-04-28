/**
 * Created by qianmoxie on 3/28/16.
 */
(function () {
    angular
        .module('onlineApp')
        .factory('coursesR',courseResource)
        .factory('productsR',productResource)
        .factory('enrollR',enrollResource)
        .factory('userR',userR)
        .factory('finishVideo',['$resource',function($resource){
            return $resource('/api/users/:uid/:vid',{},{
                update:{method:'POST', params:{uid:'@uid',vid:'@vid'}}
            });
        }])
        .factory('productByCourse',['$resource',function($resource){
            return $resource('/api/products/getcourse/:cid',{},{
                query:{method:'GET',isArray:true, params:{cid:'@cid'}}
            });
        }])
        .factory('videoR',['$resource',function($resource){
            return $resource('/api/videos/:id',{},{
                update:{
                    method:'PUT',
                    params:{id:'@id'}
                }
            });
        }]);

    courseResource.$inject = ['$resource'];
    function courseResource ($resource) {
        return $resource('/api/courses/:id',{},{
            update:{
                method:'PUT',
                params:{id:'@id'}
            }
        });
    };
    productResource.$inject = ['$resource'];
    function productResource ($resource){
        return $resource('/api/products/:id',{},{
            update:{
                method:'PUT',
                params:{id:'@id'}
            }
        });
    };
    enrollResource.$inject = ['$resource'];
    function enrollResource ($resource){
        return $resource('/api/enroll/:uid/:pid',{},{
            update: {method: 'POST', params: {uid: '@uid',pid:'@pid'}}
        });
    };
    userR.$inject = ['$resource'];
    function userR ($resource){
        return $resource('/api/users/:id');
    };
}());
//(function () {
//    var resource = function ($resource) {
//        var resource = {};
//        resource.create = function(url) {
//            return createResource($resource, url)
//        }
//        return resource;
//    };
//
//    var createResource = function($resource, url) {
//        var resource = $resource(url, getParamDefaults(), getActions());
//        resource.prototype.$save = function() {
//            if (this.id) {
//                return this.$update();
//            } else {
//                return this.$create();
//            }
//        };
//        return resource;
//    };
//
//    var getParamDefaults = function() {
//        var paramDefaults = {
//            id:'@id'
//        };
//        return paramDefaults;
//    };
//
//    var getActions = function() {
//        var actions = {
//            'create': {method:'POST'},
//            'update': {method:'PUT'},
//            'all':    {method:'GET', isArray:true}
//        };
//        return actions;
//    };
//
//    angular.module('onlineApp').factory('resource', resource);
//}());
//(function () {
//
//    var videoR = function (resource) {
//        return resource.create('/api/videos/:id');
//    };
//
//    angular.module('onlineApp').factory('videoR', videoR);
//}());