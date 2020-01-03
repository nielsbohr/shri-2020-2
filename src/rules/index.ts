const rules = [ 
  () => require('./invalid-button-position'),
  () => require('./invalid-button-size'),
  () => require('./invalid-h2-position'),
  () => require('./invalid-h3-position'),
  () => require('./several-h1'),
  () => require('./text-sizes-should-be-equal'),
  () => require('./invalid-placeholder-size'),
  () => require('./too-much-marketing-blocks')
];

export default rules;