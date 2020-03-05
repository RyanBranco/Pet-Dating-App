const Post = require("../models/post");
const User = require("../models/user");

module.exports = {
    index
}

function index(req, res) {
    Post.find({}, (err, post) => {
        console.log(post)
        // User.findById(post.id, (err, user) => {
            // console.log(user)
            res.render("matcher/index", {
                posts: post
            })
        // })
    })
}