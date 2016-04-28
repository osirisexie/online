/**
 * Created by qianmoxie on 3/3/16.
 */
(function(){
    angular.module('onlineApp', [
            'ui.router',
            'ngAnimate',
            'ngFileUpload',
            //foundation
            'foundation',
            'as.sortable',
            'jcs-autoValidate',
            'angular-ladda',
            'ngResource',
            'duScroll'
            //'foundation.dynamicRouting',
            //'foundation.dynamicRouting.animations'
        ])
        .config(config);
    config.$inject = ['$stateProvider','$urlRouterProvider', '$locationProvider'];
    function config($stateProvider,$urlProvider, $locationProvider) {
        $urlProvider.otherwise("/home");
        $stateProvider
            .state('home',{
                url:'/home',
                templateUrl: '/home/home.view.html',
                controller: 'homeCtrl',
                controllerAs: 'vm'
            })
            .state('videos',{
                url:'/videos',
                templateUrl:'/videos/videos.view.html',
                controller: 'videoCtrl',
                controllerAs:'vm'
            })
            .state('oneVideo',{
                url:'/videos/:courseid/:id',
                templateUrl:'/videoDetail/videoDetail.view.html',
                controller: 'videoDetailCtrl',
                controllerAs:'vm'
            })
            .state('videoDetail',{
                url:'/videoDetail/:videoid',
                templateUrl:'/videoDetail/videoDetail.view.html',
                controller: 'videoCtrl',
                controllerAs:'vm'
            })
            .state('products',{
                url:'/products',
                templateUrl:'/products/products.view.html',
                controller:'productCtrl',
                controllerAs: 'vm'
            })
            .state('oneProduct',{
                url:'/products/:productid',
                templateUrl:'/productDetail/productDetail.view.html',
                controller:'productDetailCtrl',
                controllerAs:'vm'
            })
            .state('courses',{
                url:'/courses?search',
                templateUrl:'/courses/courses.view.html',
                controller:'courseCtrl',
                controllerAs:'vm'
            })
            .state('oneCourse',{
                url:'/courses/:courseid',
                templateUrl:'/courseDetail/courseDetail.view.html',
                controller:'courseDetailCtrl',
                controllerAs:'vm'
            })
            .state('test',{
                url:'/test',
                templateUrl:'/test/test.view.html',
                controller:'testsCtrl',
                controllerAs:'vm'
            })
            .state('register',{
                url:'/register',
                templateUrl:'/auth/register/register.view.html',
                controller:'registerCtrl',
                controllerAs:'vm'
            })
            .state('login',{
                url:'/login',
                templateUrl:'/auth/login/login.view.html',
                controller:'loginCtrl',
                controllerAs:'vm'
            })
            .state('admin',{
                url:'/admin',
                templateUrl:'/admin/admin.view.html',
                //controller:'adminCtrl',
                //controllerAs:'vm',
                data:{requireLogin: true}
            })
            .state('adminVideo',{
                url:'/admin/videos',
                templateUrl:'/admin/videos.view.html',
                controller: 'videoCtrl',
                controllerAs:'vm',
                data:{requireLogin:true}
            })
            .state('adminCourse',{
                url:'/admin/courses',
                templateUrl:'/admin/courses.view.html',
                controller:'homeCtrl',
                controllerAs:'vm',
                data:{requireLogin:true}
            })
            .state('editCourse',{
                url:'/admin/courses/:courseid',
                templateUrl:'/admin/editcourse.view.html',
                controller:'courseDetailCtrl',
                controllerAs:'vm',
                data:{requireLogin:true}
            })
            .state('editVideo',{
                url:'/admin/videos/:id',
                templateUrl:'/admin/editVideo.view.html',
                controller:'videoDetailCtrl',
                controllerAs:'vm',
                data:{requireLogin:true}
            })
            .state('adminProduct',{
                url:'/admin/products',
                templateUrl:'/admin/products.view.html',
                controller:'productCtrl',
                controllerAs:'vm',
                data:{requireLogin:true}
            })
            .state('editProduct',{
                url:'/admin/products/:productid',
                templateUrl:'/admin/editProduct.view.html',
                controller:'productDetailCtrl',
                controllerAs:'vm',
                data:{requireLogin:true}
            })
            .state('user',{
                url:'/me',
                templateUrl:'/user/me.view.html',
                controller:'userCtrl',
                controllerAs:'vm',
                data:{requireLogin:true}
            })
            .state('verify',{
                url:'/verify/:token',
                templateUrl:'/auth/verify/verify.view.html',
                controller:'verifyCtrl',
                controllerAs:'vm'
            })
            .state('upload',{
                url:'/upload',
                templateUrl:'/test/test.view.html',
                controller:'testsCtrl',
                controllerAs:'vm'
            });

        $locationProvider.html5Mode({
            enabled: false,
            requireBase: false
        });

        //$locationProvider.hashPrefix('!');
    }
    angular.module('onlineApp')
           .run(authRules);
    authRules.$inject = ['$rootScope', '$state', 'authentication'];
    function authRules ($rootScope, $state, authentication){

        $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState,fromParams) {

            var shouldLogin = toState.data !== undefined
                && toState.data.requireLogin;
            if(shouldLogin)
            {

                if(!authentication.isLoggedIn() ) {
                    $state.go('login');
                    event.preventDefault();
                    return;
                }else{
                    if(!authentication.isVerified()){
                        $state.go('verify');
                        event.preventDefault();
                        return;
                    }else{
                        if(toState.name == 'admin'){

                            if(!authentication.isAdmin()){
                                $state.go('home');
                                event.preventDefault();
                                return;
                            }
                        }
                    }
                }
            }else{

                if(toState.name == 'login'){
                    $rootScope.returnPage = fromState.name;
                    if(fromState.name=='register'){
                        $rootScope.returnPage = 'home';
                    }
                    $rootScope.returnParams = fromParams;
                }
                return;
            }
        });


    };
    angular
        .module('onlineApp')
        .filter('secondsToDateTime', [function() {
        return function(seconds) {
            return new Date(1970, 0, 1).setSeconds(seconds);
        };
    }])
        .controller('vactrl',['$scope',function($scope){
            $scope.va = 'xx';
        }]);
    //config.$inject = ['$urlRouterProvider', '$locationProvider'];
    //function config ($routeProvider, $locationProvider){
    //    $routeProvider
    //        .when('/home',{
    //            templateUrl: '/home/home.view.html',
    //            controller: 'homeCtrl',
    //            controllerAs: 'vm'
    //
    //        })
    //        .when('/videos',{
    //            templateUrl:'/videos/videos.view.html',
    //            controller: 'videoCtrl',
    //            controllerAs:'vm'
    //        })
    //        .when('/products',{
    //            templateUrl:'/products/products.view.html',
    //            controller:'productCtrl',
    //            controllerAs: 'vm'
    //        })
    //        .when('/products/:productid',{
    //            templateUrl:'/productDetail/productDetail.view.html',
    //            controller:'productDetailCtrl',
    //            controllerAs:'vm'
    //        })
    //        .when('/courses/:courseid',{
    //            templateUrl:'/courseDetail/courseDetail.view.html',
    //            controller:'courseDetailCtrl',
    //            controllerAs:'vm'
    //        })
    //        .otherwise({redirectTo: '/home'});
    //
    //    $locationProvider.html5Mode(true);
    //}
    //
    //angular
    //    .module('onlineApp')
    //    .config(['$routeProvider','$locationProvider',config]);
})();
