const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const { Schema } = mongoose;

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        maxLength: 32,
        trim: true
    },
    lastName: {
        type: String,
        maxLength: 32,
        trim: true
    },
    email: {
        type: String,
        trim: true,
        required: true,
        unique: true
    },
    password: {
        type: String,
        require: true
    },
    date: {
        type: Date,
        default: Date.now()
    },
    post: [{
        type: Schema.Types.ObjectId,
        ref: 'Post',
        require: true
    }]
})

userSchema.methods.comparePassword = function(password){
    return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model('User', userSchema);
/*
mongoose.connection.on("open", async () => {
    const userlevel = await level.create({
        grade: "等級一", 
        badges: "徽章一", 
        owner: owner
    })
})

userSchema.virtual("password")
    .set(
        function(password) {
            this._password = password;
            this.salt = uuid.v1();
            this.encry_password = this.securePassword(password);
    })
    .get(
        function() {
            return this._password;
    })
    userSchema.method = {
        authenticate: function(plainpassword){
            return this.securePassword(plainpassword) === this.encry_password;
        },

        securePassword: function(plainpassword){
            if(!plainpassword){
                return "";
            }

            try{
                return crypto.createHmac("sha256", this.salt).update(plainpassword).digest("hex");
            }catch(err){
                return "";
            }
        }
    }

const mongoose = require('mongoose')
const postSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: [true, 'Content 未填寫']
    },
    image: {
      type: String,
      default: ""
    },
    //存的是Mongoose的id，未來要對到userModel拉資料
    user: {
      type: mongoose.Schema.ObjectId,
      //ref是Mongoees上的user collection
      ref: "user",
      required: [true, 'User Id未填寫'],
    },
//populate是把參考資料拉入
  const post = await Post.find().populate({
    //連到posts collection下的user欄位，然後到user collection抓其他name及photo
    path: "user",
    select: "name photo"
  });

  res.status(200).json({
    // post 及 post1各是不同產物
    Post1,
    "message": "你目前造訪到XX頁"
  });
    */
