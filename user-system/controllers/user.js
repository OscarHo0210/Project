const User = require("../models/user");

//signup POST
exports.signup = (req, res) =>{
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
}
//get all users GET
exports.getAll = async (req,res)=>{
    const userList = await User.find();

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

/*exports.getAll = (req, res) => {
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

