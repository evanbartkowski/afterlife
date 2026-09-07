// Haven is a real sanctuary. The mystery is how to reach it and whom to bring.
const storyChoice = (label, result, story = {}, effects = {}, health = 0) =>
  [label, 0, 0, health, 0, result, { ...effects, story }];
const campaignBeats = [
  { id: 'signal', act: 'I // SOMEONE IS LISTENING', title: 'A VOICE THROUGH THE STATIC', kind: 'radio', day: 1, region: 0,
    objective: 'Find the green milepost and restore two-way radio contact.',
    radio: 'HAVEN / 88.3 // At the green milepost, follow the river upstream. Do not follow the white arrows.',
    clue: 'GREEN MILEPOST',
    text: 'The last settlement on your map burned three nights ago. You have enough supplies to keep moving, but nowhere left to go. Then a woman interrupts the static.\n\n"My name is Stella. I am broadcasting from Haven. We have clean water, gardens, a clinic. You can sleep here without taking turns on watch." She pauses as if she knows how impossible that sounds. "The mountain passage closes with the hundred-day ash front. If you can hear me, find the green milepost. We will bring you home."\n\nYour transmitter is broken. You write down every word anyway.', effects: { item: 'DAMAGED RADIO', supplies: 3, food: 3 } },
  { id: 'repair', act: 'I // SOMEONE IS LISTENING', title: 'THE LAST BATTERY', region: 0,
    objective: 'Repair your radio and answer Stella.',
    text: 'At the milepost, a maintenance shed contains one working battery. Beside it, a stranded courier named Ellis is trying to start a heater for his injured sister, June. Both are adults. He catches you looking at the battery.\n\n"Take it and you get your radio," he says. "Stay and help me splice the cable, and maybe we both get what we need." The work will keep you here after dark.',
    choices: [
      storyChoice('Repair the heater together, then split the power', 'June sleeps while Ellis helps solder your transmitter. At midnight Stella answers. "There you are. I was starting to worry." You tell her about the people beside you.', { courier: 'helped', honesty: 'open' }, { item: 'WORKING RADIO', ally: 'ELLIS AND JUNE', supplies: 2 }, -2),
      storyChoice('Trade your medicine for the battery', 'Ellis accepts. June needs the medicine more than warmth. You leave them the shed and call Stella from the riverbank. You tell her exactly what the trade cost.', { courier: 'traded', honesty: 'open' }, { item: 'WORKING RADIO' }, -3),
      storyChoice('Take the battery and tell Stella the shed was empty', 'Ellis does not fight you while June is helpless. Stella welcomes your signal. When she asks if anyone else needs help, you say no. The lie is easy to hear in the silence afterward.', { courier: 'abandoned', honesty: 'lie' }, { item: 'WORKING RADIO', reputation: -3 })
    ], journey: true },
  { id: 'portrait', act: 'I // SOMEONE IS LISTENING', title: 'THE WOMAN IN THE TRANSMISSION', kind: 'radio', day: 12, region: 0, camp: true,
    objective: 'Locate Saint Agnes bell tower for the next bearing.',
    radio: 'STELLA / VERIFIED // Saint Agnes has no cross. Count three bells, then look beneath the western stair.', clue: 'THREE BELLS / WESTERN STAIR',
    text: 'Twelve days of following the river bring you to a ranger hut stocked by Haven’s search crews. Stella talks you through the water filter while the radio slowly reconstructs a photograph.\n\nShe is twenty-nine, a strikingly beautiful woman with dark curls, warm brown eyes, and a small scar through one eyebrow. In the picture she is laughing at something outside the frame. "My neighbor took that after I dropped an entire birthday cake," she says. "Please do not build a mysterious legend around me."\n\nHer mother helped establish Haven after the evacuations. Stella maintains its rescue radio now. She describes a town built above a clean aquifer, protected by the mountains, where everyone receives a room and medical care. She gives you the next clue in pieces: raiders listen to the open frequencies too.' },
  { id: 'bells', act: 'II // A MAP MADE OF VOICES', title: 'UNDER THE WESTERN STAIR', region: 1,
    objective: 'Choose which route clue to recover.',
    text: 'Saint Agnes has three bells and an empty socket where its cross once stood. Beneath the western stair is a survey box. Its map has split into two legible halves: a high ridge marked with sun symbols, and an old aqueduct marked with blue tiles.\n\nStella explains the difference. The ridge is exposed but still has working signal mirrors. The aqueduct is sheltered, but someone must restart its pumps. Neither route reaches Haven by itself; each leads to the weather station where its final approach can be found.',
    choices: [
      storyChoice('Take the ridge survey and follow the sun mirrors', 'You mark the first mirror on your map. Stella teaches you Haven’s reflection code: two flashes, pause, one. For the first time the distance ahead has a shape.', { route: 'ridge' }, { item: 'SUN MIRROR SURVEY', supplies: 2 }),
      storyChoice('Take the aqueduct plan and follow the blue tiles', 'You copy the pump sequence: four, one, three. Stella repeats it until you can say it without looking. "If the water rises, leave the tools. I need you alive."', { route: 'aqueduct' }, { item: 'BLUE TILE PLAN', supplies: 2 })
    ] },
  { id: 'crossing', act: 'II // A MAP MADE OF VOICES', title: 'THE ROUTE YOU CHOSE', region: 1,
    objective: 'Recover a weather-station coordinate from your chosen route.',
    text: () => state.story.route === 'ridge'
      ? 'The ridge mirror stands above a broken suspension bridge. Its brass backing holds a coordinate, but the frame is turning in the wind. Below you, three travelers shelter beside a collapsed support. You can repair their crossing and reach the mirror together, or crawl across the maintenance cable alone.'
      : 'The aqueduct ends at a flooded pump house. Behind its blue tiles is the coordinate you need. Three travelers are stranded on a service platform. Running the pumps slowly will rescue them; an emergency flush will reveal the inscription quickly but destroy their packs.',
    choices: () => state.story.route === 'ridge' ? [
      storyChoice('Repair the bridge with the travelers', 'Together you brace the crossing and rotate the mirror. The beam strikes a marker: WEATHER STATION 6 / NORTH FORK. Your new companions promise to pass the route onward.', { passage: 'helped' }, { item: 'WEATHER STATION COORDINATE', ally: 'RIDGE TRAVELERS', reputation: 3 }, -2),
      storyChoice('Cross the cable alone and copy the coordinate', 'Your palms bleed around the cable. WEATHER STATION 6 / NORTH FORK is scratched beneath the mirror. You radio the location of the stranded travelers to Stella before continuing.', { passage: 'alone' }, { item: 'WEATHER STATION COORDINATE' }, -5)
    ] : [
      storyChoice('Restart the pumps slowly and rescue the travelers', 'Four, one, three. The machinery catches. The travelers reach dry ground, and the tiles reveal WEATHER STATION 6 / NORTH FORK. They share the food they thought they would lose.', { passage: 'helped' }, { item: 'WEATHER STATION COORDINATE', ally: 'AQUEDUCT TRAVELERS', food: 3, reputation: 3 }, -2),
      storyChoice('Flush the chamber and recover the coordinate', 'The inscription appears as the water falls. The travelers survive on the platform, but their packs vanish into the drain. You send their position to Stella. They will need another rescue.', { passage: 'alone' }, { item: 'WEATHER STATION COORDINATE', reputation: -2 })
    ], journey: true },
  { id: 'nightwatch', act: 'II // A MAP MADE OF VOICES', title: 'THE HOUR THAT BELONGS TO YOU', kind: 'radio', day: 26, region: 2, camp: true,
    objective: 'Rest at the relay shelter and get to know Stella.',
    radio: 'STELLA / NIGHT CHANNEL // No directions tonight. Tell me something you want to do when you are safe.',
    text: () => `The relay shelter has dry bunks and a stocked emergency cupboard. Outside, rain takes the dust off the road. Stella stays on the private channel after her shift. You hear a kettle, then music played softly enough not to wake her neighbors.\n\n${state.story.passage === 'helped' ? '"The travelers you helped called in," she says. "I wish you could have heard them describing you."' : '"A search crew has the travelers’ position," she says. "Thank you for sending it. I wish they could have kept walking with you."'}\n\nShe tells you that she once waited for a fiancé who never returned from a supply run. It was four years ago. "I do not want a replacement for him. I want a life that is still allowed to begin." You tell her what the silence on your side of the radio has been like.` },
  { id: 'connection', act: 'II // A MAP MADE OF VOICES', title: 'MORE THAN A CALL SIGN', region: 2,
    objective: 'Tell Stella what you hope to find between you.',
    text: '"I look forward to your calls," Stella says. "Not just the part where you tell me you are alive." She laughs at herself, suddenly less certain than the voice that guides you through storms.\n\nYou have never stood in the same room. Neither of you wants to mistake rescue for a promise. But there is room to say what you hope for.',
    choices: [
      storyChoice('Tell her you would like a real date when you reach Haven', '"A walk by the orchard," she says. "If we both still want it when you get here." The possibility changes the sound of the empty room.', { interest: 'romance' }, { luck: 3 }),
      storyChoice('Tell her you want her friendship', '"Then you have it." She tells you the terrible joke she had been saving for the end of your call. You laugh hard enough to wake the shelter’s other guests.', { interest: 'friendship' }, { luck: 2 }),
      storyChoice('Keep things professional until you have met', '"Fair." There is no punishment in her voice. She checks tomorrow’s weather and tells you to sleep. You are allowed to accept help without offering intimacy.', { interest: 'guarded' })
    ] },
  { id: 'falsehaven', act: 'III // NOT EVERY LIGHT IS HOME', title: 'A SECOND STELLA', kind: 'radio', day: 40, region: 2, camp: true,
    objective: 'Verify the new broadcast before changing course.',
    radio: 'UNVERIFIED / 88.3 // This is Stella. The route has changed. Follow the white arrows to the motorway.',
    text: 'During two weeks of travel, Stella’s check-ins become a measure of the days. At the next aid shelter, your radio catches her voice telling you to abandon the north fork. The message repeats with precisely the same breath in the same place.\n\nThen your private channel crackles. "That recording is not me. Someone stole our welcome tape." The motorway arrows were the first thing she warned you about. A broker named Rook has built a camp beneath a white-painted overpass. His guards offer food to anyone who will surrender their radio.\n\nEllis’s call sign appears in Rook’s traffic log. Whatever happened at the shed, the courier has crossed his path.' },
  { id: 'rook', act: 'III // NOT EVERY LIGHT IS HOME', title: 'THE BROKER’S PRICE', region: 2,
    objective: 'Get past Rook without exposing Haven’s private channel.',
    text: () => `Rook meets you outside his camp. He has been selling false directions, then charging people to leave. "Give me your private frequency," he says, "and I give you a truck to the weather station."\n\n${state.story.courier === 'helped' ? 'Ellis slips you a note while Rook talks: THE SIDE GATE IS UNLOCKED. He remembers the heater.' : state.story.courier === 'traded' ? 'Ellis is repairing a truck under guard. He recognizes you and mouths: DO NOT TRUST HIM.' : 'Ellis is repairing a truck under guard. He recognizes you immediately. "Ask your friend on the radio what you did to June," he says.'}\n\nRook already knows your name. The frequency would let him listen to every rescue Stella coordinates.`,
    choices: [
      storyChoice('Refuse and help Ellis open the camp’s side gate', 'Ellis cuts the lock while you distract the guards. People leave in small groups. You escape on foot with a stolen cache chart. Stella moves a rescue crew to the north fork.', { channel: 'protected' }, { item: 'NORTH FORK CACHE CHART', reputation: 4 }, -4),
      storyChoice('Give him the channel, take the truck, then warn Stella', 'The truck gets you past the checkpoint. Stella switches frequencies, but several other travelers miss the change. "Tell me before you gamble with their safety next time." She gives you a new code anyway.', { channel: 'sold' }, { item: 'NORTH FORK CACHE CHART', reputation: -4, supplies: 3 }),
      storyChoice('Offer your supplies instead and walk away', 'Rook takes payment for a cache chart. You keep the frequency private and send Stella the camp’s location. Ellis remains behind until her crew can reach him.', { channel: 'bought' }, { item: 'NORTH FORK CACHE CHART', supplies: -2 })
    ], journey: true },
  { id: 'truth', act: 'III // NOT EVERY LIGHT IS HOME', title: 'WHAT THE RADIO CARRIES', kind: 'radio', day: 55, region: 3, camp: true,
    objective: 'Repair trust and authenticate the weather-station signal.',
    radio: 'STELLA / NEW CODE // Ask what happened to the cake. A recording cannot answer a new question.', clue: 'AUTHENTICATION / THE BIRTHDAY CAKE',
    text: () => `At a hidden supply cache, you finally hear from Stella without Rook’s transmitters drowning her out. Ellis and June have reached a rescue team. Their account of the shed matches ${state.story.honesty === 'lie' ? 'everything except what you told her. "You left them there and lied to me," she says. "I will still guide you. Whether I trust you is another question."' : 'what you told her. "I am glad you let me know who I was talking to," she says.'}\n\n${state.story.channel === 'sold' ? 'Her team has recovered the travelers who missed the frequency change. One has a broken leg. You hear the exhaustion in her voice when she tells you.' : 'The private channel is intact. Families use it to tell one another where they are. Keeping it safe has helped people you will never meet.'}\n\nStella asks you a question no stolen recording could answer. You ask her about the photograph. "The cake was lemon. I ate some off the floor." Her laugh returns, briefly. This is the voice you have been following.` },
  { id: 'account', act: 'III // NOT EVERY LIGHT IS HOME', title: 'AN ANSWER WITHOUT STATIC', region: 3,
    objective: 'Choose what kind of honesty to offer Stella.',
    text: 'Stella does not ask for an apology designed to make her comfort you. "Tell me what you will do differently," she says. "Or tell me you do not think you should. I need the truth more than the right words."\n\nOutside the cache, the north fork divides again. You can still hear Rook’s stolen welcome tape in the distance. This conversation is not a gate admission test. Stella has already promised to bring you somewhere safe.',
    choices: [
      storyChoice('Give her the full account and offer to help the next rescue', 'You name your decisions without asking her to excuse them. "All right," she says. "Start with the next person." She gives you the weather-station access phrase.', { accountability: 'accepted' }, { item: 'WEATHER STATION ACCESS PHRASE', reputation: 2 }),
      storyChoice('Say survival comes first and keep the relationship practical', '"I understand surviving," Stella says. "I do not have to agree with everything done in its name." She gives you the access phrase, but the late-night calls stop.', { accountability: 'refused', interest: 'guarded' }, { item: 'WEATHER STATION ACCESS PHRASE' })
    ] },
  { id: 'station', act: 'IV // THE VALLEY ON THE MAP', title: 'PROOF OF A PLACE', kind: 'discovery', day: 70, region: 4, camp: true,
    objective: 'Decode Haven’s entrance bearing from the weather station.',
    radio: 'HAVEN / WEATHER DESK // The ridge of three teeth points to the valley. Walk toward the tooth whose shadow splits at noon.', clue: 'THREE TEETH / SPLIT SHADOW AT NOON',
    text: () => `The coordinate from the ${state.story.route === 'ridge' ? 'sun mirror' : 'blue tiles'} and the access phrase open Weather Station 6. Its camera shows a valley hidden behind a mountain ridge: greenhouses, white washing on a line, a woman cycling beside a stream. This is a live feed. You ask Stella to wave from the radio-room window. A small figure leans out and waves both arms.\n\nHaven is real. There is no secret price for its clean water. Its search crews conceal the approach because Rook’s kind follow vulnerable people home.\n\nYou overlay the survey with the camera bearing. Three tooth-shaped peaks fill the horizon. At noon the middle peak casts a forked shadow toward an old railway tunnel. That is the entrance route. The station cupboard holds enough food for the climb.` },
  { id: 'convoy', act: 'IV // THE VALLEY ON THE MAP', title: 'PEOPLE AT THE FOOT OF THE MOUNTAIN', region: 4,
    objective: 'Decide how to use your verified route to Haven.',
    text: 'Below the weather station, a group of refugees waits beside a broken bus. Their radio still plays Rook’s recording. You recognize June among them. Her recovery has been slow. A medic called Nadi is rationing the last dressings.\n\nYou have a real bearing now. Stella can receive a convoy, but the climb will take coordination. Broadcasting the route openly would also let Rook follow it.',
    choices: [
      storyChoice('Lead the refugees and keep the route on the private channel', 'Nadi helps divide the packs. June is given a place on a stretcher team. You send Stella a headcount instead of coordinates. "We are making beds," she answers.', { convoy: 'led' }, { ally: 'NADI AND THE CONVOY', reputation: 5, food: 2 }, -2),
      storyChoice('Send their position to Stella and scout ahead alone', 'Stella dispatches guides. You leave the bearing sealed with Nadi, then go ahead to mark hazards. You are not traveling with the group, but you have not left them without a way forward.', { convoy: 'scouted' }, { reputation: 2 }),
      storyChoice('Broadcast the entrance bearing to everyone', 'Replies flood the band: relief, disbelief, requests for help. Then you hear Rook’s transmitter repeat the bearing. Stella moves the reception point into a guarded outer shelter before anyone reaches the valley.', { convoy: 'broadcast' }, { reputation: -2 })
    ], journey: true },
  { id: 'silence', act: 'IV // THE VALLEY ON THE MAP', title: 'WHEN SHE DOES NOT ANSWER', kind: 'event', day: 84, region: 5, camp: true,
    objective: 'Use your collected clues while Stella’s transmitter is down.',
    text: 'The mountain storm takes Stella’s voice away. For three days, there is only static. You climb between abandoned signal posts, afraid to imagine the radio room empty.\n\nAt an emergency shelter you find a handwritten message from a Haven guide: CENTRAL TRANSMITTER DAMAGED. TOWN SAFE. CONTINUE BY VERIFIED MARKERS. There is food, a working stove, and a list of arrivals already expected. Your name is on it.\n\nThe clues still fit: the forked shadow points to the tunnel, and two flashes, pause, one is the answer a real guide will give. Stella has spent eighty days teaching you enough to reach her even when she cannot speak.' },
  { id: 'lastmile', act: 'V // THE DOOR THAT OPENS', title: 'THE LAST SIGNAL FIRE', region: 5,
    objective: 'Choose how to cross the final pass.',
    text: () => `${state.story.convoy === 'led' ? 'Your convoy reaches the final pass together. June’s stretcher team needs a rest.' : state.story.convoy === 'broadcast' ? 'Travelers following your broadcast crowd the final pass. Haven’s guides are checking each group; Rook’s scouts have been turned back without a shot.' : 'From above the pass you see Haven’s guides bringing Nadi’s group along your markers.'}\n\nAcross the ravine, a lamp flashes twice, pauses, then flashes once. Beneath you is a short maintenance tunnel. The longer marked path leads to a rescue shelter where you can coordinate the crossing. Both lead toward Haven.`,
    choices: [
      storyChoice('Hold the signal fire until the last group crosses', 'You feed the fire and answer the lamp until every visible group reaches the shelter. It costs you a cold, sleepless night. In the morning a guide takes your pack without asking.', { arrival: 'together' }, { reputation: 4 }, -3),
      storyChoice('Mark the tunnel and scout its exit', 'You follow the maintenance tunnel, chalking every turn. At its exit you find a Haven guide waiting with a thermos. Your marked shortcut lets the next group avoid the exposed ridge.', { arrival: 'scout' }, { reputation: 2 }, -2),
      storyChoice('Reach the rescue shelter and let the guides take over', 'You give the guides your observations and finally sit down. Professionals take over the crossing. Accepting help feels strange after so long being responsible for yourself.', { arrival: 'rest' }, {}, 2)
    ] },
  { id: 'meeting', act: 'V // THE DOOR THAT OPENS', title: 'STELLA, WITHOUT THE STATIC', kind: 'context', day: 96, region: 6, camp: true,
    objective: 'Meet Stella at Haven’s outer rescue lodge.',
    radio: 'STELLA / HANDHELD // I am at the lodge. You do not have to describe yourself. I know your voice.',
    text: () => `At the outer lodge, someone calls your name. Stella has come out from Haven with its medical team. She is even more beautiful in motion than in the slow radio photograph: windblown curls, tired eyes brightening when she sees you, a smile she cannot quite keep steady. Then she trips over a supply crate and the solemn moment breaks into laughter.\n\n${stellaTrustScore() >= 2 ? '"I kept imagining this," she says. She asks before embracing you. For a moment you can feel how frightened she has been for someone she had never touched.' : '"You made it." Her welcome is sincere, even with the distance between you. She hands you a warm cup and introduces you to the medics.'}\n\nThe last four days will be a sheltered descent with Haven’s guides. The lodge is safe. The valley beyond is safer. Nobody asks you to earn either one.` },
  { id: 'promise', act: 'V // THE DOOR THAT OPENS', title: 'WHAT COMES AFTER RESCUE', region: 6,
    objective: 'Decide what you and Stella become in Haven.',
    text: () => state.story.interest === 'romance' && stellaTrustScore() >= 2
      ? 'After your medical check, Stella finds you on the lodge porch. "I still want that orchard walk," she says. "But you get to arrive first. A home, a meal, time to choose. I am not the price of any of it." She takes your hand when you offer it. This is the first promise you can make without a radio between you.'
      : 'Stella joins you on the lodge porch. You talk about the difference between knowing a voice and knowing a person. She wants you safe and settled. What grows afterward will have to be chosen freely, without the pressure of the road.',
    choices: () => {
      const choices = [
        storyChoice('Ask her to be part of your life as a close friend', '"Gladly." Stella promises to show you the town’s worst bakery and best swimming spot. You have found someone who knows where you have been and still wants to hear what happens next.', { bond: 'friendship' }, { ally: 'STELLA', removeLover: 'STELLA' }),
        storyChoice('Thank her and ask for space to start over independently', 'She understands. "My door is open. You decide when to knock." The relief is not having to make your entire future fit inside one relationship.', { bond: 'independent' }, { removeLover: 'STELLA' })
      ];
      if (state.story.partner && state.story.partner !== 'STELLA') choices[0] = storyChoice('Keep your commitment to ' + state.story.partner + ' and welcome Stella as a friend', 'Stella respects your relationship. She offers friendship without asking you to choose between kindness and loyalty.', {bond:'friendship'}, {ally:'STELLA'});
      if (!state.story.partner && state.story.interest === 'romance' && stellaTrustScore() >= 2) choices.unshift(storyChoice('Tell her you want that date; kiss her when she leans closer', 'She smiles, asks "May I?", and you say yes. The kiss is quiet and a little awkward, followed by laughter. Tomorrow you will keep walking. After that, there can be ordinary days together.', { bond: 'romance' }, { ally: 'STELLA', lover: 'STELLA', luck: 3 }));
      return choices;
    } },
  { id: 'morning', act: 'EPILOGUE // DAY 100', title: 'HAVEN', kind: 'ending', day: 100, region: 7,
    objective: 'Enter a place where you can finally live in peace.', text: () => campaignEpilogue() }
];

