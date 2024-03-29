const User = require("../models/user");
const Post = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const bodyParser = require("body-parser");
//const isAuth = require("../middlewares/isAuth");


//signup POST
exports.signup = async(req, res) =>{
    var newUser = new User(req.body);
    newUser.hash_password = bcrypt.hashSync(req.body.password, 10);
    newUser.save(function(err, user) {
      if (err) {
        return res.status(400).send({
          message: err
        });
      } else {
        user.hash_password = undefined;
        return res.json(user);
      }
    });

    if(!req.body.email || !req.body.password){
        res.json({
            success: false,
            error: "Send needed params"
        })
        return
    }
};

//login POST
exports.login = function(req, res) {
    User.findOne({
      email: req.body.email
    }, function(err, User) {
      if (err){
        throw err;
      }
      if (!User) {
        return res.status(401).json({ 
            message: 'Authentication failed. Invalid user.' 
        });
      } else if (!User.comparePassword(req.body.password)){
        return res.status(401).json({ 
            message: 'Authentication failed. Invalid password.' 
        });
      }
      return res.json({ 
        message: "login successful",
        token: jwt.sign({
            email: User.email, 
            name: User.lastName,
            _id: User._id}, 
            process.env.JWT_SECRET,
            ) 
        });
    });
};

//get all users GET
exports.getAll = async (req,res)=>{
    const userList = await User.find()

        if(!userList) {
            res.status(400).json({
                error: "Connot get all users",
                success: false
            });

            return res.json({
                message: "success",
                userList
            })
    }
    res.send(userList);
};

exports.loginRequired = function(req, res, next) {
    if (req.user) {
      next();
    } else {
  
      return res.status(401).json({ message: 'Unauthorized user!!' });
    }
  };

//get user profile
/*
exports.userProfile = function(req, res, next) {
  if (req.user) {
    res.send(req.user);
    next();
  } 
  else {
   return res.status(401).json({ message: 'Invalid token' });
  }
};

/*
exports.postLevel = (req, res) =>{
    const level = new Level(req.body);
    level.save((err, level) =>{
        if(err){
            return res.status(400).json({
                error: "cannot add level"
            })
        }

        return res.json({
            message: "success",
            level
        })
    })
}

exports.getLevel = async (req,res)=>{
    const levelList = await Level.find();
        if(!levelList) {
            res.status(400).json({
                error: "Connot get all levels",
                success: false
            });

            return res.json({
                message: "success",
                levelList
            })
    }
    res.send(levelList);
};

exports.getAll = (req, res) => {
    const user = await User.find();
    user.find((err, user) => {
        if(err){
            return res.status(400).json({
                error: "cannot get all users"
            })
        }

        return res.json({
            message: "success",
            user
        })
    })
}*/

