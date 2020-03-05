var express = require('express');
var router = express.Router();
var userCtrl = require('../controllers/user');

router.get('/posts', userCtrl.showPosts);
router.get('/pets/new', userCtrl.showPetForm);
router.get('/pets', userCtrl.showPets);
router.get('/pets/update/:id', userCtrl.updatePet);
router.get('/', userCtrl.show);

router.post('/pets/new/add', userCtrl.addPet);

router.put('/update', userCtrl.updateUser);
router.put('/pets/update/:id', userCtrl.changePet);

router.delete('/post/delete/:id', userCtrl.deletePost);
router.delete('/pets/delete/:id', userCtrl.deletePet);
module.exports = router;