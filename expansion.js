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
// Fatal options are signposted in the scene and never replace an existing safe route.
const fatalRoutes = {
  crossing: () => state.story.route === 'ridge' ? {
    warning: 'Above the safe crossing hangs an older bridge. Its anchor bolts are torn out, and a boot still dangles from the snapped handrail. Stella warns you that it cannot carry a person.',
    label: 'Sprint over the broken upper bridge [LETHAL RISK]', title: 'THE LAST STEP',
    text: 'The first boards hold. The sixth turns under your heel. Both anchor cables tear free, and the bridge folds around you like a closing hand. You strike the ravine wall before the river takes you.\n\nYour radio catches on a root above the water. Stella keeps asking you to answer long after the current has carried you out of sight.'
  } : {
    warning: 'A red wheel bypasses the pump sequence. A crushed maintenance helmet is wedged beneath it. The plate reads: FULL PRESSURE — EVACUATE CHAMBER BEFORE OPENING.',
    label: 'Open the pressure bypass while standing in the chamber [LETHAL RISK]', title: 'UNDER PRESSURE',
    text: 'The wheel gives you half a turn before the pipe splits. The jet drives you into the iron grate hard enough to break your ribs. Water fills the room before you can draw another breath.\n\nAbove the chamber, the indicator changes from red to green. The machine has completed its cycle. It has no way to know what it cost.'
  },
  lyria: () => ({
    warning: 'The orchard’s hollow trunk smells of copper. Lyria warns you that the spirit feeds on anyone who climbs inside without a release contract. Bones are caught between its roots.',
    label: 'Climb into the hollow trunk and seize its heart [LETHAL RISK]', title: 'A PLACE IN THE ORCHARD',
    text: 'The trunk closes behind your shoulders. Roots pierce your coat and tighten beneath your ribs, lifting you until your feet leave the ground. You try to scream; the tree fills your mouth with white blossoms.\n\nBy morning a new branch leans over the path. It carries your radio, still whispering directions to Haven.'
  }),
  transformation: () => ({
    warning: 'A fourth reflection lies beneath the others with no face. The keeper covers it with a black cloth. "That is not a race. It is the pool’s hunger. Do not give it your name."',
    label: 'Give your true name to the faceless reflection [LETHAL RISK]', title: 'THE PERSON WHO WAS NOT THERE',
    text: 'The reflection smiles with the mouth you have just lost. Your hands become translucent, then the steps behind them do too. The keeper grabs your sleeve and comes away holding an empty coat.\n\nAt Haven, Stella reaches for the microphone and forgets whom she meant to call. Only your handwriting remains on the route map: almost home.'
  }),
  vault: () => ({
    warning: 'Nyx points to a jeweled reliquary apart from the supplies. Its lid is wired to a spring-loaded ward. "Touch the crates if you must. Do not touch that latch. There is no disarming it from this side."',
    label: 'Pry open the warded reliquary for its jewels [LETHAL RISK]', title: 'THE VAULT COLLECTS',
    text: 'The latch clicks softly. Steel needles punch through your hands and pin them to the lid. A second spring drives a blade up beneath your jaw. The jewels spill across the floor while you collapse against the box.\n\nNyx cannot reach the release. She takes your radio before the guards arrive, so Stella will hear the truth from someone who knew your name.'
  }),
  bellcourt: () => ({
    warning: 'An empty throne stands behind the judge. Its silver arms end in hooks, and something beneath the cushion is breathing. The pilgrim whispers that mortals who sit there become the Court’s next meal.',
    label: 'Sit on the empty throne and claim the Court [LETHAL RISK]', title: 'THE GUEST OF HONOR',
    text: 'The throne accepts your weight. Its silver arms close around your wrists, and the cushion opens into a ring of teeth. The Court rises in perfect silence as the seat pulls you down.\n\nThe judge rings a little bell. When the next traveler enters, the throne is empty again.'
  }),
  rook: () => ({
    warning: 'Rook’s truck has a second wire running from its ignition to a fuel can beneath the seat. He keeps one hand on a remote switch. Stella tells you quietly to let him disconnect it before you go near the cab.',
    label: 'Rush the wired truck and turn the ignition yourself [LETHAL RISK]', title: 'THE WHITE ARROWS',
    text: 'The engine turns once. Then the fuel beneath the seat flashes white. Heat slams the breath from your chest as the windshield bursts outward. You never reach the door handle.\n\nRook waits for the fire to settle before painting a fresh arrow toward the checkpoint. Your private channel remains silent.'
  }),
  lastmile: () => ({
    warning: 'Beyond the marked route, a thin snow shelf seems to lead straight into the valley. A guide flashes a red lamp at it. Through a crack you can see open air beneath the snow.',
    label: 'Ignore the red lamp and run across the snow shelf [LETHAL RISK]', title: 'WITH HAVEN IN SIGHT',
    text: 'For three steps you can see the orchards. On the fourth, the entire shelf breaks loose. Snow and stone carry you into the ravine, burying your shout beneath the avalanche.\n\nAt the rescue lodge, Stella has set aside a clean blanket with your name on it. The guide who returns without you cannot make himself hand it back.'
  })
};
for (const [id, build] of Object.entries(fatalRoutes)) {
  const beat = campaignBeats.find(scene => scene.id === id);
  const originalText = beat.text;
  const originalChoices = beat.choices;
  beat.text = () => `${typeof originalText === 'function' ? originalText() : originalText}\n\n${build().warning}`;
  beat.choices = () => {
    const fatal = build();
    return [...(typeof originalChoices === 'function' ? originalChoices() : originalChoices), storyChoice(fatal.label, fatal.text, {}, { death: { title: fatal.title, text: fatal.text } })];
  };
}
const matureBeats = [
  ['lyria_night', {
    id:'lyria_lantern',act:'II // AFTER THE FIRE',title:'THE LANTERN LEFT OUTSIDE',region:2,
    objective:'Choose how to spend the quiet hours at the shrine.',
    text:()=>state.story.partner === 'LYRIA'
      ? 'Lyria finds you drying your coat outside the guest room. Without the armor and sharp jokes, she looks tired. "I have spent years leaving before anyone can ask me to stay," she says. "Tonight I would like to try something else."\n\nShe kisses you, then rests her forehead against yours. For a moment the road feels very far away. "Would you like to stay?" The question is simple. The courage it takes her to ask is not.'
      : 'You pass a shrine room where two travelers are dancing to a cracked music box. One laughs against the other’s shoulder. They close the curtain, and you continue toward the fire.\n\nAfter so many frightened nights, the sight of people choosing tenderness feels almost defiant. A keeper pours you tea and asks which ordinary pleasure you miss most.',
    choices:()=>state.story.partner === 'LYRIA' ? [
      storyChoice('Stay with her and close the door','You say yes. Lyria leaves the lantern outside and draws you into a kiss. The door closes on the cold corridor.\n\nIn the morning she has stolen most of the blanket. You discover that her apologies are much less convincing when she is laughing.',{lyriaIntimacy:'shared'}),
      storyChoice('Tell her you want to take things slowly','"Then slowly." She kisses your cheek and walks you to your room. The next morning she meets you with the same warmth. Nothing has been withdrawn.',{lyriaIntimacy:'slow'})
    ] : [storyChoice('Remember something you want in a peaceful life','You describe an ordinary morning without fear. The keeper listens as if that is a perfectly reasonable thing to want.',{quietHope:true})]
  }],
  ['falsehaven', {
    id:'hollow_broadcast',act:'III // THE VOICES AFTER MIDNIGHT',title:'DO NOT ANSWER YOURSELF',region:2,
    objective:'Decide what to do with the voice outside the shelter.',
    text:'At 2:13 a.m., someone knocks on the shelter door. They ask to be let in using your voice. Then Stella’s. Then the voice of someone you buried years ago.\n\nThrough the letter slot you see a bare foot bent backward at the ankle. The thing above it is trying to stand the way people stand. Your radio displays an old rescue warning: HOLLOW ECHO. COPIES THE LIVING. CANNOT COPY A NEW ANSWER.\n\n"It is so cold," your own voice says. "Why would you leave yourself out here?"',
    choices:[
      storyChoice('Ask what you told Stella on the private channel','The thing repeats the question. Its voice stretches into the shriek of feedback, then drops away. At dawn you find wet handprints on the door, each with one finger too many.\n\nYou copy the warning into the shelter log so the next traveler will know.',{echo:'tested'},{item:'HOLLOW ECHO WARNING'}),
      storyChoice('Keep the door barred and wait for dawn','You sit against the door until the voices stop. The last one is a child asking for its mother. You know what is making it. Knowing does not make the night easier.\n\nAt dawn the threshold is empty, but you cannot bring yourself to remove the bar for another hour.',{echo:'waited'})
    ]
  }],
  ['nyx_night', {
    id:'nyx_rooftop',act:'III // WITHOUT THE MASK',title:'THE ROOM SHE PAID FOR',region:3,
    objective:'Spend an evening with Nyx, or find your own quiet.',
    text:()=>state.story.partner === 'NYX'
      ? 'Nyx has rented a room above the shelter kitchen. "Paid for it," she says, holding up the receipt. "I thought you might appreciate the novelty." There are two cups on the table and an actual lock on the door.\n\nShe reaches for a joke, then stops. "I can flirt with a stranger without feeling a damn thing. This is different. It scares me." She takes your hand and waits for you to answer.'
      : 'From the shelter roof, you watch lamplight move behind the windows of a distant inn. Somewhere a couple is arguing. Somewhere else people are laughing too loudly.\n\nFor once the noise is not a warning. You stay long enough to remember that survival used to include evenings with nothing important to do.',
    choices:()=>state.story.partner === 'NYX' ? [
      storyChoice('Tell her she does not have to perform; stay the night','You tell her the truth about being frightened too. The kiss that follows has none of her practiced bravado. She turns the key, and the rest of the world can wait outside.\n\nAt breakfast she is still there. You realize that, for Nyx, staying may have been the bravest part.',{nyxIntimacy:'shared'}),
      storyChoice('Ask for conversation tonight, without rushing further','Nyx puts the key on the table. You talk until the kitchen below begins making breakfast. She tells you her real surname and makes you promise not to use it when she is trying to sound dangerous.',{nyxIntimacy:'slow'})
    ] : [storyChoice('Let yourself enjoy an uneventful evening','You return to your bunk rested in a way that sleep alone has not managed.',{quietEvening:true})]
  }],
  ['bellcourt', {
    id:'bone_procession',act:'IV // THE THINGS WE CARRY',title:'THE PROCESSION OF BORROWED FACES',region:3,
    objective:'Decide whether to help someone trapped in the Court’s aftermath.',
    text:()=>`At the next waystation, a procession crosses the road without footsteps. Its mourners wear faces stitched from pale scraps. Beneath the cloth, something clicks against their teeth.\n\n${state.story.bell === 'bound' ? 'Your stolen soul-bell trembles. One mourner turns toward you with Edda’s missing memories shining behind its eyes.' : 'A mourner turns toward you. Beneath its borrowed face, you recognize the eyes of the vault’s night porter.'}\n\nHe has been made to carry a coffin that is growing into his arms. A route marker says the procession must release anyone whose living name is spoken at the wayside lamp. He mouths his name: Abel.`,
    choices:[
      storyChoice('Speak Abel’s name beside the lamp','The stitches pull tight, then split. The coffin falls away with a sound like snapping branches. Abel drops to his knees, his arms striped with raw seams where the wood held him.\n\nYou wrap the wounds. He cannot explain what happened inside the procession. He asks you never to let anyone put a mask on him again.',{procession:'helped'},{ally:'ABEL',food:-.5,reputation:1}),
      storyChoice('Wait behind the marker until the procession passes','You keep your eyes on the lamp. The porter’s lips continue forming his name until the procession disappears into the trees.\n\nLater you leave his name in the rescue log. It is less than he asked of you. You know that.',{procession:'passed'})
    ]
  }],
  ['promise', {
    id:'stella_evening',act:'V // BEFORE AN ORDINARY MORNING',title:'NO VOICES BETWEEN YOU',region:6,
    objective:'Spend the final lodge evening with the person you chose.',
    text:()=>state.story.partner === 'STELLA'
      ? 'Stella finishes her shift and finds you beside the lodge stove. For months you knew her through static. Now you notice the way she presses her lips together when she is nervous.\n\n"I used to imagine what I would say when you were here," she says. "None of it sounded this awkward." You kiss her, and she laughs softly against your cheek. She asks whether you would like to stay with her tonight. There is no urgency in the question. You finally have time.'
      : state.story.partner
        ? `You spend the evening with ${state.story.partner === 'LYRIA' ? 'Lyria' : 'Nyx'} while the lodge settles around you. Stella stops by to confirm the morning escort, then wishes you both a good night. Nobody needs you to prove anything before you are allowed to rest.`
        : 'Stella joins you beside the stove with two mugs. You talk about the absurd little things you want from Haven: clean socks, a door that locks, a whole afternoon to waste. When she leaves, the room feels peaceful rather than empty.',
    choices:()=>state.story.partner === 'STELLA' ? [
      storyChoice('Stay with Stella','You tell her you want to. She takes your hand and leads you upstairs; the radio stays on its hook. The door closes, and the night belongs to the two of you.\n\nIn the morning she wakes before you and opens the curtains. "Still here," she says when you stir. You have never heard a better promise.',{stellaIntimacy:'shared'}),
      storyChoice('Tell her you would rather wait until you have settled','"Then we wait." She kisses you goodnight and gives you the extra blanket she brought. At breakfast there is a place beside her, just as there would have been otherwise.',{stellaIntimacy:'slow'})
    ] : [storyChoice('Rest and look forward to the morning','For once, you do not fall asleep listening for footsteps. Haven is one escorted descent away.',{lastNight:'rested'})]
  }]
];
for (const [anchor, beat] of matureBeats) {
  const index = campaignBeats.findIndex(scene => scene.id === anchor);
  campaignBeats.splice(index + 1, 0, beat);
}