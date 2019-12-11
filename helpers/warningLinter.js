const findBrackets = require('./findBrackets');

module.exports = (json, errors) => {
    const re = /(\"block\")[:]\s(\"warning\")/g;
    const results = [];

    while (match = re.exec(json)) {
        results.push(findBrackets(json, match.index));
    }

    for (let i = 0; i < results.length; i++) {
        const element = results[i];

        const content = JSON.parse(json.slice(element.start, element.end + 1)).content;
        let startRow = json.slice(0, element.start).split(/\r\n/).length;
        let endRow = json.slice(0, element.end).split(/\r\n/).length;
        let textSize;
        for (let j = 0; j < content.length; j++) {
            if (content[j].block === 'text') {
                if (textSize && textSize !== content[j].mods.size) {
                    errors.push({
                        code: 'WARNING.TEXT_SIZES_SHOULD_BE_EQUAL',
                        location: {
                            start: {
                                column: element.start,
                                line: startRow
                            },
                            end: {
                                column: element.end,
                                line: endRow
                            },
                        }
                    });
                } else if (!textSize) {    
                    textSize = content[j].mods.size;
                }
            }            
        }
    }
};