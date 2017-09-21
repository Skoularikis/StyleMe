var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');

var User = require('../models/user');

var Image = require('../models/image');
var Comment = require('../models/comment');
var Friend = require('../models/friend');

router.get('/', function(req, res) {
  var query = User.find({});
  if (req.query.fullName)  {
    query.where('fullName').equals(new RegExp(req.query['fullName']))
  }
  query.exec(function(err, users) {
    if (err) {
        return res.status(500).json({
            title: 'An error occurred',
            error: err
        });
    } else {
      res.status(200).json({
            message: 'Search with term fullName',
            data: users
          });
    }
  });
});

router.use('/', function(req,res,next) {
  jwt.verify(req.query.token, 'secret', function(err, decoded) {
    if (err) {
      return res.status(401).json({
        title: 'Not Autheticated',
        error: err
      });
    }
    next();
  })
});

router.post('/add/:id', function(req, res, next){
    var decoded = jwt.decode(req.query.token);
    User.findById(decoded.user._id, function(err,user){
      if (err) {
        return res.status(500).json({
          title: 'An error occured',
          error: err
        });
      }
      User.findById(req.params.id, function(err, friended){
        if (err) {
          return res.status(500).json({
            title: 'An error occured',
            error: err
          });
        }
      var friend = new Friend({
        firstName: friended.firstName,
        lastName: friended.lastName,
        fullName: friended.fullName,
        status: 'pending',
        statususer: 'requested',
        friend: req.params.id,
        user: decoded.user._id
      });
      friend.save(function(err, result){
        if (err) {
          return res.status(500).json({
            title: 'An error occured',
            error: err
          });
        }
        friended.friends.push(result);

        friended.save();
        user.friends.push(result);

        user.save();
        res.status(201).json({
          message: 'Saved Friend with status pending and pending',
          obj: result
        });
      });
      });
    });
 });

 router.get('/friends/:id', function(req,res,next){

     var decoded = jwt.decode(req.query.token);
     User.findById(req.params.id)
      .populate('friends')
      .exec(function(err, user){
       if (err) {
         return res.status(500).json({
           title: 'An error occured',
           error: {message: 'Cant find image'}
         });
       }
       if (!user) {
         return res.status(500).json({
           title: 'No user found',
           error: {message: 'User not found'}

       });
     }
       res.status(200).json({
         message: 'Friends fetched',
         obj: user
         });
       });
     });

     router.get('/friends/:id', function(req,res,next){

         var decoded = jwt.decode(req.query.token);
         User.findById(req.params.id)
          .populate('friends')
          .exec(function(err, user){
           if (err) {
             return res.status(500).json({
               title: 'An error occured',
               error: {message: 'Cant find image'}
             });
           }
           if (!user) {
             return res.status(500).json({
               title: 'No user found',
               error: {message: 'User not found'}

           });
         }
           res.status(200).json({
             message: 'Friends fetched',
             obj: user
             });
           });
         });



     router.get('/friends/req/:id', function(req,res,next){

         var decoded = jwt.decode(req.query.token);
         User.findById(req.params.id)
          .populate('friends')
          .exec(function(err, user){
           if (err) {
             return res.status(500).json({
               title: 'An error occured',
               error: {message: 'Cant find image'}
             });
           }
           if (!user) {
             return res.status(500).json({
               title: 'No user found',
               error: {message: 'User not found'}

           });
         }
           res.status(200).json({
             message: 'Friends fetched',
             obj: user
             });
           });
         });



         router.get('/user/:id', function(req,res,next){
           var decoded = jwt.decode(req.query.token);
           User.findById(decoded.user._id,function(err, result) {
                if (err) {
                  return res.status(500).json({
                    title: 'An error occured',
                    error: {message: 'Cant find image'}
                  });
                }
                res.status(200).json({
                  message: 'Friend fetched',
                  obj: result
                  });
              });
          });


 router.get('/:id', function(req,res,next){
   var decoded = jwt.decode(req.query.token);
   Friend.findOne({friend: req.params.id, user: decoded.user._id},function(err, result) {
        if (err) {
          return res.status(500).json({
            title: 'An error occured',
            error: {message: 'Cant find image'}
          });
        }
        res.status(200).json({
          message: 'Friend fetched',
          obj: result
          });
      });
  });

  router.get('/:id', function(req,res,next){
    var decoded = jwt.decode(req.query.token);
    Friend.findById(req.params.id,function(err, result) {
         if (err) {
           return res.status(500).json({
             title: 'An error occured',
             error: {message: 'Cant find image'}
           });
         }
         res.status(200).json({
           message: 'Friend fetched',
           obj: result
           });
       });
   });

  router.get('/other/:id', function(req,res,next){
    var decoded = jwt.decode(req.query.token);

    Friend.findOne({friend: decoded.user._id, user: req.params.id},function(err, result) {
         if (err) {
           return res.status(500).json({
             title: 'An error occured',
             error: {message: 'Cant find image'}
           });
         }
         res.status(200).json({
           message: 'Friend fetched',
           obj: result
           });
       });
   });



    router.delete('/:id', function(req, res, next){
      var decoded = jwt.decode(req.query.token);
      Friend.findById(req.params.id, function(err, friend) {
        if (err) {
          return res.status(500).json({
            title: 'An error occured',
            error: err
          });
        }
        if (!friend) {
          return res.status(500).json({
            title: 'No friend found',
            error: {message: 'Friend not Found'}
          });
        }

        friend.remove(function(err, result){
          if (err) {
            return res.status(500).json({
              title: 'An error occured',
              error: err
            });
          }
          res.status(200).json({
            message: 'Deleted friend',
            obj: result
            });
          });
        });
      });



      router.patch('/accept/:id', function(req, res, next){
        var decoded = jwt.decode(req.query.token);
        Friend.findById(req.params.id, function(err, friend){
          if (err) {
            return res.status(500).json({
              title: 'An error occured',
              error: err
            });
          }
          if (!friend) {
            return res.status(500).json({
              title: 'No friend found',
              error: {message: 'Friend not Found'}
            });
          }
          if (friend.friend != decoded.user._id) {
              return res.status(401).json({
                title: 'Not Autheticated',
                error: {message: 'User do not match'}
              });
          }
          User.findById(friend.friend, function(err,user){
            if (err) {
              return res.status(500).json({
                title: 'An error occured',
                error: err
              });
            }
          user.friends.push(friend.friend)
          friend.status = 'accepted'
          friend.statususer = 'accepted'
          friend.save(function(err, result){
            if (err) {
              return res.status(500).json({
                title: 'An error occured',
                error: err
              });
            }
            res.status(200).json({
              message: 'Updated friendship status',
              obj: result
            });
          });
        });
      });
  });



module.exports = router;
