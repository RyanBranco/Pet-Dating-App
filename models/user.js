const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const petsSchema = new Schema ({
    avatar: {type: String, default: "https://render.fineartamerica.com/images/rendered/default/print/8.000/8.000/break/images-medium-5/round-dog-and-cat-icon-robinolimb.jpg"},
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
    posts: [{type: Schema.Types.ObjectId, ref: "Post"}],
    googleId: String
}, {
    timestamps: true
});

module.exports = mongoose.model("User", userSchema);