var express = require("express");
var router = express.Router();
var postCtrl = require('../controllers/post');

router.get('/', postCtrl.newPost);
router.get('/view/:id', postCtrl.viewPost)

router.post('/add', postCtrl.addPost);
router.post('/view/:id/comment', postCtrl.comment)

module.exports = router;