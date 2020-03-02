const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;
const User = require("../models/user")

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK
}, (accessToken, refreshToken, profile, cb) => {
    //a user has loggen in with oauth...
    User.findOne({googelId: profile.id}, (err, user) => {
        if (err) return cb(err);
        if (user) {
            // returning user
            return cb(null, user);
        } else {
            // new user
            const newUser = new User({
                name: profile.displayName,
                email: profile.emails[0].value,
                googleId: profile.id
            });
            newUser.save((err) => {
                if (err) return cb(err);
                return cb(null, newUser)
            })
        }
    });
}));

passport.serializeUser((user, cb) =>{
    cb(null, user.id);
});

passport.deserializeUser((id, cb) => {
    User.findById(id, (err, user) => {
        cb(err, user);
    });
});