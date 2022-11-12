const User = require("../models/user");
const Post = require("../models/user")

//signup POST
exports.signup = async (req, res) =>{
    const user = new User(req.body);
    user.save((err, user) =>{
        if(err){
            return res.status(400).json({
                error: "cannot add user"
            })
        }

        return res.json({
            message: "success",
            user
        })
    })
    const post = new Post(req.body);
    const postUser = await post.save();
}
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

