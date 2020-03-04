const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const commentSchema = new Schema({
    user: {},
    content: String,
    likes: Number,
    dislikes: Number
}, {
    timestamps: true
});

const postSchema = new Schema ({
    user: {type: String, required: true},
    attatchment: String,
    content: String,
    likes: Number,
    dislikes: Number,
    comments: [commentSchema]
}, {
    timestamps: true
});

const petsSchema = new Schema ({
    avatar: String,
    name: {type: String, required: true},
    type: {type: String, required: true},
    gender: {type: String, required: true},
    sexuality: {type: String, required: true}
}, {
    timestamps: true
});

const userSchema = new Schema({
    name: {type: String, required: true},
    email: {type: String, required: true},
    avatar: String,
    pets: [petsSchema],
    posts: [postSchema],
    comments: [String],
    googleId: String
}, {
    timestamps: true
});

module.exports = mongoose.model("User", userSchema);