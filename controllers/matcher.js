const Post = require("../models/post");
const User = require("../models/user");
const AWS = require("aws-sdk");

let s3bucket = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION
});

module.exports = {
    index
}

function index(req, res) {
    Post.find({}).populate('user').exec((err, posts) => {
        res.render("matcher/index", {
            posts,
            user: req.user
        })
    })
}