/**
 * Created by qianmoxie on 3/8/16.
 */
(function(){
    angular
        .module('onlineApp')
        .controller('productCtrl', productCtrl);

    productCtrl.$inject = ['productData','coursesR','helpers','productsR'];
    function productCtrl(productData,coursesR,helpers,productsR){
        var vm = this;
        helpers.getProducts(productData,vm);
        vm.courses = coursesR.query();
        vm.onSubmit = function () {
            vm.addProduct(vm.formData);
            helpers.getProducts(productData,vm);
        };
        vm.addProduct = function(formData){

            productData.addProduct({
                    title: formData.title,
                    description: formData.description,
                    courses: formData.courses,
                    service: formData.service
                })
                .success(function(data){

                });
            return false;
        };
        vm.deleteProduct = function(pid){
            var del = productsR.delete({id:pid});
            del.$promise.then(function(){
                helpers.getProducts(productData,vm);
                console.log('success');
            })
        }
    }



})();