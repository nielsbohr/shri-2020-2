!function(t){var s={};function e(n){if(s[n])return s[n].exports;var o=s[n]={i:n,l:!1,exports:{}};return t[n].call(o.exports,o,o.exports,e),o.l=!0,o.exports}e.m=t,e.c=s,e.d=function(t,s,n){e.o(t,s)||Object.defineProperty(t,s,{enumerable:!0,get:n})},e.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},e.t=function(t,s){if(1&s&&(t=e(t)),8&s)return t;if(4&s&&"object"==typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(e.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&s&&"string"!=typeof t)for(var o in t)e.d(n,o,function(s){return t[s]}.bind(null,o));return n},e.n=function(t){var s=t&&t.__esModule?function(){return t.default}:function(){return t};return e.d(s,"a",s),s},e.o=function(t,s){return Object.prototype.hasOwnProperty.call(t,s)},e.p="",e(e.s=1)}([function(t,s){t.exports=class{constructor(t){this._json=t,this._errors=[]}lint(){this._regex=new RegExp(`"block"\\s*:\\s*"(${this._blocks.join("|")})"`,"g");for(let t=0;this._regex.test(this._json);t+=1)this.check()}parseBlock(t){return JSON.parse(this._json.slice(t.start,t.end+1))}findBrackets(t=this._regex.lastIndex){return{start:this.findBracket(t,!0),end:this.findBracket(t,!1)}}findBracket(t,s){for(let e=t,n=1;s?e>=0:e<this._json.length;s?e-=1:e+=1)switch(this._json[e]){case s?"}":"{":n+=1;break;case s?"{":"}":if(0==--n)return e}return-1}addError(t){const s=this.getBlockInfo(t);this._errors.push({code:this._code,error:this._text,location:{start:{column:s.column.start,line:s.line.start},end:{column:s.column.end,line:s.line.end}}})}getBlockInfo(t){const s=new RegExp("\\r\\n?|\\n|\\u2028|\\u2029","g");t.column={},t.line={};let e=t.start;for(let n=1,o=0;;){s.lastIndex=o;const r=s.exec(this._json);if(r&&r.index<e)++n,o=r.index+r[0].length;else{if(e!==t.start)return t.column.end=e-o+2,t.line.end=n,t;t.column.start=e-o+1,t.line.start=n,e=t.end}}}}},function(t,s,e){(function(s){const n=e(3);function o(t){const s=[];return n.forEach(e=>{s.push(...new(e())(t))}),s}"undefined"==typeof window?s.lint=o:window.lint=o,t.exports={lint:o}}).call(this,e(2))},function(t,s){var e;e=function(){return this}();try{e=e||new Function("return this")()}catch(t){"object"==typeof window&&(e=window)}t.exports=e},function(t,s,e){t.exports=[()=>e(4),()=>e(5),()=>e(6),()=>e(7),()=>e(8),()=>e(9),()=>e(10),()=>e(11)]},function(t,s,e){const n=e(0);t.exports=class extends n{constructor(t){return super(t),this._blocks=["placeholder"],this._code="WARNING.INVALID_BUTTON_POSITION",this._text="Блок button в блоке warning не может находиться перед блоком placeholder на том же или более глубоком уровне вложенности.",this._warnings=[],this.lint(),this.buttonCheck(this._warnings),this._errors}check(){const t=this.findBrackets(),s=this.findBrackets(t.start-1);"warning"===this.parseBlock(s).block&&this._warnings.push({loc:s,locPlaceholder:t})}buttonCheck(){this._regex=new RegExp('"block"\\s*:\\s*"button"',"g");for(let t,s=0;this._regex.test(this._json);s+=1){t=this.findBrackets();for(let s=0;s<this._warnings.length;s+=1)if(t.start>this._warnings[s].loc.start&&t.end<this._warnings[s].loc.end&&t.end<this._warnings[s].locPlaceholder.start){this.addError(t);break}}}}},function(t,s,e){const n=e(0);t.exports=class extends n{constructor(t){return super(t),this._blocks=["button"],this._code="WARNING.INVALID_BUTTON_SIZE",this._text="Размер кнопки блока warning должен быть на 1 шаг больше эталонного.",this._sizes=["xxs","xs","s","m","l","xl","xxl","xxxl","xxxxl","xxxxxl"],this.lint(),this._errors}check(){const t=this.findBrackets(),s=this.parseBlock(t);let e;if(s.mods&&s.mods.size){e=s.mods.size;const n=this.findBrackets(t.start-1),o=this.parseBlock(n);if(Array.isArray(o.content)&&"warning"===o.block)for(let s,n=0;n<o.content.length;n+=1)if("text"===o.content[n].block&&o.content[n].mods&&o.content[n].mods.size&&(s=this._sizes[this._sizes.indexOf(o.content[n].mods.size)+1],e!==s)){this.addError(t);break}}}}},function(t,s,e){const n=e(0);t.exports=class extends n{constructor(t){return super(t),this._blocks=["text"],this._code="TEXT.INVALID_H2_POSITION",this._text="Заголовок второго уровня (блок text с модификатором type h2) не может находиться перед заголовком первого уровня на том же или более глубоком уровне вложенности.",this._scope=[],this.lint(),this._errors}check(){const t=this.findBrackets(),s=this.parseBlock(t);s&&s.mods&&"h1"===s.mods.type?(this._scope.forEach(t=>{this.addError(t)}),this._scope=[]):s&&s.mods&&"h2"===s.mods.type&&this._scope.push(t)}}},function(t,s,e){const n=e(0);t.exports=class extends n{constructor(t){return super(t),this._blocks=["text"],this._code="TEXT.INVALID_H3_POSITION",this._text="Заголовок третьего уровня (блок text с модификатором type h3) не может находиться перед заголовком первого уровня на том же или более глубоком уровне вложенности.",this._scope=[],this.lint(),this._errors}check(){const t=this.findBrackets(),s=this.parseBlock(t);s&&s.mods&&"h2"===s.mods.type?(this._scope.forEach(t=>{this.addError(t)}),this._scope=[]):s&&s.mods&&"h3"===s.mods.type&&this._scope.push(t)}}},function(t,s,e){const n=e(0);t.exports=class extends n{constructor(t){return super(t),this._blocks=["text"],this._code="TEXT.SEVERAL_H1",this._text="Заголовок первого уровня (блок text с модификатором type h1) на странице должен быть единственным.",this._scope={h1:!1},this.lint(),this._errors}check(){const t=this.findBrackets(),s=this.parseBlock(t);s&&s.mods&&"h1"===s.mods.type&&(this._scope.h1?this.addError(t):this._scope.h1=!0)}}},function(t,s,e){const n=e(0);t.exports=class extends n{constructor(t){return super(t),this._blocks=["warning"],this._code="WARNING.TEXT_SIZES_SHOULD_BE_EQUAL",this._text="Текст не является эталонным.",this.lint(),this._errors}check(){const t=this.findBrackets(),s=this.parseBlock(t);for(let e,n,o=0;o<s.content.length;o+=1)if("text"===s.content[o].block)if(e=s.content[o],n&&e.mods){if(e.mods.size!==n){this.addError(t);break}}else e.mods&&(n=e.mods.size)}}},function(t,s,e){const n=e(0);t.exports=class extends n{constructor(t){return super(t),this._blocks=["placeholder"],this._code="WARNING.INVALID_PLACEHOLDER_SIZE",this._text="Допустимые размеры для блока placeholder в блоке warning (значение модификатора size): s, m, l.",this._sizes=["s","m","l"],this.lint(),this._errors}check(){const t=this.findBrackets(),s=this.parseBlock(t);if(s.mods&&s.mods.size){const e=this.findBrackets(t.start-1);"warning"!==this.parseBlock(e).block||this._sizes.includes(s.mods.size)||this.addError(t)}}}},function(t,s,e){const n=e(0);t.exports=class extends n{constructor(t){return super(t),this._market=["commercial","offer"],this._blocks=["grid"],this._code="GRID.TOO_MUCH_MARKETING_BLOCKS",this._text="Маркетинговые блоки занимают больше половины от всех колонок блока grid.",this._grid=[],this.lint(),this._errors}check(){const t=this.findBrackets(),s=this.parseBlock(t);if(s.mods&&s.mods["m-columns"])this._grid.push({loc:t,columns:parseInt(s.mods["m-columns"],10)});else if(s.elemMods&&s.elemMods["m-col"])for(let e=0;e<this._grid.length;e+=1)t.start>this._grid[e].loc.start&&t.end<this._grid[e].loc.end&&(this._grid[e].content||(this._grid[e].content=[]),this._grid[e].content.push({columns:s.elemMods["m-col"],content:s.content}))}lint(){this._regex=new RegExp(`"block"\\s*:\\s*"(${this._blocks.join("|")})"`,"g");for(let t=0;this._regex.test(this._json);t+=1)this.check();this._grid.forEach(t=>{this.lintCount(t)})}lintCount(t){let s=0;for(let e=0;e<t.content.length;e+=1)this._market.includes(t.content[e].content[0].block)&&(s+=t.content[e].columns);s>parseInt(t.columns/2,10)&&this.addError(t.loc)}}}]);