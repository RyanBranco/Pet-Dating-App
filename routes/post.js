var express = require("express");
var router = express.Router();
var postCtrl = require('../controllers/post');
const multer = require("multer");
const AWS = require("aws-sdk");
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.get('/', postCtrl.newPost);
router.get('/view/:id', postCtrl.viewPost)

router.post('/add', upload.single("attatchment"), postCtrl.addPost);
router.post('/view/:id/comment', postCtrl.comment)

module.exports = router;