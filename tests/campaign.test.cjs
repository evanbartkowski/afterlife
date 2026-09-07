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
  vm.runInContext(fs.readFileSync(path.join(root, 'expansion.js'), 'utf8'), ctx);
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
      test.run(`if (state.route[state.scenario].choices) choose(Math.min(${branch}, state.route[state.scenario].choices.filter(c => !c[6]?.death).length - 1));`);
      assert(test.run('state.health > 0'), `${difficulty} branch ${branch} died at step ${steps}`);
      assert(test.run('Number.isInteger(state.food * 2) && Number.isInteger(state.supplies * 2)'), 'Rations left half-unit increments');
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

const systems = game();
systems.run("state.food=10;state.supplies=10;state.radiation=10;state.base='NONE';state.race='HUMAN';applyTravelNeeds(2)");
assert.equal(systems.run('state.food'),8);assert.equal(systems.run('state.supplies'),9);
systems.run("state.food=10;state.supplies=10;state.radiation=10;state.base='WARDEN OUTPOSTS';state.race='MOON ELF';applyTravelNeeds(2)");
assert.equal(systems.run('state.supplies'),10);assert.equal(systems.run('state.radiation'),10);
systems.run("state.food=10;state.supplies=10;state.base='MOON SHRINES';state.race='HUMAN';applyTravelNeeds(2)");
assert.equal(systems.run('state.food'),9);
systems.run("state.base='MOSS CARAVAN';state.food=1;buildDynamicChoices()[0].apply()");
assert.equal(systems.run('state.food'),4);
systems.run("state.story={seen:[],clues:[]};state.health=30;state.base='MOON SHRINES';renderCampaignBeat(resolveCampaignScene({campaignId:'moonpool'}))");
assert.equal(systems.run('state.health'),48);
systems.run("renderCampaignBeat(resolveCampaignScene({campaignId:'moonpool'}))");
assert.equal(systems.run('state.health'),48,'Shrine benefit repeated on render');
systems.run("state.story={seen:[],clues:[]};state.evil=0;state.items=[];applyStoryEffects(resolveCampaignScene({campaignId:'vault'}).choices[1])");
assert.equal(systems.run('humanity()'),70);assert(systems.run("state.enemies.includes('VAULT GUILD')"));
systems.run("choosePartner('LYRIA');applyStoryEffects(resolveCampaignScene({campaignId:'bellcourt'}).choices[1])");
assert.equal(systems.run('humanity()'),30);assert.equal(systems.run('state.story.partner'),null);
assert(systems.run("state.items.includes('BOUND SOUL-BELL')"));
systems.run("applyStoryEffects(resolveCampaignScene({campaignId:'reckoning_road'}).choices[0])");
assert.equal(systems.run('humanity()'),50);assert(!systems.run("state.items.includes('BOUND SOUL-BELL')"));
systems.run("choosePartner('LYRIA');choosePartner('NYX')");
assert.equal(systems.run("state.lovers.join(',')"),'NYX');
assert.equal(systems.run('campaignEndingTitle()'),'NOTHING LEFT TO STEAL');
systems.run("choosePartner('LYRIA')");
assert.equal(systems.run('campaignEndingTitle()'),'AN ORCHARD UNDER TWO MOONS');
systems.run("state.story.interest='romance';state.story.honesty='open';state.story.channel='protected';state.story.accountability='accepted'");
assert(!systems.run("resolveCampaignScene({campaignId:'promise'}).choices.some(c=>c[6].story.bond==='romance')"),'Stella bypassed existing commitment');
systems.run("const snapshot=captureOutcome();state.evil+=1;state.base='WARDEN OUTPOSTS';showDecisionAftermath(snapshot)");
assert.match(systems.nodes.get('decisionAftermath').textContent,/Humanity -10/);
assert.match(systems.nodes.get('decisionAftermath').textContent,/WARDEN OUTPOSTS/);
systems.run("const snapshotItems=captureOutcome();state.items.push('TEST CHARM');showOutcomeFeedback(snapshotItems)");
assert.equal(systems.nodes.get('choiceOutcome').textContent,'TEST CHARM');
assert.equal(systems.run('formatRations(3)'), '3');assert.equal(systems.run('formatRations(2.5)'), '2.5');
console.log('PASS: 12 expanded playthroughs; half-rations; base benefits; crimes, humanity and restitution; three romance paths; seven ending titles; persistent item-only rewards and decision aftermath.');

const fatalTitles = new Set();
for (const route of ['ridge','aqueduct']) {
  for (const id of ['crossing','lyria','transformation','vault','bellcourt','rook','lastmile']) {
    const fatal = game();
    fatal.run("state.story.route='"+route+"';state.race='ASH REVENANT';state.health=100;state.radiation=100;state.scenario=state.route.findIndex(s=>s.campaignId==='"+id+"');renderScenario()");
    fatal.run('choose(state.route[state.scenario].choices.length - 1)');
    assert.equal(fatal.run('state.health'),0);
    assert.equal(fatal.run('state.runEnded'),true);
    assert.equal(fatal.nodes.get('sceneType').textContent,'FATAL DECISION');
    fatalTitles.add(fatal.nodes.get('sceneTitle').textContent);
    const position=fatal.run('state.scenario');
    fatal.run('nextScene();choose(0)');
    assert.equal(fatal.run('state.scenario'),position);
    assert.equal(fatal.run('state.health'),0);
    fatal.run('restart()');
    assert.equal(fatal.run('state.runEnded'),false);
    assert(fatal.run('state.health > 0'));
  }
}
assert.equal(fatalTitles.size,8);
console.log('PASS: eight unique fatal outcomes, no mutation resurrection, no post-death progression, and restart recovery.');
