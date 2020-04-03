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

const findPostPicture = function(id) {
    s3bucket.listObjectsV2({Bucket: "pet-dating"}, function(err, data) {
        for (let i = 0; i < data.Contents.length; i++) {
            if (id === data.Contents[i].Key) {
                return data.Contents[i].Key
            } else {
                return ":("
            }
        }
    })
}

function index(req, res) {
    console.log()
    Post.find({}).populate('user').exec((err, posts) => {
        console.log(posts)
        res.render("matcher/index", {
            posts,
            user: req.user
        })
    })
}