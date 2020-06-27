var express = require('express');
var router = express.Router();
var passport = require("passport")

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.get("/howto", function(req, res) {
  res.render("howto")
})

router.get("/pwalanding", function(req,res) {
  res.render("pwalanding", {
    landingPage: "landingpage"
  })
})

router.get('/auth/google', passport.authenticate(
  'google', 
  {scope: ['profile', 'email']}
));

router.get('/oauth2callback', passport.authenticate(
  'google', {
    successRedirect: '/matcher',
    failureRedirect: '/'
  }
));

router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

module.exports = router;
