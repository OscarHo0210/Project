const mongoose = require("mongoose");
const { Schema } = mongoose;

const postSchema = mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Title 未填寫']
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