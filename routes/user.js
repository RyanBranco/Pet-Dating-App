var express = require('express');
var router = express.Router();
var userCtrl = require('../controllers/user');

router.get('/comments', userCtrl.showComments)
router.get('/posts', userCtrl.showPosts);
router.get('/pets/new', userCtrl.showPetForm);
router.get('/pets', userCtrl.showPets);
router.get('/pets/update/:id', userCtrl.updatePet);
router.get('/', userCtrl.show);

router.post('/pets/new/add', userCtrl.addPet)

router.put('/update', userCtrl.update)

module.exports = router;