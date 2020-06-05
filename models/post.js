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
    smile: [{type: Schema.Types.ObjectId, ref: "User"}],
    love: [{type: Schema.Types.ObjectId, ref: "User"}],
    laugh: [{type: Schema.Types.ObjectId, ref: "User"}],
    cry: [{type: Schema.Types.ObjectId, ref: "User"}],
    comments: [commentSchema]
}, {
    timestamps: true
});

module.exports = mongoose.model("Post", postSchema);