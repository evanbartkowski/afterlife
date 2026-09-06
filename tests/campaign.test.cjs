const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const path = require('node:path');
const root = path.join(__dirname, '..');
function game(seed = 7) {
  const nodes = new Map();
  const badges = new Set();
  const listeners = {};
  function element(tag = 'div') {
    return {
      tagName: tag.toUpperCase(), textContent: '', hidden: false, children: [], style: {},
      classList: { add() {}, remove() {}, toggle() {} },
      appendChild(child) { this.children.push(child); child.parentElement = this; if (child.className?.includes('stat-delta')) badges.add(child); },
      setAttribute() {}, addEventListener() {}, querySelector() { return null; },
      replaceWith(child) { nodes.set(child.id || this.id, child); },
      remove() { badges.delete(this); }
    };
  }
  const document = {
    getElementById(id) { if (!nodes.has(id)) { const node = element(); node.id = id; nodes.set(id, node); } return nodes.get(id); },
    createElement: element,
    querySelectorAll(selector) { return selector === '.stat-delta' ? [...badges] : []; },
    addEventListener(type, fn) { listeners[type] = fn; }
  };
  const math = Object.create(Math);
  math.random = () => ((seed = (seed * 1664525 + 1013904223) >>> 0) / 4294967296);
  const ctx = vm.createContext({ document, Math: math, console, localStorage: { getItem() { return null; }, setItem() {}, removeItem() {} } });
  vm.runInContext(fs.readFileSync(path.join(root, 'campaign.js'), 'utf8'), ctx);
  const script = fs.readFileSync(path.join(root, 'script.js'), 'utf8');
  vm.runInContext(script.slice(0, script.indexOf("$('briefingButton').addEventListener")), ctx);
  return { run: source => vm.runInContext(source, ctx), nodes, listeners, badges };
}
const ordered = game();
assert.equal(ordered.run('new Set(campaignBeats.map(b => b.id)).size === campaignBeats.length'), true);
assert.equal(ordered.run('campaignBeats.filter(b => b.kind).length >= 8'), true);
assert.equal(ordered.run('JSON.stringify(createRoute().filter(b => b.campaignId).map(b => b.campaignId)) === JSON.stringify(campaignBeats.map(b => b.id))'), true);
ordered.run('renderScenario()');
assert.match(ordered.nodes.get('sceneText').textContent, /three days missing/);
ordered.run('renderScenario()');
assert.equal(ordered.run("state.items.filter(item => item === 'AFTERLIFE KEY').length"), 1);
for (const difficulty of ['beginner', 'survivor', 'wasteland', 'impossible']) {
  for (const branch of [0, 1, 2]) {
    const test = game(13);
    test.run(`setDifficulty('${difficulty}')`);
    let steps = 0;
    while (!test.run("state.route[state.scenario].campaignId === 'morning'")) {
      test.run(`if (state.route[state.scenario].choices) choose(Math.min(${branch}, state.route[state.scenario].choices.length - 1));`);
      assert(test.run('state.health > 0'), `${difficulty} branch ${branch} died at step ${steps}`);
      test.listeners.click();
      test.run('nextScene()');
      assert(++steps < 60, 'Campaign repeated or failed to advance');
    }
    assert.equal(test.run('state.day'), 365);
    assert.match(test.nodes.get('sceneText').textContent, /DAY 365/);
    const index = test.run('state.scenario');
    test.run('nextScene()');
    assert.equal(test.run('state.scenario'), index, 'Ending restarted campaign');
    assert.equal(test.run('state.story.seen.length'), test.run('campaignBeats.filter(b => b.kind).length'));
  }
}
const mutation = game();
mutation.run('state.scenario = 8; state.radiation = 100; Math.random = () => .9; resolveRadiationThreshold()');
assert.equal(mutation.run('state.scenario'), 8, 'Mutation reset the story');
assert.equal(mutation.run("state.route[0].campaignId"), 'signal');
const branches = game();
branches.run("state.story = {seen: [], bond: 'romance', mara: 'exiled', ending: 'network', coalition: 'shared', justice: 'trial', prisoners: 'freed'}");
assert.match(branches.run('campaignEpilogue()'), /plain goodbye/);
assert.doesNotMatch(branches.run('campaignEpilogue()'), /Mara stays/);
branches.run("state.story.mara = 'reconcile'");
assert.match(branches.run('campaignEpilogue()'), /Mara stays/);
branches.run("state.story.ending = 'haven'");
assert.match(branches.run('campaignEpilogue()'), /Mara leaves/);
branches.run("state.story.ending = 'evacuation'");
assert.match(branches.run('campaignEpilogue()'), /empty outline/);
branches.run("state.lovers = ['MARA']; state.allies = ['MARA']; applyStoryEffects([0,0,0,0,0,'',{story: {mara:'exiled'},removeLover:'MARA',removeAlly:'MARA'}])");
assert.equal(branches.run('state.lovers.length + state.allies.length'), 0);
console.log('PASS: ordered campaign, 12 complete playthroughs, one-time story events, mutation continuity, relationship consequences, and all finales.');