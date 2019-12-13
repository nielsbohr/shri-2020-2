module.exports = function() {
    const block = arguments[0];
    const scope = this.getScope('text');
    if (block.mods) {
        switch (block.mods.type) {
            case 'h1':
                if (scope.h1.status) {
                    
                    this.addError('TEXT.SEVERAL_H1', block.loc);
                } else {
                    if (scope.h2.content.length) {
                        for (let i = 0; i < scope.h2.content.length; i++) {
                            this.addError('TEXT.INVALID_H2_POSITION', scope.h2.content[i].loc);   
                        }
                        scope.h2.content = [];
                    }
                    scope.h1.status = true;
                }
                break;
            case 'h2':
                if (!scope.h1.status) {
                    scope.h2.content.push({loc: block.loc});
                }
                if (!scope.h2.status) {
                    if (scope.h3.content.length) {
                        for (let i = 0; i < scope.h3.content.length; i++) {
                            this.addError('TEXT.INVALID_H3_POSITION', scope.h3.content[i].loc);   
                        }
                        scope.h3.content = [];
                    }
                    scope.h2.status = true
                }
                break;
            case 'h3':
                if (!scope.h2.status) {
                    scope.h3.content.push({loc: block.loc});
                }
                break;
        }
    }
};