function stellaTrustScore() {
  const s = state.story;
  return Number(s.honesty === 'open') + Number(s.passage === 'helped') + Number(s.channel !== 'sold') + Number(s.accountability === 'accepted');
}
function campaignEndingTitle() {
  if (state.story.partner === 'LYRIA') return 'AN ORCHARD UNDER TWO MOONS';
  if (state.story.partner === 'NYX') return 'NOTHING LEFT TO STEAL';
  if (state.story.bond === 'romance') return 'A HOME WITH STELLA';
  if (state.story.convoy === 'led' && state.story.arrival === 'together') return 'THE PEOPLE YOU BROUGHT HOME';
  if (state.story.arrival === 'scout') return 'THE KEEPER OF THE ROAD';
  return state.story.bond === 'friendship' ? 'A FRIEND BEYOND THE STATIC' : 'A ROOM OF YOUR OWN';
}
function campaignEpilogue() {
  const s = state.story;
  const paragraphs = ['DAY 100. The trees part and Haven lies below you: orchards, a clear stream, roofs patched in bright colors. The gate is open. Beyond it, a child is learning to ride a bicycle while someone argues cheerfully about bread. You wait for the hidden cruelty, the price, the alarm. None comes.\n\nThe clinic treats you. A steward gives you a room and a key. The mountains shelter the valley from the ash front; the wells run clean. Nobody makes you stand watch before you sleep. Haven is the peace Stella promised.'];
  if (s.convoy === 'led') paragraphs.push(s.arrival === 'together' ? 'Nadi, June, and the convoy enter beside you. That evening, the people you brought home fill a long table. They ask you to help welcome the next arrivals once you have rested. For the first time, being needed does not mean being in danger.' : 'Nadi’s convoy arrives with the guides. June finds you in the dining hall and places a flower from the roadside beside your bowl. You helped turn a rumor into a home for more than yourself.');
  else if (s.convoy === 'broadcast') paragraphs.push('Your open broadcast brought strangers and danger to the pass. Haven’s guides changed the reception route and kept Rook outside. Now you help them replace exposed markers with safe instructions. The people you reached are grateful; the people you endangered are allowed to be angry. Neither costs you your right to shelter.');
  else paragraphs.push('Nadi and June arrive with the rescue crews you called. Their route follows the markers you left. You did not have to carry everyone yourself to make a difference.');
  if (s.route === 'ridge') paragraphs.push('Your sun-mirror survey is hung in the rescue room. Future travelers will cross a mapped ridge instead of chasing a rumor.');
  else paragraphs.push('The aqueduct plan becomes a second rescue route. Its restored pump house gives travelers water before the hardest part of the climb.');
  if (s.arrival === 'scout') paragraphs.push('After weeks of rest, you volunteer to update route maps from Haven’s safe lookout posts. Stella calls you the keeper of the road. You are free to come home at the end of every shift.');
  if (s.bond === 'romance') paragraphs.push('Stella meets you beneath the orchard trees for the date you promised each other. Without a crisis to fill every silence, you learn new things: she sings badly while cooking, you sleep better with the window open. Love is no longer an imagined reward at the end of a road. It is something the two of you choose, slowly, in a place where tomorrow is allowed to be ordinary.');
  else if (s.bond === 'friendship') paragraphs.push('Stella saves you a chair at her kitchen table. There is no unspoken romantic debt, only a friendship that made it through the static. Some evenings you help at the radio desk. Others you talk until the tea goes cold.');
  else paragraphs.push('You settle into a room overlooking the garden. Stella waves when you pass the radio station and respects the space you asked for. Your days belong to you: new friends, quiet work, and the possibility of a life you have not decided on yet.');
  if (s.honesty === 'lie') paragraphs.push(s.accountability === 'accepted' ? 'You apologize to Ellis and June without asking them to forget the shed. June eventually invites you to help in the garden. Trust returns through small acts, not a speech at the gate.' : 'Ellis and June keep their distance. Safety does not erase the choices you made outside it. Haven gives you time to become someone different, if you choose.');
  if (expansionEpilogue()) paragraphs.push(expansionEpilogue());
  paragraphs.push('On your first night, you leave the radio off. In the morning, birds wake you.');
  return paragraphs.join('\n\n');
}

