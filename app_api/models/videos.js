/**
 * Created by qianmoxie on 3/7/16.
 */
var mongoose = require('mongoose');

var videoSchema = new mongoose.Schema({
    videoid: Number,
    length: Number,
    title: String,
    description: String,
    chapters:[{
        title: String,
        secs: Number
    }],
});

mongoose.model('Video',videoSchema);