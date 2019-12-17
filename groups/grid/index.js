const Group = require('../../classes/Group');

class GridGroup extends Group {
    constructor(json) {
        super(json);

        this._type = 'GRID';
        this._rules = [
            require('./rules/too-much-marketing-blocks')
        ];
        this._blocks = ['grid'];
    }

    // проходим по правилам
    check(block) {

        // Включаем блок grid в scope
        if (block.block === 'grid' && block.mods) {
            if (parseInt(block.mods["m-columns"])) {
                this.addLatest({ 
                    start: block.loc.start,
                    end: block.loc.end,
                    columns: parseInt(block.mods["m-columns"]),
                    content: []
                });
            }
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


        return this.errors;
    }
}

module.exports = GridGroup;