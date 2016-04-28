/**
 * Created by qianmoxie on 3/8/16.
 */
(function(){
    angular
        .module('onlineApp')
        .service('productData', productData);

    productData.$inject = ['$http'];
    function productData ($http){
        var products = function (){
            return $http.get('/api/products');
        };
        var addProduct = function (data){
            return $http.post('/api/products',data);
        };
        var productDetail = function (productid) {
            return $http.get('/api/products/'+productid);
        }
        var editCourses = function (productid,data){
            return $http.post('/api/products/courses/'+productid,data);
        }
        return {
            products: products,
            addProduct: addProduct,
            productDetail: productDetail,
            editCourses: editCourses
        };

    };
})();