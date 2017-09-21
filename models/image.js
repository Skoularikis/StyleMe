var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var User = new require('./user');
var Comment = new require('./comment');

var schema = new Schema({
  content: {type: String },
  user: {type: Schema.Types.ObjectId, ref: 'User'},
  desc: {type: String },
  likes: {type: Number},
  comments: [{type: Schema.Types.ObjectId, ref: 'Comment'}],
  created_at: {type: Date, required: true, default: Date.now},
  likedbyuser: [{type: Schema.Types.ObjectId, ref: 'User'}]

});

schema.post('remove', function(image){
    User.findById(image.user, function(err, user){
      if (err) {
        return res.status(500).json({
          title: 'An error occured',
          error: err
        });
      }
      user.images.pull(image);
      user.profileimage = null
      user.save();
    });
});

module.exports = mongoose.model('Image', schema);
