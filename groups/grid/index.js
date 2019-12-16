const blocks = {
    functional: ['payment', 'warning', 'product', 
    'history', 'cover', 'collect', 'articles', 'subscribtion', 'event'],
    market: ['commercial', 'offer']
};

module.exports = function() {
    let columns;
    for (let n = 0; rBlock.test(this.json); n++) {
        const block = this.parseBlock(rBlock.lastIndex);
        const {loc} = block;
        let scope = this.getScope('grid');
        let content;
        switch (block.block) {
            case 'grid':
                if (Array.isArray(block.content)) {
                    content = block.content;
                } else if (typeof block.content === 'object') {
                    content = [block.content];
                }

                if (block.mods) {
                    if (block.mods["m-columns"]) {
                        columns = parseInt(block.mods["m-columns"]);
                    }
                } else {
                    for (let i = 0; i < content.length; i++) {
                        
                    }
                }
        }
    }
};