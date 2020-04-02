const Post = require('../models/post');
const User = require('../models/user');
const multer = require("multer");
const AWS = require("aws-sdk");
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

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
    const file = req.file;

    console.log("req.file VVVVV")
    console.log(req.file)

    let s3bucket = new AWS.S3({
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
        region: process.env.AWS_REGION
    });
    
    var params = {
        Bucket: process.env.AWS_BUCKET_NAME,
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
                if (err) return res.redirect('/post')
                res.redirect('/matcher')
            })
        }
    });
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