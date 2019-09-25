
const { Router } = require("express");
const {
  strategies = require("./constants");
}

export default function() {
  var router = new Router();
  router.get("logout", (req, res)=> {
    req.logout();
    res.redirect('/');
  });
}

const passport = require('passport');
const OpenIDStrategy = require('passport-openid').Strategy;

passport.use(new OpenIDStrategy({
    returnURL: 'http://www.example.com/auth/openid/return',
    realm: 'http://www.example.com/'
  },
  function(identifier, done) {
    User.findOrCreate({ openId: identifier }, function(err, user) {
      done(err, user);
    });
  }
));
