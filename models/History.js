const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const historySchema = new Schema({
    time: {type: Date, default: Date.now},
    type: {type: String, required: true},
    reaction: {type: Schema.Types.ObjectId, ref: "Post"},
    reactionType: String,
    comment: {type: Schema.Types.ObjectId, ref: "Post"},
    post: {type: Schema.Types.ObjectId, ref: "Post"},
    createPet: {type: Schema.Types.ObjectId, ref: "Pet"},
}, {
    timestamps: true
});

module.exports = mongoose.model("History", historySchema);