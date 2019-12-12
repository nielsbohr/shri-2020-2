const findBrackets = require('../helpers/findBrackets');
const lineBreakG = new RegExp("\r\n?|\n|\u2028|\u2029", "g");
const rBlock = new RegExp( "\"block\"", "g" );
let SCOPE_WARNING = {
    active: false
};

module.exports = function() {
    const results = [];
    for ( let n = 0, loc = {}, block; rBlock.test(this.json); n++) {
        loc = findBrackets(this.json, rBlock.lastIndex);
        if (SCOPE_WARNING.active) {
            if (loc.start > SCOPE_WARNING.end) {
                SCOPE_WARNING = {
                    active: false
                }
            }
        }
        block = JSON.parse(this.json.slice(loc.start, loc.end + 1));
        switch (block.block) {
            case 'warning':
                SCOPE_WARNING = {
                    active: true,
                    start: loc.start,
                    end: loc.end
                };
                if (Array.isArray(block.content)) {
                    for (let i = 0, textSize; i < block.content.length; i++) {
                        if (block.content[i].block === 'text') {
                            if (textSize && textSize !== block.content[i].mods.size) {
                                this.addError('WARNING.TEXT_SIZES_SHOULD_BE_EQUAL', loc);
                            } else if (!textSize) {    
                                textSize = block.content[i].mods.size;
                            }
                        }
                    }
                }
                break;
            case 'placeholder':
                if (SCOPE_WARNING.button) {
                    this.addError('WARNING.INVALID_BUTTON_POSITION', {
                        start: SCOPE_WARNING.button.loc.start,
                        end: SCOPE_WARNING.button.loc.end,
                    });
                }
                if (SCOPE_WARNING.active) {
                    if (block.mods.size !== 's' && block.mods.size !== 'm' && block.mods.size !== 'l') {
                        this.addError('WARNING.INVALID_PLACEHOLDER_SIZE', {
                            start: SCOPE_WARNING.start,
                            end: SCOPE_WARNING.end,
                        });
                    }
                }
                break;
            case 'button':
                if (SCOPE_WARNING.active) {
                    SCOPE_WARNING.button = {
                        active: true,
                        loc
                    };
                }
        }
    }
};