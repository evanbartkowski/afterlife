const specialEvents = [
  {title:'THE BLACK-SUN STORM',tone:'danger',text:'The sky darkens at noon. A wall of charged ash is crossing your route. Stella breaks into the channel: shelter now, or the exposure could overwhelm you. A sealed maintenance bunker is nearby, but its cooling system needs your clean water.',choices:[
    storyChoice('Cool the bunker and shelter ? spend 6 water','You pour your reserve into the cooling tank. The doors hold while the storm tears the road apart.',{}, {supplies:-6}),
    storyChoice('Cross the storm for the abandoned relief truck [INJURY RISK]','You reach the truck through blinding ash. Its supplies are intact, but your exposure meter screams.',{}, {food:8,supplies:10,radiation:25,risk:true},-10),
    storyChoice('Hide beneath the culvert ? take 12 health damage','The concrete keeps you alive. Hot dust still finds every gap in your clothing.',{}, {radiation:8},-12)
  ]},
  {title:'THE LAST MOBILE HOSPITAL',tone:'hope',text:'A hospital convoy stops beside you. Its surgeon has one treatment slot before the vehicles leave. For once, the machines are clean and the offer is real. You must choose what you need most.',choices:[
    storyChoice('Accept surgery ? restore 28 health','The surgeon treats wounds you had learned to ignore. You leave with clean bandages and steadier hands.',{}, {food:-2},28),
    storyChoice('Request decontamination ? remove 35 radiation','The technicians flush the contamination from your equipment and treat the burns beneath it.',{}, {radiation:-35},5),
    storyChoice('Take the emergency ration package ? gain 10 food and 10 water','You carry away enough supplies to change the next stretch of the journey.',{}, {food:10,supplies:10})
  ]},
  {title:'THE FALLEN SKY ARK',tone:'arcane',text:'A floating supply ark has struck the hillside. Its crystals pulse faster each minute. The cargo could sustain you for weeks, but the damaged core is approaching collapse.',choices:[
    storyChoice('Recover the outer crates ? gain 5 food and 6 water','You leave before the pulses become a continuous scream. The hillside flashes behind you.',{}, {food:5,supplies:6}),
    storyChoice('Enter the cargo vault ? gain 16 food and 16 water [INJURY RISK]','You drag the loaded sled out as the ark begins to break apart. The haul is extraordinary; the escape is not clean.',{}, {food:16,supplies:16,radiation:12,risk:true},-14),
    storyChoice('Discharge the core through your equipment ? gain 15 luck','The current burns out your spare gear and leaves a strange clarity behind your eyes.',{}, {luck:15,materials:-2,radiation:5},-8)
  ]},
  {title:'THE SIEGE OF THE WAYSTATION',tone:'danger',text:'Raiders have surrounded a waystation used by Haven-bound travelers. The defenders signal for help. Their medicine and water will be lost if the gate falls.',choices:[
    storyChoice('Guide the civilians out ? gain allies, lose 8 health','You hold a service door while families escape. Their medic presses a supply parcel into your hands.',{}, {ally:'WAYSTATION SURVIVORS',food:4,supplies:5,reputation:6},-8),
    storyChoice('Break the siege [INJURY RISK] ? gain 12 water and 8 food','You turn the raiders away from the gate. The survivors share the stores, but the raider captain remembers your face.',{}, {enemy:'ASH RAIDERS',food:8,supplies:12,reputation:8,risk:true},-12),
    storyChoice('Slip past the fighting ? abandon 4 food and 4 water','You leave a loaded pack to distract the raiders and escape the crossfire.',{}, {food:-4,supplies:-4})
  ]},
  {title:'THE WHITE STAG?S SPRING',tone:'arcane',text:'A white stag waits beside a spring that reflects a clear sky instead of the ash overhead. A shrine inscription offers healing, purification, or provisions. Only one gift can leave the clearing with you.',choices:[
    storyChoice('Accept healing ? restore 22 health','The water closes old wounds. The stag waits until you can stand without leaning on the stones.',{}, {radiation:-5},22),
    storyChoice('Wash away the exposure ? remove 28 radiation','The reflection clouds as the spring takes the poison from you.',{}, {radiation:-28}),
    storyChoice('Fill your containers ? gain 14 water','Every vessel comes away full. When you look back, the spring is an ordinary hollow in the grass.',{}, {supplies:14})
  ]},
  {title:'THE RED FLOOD',tone:'danger',text:'A contaminated reservoir has burst. You have minutes before the valley fills. The high trail is clear but steep; the pump station contains both clean water and a working escape ladder.',choices:[
    storyChoice('Climb immediately ? lose 4 food and 6 health','You cut loose a heavy food sack and climb above the flood line.',{}, {food:-4},-6),
    storyChoice('Search the pump station [INJURY RISK] ? gain 12 water','You reach the ladder with full containers. Spray from the flood soaks your clothes on the way out.',{}, {supplies:12,radiation:18,risk:true}),
    storyChoice('Carry a stranded traveler uphill ? lose 14 health, gain an ally','You reach high ground together. The traveler shares their provisions and promises to return the favor.',{}, {ally:'FLOOD SURVIVOR',food:6,supplies:6,reputation:4},-14)
  ]}
];
// Compact descriptors keep a full year of travel inexpensive to render and snapshot.
const roadSituations = [
  ['THE FLOODED GROCERY','A grocery sign rises from black water. Sealed tins float behind the counter; something large stirs under the shelving.','Collect supplies from the dry shelves','Wade in for the sealed crates'],
  ['THE GLASS RAIN','Sharp flakes begin ticking against your hood. A delivery van stands beyond an exposed stretch of road.','Gather what lies beneath the overhang','Cross the glassfall to reach the van'],
  ['THE ORCHARD OF TEETH','The fruit trees click when the wind moves. Caravan ribbons mark the safe outer branches.','Harvest only the marked branches','Climb past the ribbons for a larger harvest'],
  ['THE EMPTY CHECKPOINT','The guards are gone, but fresh tripwires cross the supply yard.','Search the guard hut from outside the wire','Disarm a tripwire and enter the yard'],
  ['A WELL THAT BREATHES','Cool air rises from a stone well. Rope marks show that someone recently lowered a crate inside.','Draw water with the spare bucket','Climb down to recover the crate'],
  ['THE MEDIC’S BICYCLE','A traveling medic has dropped her bicycle beside a ditch. She trades dressings for help collecting scattered supplies.','Help gather supplies beside the road','Climb into the ditch for her main bag'],
  ['THE RED FOOTPRINTS','Red footprints circle a hunting cabin. A cooking pot hangs cold above the hearth.','Search the outer storage shed','Enter the cabin before its owner returns'],
  ['THE BRIDGE TOLL','A patrol offers to sell its surplus. Beyond them is an abandoned wagon they warn you away from.','Trade salvage for a modest ration parcel','Slip past the patrol to search the wagon'],
  ['THE VIOLET MOSS','Moonlight turns a bank of moss transparent. Preserved supplies gleam beneath its roots.','Cut loose the shallow packages','Dig beneath the glowing root mass'],
  ['THE HOSPITAL ANNEX','A pharmacy window is accessible from the road. The inner corridor echoes with a patient’s endless cough.','Take supplies from the outer dispensary','Follow the corridor to the locked pharmacy'],
  ['THE STORM SIREN','An old siren has begun winding up. There are emergency lockers on both sides of an unstable wall.','Open the roadside locker','Search beyond the leaning wall'],
  ['THE FERRY WITHOUT A PILOT','A ferry has lodged against the riverbank. Its hold knocks softly against the hull.','Take the provisions from the deck','Force open the flooded hold'],
  ['THE MARKET OF MASKS','Masked traders have left labeled parcels beside a road shrine. Their larger bundles have no labels.','Choose the clearly marked travel parcel','Bargain for an unopened bundle'],
  ['THE GRAVEYARD GENERATOR','The generator behind a memorial wall still powers a refrigerated cache. Loose cables arc across the doorway.','Search the maintenance cupboard','Insulate the cables and enter the cache'],
  ['THE RANGER’S LAST CAMP','Rain has erased most of the tracks around a ranger camp. One trail leads to a fresh landslide.','Salvage the camp’s remaining supplies','Follow the trail toward the buried pack'],
  ['THE GREEN LIGHTHOUSE','A ruined lighthouse sweeps green light across the road. Each sweep makes your teeth ache.','Gather washed-up provisions at its base','Search the powered equipment room']
];
function buildYearRoute() {
  const milestones = new Map(campaignBeats.map((beat,index)=>[1+Math.floor(index*364/(campaignBeats.length-1)),beat]));
  const specialDays=new Map(); let specialBag=[];
  for(let day=22+Math.floor(Math.random()*10);day<350;day+=32+Math.floor(Math.random()*9)) {
    while(milestones.has(day))day++;
    if(!specialBag.length) {specialBag=specialEvents.map((_,i)=>i);for(let i=specialBag.length-1;i>0;i--){const k=Math.floor(Math.random()*(i+1));[specialBag[i],specialBag[k]]=[specialBag[k],specialBag[i]];}}
    specialDays.set(day,specialBag.pop());
  }
  const route=[]; let current=campaignBeats[0]; let bag=[]; let previous=-1;
  for(let day=1;day<=365;day++) {
    if(milestones.has(day)) { current=milestones.get(day); route.push({campaignId:current.id,calendarDay:day}); continue; }
    if(day % 18 === 8 && !specialDays.has(day)) { route.push({havenLink:Math.floor(day/18),calendarDay:day,region:current.region,act:current.act,objective:'Keep the road to Haven from coming apart.'}); continue; }
    if(!bag.length) {
      bag=roadSituations.map((_,index)=>index);
      for(let i=bag.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[bag[i],bag[j]]=[bag[j],bag[i]];}
      if(bag[0]===previous) [bag[0],bag[1]]=[bag[1],bag[0]];
    }
    const encounter=bag.shift(); previous=encounter;
    route.push({expedition:true,calendarDay:day,encounter,region:current.region,act:current.act,objective:current.objective,dispatch:day%11===0,specialKind:specialDays.get(day)});
  }
  return route;
}
function ensureThreads() {
  state.story.echoes ||= [];
}
function scheduleEcho(echo) {
  ensureThreads();
  if (state.story.echoes.some((item) => item.id === echo.id)) return;
  state.story.echoes.push({ due: (state.day || 1) + (echo.delay || 10), fired: false, ...echo });
}
function noteStoryThreads() {
  const story = state.story || {};
  if (story.courier === 'abandoned') scheduleEcho({ id: 'ellis-abandoned', delay: 12, kind: 'ellis-abandoned' });
  if (story.courier === 'helped') scheduleEcho({ id: 'ellis-helped', delay: 11, kind: 'ellis-helped' });
  if (story.marker === 'forced') scheduleEcho({ id: 'scavenger-return', delay: 9, kind: 'scavenger' });
  if (story.family === 'guided') scheduleEcho({ id: 'family-return', delay: 14, kind: 'family' });
  if (story.rook === 'sold') scheduleEcho({ id: 'rook-follows', delay: 10, kind: 'rook' });
  if (story.cache === 'left') scheduleEcho({ id: 'cache-returned', delay: 8, kind: 'cache' });
  if (story.convoy === 'led') scheduleEcho({ id: 'convoy-echo', delay: 7, kind: 'convoy' });
}
function dueEcho() {
  ensureThreads();
  const echo = state.story.echoes.find((item) => !item.fired && item.due <= state.day);
  if (!echo) return null;
  echo.fired = true;
  return echo;
}
function echoScene(echo, scene) {
  const scenes = {
    'ellis-abandoned': { title: 'A NAME YOU LEFT BEHIND', text: 'Someone has scratched your description into a milepost. Under it: ELLIS. JUNE LIVED. He did not write where he is going. The Haven road now has a person on it who knows what you took.', choices: [
      storyChoice('Leave a true account for Stella', 'You radio the shed as it happened. The silence afterward is hers, not the static.', { honesty: 'confessed' }, { reputation: 2, evil: -1 }),
      storyChoice('Scrape the name off the post', 'The wood remembers the knife. So will the next traveler who was told to trust green marks.', { honesty: 'hidden' }, { evil: 1, enemy: 'ELLIS' }),
      storyChoice('Follow the freshest tracks', 'They end at a cold fire and a child’s bandage. June is alive somewhere ahead. Ellis is not waiting for you.', { tracked: 'ellis' }, { item: 'JUNE’S BANDAGE', luck: -2 })
    ]},
    'ellis-helped': { title: 'THE COURIER AHEAD OF YOU', text: 'Ellis has left a Haven cache where Stella said the next fork would be. The note uses your name. He writes that June asked him to leave the good tin, not the dented one.', choices: [
      storyChoice('Take only what you need and mark the rest', 'You leave the good tin. A later traveler will eat because you already did.', { cache: 'shared' }, { supplies: 2, food: 1, reputation: 2 }),
      storyChoice('Empty the cache', 'You are still alive tonight. The next person on this marker will not be as lucky.', { cache: 'hoarded' }, { supplies: 4, food: 3, evil: 1 })
    ]},
    scavenger: { title: 'THE FACE FROM THE MARKER', text: 'The scavenger you drove off the green stake is waiting with two others. They are not here for the reflector. They are here because you made the Haven road personal.', choices: [
      storyChoice('Pay them to walk away', 'The gold leaves. So do they. The marker behind you is still green.', {}, { crowns: -12, reputation: 1 }),
      storyChoice('Fight for the fork [INJURY RISK]', 'You keep the road. You do not keep all of your blood.', { risk: true }, { enemy: 'MILEPOST CREW', evil: 1 }, -8),
      storyChoice('Give them a false Haven bearing', 'They leave happy. Stella’s real fork stays yours. Someone else will drink the lie.', { rook: 'lied' }, { evil: 2, crowns: 4 })
    ]},
    family: { title: 'THE CART AT THE FORK', text: 'The family you guided has made it farther than you expected. Their adult is worse. They still have the bearing you gave them, written on the cart in a careful hand.', choices: [
      storyChoice('Spend water and walk them to the next shelter', 'You arrive thirstier. They arrive alive. A Haven guide later uses their names, not yours.', {}, { supplies: -2, ally: 'CART FAMILY', reputation: 3, evil: -1 }, -2),
      storyChoice('Give them the bearing again and go on alone', 'You do not have enough water for both journeys. You tell them that plainly. They do not thank you. They do not curse you.', {}, { reputation: 1 }),
      storyChoice('Take their remaining gold for a shorter route', 'The shortcut is real. So is the look the child gives the coins leaving their hand.', {}, { crowns: 9, evil: 2, supplies: 1 })
    ]},
    rook: { title: 'WHITE ARROWS ON YOUR TRAIL', text: 'Rook’s scouts are using the fork you sold. A Haven marker ahead has been painted over. If you do nothing, the people following your old bearing walk into his camp.', choices: [
      storyChoice('Repaint the marker and radio Stella', 'You spend the night undoing your own directions. Stella does not pretend that fixes the sale. She does move a crew.', { channel: 'repaired' }, { reputation: 3, evil: -1, enemy: 'ROOK' }),
      storyChoice('Ambush the scouts and take their map', 'The map shows which shelters Rook has already taxed. You are bleeding, and now he knows the tax collector did not report back.', { risk: true }, { item: 'ROOK’S TAX MAP', enemy: 'ROOK', crowns: 8 }, -6),
      storyChoice('Let the arrows stand', 'You keep your water and your distance. Tomorrow’s travelers will not have that choice.', {}, { evil: 2, reputation: -2 })
    ]},
    cache: { title: 'THE TIN YOU LEFT', text: 'Someone ate the meal you left in Stella’s cache and scratched a thanks into the tin. Under it is a bearing you did not have. The road paid you back without asking your name.', choices: [
      storyChoice('Follow the new bearing', 'It leads to a sealed jug and a green thread tied the way Stella ties them. Haven is still ahead.', {}, { supplies: 3, item: 'GREEN THREAD', luck: 2 }),
      storyChoice('Leave the bearing for the next hungry person', 'You copy nothing. The thanks stays where you found it.', {}, { reputation: 2, evil: -1 })
    ]},
    convoy: { title: 'NADI’S COUNT', text: 'A Haven guide stops you because Nadi gave them your description. The convoy you led is one person short. They want to know if you saw the missing man after the last ford.', choices: [
      storyChoice('Go back to the ford with them', 'You find his pack, then him, alive and ashamed of slowing everyone down. Nadi’s count is whole again.', {}, { ally: 'FORD SURVIVOR', reputation: 3, supplies: -1 }, -2),
      storyChoice('Tell them the last place you saw him and keep climbing', 'The guide writes it down. You do not know if that sentence saves him. You know it was all you could spend.', {}, { reputation: 1 }),
      storyChoice('Say you never counted him', 'The guide believes you. Nadi will not, if she hears the recording.', {}, { evil: 1, reputation: -2 })
    ]}
  };
  const built = scenes[echo.kind] || scenes.cache;
  return { ...scene, ...built, type: 'ECHO // THE ROAD REMEMBERS', echo: true };
}
function resolveRoadScene(scene) {
  const echo = typeof dueEcho === 'function' ? dueEcho() : null;
  if (echo) return echoScene(echo, scene);
  if(scene.specialKind !== undefined) {
    const event=specialEvents[scene.specialKind];
    return {...scene,...event,type:'SPECIAL EVENT // '+(event.tone==='danger'?'SURVIVAL CRISIS':event.tone==='hope'?'RARE OPPORTUNITY':'ARCANE PHENOMENON'),special:true,
      text:event.text+'\n\nThese choices have major consequences. Listed effects occur before normal daily consumption and any injury roll.'};
  }
  const [title,description,careful,bold]=roadSituations[scene.encounter];
  const season=scene.calendarDay<90?'Cold rain keeps the tracks soft.':scene.calendarDay<180?'Heat makes clean water harder to keep.':scene.calendarDay<270?'Fallen leaves hide the old road markings.':'Frost gathers along the sheltered side of the road.';
  const medic=[5,9].includes(scene.encounter);
  const messages=[
    'Stella reports a rescue party returning with three survivors. Someone has brought a violin to Haven. She lets you hear a few uncertain notes before returning to the route report.',
    'The next waypoint is still ahead. Stella asks you to mark any working well for the travelers behind you. Your map is becoming more than your own escape route.',
    'A dispatch lists weather, missing travelers, and shelter capacity. At the end Stella adds, quietly, that she is glad you called.',
    'A rescue crew confirms your route markers. Behind the operator, people argue cheerfully about dinner. The ordinary noise makes the distance feel survivable.'
  ];
  const personal=state.story.partner ? ` A private note from ${state.story.partner} is tucked into the route report: a little news, a little worry, and a promise to speak again.` : '';
  const thread = state.story.route === 'ridge' ? 'The sun-mirror code is still scratched inside your cuff. This place is only useful if it keeps you on that ridge.' : state.story.route === 'aqueduct' ? 'You are still repeating the pump sequence. If this stop costs the sequence, it is not a stop.' : ((state.items || []).includes('WORKING RADIO') ? 'The repaired radio ticks against your pack. Haven is still a direction, not a rumor.' : 'You are still walking toward a green milepost and a voice you cannot answer yet.');
  const bodyNote = state.supplies <= 1 ? ' Your mouth is too dry to trust a long argument.' : state.radiation >= 70 ? ' Your hands shake when you reach for anything metal.' : state.food <= 1 ? ' Hunger makes every container look fuller than it is.' : '';
  const choices = [
      storyChoice(careful,'You work slowly and keep the exit in sight. The modest supplies are real; so is another day spent getting there.',{}, {food:1.5+(activeBase().forage||0),supplies:2}),
      storyChoice(obviousInjuryRisk(scene) ? bold+' [INJURY RISK]' : bold,'You retrieve a larger haul, watching the shadows as you pack it. You will find out what the risk cost before you leave.',{}, obviousInjuryRisk(scene) ? {food:4,supplies:4,risk:true} : {food:3,supplies:3}),
      storyChoice(medic?'Accept treatment and sort the medic’s supplies':'Find cover, treat your injuries, and decontaminate',medic?'The medic cleans your wounds and shares a small meal. You leave knowing where to send the next injured traveler.':'You spend the day washing contamination from your clothes and binding your wounds. Rest helps, but it does not fill your pack.',{}, {food:medic?1:0,supplies:medic?1:0,radiation:medic?-10:-5},medic?12:7)
  ];
  if (typeof playerHasAny === 'function' && playerHasAny(['WORKING RADIO']) && scene.dispatch) choices.push(storyChoice('Ask Stella if this stop is still on the Haven bearing', 'She answers with a landmark, not a promise. You waste less of the day guessing.', {}, { reputation: 1, luck: 1 }));
  choices.push(storyChoice('Pay a local to haul the heavy crate', 'Gold opens a path your arms cannot. They take the weight, and you keep the water you would have spent recovering.', {}, { gate: { crowns: 12 }, crowns: -12, food: 2, supplies: 2 }));
  choices.push(storyChoice('Trust the lucky gap and slip through', 'The opening is there for one breath. You are steady enough to take it, and the cache is intact.', {}, { gate: { luck: 62, health: 45 }, food: 3, supplies: 2, luck: 1 }));
  choices.push(storyChoice('Carry the wounded watcher to the next shade', 'You have the strength for it. They tell you which container was poisoned before you drink.', {}, { gate: { health: 70, supplies: 2 }, supplies: -1, reputation: 2, radiation: -4 }, -4));
  return {...scene,type:scene.dispatch?'RADIO // DAILY SURVIVAL':'JOURNEY // UNPREDICTABLE ENCOUNTER',title:scene.dispatch?'A VOICE BETWEEN WAYPOINTS':title,
    text:`${season}\n\n${thread}${bodyNote}\n\n${scene.dispatch?messages[Math.floor(scene.calendarDay/11)%messages.length]+personal+'\n\n':''}${description}\n\nYou still need to eat and drink today. A bigger search can feed you tomorrow and kill you before then.`,
    choices};
}
function resolveHavenLink(scene) {
  const hasRadio = (state.items || []).includes('WORKING RADIO') || (state.inventory || []).includes('WORKING RADIO');
  const helped = state.story.courier === 'helped';
  const links = [
    { title:'A HAVEN MARKER IN THE DITCH', text: hasRadio ? 'Stella’s last clue matches a green stake half-buried beside the road. A scavenger is prying the reflector off it. Without that mirror, the next traveler following you to Haven will miss the turn.' : 'A green stake points the way you were already walking. A scavenger is stripping it for scrap. You do not have a working radio yet, but the marker still matters.', choices:[
      storyChoice('Pay the scavenger to leave the marker', 'You buy the reflector back. The next person on this road will still see Haven’s green.', { marker:'saved' }, { crowns:-8, reputation:2, item:'GREEN REFLECTOR' }),
      storyChoice('Drive the scavenger off', 'They run. You reset the stake. They will remember your face, and so will the road.', { marker:'forced' }, { enemy:'MILEPOST SCAVENGER', evil:1, reputation:1 }),
      storyChoice('Let them take it and mark the turn yourself', 'You scratch an arrow into the asphalt and keep moving. It is uglier than Stella’s marker, but it still points home.', { marker:'replaced' }, { item:'CHALK ARROW' })
    ]},
    { title:'ELLIS ON THE HAVEN FREQUENCY', text: helped ? 'Ellis reaches you on the private channel. June is walking again. He has a cache Stella asked him to leave for anyone still following the milepost.' : 'A courier’s voice cuts through the static. It might be Ellis. He is offering a cache, but only if you tell him what you did at the shed.', choices:[
      storyChoice('Take the cache and promise to pass one meal on', 'The box holds water, food, and a note from Stella: keep going. You leave a tin for the next traveler.', { cache:'shared' }, { supplies:3, food:2, reputation:2, evil:-1 }),
      storyChoice('Take all of it', 'You need it more than a stranger does. The note from Stella stays in the box, unread by anyone else.', { cache:'hoarded' }, { supplies:4, food:3, evil:1, crowns:2 }),
      storyChoice('Leave it for someone worse off', 'You mark the cache and walk hungry. Stella hears about it later and does not forget.', { cache:'left' }, { reputation:3, luck:2 })
    ]},
    { title:'ROOK’S MEN ON THE HAVEN ROAD', text:'Two of Rook’s scouts are painting white arrows over a green Haven marker. They offer gold if you tell them which fork Stella actually uses.', choices:[
      storyChoice('Mislead them and restore the green marker', 'You send them toward a flooded cut. The real fork stays green. Rook will hear your name from the wrong direction.', { rook:'misled' }, { enemy:'ROOK', reputation:3, item:'SCRAPED GREEN PAINT', evil:-1 }),
      storyChoice('Sell the fork for their gold', 'The coins are real. So is the convoy that will follow the lie into the flood.', { rook:'sold' }, { crowns:16, evil:2, enemy:'HAVEN GUIDES', reputation:-3 }),
      storyChoice('Walk past and warn Stella later', 'You do not fight them. You do tell Stella before nightfall. She moves the marker herself.', { rook:'reported' }, { reputation:1 })
    ]},
    { title:'A FAMILY ASKING FOR HAVEN', text:'A family with a broken cart asks if Haven is real. They have a little gold, a sick adult, and no map. Your answer becomes part of the road behind you.', choices:[
      storyChoice('Give them your spare water and the next bearing', 'They write the bearing on the cart. One of them presses a thin ring into your palm. "For the person waiting," they say.', { family:'guided' }, { ally:'CART FAMILY', supplies:-1, reputation:3, item:'THIN COPPER RING', evil:-1 }),
      storyChoice('Sell them a bearing', 'They pay. You tell them a true fork, not Rook’s. It is still a toll on people who are already poor.', { family:'tolled' }, { crowns:12, evil:1, supplies:-1 }),
      storyChoice('Tell them to turn back', 'You keep the route secret. They turn the cart around. Haven stays hidden. So do they.', { family:'refused' }, { reputation:-1 })
    ]}
  ];
  const link = links[Math.abs(scene.havenLink || 0) % links.length];
  return { ...scene, ...link, type:'QUEST // HAVEN ROAD', campaignId:null };
}
function obviousInjuryRisk(scene) {
  return state.difficulty === 'beginner' && [1, 4, 6, 9, 11].includes(scene.encounter);
}
function resolveTravelRisk(choice) {
  if(!choice[6]?.risk) return '';
  const level=Math.max(0, ['beginner','survivor','wasteland','impossible'].indexOf(state.difficulty));
  let chance=[.16,.26,.34,.44][level];
  if (state.health < 45) chance += .12;
  if (state.supplies <= 1) chance += .1;
  if (state.food <= 1) chance += .08;
  if (state.radiation >= 70) chance += .1;
  if (typeof playerHasAny === 'function' && playerHasAny(['GAS MASK', 'ROPE', 'CROWBAR'])) chance -= .08;
  if ((state.allies || []).length) chance -= .04;
  chance = Math.max(.08, Math.min(.82, chance - Math.min(.06, (state.luck || 0) / 1200)));
  if(Math.random()>=chance) return '\n\nYou get out without injury this time. Preparation, not mercy, is why.';
  let wound=[10,15,20,25][level];
  if(state.race==='ASH REVENANT')wound=Math.ceil(wound/2);
  state.health=Math.max(0,state.health-wound);
  state.radiation=clamp(state.radiation+2,0,100);
  return `\n\nThe search goes wrong: a hidden hazard catches you before you can retreat. You lose ${wound} health and gain 2 radiation. The supplies in your pack do not make the injury hurt less.`;
}
function filterMatureScene(scene) {
  if(state.matureContent) return scene;
  const quiet = {
    lyria_lantern:'You spend a quiet evening at the shrine. If Lyria is your partner, she asks whether you would like to stay. You can take your time without changing the relationship.',
    nyx_rooftop:'The shelter offers a private room and a chance to speak honestly. If Nyx is your partner, she invites you to stay. Choosing to wait is equally welcome.',
    stella_evening:'At the lodge, you look forward to the final descent. If Stella is your partner, she asks whether you would like to spend the evening together. There is no pressure to decide quickly.',
    hollow_broadcast:'Something outside the shelter imitates familiar voices. The rescue log warns that a hollow echo cannot answer an original question. You can test it without opening the door, or wait safely for dawn.',
    bone_procession:'An unnatural procession crosses the road. A trapped porter mouths his name: Abel. A marker says that speaking his name at the lamp can release him.'
  };
  const result={...scene, text:quiet[scene.campaignId] || scene.text};
  if(scene.choices) result.choices=scene.choices.map(choice=>{
    const copy=[...choice]; copy[6]={...(choice[6]||{})};
    if(copy[6].death) copy[6].death={...copy[6].death,text:'You ignore the warning and the danger proves fatal. Your journey ends here, before you can reach Haven. The people awaiting your next call will remember you.'};
    if(quiet[scene.campaignId]) copy[5]=scene.campaignId==='hollow_broadcast' ? 'You survive the night and record what you learned for the next traveler.' : scene.campaignId==='bone_procession' ? (copy[6].story?.procession==='helped'?'Abel is freed. You help him recover and continue along the road.':'The procession passes. You record Abel?s name for the rescue crews.') : 'You share a quiet moment and respect one another?s choice. The private details remain between you. In the morning, the journey continues.';
    return copy;
  });
  return result;
}
