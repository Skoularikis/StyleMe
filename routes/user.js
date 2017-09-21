var express = require('express');
var router = express.Router();
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

var User = require('../models/user');

router.get('/', function(req, res) {
  var query = User.find({status: 'pro'})

  if (req.query.jobdesc)  {
    query.where('jobdesc').equals(new RegExp(req.query['jobdesc']))
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

router.post('/', function (req, res, next) {
    var user = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        fullName: req.body.firstName + req.body.lastName,
        password: bcrypt.hashSync(req.body.password, 10),
        email: req.body.email,
    });
    user.save(function(err, result) {
        if (err) {
            return res.status(500).json({
                title: 'An error occurred',
                error: err
            });
        }
        res.status(201).json({
            message: 'User created',
            obj: result

        });
    });
});

router.post('/pro/', function (req, res, next) {
    var user = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        fullName: req.body.firstName + req.body.lastName,
        password: bcrypt.hashSync(req.body.password, 10),
        email: req.body.email,
        status: 'pro',
        jobdesc: req.body.jobdesc
    });
    user.save(function(err, result) {
        if (err) {
            return res.status(500).json({
                title: 'An error occurred',
                error: err
            });
        }
        res.status(201).json({
            message: 'User created',
            obj: result

        });
    });
});


router.post('/signin', function(req, res, next){
    User.findOne({email: req.body.email}, function(err, user){
      if (err) {
          return res.status(500).json({
              title: 'An error occurred',
              error: err
          });
      }
      if (!user) {
          return res.status(401).json({
            title: 'Login failed',
            error: {message: 'Invalid login credentials'}
          });
        }
        if (!bcrypt.compareSync(req.body.password, user.password)) {
          return res.status(401).json({
            title: 'Login failed',
            error: {message: 'Invalid login credentials'}
          });
        }
        var token = jwt.sign({user: user}, 'secret', {expiresIn: 7200});
        res.status(200).json({
          message: 'Fully logged in',
          token: token,
          userId: user._id,
          status: user.status
        });
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

router.get('/rating', function(req,res,next){
    var decoded = jwt.decode(req.query.token);
    User.find({status: 'pro'},function(err, users) {
      if (err) {
        return res.status(500).json({
          title: 'An error occured',
          error: err
        });
      }
      res.status(200).json({
        message: 'User with rating fetched',
        obj: users
        });
    });
});
router.get('/job/:jobdesc', function(req,res,next){
    var decoded = jwt.decode(req.query.token);
    User.find({jobdesc: req.params.jobdesc},function(err, users) {
      if (err) {
        return res.status(500).json({
          title: 'An error occured',
          error: err
        });
      }
      res.status(200).json({
        message: 'User with rating fetched',
        obj: users
        });
    });
});

router.get('/:id', function(req,res,next){
  var decoded = jwt.decode(req.query.token);
  User.findById(req.params.id,function(err, user) {
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
      message: 'Pro User fetched',
      obj: user


      });
  });
});

router.patch('/:id', function(req, res, next){
  var decoded = jwt.decode(req.query.token);
  User.findById(req.params.id, function(err, user){
    if (err) {
      return res.status(500).json({
        title: 'An error occured',
        error: err
      });
    }
    if (!user) {
      return res.status(500).json({
        title: 'No user found',
        error: {message: 'User not Found'}
      });
    }

           user.fewWords = req.body.fewWords;
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





module.exports = router;
