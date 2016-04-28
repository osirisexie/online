var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var uuid = require('node-uuid');
var verificationTokenSchema = new Schema({
    _userId: {type: Schema.Types.ObjectId, required: true, ref: 'User'},
    token: {type: String, required: true},
    createdAt: {type: Date, required: true, default: Date.now, expires: '4h'}
});
verificationTokenSchema.methods.createVerificationToken = function () {
    var token = uuid.v4();
    this.token = token;
};

mongoose.model('VerificationToken', verificationTokenSchema);