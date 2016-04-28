/**
 * Created by qianmoxie on 3/3/16.
 */
var helpers = require('../helpers');
var request = require('request');
var renderCourse = function(req, res, responseBody){
    res.render('courseList',{
        title: 'courses',
        course: JSON.stringify(responseBody)
    });
};
module.exports.courselist = function (req, res) {
    var requestOption, path, method;
    path = '/api/courses';
    method = 'GET';
    requestOption = new helpers.requestOption(method,path);
    request(
        requestOption,
        function(err, response, body){
            renderCourse(req, res, body);
        }
    );

}