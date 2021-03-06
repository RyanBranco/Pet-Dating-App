const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;
const User = require("../models/user")

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK
}, (accessToken, refreshToken, profile, cb) => {
    //a user has loggen in with oauth...
    User.findOne({googleId: profile.id}, (err, user) => {
        if (err) return cb(err);
        if (user) { 
            // returning user
            if (!user.avatar) {
                user.avatar = profile.photos[0].value;
                user.save((err) => {
                    return cb(null, user);
                });
            } else {
                return cb(null, user);
            }
        } else {
            // new user
            const newUser = new User({
                name: profile.displayName,
                email: profile.emails[0].value,
                avatar: profile.photos[0].value,
                googleId: profile.id
            });
            newUser.save((err) => {
                if (err) return cb(err);
                return cb(null, newUser)
            });
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