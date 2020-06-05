var express = require('express');
var router = express.Router();
var userCtrl = require('../controllers/user');
const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.get('/posts', isLoggedIn, userCtrl.showPosts);
router.get('/pets/new', isLoggedIn, userCtrl.showPetForm);
router.get('/pets', isLoggedIn, userCtrl.showPets);
router.get('/pets/update/:id', isLoggedIn, userCtrl.updatePet);
router.get('/', isLoggedIn, userCtrl.show);

router.post('/pets/new/add', isLoggedIn, upload.single("attatchment"), userCtrl.addPet);

router.put('/update', isLoggedIn, userCtrl.updateUser);
router.put('/pets/update/:id', isLoggedIn, upload.single("attatchment"), userCtrl.changePet);

router.delete('/post/delete/:id', isLoggedIn, userCtrl.deletePost);
router.delete('/pets/delete/:id', isLoggedIn, userCtrl.deletePet);

function isLoggedIn(req, res, next) {
    if ( req.isAuthenticated() ) return next();
    res.redirect('/auth/google');
  }

module.exports = router;