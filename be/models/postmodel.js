const mongoose = require ("mongoose");

const PostSchema = new mongoose.Schema
({
    image: {
        type: String,
    },
    description:{
        type: String,
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'userModel'
    }

}, {timestamps: true, strict: true})

module.exports = mongoose.model('postModel', PostSchema, 'post')