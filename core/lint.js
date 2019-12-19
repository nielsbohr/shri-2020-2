const path = require('path');
const fs = require('fs');

function getRules(dir) {
  const rules = [];

  fs.readdirSync(dir).forEach((file) => {
    rules.push(require(`${dir}/${file}`));
  });
  return rules;
}

function lint(json) {
  const rules = getRules(path.join(__dirname, './rules'));
  let errors = [];

  rules.forEach((Rule) => {
    errors = errors.concat(new Rule(json));
  });

  return errors;
}

module.exports = { lint };
