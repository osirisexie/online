/**
 * Created by qianmoxie on 3/8/16.
 */
(function () {
    angular
        .module('onlineApp')
        .controller('productDetailCtrl',productDetailCtrl);

    productDetailCtrl.$inject = ['$stateParams','productData','helpers','courseData','productsR'];
    function productDetailCtrl ($routeParams,productData, helpers,courseData,productsR){
        var vm = this;
        vm.productid = $routeParams.productid;
        //helpers.getData(productData,'productDetail',vm,vm.productid);
        vm.productDetail = productsR.get({id:vm.productid});
        helpers.getCourses(courseData,vm);

        vm.onAddCourse = function(){
            vm.formData.courses.forEach(function(item){
                vm.productDetail.courses.push(JSON.parse(item));
            })
        }

        vm.remove = function(key){
            vm.productDetail.courses.splice(key,1);
        }

        vm.onEditCourses = function(){
            var courselist = [];
            vm.productDetail.courses.forEach(function(item){
                courselist.push(item._id);

            });
            productData.editCourses(vm.productid,{
                courses: courselist
            })
                .success(function(){
                    console.log('success');
                });
        }

        vm.onEdit = function(){
            vm.productDetail.$update({id:vm.productid});
            vm.productDetail.$promise.then(function(){
                console.log('success');
            })
        }
    }
})();