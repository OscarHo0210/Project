const Post = require("../models/post")

/*
exports.Article = async (req, res) => {
    const post = await Post.find().populate({
        //連到posts collection下的user欄位，然後到user collection抓其他name及photo
        path: 'user',
        select: 'name lastName'
      })
      if(!post) {
        res.status(400).json({
            error: "Connot post article",
            success: false
        });

        return res.json({
            message: "success",
            post
        })
    }
}*/

exports.getArticle = async (req,res)=>{
    const post = await Post.find().populate({
        //連到posts collection下的user欄位，然後到user collection抓其他name及photo
        path: 'user',
        select: 'name lastName'
      })

        if(!post) {
            res.status(400).json({
                error: "Connot get all article",
                success: false
            });

            return res.json({
                message: "success",
                post
            })
    }
    res.send(post);
};