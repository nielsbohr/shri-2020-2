module.exports = {
    blocks: ['text'],
    group: 'warning',
    text: 'Текст не является эталонным.',
    code: 'TEXT_SIZES_SHOULD_BE_EQUAL',
    loc: 'group',
    
    check(scope, block) {
        if (scope.text) {
            if (scope.text.size && block.mods) {
                if (block.mods.size !== scope.text.size) {
                    return {
                        error: true,
                        code: this.code,
                        text: this.text,
                        loc: this.loc
                    }
                }
            }
        } else if (block.mods) {
            if (block.mods.size) {
                scope.text = {
                    size: block.mods.size
                };
            }
        }
        return {
            error: false
        }
    }
};