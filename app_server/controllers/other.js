/**
 * Created by qianmoxie on 3/3/16.
 */
var helpers = require('../helpers');
var request = require('request');

module.exports.angularApp = function (req, res) {
    res.render('layout',{title: 'Online Classroom'});
}