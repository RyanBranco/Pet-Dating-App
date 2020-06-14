const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const petsSchema = new Schema ({
    attatchment: String,
    fileId: String,
    owner: {type: Schema.Types.ObjectId, ref: "User"},
    name: {type: String, required: true},
    type: {type: String, required: true},
    gender: {type: String, required: true},
    followers: [{type: Schema.Types.ObjectId, ref: "User"}]
}, {
    timestamps: true
});

module.exports = mongoose.model("Pet", petsSchema);