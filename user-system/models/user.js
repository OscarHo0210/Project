const mongoose = require("mongoose");
const crypto = require("crypto");
const uuid = require('uuid');
uuid.v1();

const userSchema = new mongoose.Schema({
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
    encry_password: {
        type: String,
        require: true
    }
})

module.exports = mongoose.model("User", userSchema);


/*
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
*/
