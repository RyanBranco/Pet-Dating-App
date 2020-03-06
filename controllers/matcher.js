const Post = require("../models/post");
const User = require("../models/user");

module.exports = {
    index
}

function index(req, res) {
    Post.find({}).populate('user').exec((err, posts) => {
        res.render("matcher/index", {
            posts
        })
    })
}