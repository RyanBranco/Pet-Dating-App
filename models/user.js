const mongoose = require("mongoose");
const Schema = mongoose.Schema

const userSchema = new Schema({
    name: {type: String, required: true},
    email: {type: String, required: true},
    avatar: String,
    // pets: [petsSchema],
    // posts: [postSchema],
    googleId: String
}, {
    timestamps: true
});

module.exports = mongoose.model("User", userSchema);