/**
 * Created by qianmoxie on 4/8/16.
 */
var helpers = require('../helpers');
var multer  = require('multer');
var mime = require('mime');
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/images')
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now()+'.'+mime.extension(file.mimetype));
    }
});
var upload = multer({storage:storage}).single('file');

var mongoose = require('mongoose');
var course = mongoose.model('Course');
var cloudinary = require('cloudinary');
cloudinary.config({
    cloud_name: 'lpaya28y8',
    api_key: '234174546392975',
    api_secret: 'MyUcj6W1tbLuTlJAdwFrfANlqEA'
});

module.exports.upload = function(req, res){
    upload(req,res,function(err){
        if(err){
            res.json({error_code:1,err_desc:err});
            return;
        }
        course
            .findById(req.body.id)
            .exec(function(err, data){
                if(err){
                    helpers.sendJsonResponse(res, 400 ,err);
                }else {
                    console.log(req.file.path);
                    cloudinary.uploader.upload(req.file.path, function(result) {
                        if (result.url) {
                            result.url = result.url.replace("http","https");
                            data.cover = result.url;
                            data.save(function(err,data){
                                if(err){
                                    helpers.sendJsonResponse(res, 400 ,err);
                                }else{
                                    res.json({'fname':result.url});
                                }
                            })
                        } else {
                            res.json(error);
                        }
                    });
                }
            })

    })



};