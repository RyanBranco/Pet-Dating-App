const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const commentSchema = new Schema({
    user: {type: Schema.Types.Mixed},
    content: String,
}, {
    timestamps: true
});

const postSchema = new Schema ({
    user: {type: Schema.Types.ObjectId, ref: "User"},
    attatchment: String,
    fileId: String,
    pet: String,
    content: {type: String, required: true},
    smile: {type: Number, default: 0},
    love: {type: Number, default: 0},
    laugh: {type: Number, default: 0},
    cry: {type: Number, default: 0},
    comments: [commentSchema]
}, {
    timestamps: true
});

module.exports = mongoose.model("Post", postSchema);