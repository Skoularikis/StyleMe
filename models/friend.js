var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var User = require('./user');

var schema = new Schema({
  firstName: {type: String},
  lastName: {type: String},
  fullName: {type: String},
  status: {type: String, default: null},
  statususer: {type: String, default: null},
  friend: {type: Schema.Types.ObjectId, ref: 'User'},
  user: {type: Schema.Types.ObjectId, ref: 'User'},
  created_at: {type: Date, required: true, default: Date.now}
});

schema.post('remove', function(friend){
    User.findById(friend.user, function(err, user){
      user.friends.pull(friend);

      user.save();
    });
    User.findById(friend.friend, function(err, userfriend){
      userfriend.friends.pull(friend);

      userfriend.save();
    });
});

module.exports=mongoose.model('Friend', schema);