function createCampaignRoute() {
  const pool = [...scenarios.filter(scene => ['THE TIN CANARY', 'MOVEMENT IN THE WHITE', 'THE WITCHLIGHT WELL'].includes(scene.title)), ...eventScenes.filter(scene => ['THE SKY OPENS', 'A BODY IN THE ROAD'].includes(scene.title))];
  for (let i = pool.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [pool[i], pool[j]] = [pool[j], pool[i]]; }
  const route = []; let encounter = 0;
  campaignBeats.forEach((beat, index) => {
    route.push({ campaignId: beat.id });
    if (beat.journey) route.push({ ...pool[encounter++], journeyContext: campaignBeats[index + 1].objective, journeyAct: beat.act, journeyRegion: beat.region });
  });
  return route;
}
function resolveCampaignScene(scene) {
  if (!scene.campaignId) return scene;
  const beat = campaignBeats.find(entry => entry.id === scene.campaignId);
  return { ...beat, campaignId: beat.id, type: `${beat.act} // ${beat.kind ? beat.kind.toUpperCase() : 'DECISION'}`, text: typeof beat.text === 'function' ? beat.text() : beat.text, choices: typeof beat.choices === 'function' ? beat.choices() : beat.choices };
}
function renderCampaignContext(scene) {
  $('campaignContext').textContent = `${scene.act || scene.journeyAct} — ${scene.objective || scene.journeyContext} // REACH HAVEN BY DAY 100`;
  state.region = scene.region ?? scene.journeyRegion ?? state.region;
  $('regionValue').textContent = regions[state.region][0];
  $('anomalyValue').textContent = regions[state.region][1];
  $('location').textContent = `${regions[state.region][0]} // DAY ${state.day} / 100`;
  $('radioMessage').textContent = state.story.lastRadio || 'RADIO // Waiting for a verified signal.';
  $('routeClues').textContent = `ROUTE NOTES // ${(state.story.clues || []).join(' → ') || 'No verified clues yet.'}`;
}
function renderCampaignBeat(scene) {
  if (!scene.kind) return false;
  const before = captureOutcome();
  if (!state.story.seen.includes(scene.id)) {
    state.story.seen.push(scene.id);
    if (scene.day) state.day = Math.max(state.day, scene.day);
    if (scene.radio) state.story.lastRadio = scene.radio;
    if (scene.clue) { state.story.clues ||= []; if (!state.story.clues.includes(scene.clue)) state.story.clues.push(scene.clue); }
    if (scene.camp) {
      state.food = Math.max(state.food, activeBase().food || 10); state.supplies = Math.max(state.supplies, 12);
      state.health = Math.min(100, state.health + 12 + (activeBase().healing || 0)); state.radiation = Math.max(0, state.radiation - 12);
    }
    if (scene.effects) { applyStoryEffects([null,0,0,0,0,'',scene.effects]); state.health = clamp(state.health + (scene.effects.health || 0),0,100); }
  }
  renderStats(); renderWorldState(); renderCampaignContext(scene);
  $('storyInterlude').hidden = true;
  $('promptText').textContent = scene.camp ? 'DAYS ON THE ROUTE // REST AND RESUPPLY' : 'FIELD RECORD // CONTINUE WHEN READY';
  showInlineContinue(scene.text);
  if (scene.camp || scene.effects) showOutcomeFeedback(before);
  if (state.health <= 0) showEnding(false);
  else if (scene.kind === 'ending') {
    showEnding(true); $('sceneTitle').textContent = campaignEndingTitle(); $('sceneText').textContent = scene.text;
    const button = document.createElement('button'); button.className = 'choice'; button.textContent = 'Take another road to Haven'; button.type = 'button'; button.addEventListener('click', restart); $('choices').appendChild(button);
  }
  saveGame(); return true;
}