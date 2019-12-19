!function(t){var s={};function e(r){if(s[r])return s[r].exports;var n=s[r]={i:r,l:!1,exports:{}};return t[r].call(n.exports,n,n.exports,e),n.l=!0,n.exports}e.m=t,e.c=s,e.d=function(t,s,r){e.o(t,s)||Object.defineProperty(t,s,{enumerable:!0,get:r})},e.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},e.t=function(t,s){if(1&s&&(t=e(t)),8&s)return t;if(4&s&&"object"==typeof t&&t&&t.__esModule)return t;var r=Object.create(null);if(e.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:t}),2&s&&"string"!=typeof t)for(var n in t)e.d(r,n,function(s){return t[s]}.bind(null,n));return r},e.n=function(t){var s=t&&t.__esModule?function(){return t.default}:function(){return t};return e.d(s,"a",s),s},e.o=function(t,s){return Object.prototype.hasOwnProperty.call(t,s)},e.p="",e(e.s=1)}([function(t,s){t.exports=class{constructor(t){this._json=t,this._errors=[]}get type(){return this._type}get errors(){return this._errors}get blocks(){return this._blocks}lint(){this._regex=new RegExp(`"block"\\s*:\\s*"(${this._blocks.join("|")})"`,"g");for(let t=0;this._regex.test(this._json);t+=1)this.check()}parseBlock(t){return JSON.parse(this._json.slice(t.start,t.end+1))}findBrackets(t=this._regex.lastIndex){return{start:this.findBracket(t,!0),end:this.findBracket(t,!1)}}findBracket(t,s){for(let e=t,r=1;s?e>=0:e<this._json.length;s?e-=1:e+=1)switch(this._json[e]){case s?"}":"{":r+=1;break;case s?"{":"}":if(0==--r)return e}return-1}addError(t){const s=this.getBlockInfo(t);this._errors.push({code:this._code,error:this._text,location:{start:{column:s.column.start,line:s.line.start},end:{column:s.column.end,line:s.line.end}}})}getBlockInfo(t){const s=new RegExp("\\r\\n?|\\n|\\u2028|\\u2029","g");t.column={},t.line={};let e=t.start;for(let r=1,n=0;;){s.lastIndex=n;const o=s.exec(this._json);if(o&&o.index<e)++r,n=o.index+o[0].length;else{if(e!==t.start)return t.column.end=e-n+2,t.line.end=r,t;t.column.start=e-n+1,t.line.start=r,e=t.end}}}}},function(t,s,e){(function(s){const r=[e(3),e(4),e(5),e(6),e(7),e(8),e(9)];function n(t){let s=[];return r.forEach(e=>{s=s.concat(new e(t))}),s}"undefined"==typeof window?s.lint=n:window.lint=n,t.exports={lint:n}}).call(this,e(2))},function(t,s){var e;e=function(){return this}();try{e=e||new Function("return this")()}catch(t){"object"==typeof window&&(e=window)}t.exports=e},function(t,s,e){const r=e(0);t.exports=class extends r{constructor(t){return super(t),this._blocks=["placeholder","button"],this._code="WARNING.INVALID_BUTTON_POSITION",this._text="Блок button в блоке warning не может находиться перед блоком placeholder на том же или более глубоком уровне вложенности.",this._buttons=[],this.lint(),this._errors}check(){const t=this.findBrackets(),s=this.parseBlock(t);if("button"===s.block&&this._buttons.push(t),"placeholder"===s.block){const s=this.findBrackets(t.start-1);"warning"===this.parseBlock(s).block&&this._buttons.forEach(t=>{t.start>s.start&&t.end<s.end&&this.addError(t)})}}}},function(t,s,e){const r=e(0);t.exports=class extends r{constructor(t){return super(t),this._blocks=["button"],this._code="WARNING.INVALID_BUTTON_SIZE",this._text="Размер кнопки блока warning должен быть на 1 шаг больше эталонного.",this._sizes=["xxs","xs","s","m","l","xl","xxl","xxxl","xxxxl","xxxxxl"],this.lint(),this._errors}check(){const t=this.findBrackets(),s=this.parseBlock(t);let e;if(s.mods&&s.mods.size){e=s.mods.size;const r=this.findBrackets(t.start-1),n=this.parseBlock(r);if(Array.isArray(n.content)&&"warning"===n.block)for(let s,r=0;r<n.content.length;r+=1)"text"===n.content[r].block&&n.content[r].mods&&n.content[r].mods.size&&(s=this._sizes[this._sizes.indexOf(n.content[r].mods.size)+1],e!==s&&this.addError(t))}}}},function(t,s,e){const r=e(0);t.exports=class extends r{constructor(t){return super(t),this._blocks=["text"],this._code="TEXT.INVALID_H2_POSITION",this._text="Заголовок второго уровня (блок text с модификатором type h2) не может находиться перед заголовком первого уровня на том же или более глубоком уровне вложенности.",this._scope=[],this.lint(),this._errors}check(){const t=this.findBrackets(),s=this.parseBlock(t);if(s&&s.mods&&"h1"===s.mods.type){const s=this.findBrackets(t.start-1);this._scope.forEach(t=>{t.start>s.start&&t.end<s.end&&(this.addError(t),this._scope=[])})}else s&&s.mods&&"h2"===s.mods.type&&this._scope.push(t)}}},function(t,s,e){const r=e(0);t.exports=class extends r{constructor(t){return super(t),this._blocks=["text"],this._code="TEXT.INVALID_H3_POSITION",this._text="Заголовок третьего уровня (блок text с модификатором type h3) не может находиться перед заголовком первого уровня на том же или более глубоком уровне вложенности.",this._scope=[],this.lint(),this._errors}check(){const t=this.findBrackets(),s=this.parseBlock(t);if(s&&s.mods&&"h2"===s.mods.type){const s=this.findBrackets(t.start-1);this._scope.forEach(t=>{t.start>s.start&&t.end<s.end&&(this.addError(t),this._scope=[])})}else s&&s.mods&&"h3"===s.mods.type&&this._scope.push(t)}}},function(t,s,e){const r=e(0);t.exports=class extends r{constructor(t){return super(t),this._blocks=["text"],this._code="TEXT.SEVERAL_H1",this._text="Заголовок первого уровня (блок text с модификатором type h1) на странице должен быть единственным.",this._scope={h1:!1},this.lint(),this._errors}check(){const t=this.findBrackets(),s=this.parseBlock(t);s&&s.mods&&"h1"===s.mods.type&&(this._scope.h1&&this.addError(t),this._scope.h1=!0)}}},function(t,s,e){const r=e(0);t.exports=class extends r{constructor(t){return super(t),this._blocks=["warning"],this._code="WARNING.TEXT_SIZES_SHOULD_BE_EQUAL",this._text="Текст не является эталонным.",this.lint(),this._errors}check(){const t=this.findBrackets(),s=this.parseBlock(t);for(let e,r,n=0;n<s.content.length;n+=1)if("text"===s.content[n].block)if(e=s.content[n],r&&e.mods){if(e.mods.size!==r){this.addError(t);break}}else e.mods&&(r=e.mods.size)}}},function(t,s,e){const r=e(0);t.exports=class extends r{constructor(t){return super(t),this._blocks=["placeholder"],this._code="WARNING.INVALID_BUTTON_SIZE",this._text="Допустимые размеры для блока placeholder в блоке warning (значение модификатора size): s, m, l.",this._sizes=["s","m","l"],this.lint(),this._errors}check(){const t=this.findBrackets(),s=this.parseBlock(t);let e;s.mods&&s.mods.size&&(e=s.mods.size);const r=this.findBrackets(t.start-1);"warning"!==this.parseBlock(r).block||this._sizes.includes(e)||this.addError(t)}}}]);