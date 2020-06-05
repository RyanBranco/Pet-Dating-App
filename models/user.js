const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const petsSchema = new Schema ({
    attatchment: String,
    fileId: String,
    name: {type: String, required: true},
    type: {type: String, required: true},
    gender: {type: String, required: true},
    sexuality: {type: String, required: true},
    followers: [{type: Schema.Types.ObjectId, ref: "User"}]
}, {
    timestamps: true
});

const userSchema = new Schema({
    name: {type: String, required: true},
    email: {type: String, required: true},
    avatar: String,
    pets: [petsSchema],
    googleId: String,
    posts: [{type: Schema.Types.ObjectId, ref: "Post"}],
    commented: [{type: Schema.Types.ObjectId, ref: "Post"}],
    smiles: [{type: Schema.Types.ObjectId, ref: "Post"}],
    laughs: [{type: Schema.Types.ObjectId, ref: "Post"}],
    loves: [{type: Schema.Types.ObjectId, ref: "Post"}],
    crys: [{type: Schema.Types.ObjectId, ref: "Post"}]
}, {
    timestamps: true
});

module.exports = mongoose.model("User", userSchema);