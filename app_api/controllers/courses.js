/**
 * Created by qianmoxie on 3/3/16.
 */
var helpers = require('../helpers');
var mongoose = require('mongoose');
var course = mongoose.model('Course');


module.exports.courseList = function(req, res){

    var searchCondition;
    var sortquery;
    if(req.query.search && req.query.search != ""){
        searchCondition = {$text : { $search : req.query.search}};
    }
    if(req.query.popular){
        sortquery = {studentNum: req.query.popular};
    }else{
        var dateorder = req.query.date?req.query.date:-1;
        sortquery = {created: dateorder};
    }


    course
        .find(
            searchCondition
        )
        .sort(sortquery)
        .populate('videos')
        .exec(function (err, courses) {
            helpers.sendJsonResponse(res, 200, courses);
        });
};
module.exports.courseCreate = function(req, res){
    course
        .create({
            title: req.body.title,
            description: req.body.description,
            videos: req.body.videos,
            labels: req.body.labels
        },function(err, course){
            if(err){
                helpers.sendJsonResponse(res, 400 ,err);
            }else{
                helpers.sendJsonResponse(res, 201, course);
            }
        });

};

module.exports.courseReadOne = function(req, res){

    course
        .findById(req.params.courseid)
        .populate('videos')
        .exec(function (err, course) {
            if(err){
                helpers.sendJsonResponse(res, 400 ,err);
            }else{
                helpers.sendJsonResponse(res, 201, course);
            }
        })
}

module.exports.editVideos = function(req, res){
    course
        .findById(req.params.courseid)
        .exec(function (err, course) {
            if(err){
                helpers.sendJsonResponse(res, 400 ,err);
            }
            course.videos = req.body.videos;
            console.log(req.body.videos);
            course.save(function(err, course) {
                if(err){
                    helpers.sendJsonResponse(res, 400 ,err);
                }else{
                    helpers.sendJsonResponse(res, 200, course);
                }
            })
        })
};
module.exports.deleteOne = function(req, res){
    if(req.params.id) {
        course
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
        course
            .findById(req.params.id)
            .exec(function (err, course) {
                if (err) {
                    helpers.sendJsonResponse(res, 404, err);
                } else {
                    course.title = req.body.title;
                    course.description = req.body.description;
                    course.videos = req.body.videos;
                    course.labels = req.body.labels;
                    course.save(function(err, data){
                        if(err){
                            helpers.sendJsonResponse(res, 400 ,err);
                        }else{
                            helpers.sendJsonResponse(res, 200, data);
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
