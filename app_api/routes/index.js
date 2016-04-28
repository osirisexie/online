/**
 * Created by qianmoxie on 3/3/16.
 */
var express = require('express');
var router = express.Router();
var jwt = require('express-jwt');
var auth = jwt({
    secret: process.env.JWT_SECRET,
    userProperty: 'payload'
});


var ctrlCourse = require('../controllers/courses');
var ctrlVideo = require('../controllers/videos');
var ctrlProduct = require('../controllers/products');
var ctrlAuth = require('../controllers/authentication');
var ctrlUser = require('../controllers/users.js');
var ctrlTest = require('../controllers/test.js');

router.get('/users/:userid',ctrlUser.userGetOne);
router.get('/courses', ctrlCourse.courseList);
router.post('/courses',ctrlCourse.courseCreate);
router.get('/courses/:courseid',ctrlCourse.courseReadOne);
router.post('/courses/videos/:courseid',ctrlCourse.editVideos);
router.put('/Courses/:id',ctrlCourse.editOne);
router.delete('/Courses/:id',ctrlCourse.deleteOne);
router.get('/videos',  ctrlVideo.videolist);
router.post('/videos',ctrlVideo.videoCreate);
router.get('/videos/:videoid',ctrlVideo.videoReadOne);
router.post('/videos/chapters/:videoid',ctrlVideo.editChapters);
router.put('/videos/:id',ctrlVideo.editOne);
router.delete('/videos/:id',ctrlVideo.deleteOne);
router.get('/products',ctrlProduct.productList);
router.post('/products',ctrlProduct.productCreate);
router.get('/products/:productid',ctrlProduct.productReadOne);
router.post('/products/courses/:productid',ctrlProduct.editCourses);
router.put('/products/:id',ctrlProduct.editOne);
router.delete('/products/:id',ctrlProduct.deleteOne);
router.post('/register',ctrlAuth.register);
router.post('/login',ctrlAuth.login);
router.post('/enroll/:userid/:productid',ctrlUser.enroll);
router.post('/users/:userid/:videoid',ctrlUser.video);
router.get('/products/getcourse/:courseid',ctrlProduct.findByCourse );
router.get('/sendmail',ctrlUser.sendmail);
router.post('/upload',ctrlTest.upload);
router.get('/verify/:token',ctrlAuth.verify);
module.exports = router;