var express = require('express');
var router = express.Router();
var matcherCtrl = require('../controllers/matcher')

/* GET users listing. */
router.get('/', matcherCtrl.index);

module.exports = router;
