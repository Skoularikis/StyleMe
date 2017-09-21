var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');

var User = require('../models/user');

var Image = require('../models/image');
var Comment = require('../models/comment');

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

router.get('/profile/:id', function(req,res,next){
    var decoded = jwt.decode(req.query.token);
    Image.find({user: req.params.id})
          .populate('user')
          .exec(function(err, images) {
      if (err) {
        return res.status(500).json({
          title: 'An error occured',
          error: err
        });
      }
      res.status(200).json({
        message: 'Images fetched',
        obj: images
        });
    });
});
/*
router.get('/oneimage/:id', function(req,res,next) {
  var decoded = jwt.decode(req.query.token);
  Image.find({user: req.params.id})
        .populate('user')
        .exec(function(err, images) {
    if (err) {
      return res.status(500).json({
        title: 'An error occured',
        error: err
      });
    }
    images.sort(function(a,b) {
            return b.created_at - a.created_at
    });
    res.status(200).json({
      message: 'Images fetched',
      obj: images
      });
  });
});
*/
router.get('/profile/date/:id', function(req,res,next){
    var decoded = jwt.decode(req.query.token);
    //var allfriendsimages = [];
    //var parsed = JSON.parse(req.body.idofFriends)
    //console.log(parsed, allfriendsimages)
    //for(var idofFriend of req.body.idofFriends) {
    Image.find({user: req.params.id})
          .populate('user')
          .exec(function(err, images) {
      if (err) {
        return res.status(500).json({
          title: 'An error occured',
          error: err
        });
      }
      //for (var image of images) {
      //  allfriendsimages.push(image)
      //}

      images.sort(function(a,b) {
              return b.created_at - a.created_at
      });
      res.status(200).json({
        message: 'Images fetched',
        obj: images
        });
        });
});




router.get('/profileimage/:id', function(req,res,next){
  var decoded = jwt.decode(req.query.token);
  User.findById(req.params.id)
      .populate('profileimage')
      .exec(function(err, user) {
    if (err) {
      return res.status(500).json({
        title: 'An error occured',
        error: err

      });
    }
    if (!user) {
      return res.status(500).json({
        title: 'No user found',
        error: {message: 'User not found'}

    });
  }

    res.status(200).json({
      message: 'Profile image fetched',
      obj: user


      });
  });
});

router.get('/golike/:id', function(req,res,next){
    Image.findById(req.params.id)
          .populate('user')
          .exec(function(err, image){
            if (err) {
              return res.status(500).json({
                title: 'An error occured',
                error: err

              });
            }
            if (!image) {
              return res.status(500).json({
                title: 'No image found',
                error: {message: 'image not found'}

            });
          }

                res.status(200).json({
                  message: 'Profile image fetched',
                  obj: image


                  });
          });
});

router.post('/', function(req, res, next){
    var decoded = jwt.decode(req.query.token);
    User.findById(decoded.user._id, function(err,user){
      if (err) {
        return res.status(500).json({
          title: 'An error occured',
          error: err
        });
      }
      var image = new Image({
        content: req.body.content,
        user: decoded.user._id,
        desc: req.body.desc,
        likes: 0,
      });
      image.save(function(err, result){
        if (err) {
          return res.status(500).json({
            title: 'An error occured',
            error: err
          });
        }
        user.images.push(result);
        user.save();
        res.status(201).json({
          message: 'Saved image',
          obj: result
        });
      });
    });
 });

 router.delete('/:id', function(req, res, next){
   var decoded = jwt.decode(req.query.token);
   Image.findById(req.params.id)
        .populate('user')
        .exec(function(err, image){
     if (err) {
       return res.status(500).json({
         title: 'An error occured',
         error: err
       });
     }
     if (!image) {
       return res.status(500).json({
         title: 'No message found',
         error: {message: 'Message not Found'}
       });
     }

     image.remove(function(err, result){
       if (err) {
         return res.status(500).json({
           title: 'An error occured',
           error: err
         });
       }
       res.status(200).json({
         message: 'Deleted message',
         obj: result
         });
       });
     });
   });

   router.patch('/:id', function(req, res, next){
     var decoded = jwt.decode(req.query.token);
     Image.findById(req.params.id, function(err, image){
       if (err) {
         return res.status(500).json({
           title: 'An error occured',
           error: err
         });
       }
       if (!image) {
         return res.status(500).json({
           title: 'No message found',
           error: {message: 'Message not Found'}
         });
       }
       User.findById(image.user)
            .populate('profileimage')
            .exec(function(err, user) {
              if (err) {
                return res.status(500).json({
                  title: 'An error occured',
                  error: err
                });
              }
              if (!user) {
                return res.status(500).json({
                  title: 'No user found',
                  error: {message: 'User not found'}
                });
              }
              if (image.user != decoded.user._id) {
                  return res.status(401).json({
                    title: 'Not Autheticated',
                    error: {message: 'User do not match'}
                  });
              }

              user.profileimage = image._id
              user.save(function(err, result){
                if (err) {
                  return res.status(500).json({
                    title: 'An error occured',
                    error: err
                  });
                }
                res.status(200).json({
                  message: 'Updated message',
                  obj: result
                });
                });
        });
     });
   });

router.patch('/:id/likes/:image_id', function(req, res, next){
   var decoded = jwt.decode(req.query.token);
   Image.findById(req.params.image_id, function(err, image){
     if (err) {
       return res.status(500).json({
         title: 'An error occured',
         error: {message: 'Cant find image'}
       });
     }
     if (!image) {
       return res.status(500).json({
         title: 'No message found',
         error: {message: 'Message not Found'}
       });
     }


    if (image.likedbyuser.indexOf(req.params.id) === -1  ){

          image.likes = image.likes + 1,
          image.likedbyuser.push(req.params.id);

     }
      else if (image.likedbyuser.indexOf(req.params.id) > -1) {
       image.likes = image.likes - 1,
       image.likedbyuser.pull(req.params.id);

     }
     image.save(function(err, result){
      if (err) {
        return res.status(500).json({
          title: 'An error occured',
          error: {message: 'Cant be updated'}
        });
      }
      res.status(200).json({
        message: 'Updated message',
        obj: result
      });
    });
  });
    });






module.exports = router;
