/**
 * Created by qianmoxie on 3/3/16.
 */
var mongoose = require('mongoose'),Schema = mongoose.Schema;

//course schema
var courseSchema = new mongoose.Schema({
    title: String,
    description: String,
    videos : [{ type: Schema.Types.ObjectId, ref: 'Video' }],
    students:[{ type: Schema.Types.ObjectId, ref: 'User' }],
    studentNum: {type:Number, default: 0},
    created: {type: Date, default: Date.now},
    labels:[{type:String}],
    cover: String
});

courseSchema.index({title:'text', description:'text'});

mongoose.model('Course', courseSchema);