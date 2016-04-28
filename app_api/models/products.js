/**
 * Created by qianmoxie on 3/8/16.
 */
var mongoose = require('mongoose'),Schema = mongoose.Schema;

var productSchema = new mongoose.Schema({
    title: String,
    description: String,
    courses:[{type: Schema.Types.ObjectId, ref: 'Course' }],
    service:{

    }
});

mongoose.model('Product', productSchema);