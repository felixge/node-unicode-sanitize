const sanitize = require('./index');
const assert = require('assert');

(function testString() {
  const replacement = '\ufffd';
  const lead = '\ud800';
  const trail = '\udfff';
  const pair = lead+trail;
  const prefix = 'abc';
  const suffix = 'def';
  const embeddedPair = prefix+pair+suffix;
  const embeddedLead = prefix+lead+suffix;
  const embeddedTrail = prefix+trail+suffix;
  const embeddedReplacement = prefix+replacement+suffix;

  assert.strictEqual(sanitize.string(pair), pair);
  assert.strictEqual(sanitize.string(lead), replacement);
  assert.strictEqual(sanitize.string(trail), replacement);
  assert.strictEqual(sanitize.string(replacement), replacement);
  assert.strictEqual(sanitize.string(embeddedPair), embeddedPair);
  assert.strictEqual(sanitize.string(embeddedLead), embeddedReplacement);
  assert.strictEqual(sanitize.string(embeddedTrail), embeddedReplacement);
  assert.strictEqual(sanitize.string(embeddedReplacement), embeddedReplacement);
})();
