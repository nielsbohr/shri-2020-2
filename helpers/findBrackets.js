module.exports = (str, pos) => {
    const loc = {};

    loc.end = ((str, pos) => {
        let depth = 1;
        for (let i = pos + 1; i < str.length; i++) {
            switch (str[i]) {
                case '{':
                    depth++;
                    break;
                case '}':
                    if (--depth == 0) {
                        return i;
                    }
                break;
            }
        }

        return -1;
    })(str, pos);

    loc.start = ((str, pos) => {
        let depth = 1;
        for (let i = pos - 1; i >= 0; i--) {
            switch (str[i]) {
                case '}':
                    depth++;
                    break;
                case '{':
                    if (--depth == 0) {
                        return i;
                }
                break;
            }
        }

        return -1
    })(str, pos);

    return loc;
}