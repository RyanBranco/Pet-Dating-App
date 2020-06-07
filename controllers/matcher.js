const Post = require("../models/post");
const User = require("../models/user");
const AWS = require("aws-sdk");

module.exports = {
    index
}

function index(req, res) {
    Post.find({}).populate('user').populate('pet').exec((err, posts) => {
        res.render("matcher/index", {
            user: req.user,
            posts
        })
    })
}