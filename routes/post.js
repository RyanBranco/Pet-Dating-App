var express = require("express");
var router = express.Router();
var postCtrl = require('../controllers/post');

router.get('/', postCtrl.newPost);

router.post('/add', postCtrl.addPost)

module.exports = router;