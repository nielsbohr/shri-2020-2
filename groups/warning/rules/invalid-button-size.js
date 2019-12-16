module.exports = {
    blocks: ['button'], // Необходимые блоки для правила
    group: 'warning',
    text: 'Размер кнопки блока warning должен быть на 1 шаг больше эталонного (например, для размера l таким значением будет xl).',
    code: 'INVALID_BUTTON_SIZE',
    loc: 'element',
    
    check(scope, block) {
        const sizes = ['xxs', 'xs', 's', 'm', 'l', 'xl', 'xxl']
        if (scope.text && block.mods && block.block === 'button') {
            if (!(block.mods.size === sizes[sizes.indexOf(scope.text.size) + 1])) {
                return {
                    error: true,
                    code: this.code,
                    text: this.text,
                    loc: block.loc
                }
            }
        } else if (block.block === 'button') {
            scope.buttons.push(block);
        }
        return {
            error: false
        }
    }
};