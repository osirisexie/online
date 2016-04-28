var passport = require('passport');
var mongoose = require('mongoose');
var User = mongoose.model('User');
var VerificationToken = mongoose.model('VerificationToken');

var sendJSONresponse = function(res, status, content) {
  res.status(status);
  res.json(content);
};

module.exports.register = function(req, res) {
  if(!req.body.name || !req.body.email || !req.body.password) {
    sendJSONresponse(res, 400, {
      "message": "All fields required"
    });
    return;
  }

  var user = new User();

  user.name = req.body.name;
  user.email = req.body.email;

  user.setPassword(req.body.password);

  user.save(function(err) {
    if (err) {
      sendJSONresponse(res, 404, err);
    } else {
      var verificationToken = new VerificationToken({_userId: user._id});
      verificationToken.createVerificationToken();
      verificationToken.save(function(err){
        if (err) {
          sendJSONresponse(res, 404, err);
        } else {
          var token  = verificationToken.token;
          var nodemailer = require( 'nodemailer');
// Message we’ll send.
          var url = req.protocol + "://" + req.get('host') + "/#verify/" + token;
          var postmark_email = {
            from: "info@nycdatascience.com",
            to: user.email,
            subject: "Wellcome to Online Classroom of NYC Data Science Academy",
            text: url
          };
// Postmark transport.
          var transport_postmark = nodemailer.createTransport( {
            service: 'postmark',

            auth: {
              user: "4a299e33-35f5-4f10-83a5-f21b2951d45b",
              pass: "4a299e33-35f5-4f10-83a5-f21b2951d45b"
            }
          });
// Send email.
          transport_postmark.sendMail( postmark_email, function( error, message ) {
            if ( error ) console.log( error );
            else {
                token = user.generateJwt();
                sendJSONresponse(res, 200, {
                  "token" : token
                });
              };
          } );
        }
      });
    }
  });

};

module.exports.login = function(req, res) {

  if(!req.body.email || !req.body.password) {
    sendJSONresponse(res, 400, {
      "message": "All fields required"
    });
    return;
  }

  passport.authenticate('local', function(err, user, info){
    var token;

    if (err) {
      sendJSONresponse(res, 404, err);
      return;
    }

    if(user){
      token = user.generateJwt();

      sendJSONresponse(res, 200, {
        "token" : token
      });
    } else {
      sendJSONresponse(res, 401, info);
    }
  })(req, res);

};

module.exports.verify = function(req, res){

    var token = req.params.token;

    VerificationToken.findOne({token: token}, function (err, doc){
      if (err) {
        sendJSONresponse(res, 404, err);
        return;
      };
      User.findOne({_id: doc._userId}, function (err, user) {
        if (err) {
          sendJSONresponse(res, 404, err);
          return;
        };
        if(user){
          user["verified"] = true;
          user.save(function(err,user) {
            if (err) {
              sendJSONresponse(res, 404, err);
              return;
            };
            token = user.generateJwt();
            sendJSONresponse(res, 200, {
              "token" : token
            });
          }
          )
        }else {
          sendJSONresponse(res, 401, 'user not exist!');
        }
      })
    });
}