const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const commentSchema = new Schema({
    user: {type: Schema.Types.ObjectId, ref: "User"},
    content: String,
    likes: Number,
    dislikes: Number
}, {
    timestamps: true
});

const postSchema = new Schema ({
    user: {type: Schema.Types.ObjectId, ref: "User"},
    attatchment: String,
    pet: String,
    content: {type: String, required: true},
    likes: {type: Number, defualt: 0},
    dislikes: {type: Number, defualt: 0},
    comments: [commentSchema]
}, {
    timestamps: true
});

module.exports = mongoose.model("Post", postSchema);