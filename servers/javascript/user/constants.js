
const fs = require("fs");

const stratDir = __dirname + "/strategies";

const {
  passport
} = require("passport");


module.exports = {
  stratDir: stratDir,
  strategies: fs.readdirSync(stratDir),
  passport: new Passport()
};
