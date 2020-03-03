var express = require('express');
var router = express.Router();
var matcherCtrl = require('../controllers/matcher');

router.get('/', matcherCtrl.index);

module.exports = router;
