const fs = require("fs");
const util = require("util");

const {
  stratDir,
  strategies,
  passport
} = require("./constants");


module.exports = function (WebsiteConfig, UserDatabase, Passport) {
  return Promise.all(strategies.map((stratFile)=> {
    var Strategy = require(stratDir + "/" + stratFile);
    return Promise.resolve().then(()=> {
      return Strategy(WebsiteConfig, UserDatabase);
    }).then((strat)=> {
      passport.use(strat);
    });
  }));
};
