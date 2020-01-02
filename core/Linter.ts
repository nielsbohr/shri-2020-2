const rules = require('./rules');

module.exports = class Linter {
  /**
  * Инициализация скелета правила
  * @param {string} json JSON, как строка.
  */
  _json: string;
  _errors: [];
  _rules: Array<Function>;
  constructor(json: string) {
    try {
      JSON.parse(json);
    } catch (e) {
      if (e instanceof SyntaxError) throw new Error('JSON is not valid');
    }
    this._json = json;
    this._errors = [];
    this._rules = rules;
  }

  get results() {
    return this._errors;
  }

  get errors() {
    return this._errors;
  }

  lint() {
    rules.forEach(rule => {
      this._errors.push(...rule.lint(this._json));
    });
  } 
};
