const User = require("../models/user");
const Post = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const bodyParser = require("body-parser");
const user = require("../models/user");


//signup POST
exports.signup = async(req, res) =>{
    var newUser = new User(req.body);
    newUser.password = bcrypt.hashSync(req.body.password, 10);
    newUser.save(function(err, user) {
      if (err) {
        return res.status(400).send({
          message: err
        });
      } else {
        user.password = undefined;
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

//login
exports.login = function(req, res) {
    User.findOne({
      email: req.body.email
    }, function(err, user) {
      if (err){
        throw err;
      }
      if (!user || !user.comparePassword(req.body.password)) {
        return res.status(401).json({ message: 'Authentication failed. Invalid user or password.' });
      }
      return res.json({ token: jwt.sign({
            email: user.email, name: user.lastName}, 'RESTFULAPIs') 
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

