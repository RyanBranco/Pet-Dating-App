const Post = require('../models/post');

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
        req.user.posts.push(post._id);
        req.user.save((err) => {
            if (err) return res.redirect('/post');
            res.redirect('/matcher')
        })
    })
}

function viewPost(req, res) {
    Post.find({}, (err, posts) => {
        res.render('post/comments', {
            post: posts[req.params.id],
            postId: req.params.id,
            user: req.user
        })
    })
}

function comment(req, res) {
    Post.find({}, (err, posts) => {
        const thisPost = posts[req.params.id];
        thisPost.comments.push(req.body);
        console.log(thisPost.comments);
        thisPost.save((err) => {
            if (err) return console.log(err);
            res.redirect(`/post/view/${req.params.id}`)
        })
    })

}