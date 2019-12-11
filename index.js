const warningLinter = require('./helpers/warningLinter');
const textLinter = require('./helpers/textLinter');
const columnLinter = require('./helpers/columnLinter');

module.exports = function lint(json) {
    const errors = [];
    warningLinter(json, errors);
    textLinter(json, errors);
    columnLinter(json, errors);
    console.log(JSON.stringify(errors));
};