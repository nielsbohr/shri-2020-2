const Group = require('../../core/Group');

class TextGroup extends Group {
    constructor(json) {
        super(json);

        this._type = 'TEXT';
        this._json = json;
        this._rules = [
            require('./rules/invalid-h3-position'),
            require('./rules/invalid-h2-position'),
            require('./rules/several-h1'),
        ];
        this._blocks = ['text'];
        this._scope = {
                    h1: {
                        status: false
                    },
                    h2: {
                        content: []
                    },
                    h3: {
                        content: []
                    }
                };
    }

    // проходим по правилам
    check(block) {
        let res;

        for (let i = 0; i < this.rules.length; i++) {
            if (this.rules[i].blocks.includes(block.block)) {
                res = this.rules[i].check(this.scope, block);
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

module.exports = TextGroup;