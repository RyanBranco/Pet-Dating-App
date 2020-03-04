const Post = require('../models/post');

module.exports = {
    newPost,
    addPost
}

function newPost(req, res) {
    res.render('post/new')
}

function addPost(req, res) {
    res.redirect('/matcher')
}