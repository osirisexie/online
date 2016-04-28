/**
 * Created by qianmoxie on 4/8/16.
 */
var mongoose = require('mongoose'),Schema = mongoose.Schema;
var instructorSchema = new mongoose.Schema({
    name: String,
    introduction: String,
    courses:[{type: Schema.Types.ObjectId, ref: 'Course' }],
});

mongoose.model('Instructor', instructorSchema);