const Post = require('../models/post');
const User = require('../models/user');
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
    User.findById(req.user._id).populate('pets').exec((err, user) => {
        res.render('post/new', {
            user
        })
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
    let userFirstName = req.user.name.split(" ");
    userFirstName = userFirstName[0];
    console.log(userFirstName)
    Post.findById(req.params.id).populate("user").populate("pet").exec((err, post) => {
        res.render('post/comments', {
            postedUser: post.user,
            postId: req.params.id,
            user: req.user,
            userFirstName,
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
                if (req.user.smiles.indexOf(post.id) !== -1) {
                    req.user.smiles.splice(req.user.smiles.indexOf(post.id), 1)
                    post.smile.splice(post.smile.indexOf(req.user.id), 1)
                } else {
                    post.smile.push(req.user);
                    req.user.smiles.push(post);
                }
                break;
            case "love":
                if (req.user.loves.indexOf(post.id) !== -1) {
                    req.user.loves.splice(req.user.loves.indexOf(post.id), 1)
                    post.love.splice(post.love.indexOf(req.user.id), 1)
                } else {
                    post.love.push(req.user);
                    req.user.loves.push(post);
                }
                break;
            case "laugh":
                if (req.user.laughs.indexOf(post.id) !== -1) {
                    req.user.laughs.splice(req.user.loves.indexOf(post.id), 1)
                    post.laugh.splice(post.laugh.indexOf(req.user.id), 1)
                } else {
                    post.laugh.push(req.user);
                    req.user.laughs.push(post);
                }
                break;
            case "cry":
                if (req.user.crys.indexOf(post.id) !== -1) {
                    req.user.crys.splice(req.user.crys.indexOf(post.id), 1)
                    post.cry.splice(post.cry.indexOf(req.user.id), 1)
                } else {
                    post.cry.push(req.user);
                    req.user.crys.push(post);
                }
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