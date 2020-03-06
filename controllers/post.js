const Post = require('../models/post');
const User = require('../models/user')
module.exports = {
    newPost,
    addPost,
    viewPost,
    comment
}

function newPost(req, res) {
    res.render('post/new', {
        user: req.user
    })
}

function addPost(req, res) {
    const post = new Post(req.body);
    post.save((err, post) => {
        if (err) return res.redirect('/post')
        res.redirect('/matcher')
    })
}

function viewPost(req, res) {
    Post.findById(req.params.id).populate("user").exec((err, post) => {
        res.render('post/comments', {
            postedUser: post.user,
            postId: req.params.id,
            user: req.user,
            post
        })  
    })
}

function comment(req, res) {
    Post.findById((req.params.id), (err, post) => {
        req.body.user = req.user;
        post.comments.push(req.body);
        post.save((err, p) => {
            if (err) return console.log(err);
            res.redirect(`/post/view/${req.params.id}`)
        })
    })

}