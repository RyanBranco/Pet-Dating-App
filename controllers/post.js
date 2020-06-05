const Post = require('../models/post');
const AWS = require("aws-sdk");

let s3bucket = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION
});

const ID = function() {
    return '_' + Math.random().toString(36).substr(2, 9);
};

const getExtention = function(filename) {
    return filename.split('.').pop();
}

module.exports = {
    newPost,
    addPost,
    viewPost,
    comment,
    react
}

function newPost(req, res) {
    res.render('post/new', {
        user: req.user
    })
}

function addPost(req, res) {
    if (req.file) {
        req.file.originalname = ID() + "." + getExtention(req.file.originalname);
        req.body.fileId = req.file.originalname;
        const file = req.file;   

        const params = {
            Bucket: "pet-dating",
            Key: file.originalname,
            Body: file.buffer,
            ContentType: file.mimetype,
            ACL: "public-read"
        };

        s3bucket.upload(params, function(err, data) {
            if (err) {
                res.status(500).json({ error: true, Message: err });
            } else {
                const post = new Post(req.body);
                post.save((err, post) => {
                    if (err) return res.redirect('/post');
                    req.user.posts.push(post);
                    req.user.save((err) => {
                        if (err) return res.redirect('/post');
                        res.redirect('/matcher')
                    })
                })
            }
        });
    } else {
        const post = new Post(req.body);
        post.save((err, post) => {
            if (err) return res.redirect('/post');
            req.user.posts.push(post);
            req.user.save((err) => {
                if (err) return res.redirect('/post');
                res.redirect('/matcher')
            })
        })
    }
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
        req.user.commented.push(post);
        post.save((err, p) => {
            if (err) return console.log(err);
        })
        req.user.save((err) => {
            if (err) return console.log(err);
            res.redirect(`/post/view/${req.params.id}`);
        })
    })
}

function react(req, res, next) {
    Post.findById((req.params.id), (err, post) => {
        switch (req.params.reaction) {
            case "smile":
                post.smile.push(req.user);
                req.user.smiles.push(post);
                break;
            case "love":
                post.love.push(req.user);
                req.user.loves.push(post);
                break;
            case "laugh":
                post.laugh.push(req.user);
                req.user.laughs.push(post);
                break;
            case "cry":
                post.cry.push(req.user);
                req.user.crys.push(post);
                break;
        }
        post.save((err) => {
            if (err) return console.log(err);
        })
        req.user.save((err) => {
            if (err) return console.log(err);
            res.redirect("/matcher")
        })
    })
}