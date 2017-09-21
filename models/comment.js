var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Image = new require('./image');

var schema = new Schema({
  content: {type: String},
  user: {type: Schema.Types.ObjectId, ref: 'User'},
  image: {type: Schema.Types.ObjectId, ref: 'Image'},
  likes: {type: Number},
  likedbyuser: [{type: Schema.Types.ObjectId, ref: 'User'}]
});

module.exports = mongoose.model('Comment', schema);
