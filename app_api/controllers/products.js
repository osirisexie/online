/**
 * Created by qianmoxie on 3/8/16.
 */
var helpers = require('../helpers');
var mongoose = require('mongoose');
var product = mongoose.model('Product');

module.exports.productList = function(req, res){
    product
        .find()
        .populate({
            path:'courses',
            populate:{
                path:'videos',
                model:'Video'
            }
        })

        .exec(function (err, courses) {
            helpers.sendJsonResponse(res, 200, courses);
        });
};

module.exports.productCreate = function(req, res){
    product
        .create({
            title: req.body.title,
            description: req.body.description,
            courses: req.body.courses,
            service: req.body.service
        },function(err, data){
            if(err){
                helpers.sendJsonResponse(res, 400 ,err);
            }else{
                helpers.sendJsonResponse(res, 201, data);
            }
        });
};

module.exports.productReadOne = function (req, res){
    product
        .findById(req.params.productid)
        .populate('courses')
        .exec(function(err, data){
            if(err){
                helpers.sendJsonResponse(res, 400 ,err);
            }else{
                helpers.sendJsonResponse(res, 201, data);
            }
        });
};
module.exports.editCourses = function(req, res){

    product
        .findById(req.params.productid)
        .exec(function (err, product) {
            if(err){
                helpers.sendJsonResponse(res, 400 ,err);
            }
            product.courses = req.body.courses;
            product.save(function(err, product) {
                if(err){
                    helpers.sendJsonResponse(res, 400 ,err);
                }else{
                    helpers.sendJsonResponse(res, 200, product);
                }
            })
        })
};

module.exports.findByCourse = function(req,res){

    product
        .find({courses: req.params.courseid})
        .populate({
            path:'courses',
            populate:{
                path:'videos',
                model:'Video'
            }
        })
        .exec(function(err, data){

            if(err){
                helpers.sendJsonResponse(res, 400 ,err);
            }else{
                helpers.sendJsonResponse(res, 201, data);
            }
        });
};module.exports.deleteOne = function(req, res){
    if(req.params.id) {
        product
            .findByIdAndRemove(req.params.id)
            .exec(function (err, data) {
                if (err) {
                    helpers.sendJsonResponse(res, 404, err);
                } else {
                    helpers.sendJsonResponse(res, 204, null);
                }
            });
    }else{
        helpers.sendJsonResponse(res, 404, {
            'message': 'no id provided'
        });
    }
};
module.exports.editOne = function (req, res){
    if(req.params.id) {
        product
            .findById(req.params.id)
            .exec(function (err, data) {
                if (err) {
                    helpers.sendJsonResponse(res, 404, err);
                } else {
                    data.title = req.body.title;
                    data.description = req.body.description;
                    data.courses= req.body.courses;
                    data.save(function(err, product){
                        if(err){
                            helpers.sendJsonResponse(res, 400 ,err);
                        }else{
                            helpers.sendJsonResponse(res, 200, product);
                        }
                    });

                }
            });
    }else{
        helpers.sendJsonResponse(res, 400, {
            'message': 'no id provided'
        });
    }
};