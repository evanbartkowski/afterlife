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
assert.match(ordered.nodes.get('sceneText').textContent, /My name is Stella/);
const supplies = ordered.run('state.supplies');
ordered.run('renderScenario()');
assert.equal(ordered.run('state.supplies'), supplies, 'Re-render granted supplies twice');
assert.equal(ordered.run("state.story.clues.filter(c => c === 'GREEN MILEPOST').length"), 1);
const endingTexts = new Set();
for (const difficulty of ['beginner', 'survivor', 'wasteland', 'impossible']) {
  for (const branch of [0, 1, 2]) {
    const test = game(13);
    test.run(`setDifficulty('${difficulty}')`);
    let steps = 0, previousDay = 1;
    while (!test.run("state.route[state.scenario].campaignId === 'morning'")) {
      test.run(`if (state.route[state.scenario].choices) choose(Math.min(${branch}, state.route[state.scenario].choices.length - 1));`);
      assert(test.run('state.health > 0'), `${difficulty} branch ${branch} died at step ${steps}`);
      assert(test.run('state.day') >= previousDay, 'Calendar went backwards');
      assert(test.run('state.day < 100'), 'Reached deadline before arrival');
      previousDay = test.run('state.day');
      test.listeners.click(); test.run('nextScene()');
      assert(++steps < 60, 'Campaign repeated or failed to advance');
    }
    assert.equal(test.run('state.day'), 100);
    assert.match(test.nodes.get('sceneText').textContent, /DAY 100/);
    assert.match(test.nodes.get('sceneText').textContent, /Haven is the peace Stella promised/);
    assert.match(test.nodes.get('routeClues').textContent, /SPLIT SHADOW/);
    const index = test.run('state.scenario'); test.run('nextScene()');
    assert.equal(test.run('state.scenario'), index, 'Ending restarted campaign');
    assert.equal(test.run('state.story.seen.length'), test.run('campaignBeats.filter(b => b.kind).length'));
    endingTexts.add(test.nodes.get('sceneText').textContent);
    if (branch === 0) {
      assert.equal(test.run('state.story.bond'), 'romance');
      assert.equal(test.run("state.lovers.includes('STELLA')"), true);
    }
    assert.equal(test.run("state.lovers.includes('MARA')"), false);
  }
}
assert(endingTexts.size >= 3, 'Choices did not produce different epilogues');
const paths = game();
paths.run("state.story.route = 'ridge'");
assert.match(paths.run("resolveCampaignScene({campaignId:'crossing'}).text"), /suspension bridge/);
paths.run("state.story.route = 'aqueduct'");
assert.match(paths.run("resolveCampaignScene({campaignId:'crossing'}).text"), /flooded pump house/);
paths.run("state.story = {seen:[],interest:'romance',honesty:'lie',channel:'sold',accountability:'refused',passage:'alone'}");
assert.equal(paths.run("resolveCampaignScene({campaignId:'promise'}).choices.some(c=>c[6].story.bond === 'romance')"), false, 'Romance bypassed trust');
paths.run("state.story.interest = 'friendship'; state.story.honesty = 'open'; state.story.channel = 'protected'; state.story.accountability = 'accepted'");
assert.equal(paths.run("resolveCampaignScene({campaignId:'promise'}).choices.some(c=>c[6].story.bond === 'romance')"), false, 'Friendship forced romance');
const titles = new Set();
for (const flags of [
  {bond:'romance'}, {bond:'friendship',convoy:'led',arrival:'together'},
  {bond:'independent',arrival:'scout'}, {bond:'friendship',arrival:'rest'}, {bond:'independent',arrival:'rest'}
]) {
  paths.run(`state.story = ${JSON.stringify(flags)}`);
  titles.add(paths.run('campaignEndingTitle()'));
}
assert.equal(titles.size,5);
const mutation = game();
mutation.run('state.scenario = 8; state.radiation = 100; Math.random = () => .9; resolveRadiationThreshold()');
assert.equal(mutation.run('state.scenario'),8,'Mutation reset journey');
assert.equal(mutation.run("state.route[0].campaignId"),'signal');
console.log('PASS: 12 complete 100-day playthroughs, both quest routes, five ending titles, clue persistence, one-time supplies, romance boundaries, and mutation continuity.');