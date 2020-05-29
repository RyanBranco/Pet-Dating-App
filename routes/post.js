var express = require("express");
var router = express.Router();
var postCtrl = require('../controllers/post');
const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });


router.get('/', isLoggedIn, postCtrl.newPost);
router.get('/view/:id', isLoggedIn, postCtrl.viewPost)

router.post('/add', isLoggedIn, upload.single("attatchment"),postCtrl.addPost);
router.post('/view/:id/comment', isLoggedIn, postCtrl.comment);

router.put('/react/:id/:reaction', isLoggedIn, postCtrl.react)

function isLoggedIn(req, res, next) {
    if ( req.isAuthenticated() ) return next();
    res.redirect('/auth/google');
  }

module.exports = router;