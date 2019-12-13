const textLinter = require('../rules/textLinter');
const gridLinter = require('../rules/gridLinter');
const rBlock = /\"block\"\s*:\s*\"(warning|placeholder|text|button|grid)\"/g;

module.exports = function() {
    for (let n = 0; rBlock.test(this.json); n++) {
        const block = this.parseBlock(rBlock.lastIndex);
        const {loc} = block;
        let scope = this.getScope('warning');
        while (scope !== false) {
            if (loc.start > scope.loc.end) {
                this.delScope('warning');
                scope = this.getScope('warning');
            } else {
                break;
            }
        }
        switch (block.block) {
            case 'warning':
                this.addScope('warning', {loc});
                break;
            case 'placeholder':
                if (scope) {
                    if (Array.isArray(scope.button)) {
                        for (let i = 0; i < scope.button.length; i++) {
                            this.addError('WARNING.INVALID_BUTTON_POSITION', {
                                start: scope.button[i].loc.start,
                                end: scope.button[i].loc.end,
                            });   
                        }
                    }
                    if (block.mods.size !== 's' && block.mods.size !== 'm' && block.mods.size !== 'l') {
                        this.addError('WARNING.INVALID_PLACEHOLDER_SIZE', {
                            start: scope.loc.start,
                            end: scope.loc.end,
                        });
                    }
                }
                break;
            case 'button':
                if (scope) {
                    if (!scope.hasOwnProperty('button')) {
                        scope.button = [];
                    }
                    scope.button.push({loc});
                    this.setScope('warning', scope);
                }
                break;
            case 'text':
                if (scope) {
                    if (!scope.text) {
                        scope.text = {
                            size: block.mods.size
                        };
                        this.setScope('warning', scope);
                    } else if (scope.text.size && block.mods) {
                        if (block.mods.size !== scope.text.size) {
                            this.addError('WARNING.TEXT_SIZES_SHOULD_BE_EQUAL', loc);
                        }
                    }
                }
                textLinter.apply(this, [block]);
                break;
        }
    }
};