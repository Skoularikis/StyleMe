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

router.post('/', function(req, res, next){
    var decoded = jwt.decode(req.query.token);
    User.findById(decoded.user._id, function(err, user){
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

    Image.findById(req.body.imageId, function(err, image) {
      if (err) {
        return res.status(500).json({
          title: 'An error occured',
          error: err

        });
      }
      if (!image) {
        return res.status(500).json({
          title: 'No image found',
          error: {message: 'Image not found'}
      });
    }



    var comment = new Comment({
      content: req.body.content,
      user: user._id,
      image: image._id,
      likes: 0
    });
    comment.save(function(err, result){
      if (err) {
        return res.status(500).json({
          title: 'An error occured',
          error: err
        });
      }
      image.comments.push(result);
      image.save();
      res.status(201).json({
        message: 'Saved comment',
        obj: result
      });
    });

  });
});
  });

  router.get('/:id', function(req,res,next){
      var decoded = jwt.decode(req.query.token);
      Comment.find({image: req.params.id})
            .populate('user')
            .exec(function(err, comments) {
        if (err) {
          return res.status(500).json({
            title: 'An error occured',
            error: err
          });
        }
        res.status(200).json({
          message: 'Comments fetched',
          obj: comments
          });
      });
  });

  router.patch('/:id', function(req, res, next){
    var decoded = jwt.decode(req.query.token);
    Comment.findById(req.params.id, function(err, comment){
      if (err) {
        return res.status(500).json({
          title: 'An error occured',
          error: err
        });
      }
      if (!comment) {
        return res.status(500).json({
          title: 'No comment found',
          error: {message: 'Comment not Found'}
        });
      }
      if (comment.user != decoded.user._id) {
          return res.status(401).json({
            title: 'Not Autheticated',
            error: {message: 'User do not match'}
          });
      }
      comment.content = req.body.content;
      comment.save(function(err, result){
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

  router.delete('/:id', function(req, res, next){
    var decoded = jwt.decode(req.query.token);
    Comment.findById(req.params.id, function(err, comment){
      if (err) {
        return res.status(500).json({
          title: 'An error occured',
          error: err
        });
      }
      if (!comment) {
        return res.status(500).json({
          title: 'No message found',
          error: {message: 'Message not Found'}
        });
      }
      if (comment.user != decoded.user._id) {
          return res.status(401).json({
            title: 'Not Autheticated',
            error: {message: 'User do not match'}
          });
      }
      Image.findById(comment.image, function(err, image){
        if (err) {
          return res.status(500).json({
            title: 'An error occured',
            error: err
          });
        }
        if (!image) {
          return res.status(500).json({
            title: 'No image found',
            error: {message: 'Image not Found'}
          });
        }
      image.comments.splice(image.comments.indexOf(comment), 1);
      image.save();
      comment.remove(function(err, result){
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
        });

        router.patch('/:id/likes/:comment_id', function(req, res, next){
           var decoded = jwt.decode(req.query.token);
           Comment.findById(req.params.comment_id, function(err, comment){
             if (err) {
               return res.status(500).json({
                 title: 'An error occured',
                 error: {message: 'Cant find comment'}
               });
             }
             if (!comment) {
               return res.status(500).json({
                 title: 'No comment found',
                 error: {message: 'Comment not Found'}
               });
             }


            if (comment.likedbyuser.indexOf(req.params.id) === -1  ){

                  comment.likes = comment.likes + 1,
                  comment.likedbyuser.push(req.params.id);

             }
              else if (comment.likedbyuser.indexOf(req.params.id) > -1) {
               comment.likes = comment.likes - 1,
               comment.likedbyuser.pull(req.params.id);

             }
             comment.save(function(err, result){
              if (err) {
                return res.status(500).json({
                  title: 'An error occured',
                  error: {message: 'Cant be updated'}
                });
              }
              res.status(200).json({
                message: 'Updated comment"s" likes',
                obj: result
              });
            });
          });
            });

module.exports = router;
