var express = require('express');
var router = express.Router();
var ctrlCourse = require('../controllers/courses');
var ctrlOther = require('../controllers/other');

/* GET home page. */
router.get('/', ctrlOther.angularApp);


router.get('/courses',ctrlCourse.courselist );

module.exports = router;
