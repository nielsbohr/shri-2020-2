!function(e){var t={};function o(n){if(t[n])return t[n].exports;var r=t[n]={i:n,l:!1,exports:{}};return e[n].call(r.exports,r,r.exports,o),r.l=!0,r.exports}o.m=e,o.c=t,o.d=function(e,t,n){o.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},o.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},o.t=function(e,t){if(1&t&&(e=o(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(o.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)o.d(n,r,function(t){return e[t]}.bind(null,r));return n},o.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return o.d(t,"a",t),t},o.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},o.p="",o(o.s=0)}([function(e,t,o){"use strict";(function(e){Object.defineProperty(t,"__esModule",{value:!0});const n=o(2),r=o(3);function s(e){if("string"!=typeof e)throw new Error("JSON is not string");const t=new n.Linter(e);return r.default.forEach(e=>{e().lint(t)}),t.errors}let c;t.lint=s,c="undefined"==typeof window?e:window,c.lint=s}).call(this,o(1))},function(e,t){var o;o=function(){return this}();try{o=o||new Function("return this")()}catch(e){"object"==typeof window&&(o=window)}e.exports=o},function(e,t,o){"use strict";Object.defineProperty(t,"__esModule",{value:!0});t.Linter=class{constructor(e){try{JSON.parse(e)}catch(e){throw e instanceof SyntaxError?new Error("JSON is not valid"):new Error(e)}this._json=e,this._errors=[]}get errors(){return this._errors}get json(){return this._json}parseBlock(e){return JSON.parse(this.json.slice(e.start,e.end+1))}getNodesByBlock(e,t=this.json){const o=[],n=new RegExp(`"block"\\s*:\\s*"${e}"`,"g");for(let e,r=0;n.test(t);r+=1)e=this.findBrackets(n.lastIndex),o.push({node:this.parseBlock(e),location:e});return o}getParent(e){const t=this.findBrackets(e.location.start-1);return{node:this.parseBlock(t),location:t}}inScope(e,t){return e.location.start>t.location.start&&e.location.end<t.location.end}isParent(e,t){return this.getParent(e).location.start===t.location.start&&this.getParent(e).location.end===t.location.end}findBrackets(e){return{start:this.findBracket(e,!0),end:this.findBracket(e,!1)}}findBracket(e,t){for(let o=e,n=1;t?o>=0:o<this.json.length;t?o-=1:o+=1)switch(this.json[o]){case t?"}":"{":n+=1;break;case t?"{":"}":if(n-=1,0===n)return o}return-1}addError(e,t,o){const n=this.getBlockInfo(e),r={code:t,error:o,location:{start:n.start,end:n.end}};this._errors.push(r)}getBlockInfo(e){const t=new RegExp("\\r\\n?|\\n|\\u2028|\\u2029","g");let o;for(let n=1,r=0,s=Object.create({}),c=Object.create({}),i=e.start;;){t.lastIndex=r;const d=t.exec(this.json);if(d&&d.index<i)n+=1,r=d.index+d[0].length;else{if(i!==e.start)return c.column=i-r+2,c.line=n,o={start:s,end:c},o;s.column=i-r+1,s.line=n,i=e.end}}}}},function(e,t,o){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const n=[()=>o(4),()=>o(5),()=>o(6),()=>o(7),()=>o(8),()=>o(9),()=>o(10),()=>o(11)];t.default=n},function(e,t,o){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const n="WARNING.INVALID_BUTTON_POSITION",r="Блок button в блоке warning не может находиться перед блоком placeholder на том же или более глубоком уровне вложенности.";t.lint=function(e){const t=e.getNodesByBlock("placeholder"),o=e.getNodesByBlock("button");t.forEach(t=>{const s=e.getParent(t);if("warning"===s.node.block)for(let c=o.length-1;c>=0;c-=1)e.inScope(o[c],s)&&o[c].location.end<t.location.start&&(e.addError(o[c].location,n,r),o.splice(c,1))})}},function(e,t,o){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const n="WARNING.INVALID_BUTTON_SIZE",r="Размер кнопки блока warning должен быть на 1 шаг больше эталонного.",s=["xxs","xs","s","m","l","xl","xxl","xxxl","xxxxl","xxxxxl"];t.lint=function(e){const t=e.getNodesByBlock("text"),o=e.getNodesByBlock("button"),c=e.getNodesByBlock("warning");for(let i=0;i<c.length;i++){const d=c[i];for(let o=0;o<t.length;o++){const n=t[o];if(n.node&&n.node.mods&&n.node.mods.size&&e.isParent(n,d)){d.text=n.node.mods.size;break}}if(d.text)for(let t=0;t<o.length;t++){const c=o[t];c.node&&c.node.mods&&c.node.mods.size&&e.isParent(c,d)&&d.text!==s[s.indexOf(c.node.mods.size)-1]&&e.addError(c.location,n,r)}}}},function(e,t,o){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const n="TEXT.INVALID_H2_POSITION",r="Заголовок второго уровня (блок text с модификатором type h2) не может находиться перед заголовком первого уровня на том же или более глубоком уровне вложенности.";t.lint=function(e){const t=e.getNodesByBlock("text"),o=t.filter(e=>e.node&&e.node.mods&&"h1"===e.node.mods.type),s=t.filter(e=>e.node&&e.node.mods&&"h2"===e.node.mods.type);let c;o.length&&(c=o[0],s.forEach(t=>{t.location.end<c.location.start&&e.addError(t.location,n,r)}))}},function(e,t,o){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const n="TEXT.INVALID_H3_POSITION",r="Заголовок третьего уровня (блок text с модификатором type h3) не может находиться перед заголовком второго уровня на том же или более глубоком уровне вложенности.";t.lint=function(e){const t=e.getNodesByBlock("text"),o=t.filter(e=>e.node&&e.node.mods&&"h2"===e.node.mods.type),s=t.filter(e=>e.node&&e.node.mods&&"h3"===e.node.mods.type);let c;o.length&&(c=o[0],s.forEach(t=>{t.location.end<c.location.start&&e.addError(t.location,n,r)}))}},function(e,t,o){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const n="TEXT.SEVERAL_H1",r="Заголовок первого уровня (блок text с модификатором type h1) на странице должен быть единственным.";t.lint=function(e){const t=e.getNodesByBlock("text").filter(e=>e.node&&e.node.mods&&"h1"===e.node.mods.type);t.length>0&&(t.shift(),t.forEach(t=>{e.addError(t.location,n,r)}))}},function(e,t,o){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const n="WARNING.TEXT_SIZES_SHOULD_BE_EQUAL",r="Текст не является эталонным.";t.lint=function(e){const t=e.getNodesByBlock("text"),o=e.getNodesByBlock("warning");for(let s=0;s<o.length;s++){const c=o[s];for(let o=0;o<t.length;o++){const s=t[o];s.node&&s.node.mods&&s.node.mods.size&&e.isParent(s,c)&&(c.text?c.text&&s.node.mods.size!==c.text&&e.addError(s.location,n,r):c.text=s.node.mods.size)}}}},function(e,t,o){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const n="WARNING.INVALID_PLACEHOLDER_SIZE",r="Допустимые размеры для блока placeholder в блоке warning (значение модификатора size): s, m, l.",s=["s","m","l"];t.lint=function(e){e.getNodesByBlock("placeholder").forEach(t=>{const o=e.getParent(t);t.node.mods&&t.node.mods.size&&("warning"!==o.node.block||s.includes(t.node.mods.size)||e.addError(t.location,n,r))})}},function(e,t,o){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const n=["commercial","offer"],r="GRID.TOO_MUCH_MARKETING_BLOCKS",s="Маркетинговые блоки занимают больше половины от всех колонок блока grid.";t.lint=function(e){const t=e.getNodesByBlock("grid"),o=t.filter(e=>e.node&&e.node.mods&&e.node.mods["m-columns"]),c=t.filter(e=>e.node&&e.node.elemMods&&e.node.elemMods["m-col"]);for(let t=0;t<o.length;t++){const i=o[t];i.columns=parseInt(i.node.mods["m-columns"],10),i.market=0;for(let t=0;t<c.length;t++){const o=c[t],r=Array.isArray(o.node.content)?o.node.content[0].block:o.node.content.block;e.isParent(o,i)&&n.includes(r)&&(i.market+=parseInt(o.node.elemMods["m-col"],10))}i.market>Math.floor(i.columns/2)&&e.addError(i.location,r,s)}}}]);