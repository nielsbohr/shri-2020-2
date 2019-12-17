const Group = require('../../classes/Group');

class WarningGroup extends Group {
    constructor(json) {
        super(json);

        this._type = 'WARNING';
        this._rules = [
            require('./rules/text-sizes-should-be-equal'),
            require('./rules/invalid-button-position'),
            require('./rules/invalid-button-size'),
            require('./rules/invalid-placeholder-size'),
        ];
        this._blocks = ['warning', 'text', 'button', 'placeholder'];
    }

    check(block) {
        // Включаем блок warning в scope
        if (block.block === 'warning') {
            this.addLatest(block.loc);
        }

        // Убираем scope, если уже вышли из него
        while (this.latest) {
            if (block.loc.start > this.latest.end) {
                this.delLatest();
            } else {
                break;
            }
        }

        // проходим по правилам
        let res;

        if (this.latest !== false) {
            for (let i = 0; i < this.rules.length; i++) {
                if (this.rules[i].blocks.includes(block.block)) {
                    res = this.rules[i].check(this.latest, block);
                    if (res.error === true) {
                        if (Array.isArray(res.loc)) {
                            for (let i = 0; i < res.loc.length; i++) {
                                this.addError(res, res.loc[i]);       
                            }    
                        } else {
                            this.addError(res, block);
                        }
                    }
                }
            }
        }

        return this.errors;
    }
}

module.exports = WarningGroup;