const mongoose = require("mongoose");
const { Schema } = mongoose;

const postSchema = mongoose.Schema({
    content: {
        type: String,
        required: [true, 'Content 未填寫']
      },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        require: true
    },
    date: {
        type: Date,
        default: Date.now
    },
})

module.exports = mongoose.model('Post', postSchema);