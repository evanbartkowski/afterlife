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
  const route=[]; let current=campaignBeats[0]; let bag=[]; let previous=-1;
  for(let day=1;day<=365;day++) {
    if(milestones.has(day)) { current=milestones.get(day); route.push({campaignId:current.id,calendarDay:day}); continue; }
    if(!bag.length) {
      bag=roadSituations.map((_,index)=>index);
      for(let i=bag.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[bag[i],bag[j]]=[bag[j],bag[i]];}
      if(bag[0]===previous) [bag[0],bag[1]]=[bag[1],bag[0]];
    }
    const encounter=bag.shift(); previous=encounter;
    route.push({expedition:true,calendarDay:day,encounter,region:current.region,act:current.act,objective:current.objective,dispatch:day%11===0});
  }
  return route;
}
function resolveRoadScene(scene) {
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
  return {...scene,type:scene.dispatch?'RADIO // DAILY SURVIVAL':'JOURNEY // UNPREDICTABLE ENCOUNTER',title:scene.dispatch?'A VOICE BETWEEN WAYPOINTS':title,
    text:`${season}\n\n${scene.dispatch?messages[Math.floor(scene.calendarDay/11)%messages.length]+personal+'\n\n':''}${description}\n\nYou still need to eat and drink today. Searching deeper risks injury; taking time to rest spends your existing provisions.`,
    choices:[
      storyChoice(careful,'You work slowly and keep the exit in sight. The modest supplies are real; so is another day spent getting there.',{}, {food:1.5+(activeBase().forage||0),supplies:3}),
      storyChoice(bold+' [INJURY RISK]','You retrieve a larger haul, watching the shadows as you pack it. You will find out what the risk cost before you leave.',{}, {food:5,supplies:6,risk:true}),
      storyChoice(medic?'Accept treatment and sort the medic’s supplies':'Find cover, treat your injuries, and decontaminate',medic?'The medic cleans your wounds and shares a small meal. You leave knowing where to send the next injured traveler.':'You spend the day washing contamination from your clothes and binding your wounds. Rest helps, but it does not fill your pack.',{}, {food:medic?1:0,supplies:medic?1:0,radiation:medic?-10:-5},medic?12:7)
    ]};
}
function resolveTravelRisk(choice) {
  if(!choice[6]?.risk) return '';
  const level=['beginner','survivor','wasteland','impossible'].indexOf(state.difficulty);
  const chance=[.15,.25,.35,.45][level];
  if(Math.random()>=chance) return '\n\nYou get out without injury this time.';
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
