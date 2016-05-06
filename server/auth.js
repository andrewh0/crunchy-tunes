var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth20').Strategy;
// var googleConfig = require(__dirname + '/config/googleplus.js');
var googleClientId = process.env.GOOGLE_CLIENT_ID;
var googleClientSecret = process.env.GOOGLE_CLIENT_SECRET;
var User = require(__dirname + '/user/userModel.js');

module.exports = {};

module.exports.checkAuth = function checkAuth(req, res, next) {
  if (req.user) {
    // trim the user object to make it consumable for the database
    var user = {
      googleUserId: req.user.id,
      firstName: req.user.name.givenName,
      lastName: req.user.name.familyName,
    }
    req.user = user;
    return next();
  }
  res.redirect('/');
};

module.exports.authenticateGoogleLogin = passport.authenticate('google', {
  failureRedirect: '/'
});

/*
serializeUser and deserializeUser are two required Passport methods that are
called when using sessions with Passport.

http://toon.io/understanding-passportjs-authentication-flow/
*/

// Determines what user data should be stored in the session
passport.serializeUser(function(user, done) {
  done(null, user);
});

// Determines what user data should be retrieved from the session
passport.deserializeUser(function(user, done) {
  done(null, user);
});

passport.use(new GoogleStrategy({
    clientID: googleClientId,
    clientSecret: googleClientSecret,
    callbackURL: "/auth/google/callback"
  },
  function(accessToken, refreshToken, profile, cb) {
    User.findOrCreate(
      {
        where: {
          googleUserId: profile.id
        },
        defaults: {
          firstName: profile.name.givenName,
          lastName: profile.name.familyName
        }
      }
    )
    .spread(function(user, created) {
      return cb(null, profile);
    });
  }
));
