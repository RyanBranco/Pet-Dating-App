const Post = require('../models/post');

module.exports = {
    newPost,
    addPost
}

function newPost(req, res) {
    res.render('post/new', {
        user: req.user
    })
}

function addPost(req, res) {
    console.log(req.user)
    const post = new Post(req.body);
    post.save((err) => {
        if (err) return res.redirect('/post');
        res.redirect('/matcher')
    })
}