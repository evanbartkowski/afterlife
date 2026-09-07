// Side stories stay on the route to Haven; their flags return in later scenes.
const baseBenefits = {
  'MOSS CARAVAN': { label: 'Forage +1 food; shelter food reserve 12', forage: 1, food: 12 },
  'WARDEN OUTPOSTS': { label: 'Travel water cost -0.5/day; radiation -0.25/day', water: .5, radiation: .25 },
  'MOON SHRINES': { label: 'Shelter recovery +6 health; food use -0.5/day', healing: 6, foodSaving: .5 }
};
function activeBase() { return baseBenefits[state.base] || {}; }
function humanity() { return clamp(100 - state.evil * 10, 0, 100); }
function choosePartner(name) {
  state.lovers = name ? [name] : [];
  state.story.partner = name || null;
  if (name && name !== 'STELLA') state.story.bond = 'friendship';
}
function expansionEpilogue() {
  const notes = [];
  if (state.story.partner === 'LYRIA') notes.push('Lyria arrives with seeds wrapped in your old route map. You share a room overlooking Haven’s orchard. She plants a moonflower outside the window and asks what you would like to grow together.');
  if (state.story.partner === 'NYX') notes.push('Nyx turns in her lockpicks at the clinic, then retrieves them to repair a stuck cupboard. She laughs when you catch her. The two of you begin a life where cleverness need not mean taking from someone else.');
  if (state.story.vault === 'stolen') notes.push('The families whose winter stores you stole reach Haven too. Its council arranges restitution from your future salvage work. Your room is safe, but peace does not make their losses imaginary.');
  if (state.story.bell === 'bound') notes.push('The Bell Court cannot cross Haven’s old boundary stones. Its emissary waits outside with your broken promise written on silver. You surrendered the stolen soul-bell at the gate; some powers are worth leaving behind.');
  if (state.race !== 'HUMAN') notes.push(`The clinic records your changed body as ${state.race}, then asks what care you need. Your species does not decide whether you belong here.`);
  if (humanity() <= 40) notes.push('You have done things on the road that people cannot forgive yet. Haven offers supervised work and a chance to repair what can be repaired. Becoming kinder will require choices after this story ends.');
  else if (state.story.atonement === 'returned') notes.push('The people who received the returned supplies send a letter. It does not call you innocent. It says the medicine arrived in time.');
  if (state.base !== 'NONE') notes.push(`Your ${state.base.toLowerCase()} contacts become part of Haven’s rescue network. The places that kept you alive will now help the next traveler.`);
  return notes.join('\n\n');
}
const extraBeats = [
  ['portrait', { id:'wayhouse', act:'I // SHELTERS WITH A PRICE',title:'WHERE YOU LEAVE A LIGHT',region:0,
    objective:'Choose a support network for the journey.',
    text:'Stella directs you to a crossroads where three groups maintain shelters all the way to the mountain. Their runners can carry your spare equipment forward; choosing one makes its safehouses your traveling base.\n\nThe Moss Caravan grows food on wagons pulled by antlered giants. The Wardens maintain clean-water caches in old signal towers. The Moon Shrines welcome anyone who observes their silence after sunset. You can change allegiance later. The benefits begin with this choice.',
    choices:[
      storyChoice('Join the Moss Caravan — better foraging and food stores','A gardener ties a green ribbon to your pack. Their next wagon will carry your tools and leave a bed beside the seedlings.',{}, {base:'MOSS CARAVAN',food:3,ally:'MOSS CARAVAN'}),
      storyChoice('Use the Warden Outposts — conserve water and resist radiation','A warden gives you a filter and the tower access codes. Their quartermasters promise a cache wherever the signal posts still stand.',{}, {base:'WARDEN OUTPOSTS',supplies:3,ally:'WARDENS'}),
      storyChoice('Shelter at Moon Shrines — healing and reduced hunger','A silent attendant paints a crescent on your wrist. At each shrine, the same mark will open a door and a place beside the healing pool.',{}, {base:'MOON SHRINES',food:2,ally:'MOON KEEPERS'})
    ] }],
  ['bells', {id:'lyria',act:'II // THE ORCHARD THAT REMEMBERS',title:'THE WOMAN INSIDE THE TREE',region:1,
    objective:'Free Lyria or bargain with the spirit holding her.',
    text:'Your route passes an orchard growing through the roof of a ruined theater. Inside its largest tree, a woman moves beneath translucent bark. Lyria is an adult moon elf, eighty-four years old, with silver hair and an impatient voice. "If you are going to stare, at least read the contract."\n\nThe orchard spirit trapped her after she stole seeds to feed a refugee camp. It will release her for your help planting new trees. Or it offers you a silver fruit if you leave her imprisoned. Stella hears the conversation. "A contract can still be cruel," she says.',
    choices:[
      storyChoice('Plant the seeds and win her release','Roots loosen from Lyria’s wrists. She stays to finish the last row beside you. "You could have taken the fruit," she says. "I will remember that you did not."',{lyria:'freed'},{ally:'LYRIA',item:'MOONSEED CHARM',food:2,reputation:3}),
      storyChoice('Break the spirit’s seal and carry Lyria out','The tree screams your name to the surrounding forest. Lyria escapes with you, but silver moths begin following your shadow. The Bell Court has marked you as an oathbreaker.',{lyria:'freed',bell:'angered'},{ally:'LYRIA',enemy:'BELL COURT',item:'BROKEN SILVER SEAL'},-3),
      storyChoice('Take the silver fruit and leave her bound','The fruit fills your belly with cold sweetness. Lyria stops asking for help. On the radio Stella tells you to mark the orchard; she will send someone who will open it.',{lyria:'abandoned'},{item:'SILVER FRUIT',food:3,evil:2,enemy:'LYRIA'})
    ]}],
  ['connection', {id:'moonpool',act:'II // THE BODY YOU CARRY',title:'A REFLECTION WITH DIFFERENT EYES',kind:'discovery',region:2,camp:true,
    objective:'Learn what changing your race would cost.',
    text:()=>`${state.story.lyria === 'freed' ? 'Lyria leads you to a pool reflecting stars that are not in the sky. She explains the transformations without pretending they are blessings.' : 'A Moon Keeper meets you at a pool reflecting unfamiliar stars. She reads the terms of its transformations aloud before allowing you near the water.'}\n\nMoon elves accumulate less radiation. Ash revenants endure wounds more easily but need extra food. Remaining human carries neither advantage nor cost. These are changes to your body, not verdicts on your character.\n\nThe nearby shrine offers food and rest while you decide. Stella asks only whether the choice is yours.`}],
  ['moonpool', {id:'transformation',act:'II // THE BODY YOU CARRY',title:'WHAT STEPS OUT OF THE WATER',region:2,
    objective:'Choose a race, or remain yourself.',text:'The pool offers three reflections. One has your face. Another has luminous eyes and pointed ears. The third has ash-gray skin and a slow, ember-red pulse. Nothing reaches out to take you. You have to step forward.',
    choices:[
      storyChoice('Remain human','You wash your face and step away. You do not need to become extraordinary to deserve surviving.',{transformation:'human'},{race:'HUMAN'}),
      storyChoice('Become a moon elf — radiation gain reduced by 0.25/day','The water carries the ache out of your bones. Your eyes adjust to the starlight before you leave the pool. Lighter footsteps do not mean an easier conscience.',{transformation:'elf'},{race:'MOON ELF',radiation:-4}),
      storyChoice('Become an ash revenant — halve direct wounds; eat 0.5 more/day','Your pulse stops for one terrible moment, then begins again. Pain has become distant. Hunger has not. The keeper records your new needs beside your old name.',{transformation:'revenant'},{race:'ASH REVENANT'})
    ]}],
  ['transformation', {id:'lyria_night',act:'II // THE ORCHARD THAT REMEMBERS',title:'WHAT GROWS AFTER KINDNESS',region:2,
    objective:'Decide whether Lyria is a companion, a lover, or someone you let go.',
    text:()=>state.story.lyria === 'freed' ? 'Lyria finds you outside the shrine. She admits she was frightened inside the tree, then annoyed at being frightened. You talk until her sharp humor softens. "I would like to travel with you," she says. "Perhaps more, if we both want it. Rescuing me does not buy that. I am offering."' : 'A rescue crew brings word that Lyria is free. She has not come to thank you. Her note asks you to stop treating desperate people as opportunities. There is still time to decide what you will do with that accusation.',
    choices:()=>state.story.lyria === 'freed' ? [
      storyChoice('Ask her to stay as your friend','She settles beside the fire and begins drawing constellations on your map.',{lyriaBond:'friendship'},{ally:'LYRIA'}),
      storyChoice('Choose a romance with Lyria and be honest with Stella','Lyria kisses you after you ask. On your next call you tell Stella that your hopes have changed. She is disappointed if you had promised a date, but grateful you said it plainly.',{lyriaBond:'romance',interest:'friendship'},{partner:'LYRIA',ally:'LYRIA'}),
      storyChoice('Wish her well and continue separately','She gives you directions to the next shrine. Affection does not have to become a claim on someone’s road.',{lyriaBond:'apart'})
    ] : [
      storyChoice('Send an apology and food through the crew','The reply comes a day later: "The food will help someone. Start there."',{atonement:'begun'},{food:-1,evil:-1,reputation:1}),
      storyChoice('Keep the fruit and refuse to apologize','You burn the note. The accusation is harder to get rid of.',{atonement:'refused'},{evil:1})
    ]}],
  ['rook', {id:'nyx',act:'III // THE CITY BELOW THE ROAD',title:'THE THIEF WHO STOLE YOUR SHADOW',kind:'context',region:2,camp:true,
    objective:'Hear Nyx’s offer before entering the winter vault.',
    text:'At the next shelter, your shadow takes one extra step after you stop. A woman laughs from the rafters and tosses down a charm. "Sorry. Habit." Nyx is thirty-one, a human smuggler with copper-brown skin, cropped black hair, and an enchanted coat full of pockets.\n\nShe knows Rook’s supply routes. Beneath the shelter is a vault of medicine and winter rations. Rook stole some of it; refugees entrusted the rest to a neutral keeper. Nyx can open the locks, but she needs someone to distract the keeper.\n\n"We can return the stolen medicine," she says. "Or take everything and never be hungry again." She shares supper while you consider whose hunger that bargain would create.'}],
  ['nyx', {id:'vault',act:'III // THE CITY BELOW THE ROAD',title:'THE WINTER VAULT',region:2,
    objective:'Choose what to take, and whom it will hurt.',
    text:'Inside the vault, every shelf has a name. Nyx finds Rook’s crates behind a forged inventory plate. Beside them are the winter stores of families you have seen on the road. The keeper is unarmed. A silver bell on his desk could summon the guards.\n\nThis is a crime even if you take only Rook’s stock. The question is not whether you can escape. It is whose empty shelf you can live with.',
    choices:[
      storyChoice('Steal back only the marked medicine and return it to its owners','Nyx carries the crates while you leave a copy of Rook’s ledger. The keeper sounds the bell. By dawn, medicine has reached the refugee camps and the guild has issued warrants for both of you.',{vault:'returned'},{ally:'REFUGEE MEDICS',enemy:'VAULT GUILD',item:'ROOK’S LEDGER',supplies:2,reputation:3,sin:'BURGLARY'}),
      storyChoice('Rob every shelf and threaten the keeper into silence','The keeper kneels when you raise your weapon. Nyx looks at the family names on the crates but helps you carry them. You leave rich in supplies and poorer in something harder to count.',{vault:'stolen'},{food:5,supplies:5,crowns:20,evil:3,sin:'ARMED ROBBERY',enemy:'VAULT GUILD'}),
      storyChoice('Expose Rook’s stock and negotiate with the keeper','You show him the false plates. He releases the medicine under a witness’s signature and asks you to testify later. Nyx admits she had forgotten that asking sometimes works.',{vault:'negotiated'},{item:'KEEPER’S WRIT',ally:'VAULT KEEPER',food:2,supplies:2,reputation:2})
    ]}],
  ['account', {id:'nyx_night',act:'III // THE CITY BELOW THE ROAD',title:'NO MORE STOLEN NAMES',region:3,
    objective:'Choose what Nyx becomes to you.',
    text:()=>`Nyx catches up at the north fork. ${state.story.vault === 'stolen' ? 'She says the robbery has been bothering her. "I offered it. You said yes. Neither of us gets to pretend we were only following."' : 'She says the families received the medicine. "I have been called worse things than useful," she says.'}\n\nShe offers to guide you past the guild patrols, then admits the offer is not entirely practical. "I like you. Do not make me pretend this is a business arrangement."`,
    choices:[
      storyChoice('Travel together as friends','Nyx teaches you how to spot a guild checkpoint without teaching you to fear every stranger.',{nyxBond:'friendship'},{ally:'NYX'}),
      storyChoice('Choose Nyx as your lover, ending any other romantic commitment openly','You speak honestly to anyone you had promised a different future. Nyx waits until those conversations are finished before taking your hand. That night, neither of you has to hide whom you are choosing.',{nyxBond:'romance',interest:'friendship'},{partner:'NYX',ally:'NYX'}),
      storyChoice('Refuse her offer and part ways','She returns your shadow charm before leaving. "For once, nothing owed."',{nyxBond:'apart'})
    ]}],
  ['nyx_night', {id:'bellcourt',act:'IV // A DEBT WITH TEETH',title:'THE COURT BENEATH THE ROOTS',region:3,
    objective:'Settle the Bell Court’s claim without losing yourself.',
    text:()=>`Silver moths gather on a door grown into the hillside. Beyond it, the Bell Court keeps memories in glass jars. ${state.story.bell === 'angered' ? 'Its judge recognizes the seal you broke to free Lyria.' : 'Its judge offers to erase every warrant following you.'}\n\nThe price is a soul-bell carried by a sleeping pilgrim. Steal it and bind her shadow to yours, and the Court will shelter your trail. Refuse, and it will let you leave without the bargain. Lyria’s voice comes through the radio relay: "That is a person, not a shortcut."`,
    choices:[
      storyChoice('Refuse the bargain and guide the pilgrim away','The pilgrim wakes before you reach the door. Her name is Edda. She thanks you for asking where she wanted to go. The Court withdraws its offer but lets you pass.',{bell:'refused'},{ally:'EDDA',reputation:2}),
      storyChoice('Steal the soul-bell and bind the pilgrim’s shadow','The bell makes no sound. Your shadow grows a second pair of hands. Edda wakes unable to remember her daughter’s face. The Court calls you clever. Lyria calls you something else.',{bell:'bound',lyriaBond:'broken'},{item:'BOUND SOUL-BELL',evil:4,enemy:'LYRIA',removeAlly:'LYRIA',removeLover:'LYRIA',odds:8}),
      storyChoice('Offer your own happiest memory instead','You leave with a blank space where a summer afternoon used to be. The pilgrim walks free. The Court gives you a quiet road past its watchers.',{bell:'memory'},{item:'COURT PASSAGE',luck:-3,reputation:2})
    ]}],
  ['station', {id:'newbase',act:'IV // THE LAST SAFEHOUSES',title:'MOVE THE LIGHT FORWARD',region:4,
    objective:'Choose your support base for the final approach.',text:'Your old shelter network reaches the weather station by courier. You can keep it or move your supplies to another group for the mountain passage. Nobody loses shelter because you change arrangements. The route board explains exactly what each network provides.',
    choices:[
      storyChoice('Move to the Moss Caravan — forage +1 food, shelter reserve 12','The caravan sends a porter and a box of seedlings. Your next shelter will smell of wet earth.',{}, {base:'MOSS CARAVAN',food:2}),
      storyChoice('Move to Warden Outposts — water use -0.5/day, radiation -0.25/day','A warden replaces your worn filter and marks the last tower caches.',{}, {base:'WARDEN OUTPOSTS',supplies:2}),
      storyChoice('Move to Moon Shrines — shelter healing +6, food use -0.5/day','The shrine keepers forward your bedroll to a quiet refuge above the pass.',{}, {base:'MOON SHRINES'})
    ]}],
  ['silence', {id:'reckoning_road',act:'IV // WHAT FOLLOWS YOU',title:'THE PEOPLE BEHIND THE WARRANTS',region:5,
    objective:'Decide whether to make restitution before Haven.',
    text:()=>`${state.story.vault === 'stolen' ? 'Families from the winter vault reach the shelter with empty packs. One recognizes a stitched name on your stolen sack.' : 'The vault keeper reaches the shelter with his ledger. He records what you took and where it went instead of letting the guild decide the story.'}\n\n${state.story.bell === 'bound' ? 'Edda is with them. She asks you to ring the stolen bell and give her memories back. You could. It would cost you its power.' : 'Edda’s route crosses yours again. She is carrying letters from families already sheltered ahead.'}\n\nStella tells you Haven will receive you, but the people you hurt will also have a voice there. You can begin answering them now.`,
    choices:[
      storyChoice('Return what you can and release any bound shadow','You hand over food and water. If you took the bell, you break its clapper; Edda remembers her daughter and begins to cry. It is repair, not erasure.',{atonement:'returned',bell:'released'},{food:-2,supplies:-2,evil:-2,removeItem:'BOUND SOUL-BELL',reputation:3}),
      storyChoice('Keep your gains and refuse responsibility','You carry the packs into the shelter alone. Nobody attacks you. Their silence stays with you longer than a threat would.',{atonement:'refused'},{evil:1})
    ]}]
];
// Resolve anchors recursively so follow-up scenes stay beside their causes.
function insertExtraBeats(anchor) {
  for (const [after, beat] of extraBeats.filter(([after]) => after === anchor)) {
    const index = campaignBeats.findIndex(entry => entry.id === after);
    campaignBeats.splice(index + 1, 0, beat);
    insertExtraBeats(beat.id);
  }
}
for (const id of campaignBeats.map(beat => beat.id)) insertExtraBeats(id);