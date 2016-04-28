/**
 * Created by qianmoxie on 3/7/16.
 */
var helpers = require('../helpers');
var mongoose = require('mongoose');
var video = mongoose.model('Video');

module.exports.videolist = function (req, res){
    video
        .find()
        .exec(function (err, videos) {
            helpers.sendJsonResponse(res, 200, videos);
        });
};
module.exports.videoReadOne = function(req, res){
    video
        .findById(req.params.videoid)
        .exec(function(err,video){
            if(err){
                helpers.sendJsonResponse(res, 400 ,err);
            }else{
                helpers.sendJsonResponse(res, 201, video);
            }
        })
};
module.exports.videoCreate = function (req, res) {

    video
        .create({
            videoid: req.body.videoid,
            length: req.body.length,
            title: req.body.title,
            description: req.body.description
        },function(err, video){
            if(err){
                helpers.sendJsonResponse(res, 400 ,err);
            }else{
                helpers.sendJsonResponse(res, 200, video);
            }
        })
};

module.exports.editChapters = function(req,res){
    video
        .findById(req.params.videoid)
        .exec(function (err, video) {
            video.chapters = req.body.chapters;
            video.save(function(err, video) {
                if(err){
                    helpers.sendJsonResponse(res, 400 ,err);
                }else{
                    helpers.sendJsonResponse(res, 200, video);
                }
            });
        });
};
module.exports.deleteOne = function(req, res){
    if(req.params.id) {
        video
            .findByIdAndRemove(req.params.id)
            .exec(function (err, video) {
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
        video
            .findById(req.params.id)
            .exec(function (err, video) {
                if (err) {
                    helpers.sendJsonResponse(res, 404, err);
                } else {
                    console.log(req);
                    video.videoid = req.body.videoid;
                    video.length= req.body.length;
                    video.title= req.body.title;
                    video.description= req.body.description;
                    video.save(function(err, video){
                        if(err){
                            helpers.sendJsonResponse(res, 400 ,err);
                        }else{
                            helpers.sendJsonResponse(res, 200, video);
                        }
                    });

                }
            });
    }else{
        helpers.sendJsonResponse(res, 400, {
            'message': 'no id provided'
        });
    }
}
