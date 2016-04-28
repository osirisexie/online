/**
 * Created by qianmoxie on 3/29/16.
 */

var helpers = require('../helpers');
var mongoose = require('mongoose');
var user = mongoose.model('User');
var Product = mongoose.model('Product');
var Course = mongoose.model('Course');




module.exports.enroll = function (req, res) {
    user
        .findById(req.params.userid)
        .exec(function (err, user) {
            user.enroll.push({
                product: req.params.productid,
                expire: '12/12/2024'
            });
            user.save(function(err, user) {
                if(err){
                    helpers.sendJsonResponse(res, 400 ,err);
                }else{
                    helpers.sendJsonResponse(res, 200, user);
                    Product
                        .findById(req.params.productid)
                        .exec(function(err,product){
                            console.log('called');
                            var courses= [];
                            user.chistory.forEach(function(chistory){
                                courses.push(chistory.course);

                            });
                            product.courses.forEach(function(cid){
                                console.log(cid);
                                if(!(courses.indexOf(cid) > -1)){
                                    user.chistory.push({course:cid});
                                }
                                Course.findById(cid).exec(function(err,data){
                                    if(!(data.students.indexOf(user._id)>-1)){
                                        data.students.push(user._id);
                                        data.studentNum ++;
                                    }
                                    data.save();
                                });

                            })
                            user.save();
                        })
                }
            })
        })
};

module.exports.userGetOne = function(req,res){
    user
        .findById(req.params.userid)
        .populate({
            path:'enroll.product',
            populate:{
                path:'courses',
                model:'Course'
            }
        })
        .populate(
            'chistory.course'
        )
        .populate('vfinished')
        .exec(function(err, data){
            if(err){
                helpers.sendJsonResponse(res, 400 ,err);
            }else{
                helpers.sendJsonResponse(res, 200, data);
            }
        })
};
module.exports.video = function(req,res){

    user
        .findById(req.params.userid)
        .exec(function (err,user) {
            if(err){
                helpers.sendJsonResponse(res, 400 ,err);
            }else{
                if(!(user.vfinished.indexOf(req.params.videoid) > -1)){

                    user.vfinished.push(req.params.videoid);
                    user.save(function(err,user){
                        if(err){
                            helpers.sendJsonResponse(res, 400 ,err);
                        }else{
                            helpers.sendJsonResponse(res, 200, user);
                            user.chistory.forEach(function(chistory){
                                Course
                                    .findById(chistory.course)
                                    .exec(function(err,data){

                                        if(data.videos.indexOf(req.params.videoid) > -1){

                                            chistory.watched++;

                                        }
                                        user.save();
                                    })


                            });


                        }
                    })
                }
            }
        })
};
module.exports.sendmail = function(){
    var nodemailer = require( 'nodemailer');
// Message we’ll send.
    var postmark_email = {
        from: "qianmo.xie@nycdatascience.com",
    to: "qianmoxie@gmail.com",
    subject: "Hello world!",
    text: "Postmark is working."
};
// Postmark transport.
    var transport_postmark = nodemailer.createTransport( {
        service: 'postmark',

        auth: {
            user: "94f879df-e19d-4de2-a7d1-f1f42c72fbcb",
            pass: "94f879df-e19d-4de2-a7d1-f1f42c72fbcb"
        }
    });
// Send email.
    transport_postmark.sendMail( postmark_email, function( error, message ) {
        if ( error ) console.log( error );
        else console.log( 'Message sent' );
    } );
}

