var express = require('express');
var router = express.Router();
var userCtrl = require('../controllers/user');

router.get('/', userCtrl.show)
router.get('/pets', userCtrl.showPets)

module.exports = router;