module.exports = class Group {
    constructor(json) {
        this._json = json;
        this._errors = [];
        this._type = '';
        this._scope = [];
        this._rules = [];
    }

    get type() {
        return this._type;
    }

    get rules() {
        return this._rules;
    }

    get scope() {
        return this._scope;
    }

    get errors() {
        return this._errors;
    }

    get blocks() {
        return this._blocks;
    }
    
    get latest() {
        if (this.scope.length > 0) {
            return this.scope[this.scope.length - 1];
        }
        return false;
    }

    set latest(obj) {
        if (this.scope.length > 0) {
            this.scope[this.scope.length - 1] = obj;
        }
    }

    delLatest() {
        if (this.scope.length > 0) {
            this.scope.pop();
        }
    }

    addLatest(obj) {
        obj.errors = [];
        obj.buttons = [];
        this.scope.push(obj);
    }

    addError(res, block) {
        if (res.loc === 'group') {
            if (this.latest.errors.includes(res.code)) {
                return
            } else {
                block = this.latest;
                this.latest.errors.push(res.code);
            }            
        } else {
            block = block.loc
        }
        const info = this.getBlockInfo(this._json, block);
        this._errors.push({
            code: `${this.type}.${res.code}`,
            error: res.text,
            location: {
                start: {
                    column: info.column.start,
                    line: info.line.start
                },
                end: {
                    column: info.column.end,
                    line: info.line.end
                },
            }
        })
    }

    getBlockInfo(input, loc) {
        const lineBreakG = new RegExp("\r\n?|\n|\u2028|\u2029", "g");

        loc.column = {};
        loc.line = {};
        let offset = loc.start;
        for (let line = 1, cur = 0;;) {
            lineBreakG.lastIndex = cur
            let match = lineBreakG.exec(input)
            if (match && match.index < offset) {
            ++line
            cur = match.index + match[0].length
            } else {
            if (offset === loc.start) {
                loc.column.start = offset - cur + 1;
                loc.line.start = line;
                offset = loc.end;
            } else {
                loc.column.end = offset - cur + 1;
                loc.line.end = line;
                return loc;
            }
            }
        }
    }
}