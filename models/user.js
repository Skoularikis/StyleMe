var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var mongooseUniqueValidator = require('mongoose-unique-validator');



var schema = new Schema({
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    fullName: {type: String, required: true},
    password: {type: String, required: true},
    profileimage: {type: Schema.Types.ObjectId, ref: 'Image',  default: null},
    email: {type: String, required: true, unique: true},
    images: [{type: Schema.Types.ObjectId, ref: 'Image'}],
    friends: [{type: Schema.Types.ObjectId, ref: 'Friend'}],
    status: {type: String},
    jobdesc: {type: String},
    fewWords: {type: String, default: 'No Description provided yet'}
});


schema.plugin(mongooseUniqueValidator);





module.exports = mongoose.model('User', schema);
