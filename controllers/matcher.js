const Post = require("../models/post");

module.exports = {
    index
}

function index(req, res) {
    res.render("matcher/index", {
        user: req.user
    })
}