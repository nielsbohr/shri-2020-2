const lineBreakG = new RegExp("\r\n?|\n|\u2028|\u2029", "g");

function getBlockInfo(input, loc) {
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

module.exports = {
  getBlockInfo
}