import helpers from '../helpers';

module.exports = {
  meta: {
    code: 'WARNING.INVALID_BUTTON_POSITION',
    text: 'Блок button в блоке warning не может находиться перед блоком placeholder на том же или более глубоком уровне вложенности.',
  },

  lint(json) {
    const warnings = [];
    const errors = [];

    const regexPlaceholder = new RegExp('"block"\\s*:\\s*"placeholder"', 'g');
    for (let n = 0; regexPlaceholder.test(json); n += 1) {
      const loc = helpers.findBrackets();
      const locParent = helpers.findBrackets(loc.start - 1);
      const blockParent = helpers.parseBlock(locParent);

      if (blockParent.block === 'warning') {
        warnings.push({
          loc: locParent,
          locPlaceholder: loc,
        });
      }
    }

    const regexButton = new RegExp('"block"\\s*:\\s*"button"', 'g');
    for (let n = 0, locButton; regexButton.test(json); n += 1) {
      locButton = helpers.findBrackets();
      for (let i = 0; i < warnings.length; i += 1) {
        if (
          locButton.start > warnings[i].loc.start
            && locButton.end < warnings[i].loc.end
            && locButton.end < warnings[i].locPlaceholder.start
        ) {
          errors.push(helpers.createError(locButton));
          break;
        }
      }
    }

    return errors;
  },
};
