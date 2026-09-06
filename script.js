const difficulties = {
  beginner: { label: 'BEGINNER', odds: 66, health: 88, supplies: 5, food: 7, radiation: 9, radiationDrift: .22, luck: 58, drain: 1, preferredTypes: ['RESOURCE', 'DISCOVERY', 'CROSSROADS'], preferredChains: ['FINCH'], repeatBlocks: 2 },
  survivor: { label: 'SURVIVOR', odds: 60, health: 82, supplies: 4, food: 6, radiation: 12, radiationDrift: .35, luck: 52, drain: 2, preferredTypes: ['ENCOUNTER', 'RESOURCE', 'DISCOVERY'], preferredChains: ['MARA', 'SABLE'], repeatBlocks: 1 },
  wasteland: { label: 'WASTELAND', odds: 54, health: 76, supplies: 3, food: 5, radiation: 16, radiationDrift: .5, luck: 47, drain: 3, preferredTypes: ['THREAT', 'MUTATION', 'ARCANE FIND'], preferredChains: ['SABLE', 'FINCH'], repeatBlocks: 2 },
  impossible: { label: 'IMPOSSIBLE', odds: 48, health: 70, supplies: 3, food: 4, radiation: 20, radiationDrift: .7, luck: 42, drain: 4, preferredTypes: ['THREAT', 'MUTATION', 'BOSS // BIG EVENT', 'BOSS // MUTANT WARLORD'], preferredChains: ['MARA'], repeatBlocks: 3 }
};

const regions = [
  ['THE GREENBELT', 'LOW'], ['GLASS DESERT', 'ELEVATED'], ['THE SUNKEN CITY', 'HIGH'], ['MOONFALL MARSH', 'CRITICAL'], ['ELVEN RUINS', 'ARCANE'], ['THE BONE ORCHARD', 'FERAL'], ['BLACKSTAR CRATER', 'CATASTROPHIC'], ['HAVEN APPROACH', 'STABLE']
];

const openingQuotes = [
  'The dead do not haunt this place. They are the place.', 'Every sunrise is an accusation.', 'The old world left you its ruins. Decide what to leave behind.', 'There are worse things than monsters. Some of them remember what you did.', 'The radio is quiet. That is when it is most dangerous.', 'Hope is a ration. Spend it carefully.', 'The wasteland does not ask who you were. It asks what you will do now.', 'A clean conscience weighs more than a full pack.', 'Some doors open. Some doors bite.', 'The stars still shine, which feels almost rude.', 'If the dead rise, try not to be the most interesting thing in the room.', 'A friend is a resource until they become a reason.', 'The dark learned new tricks after the bombs fell.', 'You can survive anything except the story you tell yourself.', 'The road remembers every body it takes.', 'Magic is radiation with better manners.', 'The sky is cracked. The ground is hungry.', 'Kindness is dangerous. So is cruelty. Choose your danger.', 'A crown is still a target, even when it is made of scrap.', 'The last honest person died yesterday. Probably.', 'If you hear singing underground, do not sing back.', 'No one gets to stay innocent forever.', 'Somewhere beyond the ash, something is waiting for you to become worse.', 'The end of the world is not an ending. It is an invitation.'
];

const musicTracks = [
  'music/welbornworks-welcome-to-the-badlands-377489.mp3',
  'music/tim_kulig_free_music-desolate-wasteland-182717.mp3',
  'music/back_drop-dark-piano-ambient-background-music-wasteland-275331.mp3',
  'music/astrofreq-ethereal-wasteland-music-4-3569.mp3',
  'music/aberrantrealities-fossilized-wasteland-572842.mp3'
];

const introScenes = [
  { type: 'SURVIVAL 01', title: 'FIND WATER', text: 'Your throat is dust. The first lesson of the wastes is not heroic: drink before you dream.', choices: [
    ['Follow the old pipe markers', 4, 0, 1, 0, 'The pipe is cracked, but condensation gathers beneath it. You fill one bottle.'],
    ['Search the abandoned kitchen', 1, -1, 2, 0, 'You find a half-full tin behind the stove. It tastes like metal and victory.'],
    ['Keep walking and save the time', -4, 0, -2, 1, 'You walk until your vision narrows. The road does not care that you were trying to be efficient.']
  ] },
  { type: 'SURVIVAL 02', title: 'MAKE A FIRE', text: 'Night arrives early beneath the ash cloud. You have one match, a torn blanket, and a long way to go.', choices: [
    ['Burn the blanket and stay warm', 3, 0, 3, 0, 'The fire burns blue. Something watches from the treeline, but it stays back.'],
    ['Save the match and sleep cold', 0, 0, -2, 0, 'You wake shivering, alive, and already learning what caution costs.'],
    ['Signal with the match', 5, 0, 0, 2, 'A distant light answers yours. It disappears before you can decide whether that is good.']
  ] },
  { type: 'FIRST DECISION', title: 'CHOOSE A PLACE TO STAND', text: 'You cannot carry everything. Choose a base of operations before the road teaches you harder lessons. A base gives you a different kind of future.', choices: [
    ['Claim the old ranger station', 6, -1, 4, 0, 'The station has a roof, a radio mast, and a locked cabinet. You make it yours.', { base: 'RANGER STATION', item: 'RADIO PARTS', materials: 2 }],
    ['Build a camp in the Greenbelt', 3, 0, 1, 0, 'The trees hide your smoke. It is not much, but it is somewhere to return to.', { base: 'GREENBELT CAMP', item: 'FORAGING KIT', materials: 3 }],
    ['Take over the old trading post', 1, -1, 2, 2, 'The counters are dusty and the back room is trapped. You clear it one careful step at a time.', { base: 'TRADING POST', item: 'TRADE TOKENS', materials: 4, reputation: 2 }]
  ] }
];

const difficultyScenes = {
  beginner: [{ type: 'BEGINNER // SAFE HARBOR', title: 'THE FIRST FRIENDLY LIGHT', text: 'A settlement beacon blinks through the rain. The gatekeeper offers directions, a warm meal, and one small warning: do not mention the old tower.', choices: [
    ['Accept the directions and rest', 6, 1, 2, 0, 'You sleep beneath a clean roof and leave with a hand-drawn map.'],
    ['Trade a ration for local news', 4, 0, 1, 0, 'The gatekeeper tells you which roads are watched and which are merely haunted.'],
    ['Ask about the old tower', -2, 0, 0, 2, 'The beacon goes dark. Whatever you asked about, someone wanted it forgotten.']
  ] }],
  survivor: [{ type: 'SURVIVOR // HARD CHOICE', title: 'THE WATER LEDGER', text: 'A settlement clerk has been falsifying water records. Exposing the fraud may save a hundred people, but it will collapse the fragile trust holding the town together.', choices: [
    ['Expose the ledger in public', 7, -1, 1, 0, 'The town erupts, then counts every remaining bottle in the open. Trust hurts before it heals.'],
    ['Confront the clerk privately', 3, 0, 2, 1, 'The clerk gives you the missing pages and asks for one chance to repair the damage.'],
    ['Keep the secret for a favor', -5, 1, 0, 2, 'The records stay clean on paper. The debt now has your name attached to it.']
  ] }],
  wasteland: [{ type: 'WASTELAND // HUNT', title: 'THE RED TRACKER', text: 'Something has followed your trail for three days. At dusk, you find its red footprints circling your camp and a message scratched into the dust: RUN FASTER.', choices: [
    ['Lay a trap in the dark', 8, -1, 2, 5, 'The trap snaps shut on empty air. Behind you, the red tracks begin again.'],
    ['Follow the tracks into the ruins', -4, -1, 5, 8, 'You find a nest of stolen packs and the tracker waiting beside them, almost human.'],
    ['Burn your camp and vanish', 2, -2, 1, 3, 'Smoke erases your trail. Something screams from the far side of the flames.']
  ] }],
  impossible: [{ type: 'IMPOSSIBLE // LAST CHANCE', title: 'THE BLACK SUN TRIAL', text: 'The crater opens beneath your feet. A voice offers one clean escape route, but only if you surrender the person you have become to the dark below.', choices: [
    ['Descend and face the voice', 12, -2, -8, 12, 'The crater closes behind you. When you return, the sky has learned your shape.'],
    ['Offer your best memory', 7, 0, 2, 15, 'The voice accepts. You survive, but the memory is gone before you can say goodbye.'],
    ['Run across the collapsing rim', -10, -1, -15, 10, 'The rim gives way. You reach the far side with one boot and most of your certainty missing.']
  ] }]
};

const mutantScenes = [
  { type: 'MUTANT QUEST', title: 'THE HUNGER UNDER YOUR SKIN', text: 'The mutation gives you strength, but it has also given you a new hunger. A den beneath the road offers a choice: feed the change or fight it.', choices: [
    ['Follow the scent into the den', 5, -1, 5, 3, 'The den is full of glowing roots. You eat one and feel the hunger quiet for now.', { race: 'MUTANT', item: 'GLOWROOT', radiation: 4 }],
    ['Resist and leave the den', 2, 0, -2, 0, 'You leave shaking, but your mind remains your own for another day.'],
    ['Claim the den as a mutant refuge', -3, 1, 3, 6, 'The creatures inside recognize what you are becoming and let you pass without a fight.', { base: 'MUTANT DEN', reputation: -2 }]
  ] },
  { type: 'MUTANT QUEST', title: 'THE ONES WHO CAN HEAR THE RADSTORM', text: 'Other mutants gather beneath a dead radio tower. They can hear the next radiation wave before it arrives, but they demand that you lead their dangerous crossing.', choices: [
    ['Lead them through the storm', 8, -1, 4, 8, 'The storm bends around your altered body. The others follow your signal through the white fire.', { item: 'RADSTORM SENSE', radiation: -8, reputation: 3 }],
    ['Take their warning and go alone', 4, 0, 1, 2, 'You leave with the route memorized and the knowledge that someone else will face the storm.'],
    ['Warn the settlement instead', 6, -1, 2, 4, 'Haven prepares for the wave. They thank you carefully, as if gratitude might be contagious.', { reputation: 5 }]
  ] }
];

const lateRaceScene = { type: 'LATE GAME // RACE SHIFT', title: 'THE VEIL OPENS', text: 'After enough years beneath the altered sky, your body offers a choice. Become something the old world would have called impossible. The gift may save you. It may also erase the person who started this journey.', lateOnly: true, choices: [
  ['Remain human and keep your memories', 4, 0, 3, 0, 'Your bones ache, but your name stays yours.', { race: 'HUMAN', reputation: 2 }],
  ['Become an irradiated elf', 10, 1, 5, 10, 'Your ears sharpen to the radio’s hidden choir. You heal quickly, but sunlight now feels like a verdict.', { race: 'IRRADIATED ELF', item: 'STAR-SIGHT', radiation: 3, reputation: -1 }],
  ['Become a mutant revenant', 14, 2, 12, 20, 'You stop breathing for a moment. When you start again, the dead recognize you as kin.', { race: 'MUTANT REVENANT', evil: 3, item: 'DEATH-SENSE', reputation: -6 }]
] };

const scenarios = [
  { type: 'ENCOUNTER', title: 'A LIGHT IN THE DEAD RAIL YARD', text: 'Your cracked radio catches a voice beneath the static. Someone is broadcasting from the old rail yard, offering shelter. Between you and the signal: a minefield nobody has mapped since the bombs fell.', choices: [
    ['Follow the signal through the minefield', 8, -1, 0, 3, 'The signal leads you through the dead zone. One wrong step, then silence. You arrive shaken, but alive.'],
    ['Circle wide and lose a day of travel', 3, -1, 2, 0, 'You move slowly around the field. The long way costs water, but every step is solid ground.'],
    ['Answer the broadcast and ask for directions', -5, 0, 0, 4, 'The voice goes quiet. A minute later, a flare blooms on the safe path. Someone out there is watching.']
  ] },
  { type: 'DISCOVERY', title: 'THE TIN CANARY', text: 'A shelter belongs to a woman with a shock baton and a three-eyed dog. She has one clean canteen left. Her eyes keep returning to your pack.', choices: [
    ['Offer half your remaining water', 10, -1, 4, 1, 'The canteen passes between you. The dog stops growling. The woman opens the shelter door.'],
    ['Tell her you have nothing to trade', -2, 0, -1, 0, 'Honesty lands harder than a good lie. She lets you inside, but keeps the baton close.'],
    ['Show her the glowing med-kit in your pack', 6, 0, 2, 2, 'The kit hums with old radiation. Her suspicion breaks, and you gain a careful ally.']
  ] },
  { type: 'THREAT', title: 'MOVEMENT IN THE WHITE', text: 'At midnight, shapes move across the salt flats. Not raiders. Too low to the ground. Whatever is out there has already found the edge of your floodlight.', choices: [
    ['Wake everyone and kill the light', 7, 0, 3, 0, 'The shelter falls dark. The shapes pass without finding a target. Nobody sleeps again.'],
    ['Take the floodlight and investigate alone', -12, 0, -20, 0, 'An ash-mouse bites through your glove. Its teeth leave a silver glow under your skin.'],
    ['Wait and watch from the roof', 2, 0, 0, 1, 'The movement fades at dawn. You learn nothing, but keep everyone safe.']
  ] },
  { type: 'ARCANE FIND', title: 'THE WITCHLIGHT WELL', text: 'A green flame dances above an old well. A voice inside offers a bargain: one memory for a cup of water. The voice knows your name.', choices: [
    ['Drink the witchlight water', 5, 2, -7, 0, 'The water tastes like lightning. Your thirst breaks, and a second shadow follows you out.'],
    ['Trade a memory you can spare', 4, 1, 0, 3, 'You forget the face of your childhood home. The water is clean. The voice says thank you.'],
    ['Smash the lantern and run', -3, 0, 4, 2, 'The green flame bursts into moths. One settles on your shoulder like a badge.']
  ] },
  { type: 'RESOURCE', title: 'THE LAST CLEAN TANK', text: 'A dead wind farm hides a water tank marked CLEAN. A hand-painted warning says the pump is unstable. The tank could be salvation, or a quiet grave.', choices: [
    ['Open the tank and filter what you can', 9, 2, -4, 1, 'The pump screams, then gives. Clean water fills every bottle. Luck is a kind of engineering.'],
    ['Take one bottle and move on', 1, 1, 0, 0, 'You keep the risk small. One bottle is better than none.'],
    ['Leave it. The warning is enough', -4, 0, 0, 2, 'You walk away thirsty. Sometimes caution is just fear wearing a uniform.']
  ] },
  { type: 'MUTATION', title: 'THE CRYSTAL STAG', text: 'A stag made of bone and amber steps from the irradiated pines. Its antlers are full of tiny stars. It bows, as if waiting for a command.', choices: [
    ['Follow the stag into the trees', 8, -1, 7, 4, 'It leads you to a hidden spring. By morning it is gone, leaving one amber antler behind.'],
    ['Offer it your last ration', 5, -1, 2, 8, 'The stag drinks. Your luck turns strange and bright for the rest of the day.'],
    ['Raise your weapon', -10, 0, -12, -3, 'The creature vanishes. Something in the forest remembers your fear.']
  ] },
  { type: 'CROSSROADS', title: 'THE CITY BELOW', text: 'A road sign points to Haven, a settlement beneath the old city. The underpass is dark, but a red lantern hangs at its far end. Behind you, an ash storm rises.', choices: [
    ['Enter the underpass before the storm', 8, -1, 1, 0, 'The tunnel swallows you. Something scratches in the dark, but the red lantern stays ahead.'],
    ['Climb for the ridge and wait out the storm', -8, -1, -8, 0, 'The wind strips the road bare. You survive the night, but the storm takes your reserve.'],
    ['Follow the lantern, calling out first', 4, 0, 3, 2, 'A voice answers from the dark: “You made it farther than most.” The gate unlocks.']
  ] },
  { type: 'RAIDER RADIO', title: 'THE VOICE THAT ISN’T THERE', text: 'Your radio repeats a message in your own voice: “Turn around.” The signal points toward a ruined observatory where the sky is glowing violet.', choices: [
    ['Trust the impossible signal', 6, -1, 3, 4, 'The observatory is empty except for a map of the safest route, drawn in your handwriting.'],
    ['Turn the radio off and keep moving', 0, 0, 0, 0, 'The silence is worse. You make good time, but the violet glow follows on the horizon.'],
    ['Answer yourself', -4, 0, -3, 5, 'Something answers back. Your radio works perfectly now, and that is not comforting.']
  ] },
  { type: 'HAVEN GATE', title: 'A PLACE THAT REMEMBERS', text: 'The gate opens onto garden lights, patched roofs, and people who still know how to laugh. The world is not fixed. It is not safe. But you have carried yourself here.', choices: [
    ['Bring your map for the next traveler', 5, 0, 5, 2, 'You mark the mines, water, and radio paths. Your survival becomes someone else’s chance.'],
    ['Bring your story so the dead are remembered', 2, 0, 4, 5, 'The room grows quiet, then someone sets another place at the table.'],
    ['Bring nothing but a full cup', 0, 0, 1, 1, 'You sit down. For the first time in years, the next choice can wait until morning.']
  ] }
];

const bonusScenarios = [
  { type: 'QUEST // CHAIN 01', title: 'THE GIRL WITH THE SILVER MASK', text: 'Mara is cornered by mutant jackals beneath a billboard. She offers a map to the Elven Ruins if you get her out alive. Her hand stays on your holster.', chain: 'MARA', choices: [
    ['Save Mara and share your water', 8, -1, 2, 0, 'Mara joins your camp. She sleeps with one eye open and starts calling you by a name you never gave her.', { ally: 'MARA', item: 'SILVER MAP' }],
    ['Steal her map and leave her to the jackals', 3, 0, -4, 0, 'You take the map. Behind you, Mara screams once. The map is accurate. Your reflection is not.', { item: 'STOLEN SILVER MAP', sin: 'THEFT', reputation: -4, enemy: 'MARA' }],
    ['Kill the jackals, then ask Mara to travel with you', 10, 0, 1, 2, 'Mara follows. Not because she trusts you, but because she wants to see what you become.', { ally: 'MARA', enemy: 'JACKAL PACK' }]
  ] },
  { type: 'QUEST // CHAIN 01', title: 'MARA’S LAST LANTERN', text: 'Mara leads you to the Elven Ruins. An irradiated elf prince holds the map’s missing half. He will trade it for the lantern that keeps Mara’s shadow from moving on its own.', chain: 'MARA', choices: [
    ['Give the lantern to the elf prince', 6, 0, -2, 5, 'The prince returns the missing map and bows to Mara. Her shadow finally matches her feet.', { item: 'ELVEN MAP HALF', ally: 'ELF PRINCE', reputation: 3, requires: ['SILVER MAP'] }],
    ['Keep the lantern and lie to Mara', -4, 0, 0, 0, 'Mara hears the lie in your breathing. She leaves at dawn with half your ammunition.', { enemy: 'MARA', sin: 'BETRAYAL', item: 'SHADOW LANTERN', reputation: -5 }],
    ['Burn the lantern and free the shadow', 7, -1, 4, 8, 'The shadow becomes a dark-winged creature and flies north. Mara laughs for the first time.', { ally: 'MARA', item: 'SHADOW FEATHER', evil: 1 }]
  ] },
  { type: 'BOSS // BIG EVENT', title: 'THE NECROMANCER OF SUBLEVEL NINE', text: 'A bell rings beneath the Sunken City. Zombies climb through the subway vents behind a robed mutant who wears a crown of surgical steel. He offers you a place at his side.', boss: true, choices: [
    ['Challenge the necromancer and kill the crown', 7, -1, -9, 5, 'The crown cracks. The zombies collapse like puppets with cut strings. The city goes quiet.', { item: 'CROWN OF NINE', reputation: 8, enemy: 'NECROMANCER', sin: 'KILLING' }],
    ['Swear loyalty and become his executioner', 12, 1, 6, 12, 'He gives you a black blade and a command. You win every fight after this. You stop recognizing why.', { item: 'BLACK BLADE', evil: 4, reputation: -8, enemy: 'HAVEN' }],
    ['Open the floodgates and drown the dead', 3, -2, -3, 0, 'The tunnels fill. The dead go under, and so does the last clean water in the city.', { reputation: 2, sin: 'SACRIFICE', item: 'CITY KEY' }]
  ] },
  { type: 'ENCOUNTER // COMPANION', title: 'THE ELF WHO HATED MOONLIGHT', text: 'An elf scout named Vey stands on a watchtower, bleeding silver. He says the Moonfall Marsh is breeding mutant enemies that can smell guilt. He asks whether you are kind.', choices: [
    ['Tell the truth: kindness is expensive', 5, -1, 3, 1, 'Vey smiles. “Good. I can work with expensive.” He joins your party and teaches you the marsh paths.', { ally: 'VEY', item: 'MARSH COMPASS', reputation: 2 }],
    ['Flirt, promise safety, and make a lover of him', 7, -1, 4, 2, 'Vey takes your hand beneath the broken moon. The tenderness feels dangerous. That is why it feels real.', { lover: 'VEY', luck: 8, reputation: 3 }],
    ['Rob his supplies while he is wounded', -5, 2, -5, 0, 'You take his medicine. He survives, but the elf clans add your face to their hunt list.', { enemy: 'ELF CLANS', sin: 'STEALING', reputation: -7, item: 'ELF MEDICINE' }]
  ] },
  { type: 'BOSS // MUTANT WARLORD', title: 'THE MOUTHS IN THE WALL', text: 'At Blackstar Crater, a mutant warlord has fused with the crater wall. A hundred mouths chant your private sins. Behind him, a vault pulses with pre-war supplies.', boss: true, choices: [
    ['Lead your friends into the assault', 9, -2, -14, 4, 'Mara, Vey, and whoever still trusts you bring the wall down together. The vault opens.', { item: 'STAR-IRON ARMOR', reputation: 9, friend: 'THE CRATER CREW' }],
    ['Offer the warlord your worst sin', -2, 0, 0, 10, 'The mouths swallow your confession. The wall lets you pass, but now it knows what to whisper.', { item: 'BLACKSTAR RELIC', sin: 'CONFESSION', radiation: 6 }],
    ['Take the vault while everyone fights', 4, 3, -2, 0, 'You steal the supplies and vanish. You are richer. The people who followed you are not.', { item: 'VAULT CACHE', sin: 'BETRAYAL', evil: 2, enemy: 'CRATER CREW' }]
  ] },
  { type: 'QUEST // CHAIN 02', title: 'THE BROKEN WEATHER MACHINE', text: 'A weather machine is broadcasting a distress code from the Glass Desert. The voice belongs to Dr. Sable, who claims she can predict the next ashfall if you bring her a working crystal.', chain: 'SABLE', choices: [
    ['Search the wreckage for a crystal core', 5, -1, 0, 2, 'You pull a blue crystal from the machine. It hums in time with your pulse.', { item: 'BLUE CRYSTAL', ally: 'DR. SABLE' }],
    ['Leave the machine and follow the storm', -2, 0, -2, 3, 'The storm catches you in the open. Dr. Sable’s voice keeps repeating your name until the radio dies.', { enemy: 'DR. SABLE' }],
    ['Strip the machine for useful materials', 2, 1, -1, 1, 'You take copper, wire, and one dangerous-looking lens. The forecast is lost, but your base grows stronger.', { item: 'WEATHER LENS', materials: 3, sin: 'SALVAGE' }]
  ] },
  { type: 'QUEST // CHAIN 02', title: 'THE FORECAST OF BONES', text: 'Dr. Sable’s weather machine wakes for six seconds. It shows Haven buried under a black snow that has not fallen yet. She asks whether you want the warning shared.', chain: 'SABLE', choices: [
    ['Give Sable the Blue Crystal', 8, 0, 2, 1, 'The machine sings. Every settlement receives three days of warning, and Sable becomes a trusted voice in your radio.', { requires: ['BLUE CRYSTAL'], item: 'STORM FORECAST', reputation: 7, ally: 'DR. SABLE' }],
    ['Sell the forecast to the highest bidder', 5, 2, 0, 0, 'The rich settlements pay in ammunition. The poor ones learn about the storm when it arrives.', { requires: ['BLUE CRYSTAL'], item: 'ASHFALL CONTRACT', reputation: -6, sin: 'PROFITEERING' }],
    ['Destroy the machine before anyone can use it', -4, 0, 3, 0, 'You smash the screen. No one can panic over a future they cannot see.', { enemy: 'DR. SABLE', sin: 'SILENCING', reputation: -3 }]
  ] },
  { type: 'QUEST // CHAIN 03', title: 'THE CHILDREN OF THE FLOOD TUNNEL', text: 'A group of young tunnel-dwellers has been stealing rations from your base. Their leader, Finch, says the water beneath their home has turned black.', chain: 'FINCH', choices: [
    ['Bring them a purifier from your base', 6, -1, 2, 0, 'The black water clears. Finch gives you a hand-drawn map of the tunnels and promises to watch your back.', { requires: ['RADIO PARTS', 'FORAGING KIT'], ally: 'FINCH', item: 'TUNNEL MAP', reputation: 5 }],
    ['Set a trap and catch the thieves', 1, 0, -1, 2, 'You catch Finch with a sack of your food. He tells you why before you decide what punishment looks like.', { enemy: 'FINCH', sin: 'PUNISHMENT', reputation: -2 }],
    ['Trade them your old water route', 4, -1, 1, 1, 'The children vanish into the dark with your map. In return, you get a promise and a strange brass key.', { item: 'BRASS TUNNEL KEY', reputation: 2 }]
  ] },
  { type: 'QUEST // CHAIN 03', title: 'THE BLACK WATER ANSWERS', text: 'Finch’s tunnel map ends at a sealed door beneath your own base. Something on the other side knows your name and taps three times whenever you lie.', chain: 'FINCH', choices: [
    ['Use the Brass Tunnel Key', 7, 0, -2, 5, 'The door opens onto an underground spring. The water is dark, but clean. Finch asks you not to tell Haven.', { requires: ['BRASS TUNNEL KEY'], item: 'BLACK SPRING WATER', supplies: 3, reputation: -1 }],
    ['Seal the door forever', 3, 0, 2, 0, 'The tapping stops. Finch is angry, but the base sleeps more easily.', { enemy: 'FINCH', materials: 2, reputation: -2 }],
    ['Tell Haven about the spring', 5, 0, 0, 3, 'Haven sends a team. The spring saves hundreds, and your base becomes a crossroads.', { reputation: 8, ally: 'HAVEN COUNCIL' }]
  ] }
];

const eventScenes = [
  { type: 'EVENT // NO CHOICE', title: 'THE SKY OPENS', text: 'For twelve minutes, the clouds part. Old satellites blink awake above the wastes, and every radio in the region repeats a lullaby nobody remembers writing.', effects: { luck: 4, radiation: 2 }, event: true },
  { type: 'EVENT // NO CHOICE', title: 'A BODY IN THE ROAD', text: 'You find a stranger’s boots, a broken canteen, and a note addressed to someone named home. You take the canteen. You leave the note.', effects: { supplies: 1, reputation: 1 }, event: true },
  { type: 'EVENT // NO CHOICE', title: 'THE DEAD WALK PAST', text: 'A line of zombies crosses the road at dawn. They do not look at you. One carries a lantern. By nightfall, the lantern is hanging from your base gate.', effects: { odds: 3, radiation: 1 }, event: true },
  { type: 'EVENT // NO CHOICE', title: 'THE BASE REMEMBERS', text: 'Something has repaired one wall while you were away. The work is too neat for human hands. Your materials increase, but so does the feeling of being watched.', effects: { materials: 2, luck: -2 }, event: true },
  { type: 'EVENT // NO CHOICE', title: 'A NAME ON THE RADIO', text: 'A stranger says your name over the radio, then apologizes for waking you. The signal is gone before you can answer.', effects: { odds: -2, luck: 3 }, event: true }
];

const events = [
  ['RANDOM EVENT // RADSTORM', 'A violet storm rolls over the horizon. The sky rains warm sparks.', -5, 0, 1],
  ['RANDOM EVENT // LUCKY FIND', 'A sealed ration tin tumbles from a collapsed kiosk. The label says: NOT FOR HUMANS.', 0, 1, 3],
  ['RANDOM EVENT // FAERIE SWARM', 'Tiny glowing faeries orbit your pack. They steal a button and leave a silver coin.', 2, 0, 5],
  ['RANDOM EVENT // OLD WORLD HUM', 'A buried machine wakes under your boots. Your bones vibrate with forgotten electricity.', -2, 0, -2],
  ['RANDOM EVENT // TRAVELER', 'A masked traveler offers a trade: your compass for a charm that points to danger.', 1, 0, 2]
];

const npcCatalog = [
  { id: 'mara', name: 'Mara', adult: true, alive: true, role: 'Scout', faction: 'Rangers', jealousy: 22, preferences: { marriage: 'commitment and honesty', boundaries: 'No public scenes, no hidden debts.' }, relationship: {} },
  { id: 'vey', name: 'Vey', adult: true, alive: true, role: 'Elf scout', faction: 'Haven', jealousy: 18, preferences: { marriage: 'shared purpose', boundaries: 'No lies about obligations.' }, relationship: {} },
  { id: 'sable', name: 'Dr. Sable', adult: true, alive: true, role: 'Weather engineer', faction: 'Apex Labs', jealousy: 12, preferences: { marriage: 'mutual respect and ambition', boundaries: 'No emotional manipulation.' }, relationship: {} },
  { id: 'finch', name: 'Finch', adult: true, alive: true, role: 'Tunnel guide', faction: 'Surface migrants', jealousy: 24, preferences: { marriage: 'practical partnership', boundaries: 'No threats in private.' }, relationship: {} },
  { id: 'rhea', name: 'Rhea', adult: true, alive: true, role: 'Broker', faction: 'Haven trade', jealousy: 30, preferences: { marriage: 'security and loyalty', boundaries: 'No deception in money matters.' }, relationship: {} },
  { id: 'oric', name: 'Oric', adult: true, alive: true, role: 'Militia captain', faction: 'Cinder Guard', jealousy: 28, preferences: { marriage: 'public vows and loyalty', boundaries: 'No secret alliances.' }, relationship: {} }
];

const cultCatalog = [
  { name: 'The Ember Choir', leader: 'Ashen Vell', beliefs: 'Technology and the sun are sacred sources of justice.', followers: 90, territory: 'Old relay towers', resources: 'Fuel cells and relic tech', enemies: ['Haven Council'], secrets: ['Hidden generator vault'] },
  { name: 'The Pale Tide', leader: 'Mother Sere', beliefs: 'Mutation is divine purification.', followers: 140, territory: 'Moonfall Marsh', resources: 'Mutant recruits and toxin harvest', enemies: ['Settlers'], secrets: ['Saw a child become a martyr'] },
  { name: 'The Lantern Prophets', leader: 'Brother Ilya', beliefs: 'The apocalypse was a warning from a sleeping machine god.', followers: 65, territory: 'Sunken transit tunnels', resources: 'Old automation and maps', enemies: ['Criminal organizations'], secrets: ['One prophet is a secret mole'] }
];

const militiaCatalog = [
  { name: 'Cinder Guard', leader: 'Oric', troops: 120, equipment: 'Carbines and field shields', morale: 74, loyalty: 66, funding: 140, territory: 'Greenbelt outskirts' },
  { name: 'Lantern Ward', leader: 'Mara', troops: 80, equipment: 'Runic rifles and rail spikes', morale: 82, loyalty: 78, funding: 95, territory: 'Rail yard checkpoint' }
];

const weaponCatalog = [
  { name: 'Runic Rifle', category: 'rifle', damage: 22, rarity: 'Rare', value: 180, description: 'A heavy rifle forged with ash-runed steel.', special: 'Siphons heat from the barrel to reduce recoil.' },
  { name: 'Crystal Pistol', category: 'pistol', damage: 14, rarity: 'Uncommon', value: 120, description: 'A compact sidearm powered by a shard of blue crystal.', special: 'Shocks the target on a clean hit.' },
  { name: 'Arc Cannon', category: 'heavy', damage: 30, rarity: 'Epic', value: 360, description: 'A brutal anti-armor weapon that hums with stormglass charge.', special: 'Chains arc damage over a short burst.' },
  { name: 'Lightning Spear', category: 'melee', damage: 18, rarity: 'Rare', value: 150, description: 'A thrown spear that crackles with static before impact.', special: 'Stuns targets briefly.' },
  { name: 'Void Blade', category: 'melee', damage: 21, rarity: 'Epic', value: 260, description: 'A blackened blade that absorbs the light around it.', special: 'Adds a brief fear effect against weaker foes.' }
];

const relationshipDefaults = () => ({ friendship: 0, attraction: 0, romance: 0, love: 0, loyalty: 0, trust: 0, jealousy: 0, suspicion: 0, respect: 0, resentment: 0, status: 'known', affair: false, married: false, secret: false, partner: null, lastScene: null });

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

function defaultState() {
  return {
    difficulty: 'survivor',
    scenario: 0,
    odds: 60,
    day: 1,
    health: 82,
    radiation: 12,
    supplies: 4,
    food: 6,
    mutationResolved: false,
    mutationActive: false,
    luck: 52,
    region: 0,
    lastEvent: false,
    eventCooldown: 3,
    route: createRoute('survivor'),
    previousStats: null,
    audio: null,
    allies: [],
    lovers: [],
    enemies: [],
    items: [],
    sins: [],
    reputation: 0,
    evil: 0,
    base: 'NONE',
    materials: 0,
    race: 'HUMAN',
    playerName: 'SURVIVOR',
    started: false,
    crowns: 25,
    relationshipMap: {},
    marriages: [],
    spouses: [],
    affairs: [],
    scandals: [],
    secrets: [],
    npcRegistry: npcCatalog.map((npc) => ({ ...npc, relationship: relationshipDefaults() })),
    deadNPCs: [],
    reputations: { settlers: 0, merchants: 0, criminals: 0, military: 0, religious: 0, political: 0 },
    gamblingHistory: [],
    eventHistory: [],
    factionRelationships: {},
    cults: [...cultCatalog],
    militias: [...militiaCatalog],
    weapons: [...weaponCatalog],
    inventory: [],
    saveVersion: 2,
    currentChoiceSet: []
  };
}

function hydrateState(rawState) {
  const base = defaultState();
  const hydrated = {
    ...base,
    ...rawState,
    route: Array.isArray(rawState?.route) && rawState.route.length ? rawState.route : base.route,
    allies: Array.isArray(rawState?.allies) ? rawState.allies : base.allies,
    lovers: Array.isArray(rawState?.lovers) ? rawState.lovers : base.lovers,
    enemies: Array.isArray(rawState?.enemies) ? rawState.enemies : base.enemies,
    items: Array.isArray(rawState?.items) ? rawState.items : base.items,
    sins: Array.isArray(rawState?.sins) ? rawState.sins : base.sins,
    marriages: Array.isArray(rawState?.marriages) ? rawState.marriages : base.marriages,
    spouses: Array.isArray(rawState?.spouses) ? rawState.spouses : base.spouses,
    affairs: Array.isArray(rawState?.affairs) ? rawState.affairs : base.affairs,
    scandals: Array.isArray(rawState?.scandals) ? rawState.scandals : base.scandals,
    secrets: Array.isArray(rawState?.secrets) ? rawState.secrets : base.secrets,
    inventory: Array.isArray(rawState?.inventory) ? rawState.inventory : base.inventory,
    gamblingHistory: Array.isArray(rawState?.gamblingHistory) ? rawState.gamblingHistory : base.gamblingHistory,
    eventHistory: Array.isArray(rawState?.eventHistory) ? rawState.eventHistory : base.eventHistory,
    deadNPCs: Array.isArray(rawState?.deadNPCs) ? rawState.deadNPCs : base.deadNPCs,
    reputations: { ...base.reputations, ...(rawState?.reputations || {}) },
    npcRegistry: Array.isArray(rawState?.npcRegistry) && rawState.npcRegistry.length ? rawState.npcRegistry.map((npc) => ({ ...npc, relationship: { ...relationshipDefaults(), ...(npc.relationship || {}) } })) : base.npcRegistry,
    cults: Array.isArray(rawState?.cults) ? rawState.cults : base.cults,
    militias: Array.isArray(rawState?.militias) ? rawState.militias : base.militias,
    weapons: Array.isArray(rawState?.weapons) ? rawState.weapons : base.weapons,
    factionRelationships: rawState?.factionRelationships && typeof rawState.factionRelationships === 'object' ? rawState.factionRelationships : base.factionRelationships,
    crowns: Number(rawState?.crowns ?? base.crowns),
    relationshipMap: rawState?.relationshipMap && typeof rawState.relationshipMap === 'object' ? Object.fromEntries(Object.entries(rawState.relationshipMap).map(([key, value]) => [String(key).toLowerCase(), { ...relationshipDefaults(), ...(value || {}) }])) : {},
    started: Boolean(rawState?.started),
    saveVersion: 2
  };

  if (!hydrated.relationshipMap || Object.keys(hydrated.relationshipMap).length === 0) {
    const map = {};
    hydrated.npcRegistry.forEach((npc) => {
      map[String(npc.id).toLowerCase()] = { ...relationshipDefaults(), ...(npc.relationship || {}) };
    });
    hydrated.relationshipMap = map;
  }

  hydrated.odds = clamp(Number(rawState?.odds ?? hydrated.odds), 0, 99);
  hydrated.health = clamp(Number(rawState?.health ?? hydrated.health), 0, 100);
  hydrated.radiation = clamp(Number(rawState?.radiation ?? hydrated.radiation), 0, 100);
  hydrated.supplies = Math.max(0, Number(rawState?.supplies ?? hydrated.supplies));
  hydrated.food = Math.max(0, Number(rawState?.food ?? hydrated.food));
  hydrated.mutationResolved = Boolean(rawState?.mutationResolved);
  hydrated.mutationActive = Boolean(rawState?.mutationActive);
  hydrated.luck = clamp(Number(rawState?.luck ?? hydrated.luck), 0, 100);
  hydrated.day = Math.max(1, Number(rawState?.day ?? hydrated.day));
  hydrated.region = clamp(Number(rawState?.region ?? hydrated.region), 0, regions.length - 1);
  return hydrated;
}

localStorage.removeItem('afterlight-save-v2');
const state = defaultState();
const $ = (id) => document.getElementById(id);

function saveGame() {
  try {
    const saveData = JSON.stringify({
      ...state,
      audio: null,
      previousStats: null,
      started: true,
      npcRegistry: state.npcRegistry.map((npc) => ({ ...npc, relationship: { ...(npc.relationship || {}) } })),
      relationshipMap: state.relationshipMap || {}
    });
    localStorage.setItem('afterlight-save-v2', saveData);
  } catch (error) {
    console.warn('Unable to save game state.', error);
  }
}

function addCurrency(amount) {
  state.crowns = Math.max(0, Number(state.crowns || 0) + Number(amount || 0));
  return state.crowns;
}

function spendCurrency(amount) {
  const value = Number(amount || 0);
  if (!canAfford(value)) return false;
  state.crowns = Math.max(0, Number(state.crowns || 0) - value);
  return true;
}

function canAfford(amount) {
  return Number(state.crowns || 0) >= Number(amount || 0);
}

function recordEvent(label, detail) {
  state.eventHistory.push({ label, detail, day: state.day });
  if (state.eventHistory.length > 30) state.eventHistory.splice(0, state.eventHistory.length - 30);
}

function getNpcRecord(npcId) {
  const id = String(npcId || '').toLowerCase();
  const match = state.npcRegistry.find((npc) => String(npc.id).toLowerCase() === id);
  if (match) return match;
  const fallback = npcCatalog.find((npc) => String(npc.id).toLowerCase() === id);
  if (!fallback) return null;
  state.npcRegistry.push({ ...fallback, relationship: { ...relationshipDefaults(), ...(fallback.relationship || {}) } });
  return state.npcRegistry[state.npcRegistry.length - 1];
}

function getRelationship(npcId) {
  const record = getNpcRecord(npcId);
  if (!record) return relationshipDefaults();
  const key = String(record.id).toLowerCase();
  if (!state.relationshipMap[key]) {
    state.relationshipMap[key] = { ...relationshipDefaults(), ...(record.relationship || {}) };
  }
  return state.relationshipMap[key];
}

function updateRelationship(npcId, deltas) {
  const rel = getRelationship(npcId);
  Object.keys(deltas || {}).forEach((field) => {
    rel[field] = clamp(Number(rel[field] || 0) + Number(deltas[field] || 0), 0, 100);
  });
  rel.status = getRelationshipStatus(rel);
  const record = getNpcRecord(npcId);
  if (record) record.relationship = { ...rel };
  state.relationshipMap[String(record?.id || npcId).toLowerCase()] = rel;
  return rel;
}

function getRelationshipStatus(rel) {
  if ((rel.love || 0) >= 80) return 'deeply in love';
  if ((rel.romance || 0) >= 60) return 'dating';
  if ((rel.attraction || 0) >= 45) return 'flirting';
  if ((rel.friendship || 0) >= 35) return 'friends';
  if ((rel.resentment || 0) >= 60) return 'resentful';
  if ((rel.suspicion || 0) >= 60) return 'suspicious';
  if ((rel.trust || 0) >= 45) return 'trusted';
  return 'acquaintance';
}

function addScandal(scandal) {
  const entry = {
    id: `${Date.now()}-${Math.random().toString(16).slice(2)}`,
    type: scandal.type || 'secret relationship',
    characters: Array.isArray(scandal.characters) ? scandal.characters : [],
    whoKnows: Array.isArray(scandal.whoKnows) ? scandal.whoKnows : [],
    evidence: Number(scandal.evidence || 0),
    severity: Number(scandal.severity || 1),
    public: Boolean(scandal.public),
    resolved: false,
    createdDay: state.day,
    notes: scandal.notes || ''
  };
  state.scandals.push(entry);
  return entry;
}

function addAffair(npcId, partnerId, notes) {
  const from = String(npcId || '').toLowerCase();
  const to = String(partnerId || '').toLowerCase();
  const affair = { npcId: from, partnerId: to, notes: notes || 'A quiet meeting in the dark.', active: true, day: state.day };
  state.affairs.push(affair);
  updateRelationship(from, { attraction: 5, romance: 10, trust: 2, jealousy: 3 });
  updateRelationship(to, { attraction: 5, romance: 8, trust: 2, jealousy: 3 });
  const relA = getRelationship(from);
  const relB = getRelationship(to);
  relA.affair = true;
  relB.affair = true;
  addScandal({
    type: 'secret relationship',
    characters: [nameFromNpc(from), nameFromNpc(to)],
    whoKnows: ['No one yet'],
    evidence: 1,
    severity: 2,
    public: false,
    notes: 'A quiet arrangement is beginning to carry whispers.'
  });
  return affair;
}

function nameFromNpc(npcId) {
  const record = getNpcRecord(npcId);
  return record ? record.name : String(npcId || 'NPC');
}

function createMarriage(npcId) {
  const record = getNpcRecord(npcId);
  if (!record || !record.adult || !record.alive) return false;
  const id = String(record.id).toLowerCase();
  if (state.spouses.includes(id) || state.marriages.includes(id)) return false;
  state.spouses.push(id);
  state.marriages.push(id);
  const rel = getRelationship(id);
  rel.married = true;
  rel.status = 'married';
  rel.trust = clamp((rel.trust || 0) + 12, 0, 100);
  rel.love = clamp((rel.love || 0) + 10, 0, 100);
  state.reputations.settlers += 4;
  state.reputations.merchants += 2;
  recordEvent('Marriage', `${record.name} became a spouse.`);
  return true;
}

function divorceMarriage(npcId) {
  const id = String(npcId || '').toLowerCase();
  state.spouses = state.spouses.filter((entry) => String(entry).toLowerCase() !== id);
  state.marriages = state.marriages.filter((entry) => String(entry).toLowerCase() !== id);
  const rel = getRelationship(id);
  rel.married = false;
  rel.romance = clamp((rel.romance || 0) - 20, 0, 100);
  rel.respect = clamp((rel.respect || 0) - 15, 0, 100);
  rel.resentment = clamp((rel.resentment || 0) + 25, 0, 100);
  state.reputations.settlers -= 3;
  return true;
}

function killNpc(npcId, reason) {
  const record = getNpcRecord(npcId);
  if (!record) return false;
  record.alive = false;
  if (!state.deadNPCs.includes(record.id)) state.deadNPCs.push(record.id);
  recordEvent('Character death', `${record.name} died: ${reason || 'during a story event.'}`);
  const rel = getRelationship(record.id);
  rel.status = 'dead';
  rel.affair = false;
  state.spouses = state.spouses.filter((id) => String(id).toLowerCase() !== String(record.id).toLowerCase());
  state.marriages = state.marriages.filter((id) => String(id).toLowerCase() !== String(record.id).toLowerCase());
  return true;
}

function isMarriedToPlayer(npcId) {
  const id = String(npcId || '').toLowerCase();
  return state.spouses.some((spouseId) => String(spouseId).toLowerCase() === id) || state.marriages.some((entry) => String(entry).toLowerCase() === id);
}

function getAliveAdultNpcs() {
  return state.npcRegistry.filter((npc) => npc.adult && npc.alive !== false);
}

function buildDynamicChoices() {
  const choices = [];
  choices.push({
    label: 'Forage for food and water',
    apply: () => {
      const beforeStats = { oddsValue: state.odds, healthValue: state.health, radiationValue: state.radiation, suppliesValue: state.supplies, foodValue: state.food, luckValue: state.luck };
      state.food += 2;
      state.supplies += 2;
      state.odds = clamp(state.odds - 2, 0, 99);
      state.day = Math.min(365, state.day + 1);
      state.region = Math.min(regions.length - 1, Math.floor(state.day / 80));
      state.previousStats = beforeStats;
      state.sceneText = 'You leave the road to search the ruins. The water is cloudy and the food is stale, but both are better than an empty pack.';
      recordEvent('Foraging', 'You recovered food and water from a forgotten supply cache.');
    }
  });
  getAliveAdultNpcs().forEach((npc) => {
    const rel = getRelationship(npc.id);
    if ((rel.attraction || 0) >= 35 && (rel.friendship || 0) >= 20) {
      choices.push({
        label: `Flirt with ${npc.name}`,
        apply: () => {
          updateRelationship(npc.id, { attraction: 12, romance: 8, trust: 6 });
          recordEvent('Relationship scene', `${npc.name} accepts your attention and the night softens around you.`);
          state.sceneText = `You and ${npc.name} share a quiet moment beneath the ash-dimmed sky. The world can wait until morning.`;
          addCurrency(4);
        }
      });
    }
    if ((rel.romance || 0) >= 55 && !isMarriedToPlayer(npc.id)) {
      choices.push({
        label: `Ask ${npc.name} on a date`,
        apply: () => {
          updateRelationship(npc.id, { romance: 18, respect: 10, trust: 8 });
          state.sceneText = `${npc.name} agrees to a private walk and an evening away from camp. The conversation grows warm and honest.`;
          recordEvent('Date scene', `${npc.name} and the player share a date under carefully watched skies.`);
          addCurrency(-6);
        }
      });
    }
    if ((rel.love || 0) >= 70 && !isMarriedToPlayer(npc.id)) {
      choices.push({
        label: `Propose to ${npc.name}`,
        apply: () => {
          if (state.crowns < 35) {
            state.sceneText = `The proposal is sincere, but the ceremony would cost more than you can spare. You promise a future when the settlement is steadier.`;
            return;
          }
          createMarriage(npc.id);
          state.sceneText = `You and ${npc.name} make vows in a quiet ceremony. The settlement learns of it in pieces, but the bond is real.`;
          addCurrency(-35);
          recordEvent('Marriage', `${npc.name} became a spouse.`);
        }
      });
    }
    if ((rel.love || 0) >= 55 && state.crowns >= 20 && state.affairs.length < 3) {
      choices.push({
        label: `Secretly meet ${npc.name} in private`,
        apply: () => {
          addAffair(npc.id, npc.id, 'A discreet meeting in a private corner of the settlement.');
          state.sceneText = `The two of you retreat somewhere private. The wasteland can wait until morning.`;
          addCurrency(-10);
        }
      });
    }
  });

  if (state.gamblingHistory.length >= 2) {
    choices.push({
      label: 'Visit the high-stakes caravan table',
      apply: () => {
        const wager = 25;
        const odds = 0.45 + Math.random() * 0.3;
        const win = Math.random() < odds;
        const result = win ? wager * 2 : -wager;
        addCurrency(result);
        state.gamblingHistory.push({ day: state.day, wager, result, label: 'High stakes' });
        state.sceneText = win
          ? `The table turns in your favor, and a quiet crowd starts to notice your name. The winnings are enough to matter.`
          : `The cards break against you, and the room remembers the loss. A suspicious dealer watches every move.`;
        if (!win && state.crowns < 20) {
          addScandal({
            type: 'gambling debt',
            characters: [state.playerName],
            whoKnows: ['The table owners'],
            evidence: 2,
            severity: 2,
            public: false,
            notes: 'A debt is collecting against your name.'
          });
        }
      }
    });
  }

  return choices.slice(0, 4);
}

function handleDynamicChoice(choice) {
  if (!choice || !choice.apply) return;
  choice.apply();
  if (state.sceneText) {
    $('sceneText').textContent = state.sceneText;
  }
  renderStats();
  renderWorldState();
  saveGame();
}

function vary(value, amount) { return Math.max(0, value + Math.floor(Math.random() * (amount * 2 + 1)) - amount); }

function createRoute(difficultyKey = 'survivor', mutant = false) {
  const mode = difficulties[difficultyKey] || difficulties.survivor;
  const questBlocks = bonusScenarios.reduce((blocks, scene) => { if (!scene.chain) { blocks.push([scene]); return blocks; } const block = blocks.find((entry) => entry[0]?.chain === scene.chain); if (block) block.push(scene); else blocks.push([scene]); return blocks; }, []);
  const singleScenes = scenarios.slice(0, -1).map((scene) => [scene]);
  const exclusiveBlocks = difficultyScenes[difficultyKey].map((scene) => [scene]);
  const allBlocks = [...singleScenes, ...questBlocks, ...eventScenes.map((scene) => [scene]), ...exclusiveBlocks];
  const favoredBlocks = allBlocks.filter(([scene]) => mode.preferredTypes.includes(scene.type) || mode.preferredChains.includes(scene.chain));
  const repeatedBlocks = favoredBlocks.slice(0, mode.repeatBlocks);
  const weightedBlocks = [...allBlocks, ...repeatedBlocks].sort((left, right) => {
    const leftFavored = mode.preferredTypes.includes(left[0].type) || mode.preferredChains.includes(left[0].chain);
    const rightFavored = mode.preferredTypes.includes(right[0].type) || mode.preferredChains.includes(right[0].chain);
    return (rightFavored ? 1 : 0) - (leftFavored ? 1 : 0) || Math.random() - 0.5;
  });
  return [...introScenes, ...weightedBlocks.flat(), lateRaceScene, ...(mutant ? mutantScenes : []), scenarios[scenarios.length - 1]];
}

function renderWorldState() {
  $('nameValue').textContent = state.playerName;
  $('baseValue').textContent = state.base;
  const renderListField = (id, values, fallback = 'NONE') => {
    const target = $(id);
    if (!target) return;
    const currentSelect = target.parentElement?.querySelector('select');
    const valueList = Array.isArray(values) ? values : [];
    if (valueList.length > 1) {
      const nextSelect = document.createElement('select');
      nextSelect.className = 'world-select';
      nextSelect.setAttribute('aria-label', id);
      valueList.forEach((entry) => {
        const option = document.createElement('option');
        option.value = entry;
        option.textContent = entry;
        nextSelect.appendChild(option);
      });
      if (currentSelect) currentSelect.replaceWith(nextSelect);
      else target.replaceWith(nextSelect);
      return;
    }
    const text = valueList.length ? valueList[0] : fallback;
    if (target.tagName === 'SELECT') {
      const replacement = document.createElement('strong');
      replacement.id = id;
      replacement.textContent = text;
      target.replaceWith(replacement);
      return;
    }
    target.textContent = text;
  };

  renderListField('alliesValue', state.allies);
  renderListField('loversValue', state.lovers);
  renderListField('enemiesValue', state.enemies);
  renderListField('itemsValue', state.items);
  $('materialsValue').textContent = state.materials;
  $('crownsValue').textContent = state.crowns;
  $('reputationValue').textContent = state.reputation;
  $('moralityValue').textContent = state.evil > 4 ? 'BECOMING EVIL' : state.evil > 1 ? 'COMPROMISED' : state.race;
}

function applyTravelNeeds(travelDays) {
  const foodBefore = state.food;
  const waterBefore = state.supplies;
  const mode = difficulties[state.difficulty];
  const foodDrain = (state.mutationActive ? 1.05 : .72) * travelDays;
  const waterDrain = (state.mutationActive ? .95 : .62) * travelDays;
  state.food = Math.max(0, state.food - foodDrain);
  state.supplies = Math.max(0, state.supplies - waterDrain);
  state.radiation = clamp(state.radiation + mode.radiationDrift * travelDays, 0, 100);
  const foodShortage = foodBefore <= 0;
  const waterShortage = waterBefore <= 0;
  const damage = (foodShortage ? 2 : 0) + (waterShortage ? 2 : 0);
  if (damage) state.health = Math.max(0, state.health - damage * travelDays);
  return { foodShortage, waterShortage, damage: damage * travelDays, radiationDrift: mode.radiationDrift * travelDays };
}

function resolveRadiationThreshold() {
  if (state.radiation < 100 || state.mutationResolved) return { status: 'stable' };
  state.mutationResolved = true;
  if (Math.random() < .5) {
    state.health = 0;
    return { status: 'death', message: 'The radiation crosses the final threshold. Your body cannot hold together.' };
  }
  state.mutationActive = true;
  state.race = 'MUTANT';
  state.radiation = 42;
  state.health = clamp(state.health + 12, 1, 100);
  state.odds = clamp(state.odds - 8, 0, 99);
  state.route = createRoute(state.difficulty, true);
  state.scenario = Math.min(state.scenario, state.route.length - 1);
  return { status: 'mutation', message: 'The radiation remakes you instead of killing you. You live as a mutant: stronger, hungrier, and harder for the world to trust.' };
}

function setDifficulty(key) {
  if (state.started) return;
  const mode = difficulties[key];
  state.difficulty = key;
  state.odds = vary(mode.odds, 5);
  state.health = vary(mode.health, 6);
  state.supplies = vary(mode.supplies, 1);
  state.food = vary(mode.food, 1);
  state.mutationResolved = false;
  state.mutationActive = false;
  state.radiation = vary(mode.radiation, 3);
  state.luck = vary(mode.luck, 5);
  state.scenario = 0;
  state.day = 1;
  state.region = 0;
  state.lastEvent = false;
  state.eventCooldown = 3;
  state.route = createRoute(key);
  state.previousStats = null;
  state.allies = [];
  state.lovers = [];
  state.enemies = [];
  state.items = [];
  state.sins = [];
  state.reputation = 0;
  state.evil = 0;
  state.base = 'NONE';
  state.materials = 0;
  state.race = 'HUMAN';
  state.crowns = 25;
  state.relationshipMap = {};
  state.marriages = [];
  state.spouses = [];
  state.affairs = [];
  state.scandals = [];
  state.secrets = [];
  state.gamblingHistory = [];
  state.reputations = { settlers: 0, merchants: 0, criminals: 0, military: 0, religious: 0, political: 0 };
  state.npcRegistry = npcCatalog.map((npc) => ({ ...npc, relationship: { ...relationshipDefaults(), ...(npc.relationship || {}) } }));
  state.deadNPCs = [];
  state.eventHistory = [];
  $('eventBanner').hidden = true;
  $('statusMessage').textContent = `FIELD NOTE // ${mode.label} RUN INITIALIZED. SURVIVE TO DAY 365.`;
  renderScenario();
}

function renderDifficultyButtons() {
  $('difficultyButtons').innerHTML = '';
  Object.entries(difficulties).forEach(([key, mode]) => {
    const button = document.createElement('button');
    button.className = `difficulty-button ${key === state.difficulty ? 'is-active' : ''}`;
    button.textContent = mode.label;
    button.type = 'button';
    button.disabled = state.started;
    button.addEventListener('click', () => setDifficulty(key));
    $('difficultyButtons').appendChild(button);
  });
}

function renderStartingDifficulty() {
  $('startingDifficulty').innerHTML = '';
  Object.entries(difficulties).forEach(([key, mode]) => {
    const button = document.createElement('button');
    button.className = `difficulty-button ${key === state.difficulty ? 'is-active' : ''}`;
    button.textContent = mode.label;
    button.type = 'button';
    button.addEventListener('click', () => { state.difficulty = key; renderStartingDifficulty(); });
    $('startingDifficulty').appendChild(button);
  });
}

function showInlineContinue(text) {
  $('sceneText').textContent = text;
  $('choices').innerHTML = '';
  const next = document.createElement('button');
  next.className = 'choice';
  next.type = 'button';
  next.textContent = 'Continue onward';
  next.addEventListener('click', nextScene);
  $('choices').appendChild(next);
}

function personalizeNarrative(scene, text) {
  if (!text || !state.playerName) return text;
  const namedTitles = new Set(['FIND WATER', 'A LIGHT IN THE DEAD RAIL YARD', 'THE GIRL WITH THE SILVER MASK', 'THE WATER LEDGER', 'THE RED TRACKER', 'THE BLACK SUN TRIAL', 'A PLACE THAT REMEMBERS']);
  if (!namedTitles.has(scene.title)) return text;
  return `${state.playerName}, ${text.charAt(0).toLowerCase()}${text.slice(1)}`;
}

function renderInterlude() {
  const el = $('storyInterlude');
  if (!el) return;
  const interludes = [
    'SOMETHING HAPPENS // The dust settles; the radio hums without any voice behind it.',
    'DUST WATCH // Something scuttles beneath the ash outside the shelter wall.',
    'LOW LIGHT // A faint chorus carries on the wind, then disappears before you can place it.',
    'MILEPOST // The road folds beneath your boots like a remembered dream.',
    'SILENT SIGNAL // The horizon flickers green, then settles back into ruin.'
  ];
  const showInterlude = state.day % 3 === 0;
  if (!showInterlude) {
    el.hidden = true;
    el.textContent = '';
    return;
  }
  el.hidden = false;
  el.textContent = interludes[Math.floor(Math.random() * interludes.length)];
}

function renderScenario() {
  const scene = state.route[state.scenario] || scenarios[0];
  const [region, anomaly] = regions[state.region];
  $('chapterNumber').textContent = String(state.scenario + 1).padStart(2, '0');
  $('headerDay').textContent = String(state.day).padStart(3, '0');
  $('sceneType').textContent = scene.type;
  $('location').textContent = `${region} // DAY ${String(state.day).padStart(3, '0')}`;
  $('storyPanel').classList.remove('prompt-danger', 'prompt-important', 'prompt-arcane');
  if (/THREAT|BOSS|IMPOSSIBLE|MUTATION/.test(scene.type)) $('storyPanel').classList.add('prompt-danger');
  else if (/FIRST DECISION|QUEST|HAVEN GATE|SURVIVOR/.test(scene.type)) $('storyPanel').classList.add('prompt-important');
  else if (/ARCANE|ELVEN|WITCHLIGHT/.test(`${scene.type} ${scene.title}`)) $('storyPanel').classList.add('prompt-arcane');
  $('sceneTitle').textContent = scene.title;
  $('sceneText').textContent = personalizeNarrative(scene, scene.text || state.sceneText || '');
  $('promptText').textContent = 'WHAT DO YOU DO?';
  $('regionValue').textContent = region;
  $('anomalyValue').textContent = anomaly;
  $('logLine').textContent = `LOG ${String(state.scenario + 1).padStart(2, '0')} // ${difficulties[state.difficulty].label} RUN`;
  $('statusMessage').textContent = scene.chain ? `QUEST CHAIN // ${scene.chain} // THIS CHOICE WILL BE REMEMBERED.` : 'FIELD NOTE // THE WASTELAND IS LISTENING.';
  $('openingQuote').textContent = openingQuotes[Math.floor(Math.random() * openingQuotes.length)];
  renderInterlude();
  renderStats();
  renderDifficultyButtons();
  renderWorldState();
  $('choices').innerHTML = '';

  if (scene.event) {
    applyEventScene(scene);
    const radiationResult = resolveRadiationThreshold();
    if (radiationResult.status === 'death') { showEnding(false); return; }
    showInlineContinue('The world shifts while you keep moving. The signal trembles, a flicker splitting the silence.');
    return;
  }

  const staticChoices = scene.choices || [];
  const dynamicChoiceSet = buildDynamicChoices();
  const allChoices = [...staticChoices, ...dynamicChoiceSet];
  allChoices.forEach((choice, index) => {
    const button = document.createElement('button');
    const isDynamic = choice && typeof choice === 'object' && choice.label && choice.apply;
    const label = isDynamic ? choice.label : choice[0];
    const requiredItems = isDynamic ? [] : (choice[6]?.requires || []);
    const missingItems = requiredItems.filter((item) => !state.items.includes(item));
    button.className = 'choice';
    button.type = 'button';
    button.disabled = missingItems.length > 0 || (isDynamic === false && !choice);
    button.textContent = missingItems.length ? `${label} [REQUIRES ${missingItems.join(', ')}]` : label;
    button.addEventListener('click', () => {
      if (isDynamic) {
        handleDynamicChoice(choice);
        showInlineContinue(state.sceneText || 'The road keeps opening ahead of you.');
      } else {
        choose(index);
      }
    });
    $('choices').appendChild(button);
  });
}

function applyEventScene(scene) {
  const beforeStats = { oddsValue: state.odds, healthValue: state.health, radiationValue: state.radiation, suppliesValue: state.supplies, luckValue: state.luck };
  state.previousStats = beforeStats;
  const effects = scene.effects || {};
  state.odds = Math.max(0, Math.min(99, state.odds + (effects.odds || 0)));
  state.health = Math.max(0, Math.min(100, state.health + (effects.health || 0)));
  state.radiation = Math.max(0, Math.min(100, state.radiation + (effects.radiation || 0)));
  state.supplies = Math.max(0, state.supplies + (effects.supplies || 0));
  state.luck = Math.max(0, Math.min(100, state.luck + (effects.luck || 0)));
  state.materials += effects.materials || 0;
  $('promptText').textContent = 'EVENT // NO DECISION';
  $('statusMessage').textContent = 'FIELD NOTE // SOMETHING HAPPENED WHILE YOU WERE MOVING.';
  renderStats();
  renderWorldState();
}

function nextScene() { state.scenario += 1; while (state.route[state.scenario]?.lateOnly && state.day < 240) state.scenario += 1; if (state.scenario >= state.route.length) { state.route = createRoute(state.difficulty); state.scenario = 0; } state.lastEvent = false; $('eventBanner').hidden = true; renderScenario(); }

function applyStoryEffects(choice) {
  const effects = choice[6];
  if (!effects) return;
  ['ally', 'friend', 'lover', 'enemy', 'item', 'sin'].forEach((key) => {
    if (effects[key]) {
      const target = key === 'ally' || key === 'friend' ? state.allies : key === 'lover' ? state.lovers : key === 'enemy' ? state.enemies : key === 'item' ? state.items : state.sins;
      if (!target.includes(effects[key])) target.push(effects[key]);
    }
  });
  if (effects.base) state.base = effects.base;
  state.materials += effects.materials || 0;
  state.food = Math.max(0, state.food + (effects.food || 0));
  state.supplies = Math.max(0, state.supplies + (effects.supplies || 0));
  if (effects.race) state.race = effects.race;
  state.reputation += effects.reputation || 0;
  state.evil += effects.evil || 0;
  state.odds = Math.max(0, Math.min(99, state.odds + (effects.odds || 0)));
  state.luck = Math.max(0, Math.min(100, state.luck + (effects.luck || 0)));
  state.radiation = Math.max(0, Math.min(100, state.radiation + (effects.radiation || 0)));
  renderWorldState();
}

function renderStats() {
  const values = { oddsValue: `${state.odds}%`, healthValue: state.health, radiationValue: state.radiation.toFixed(1), suppliesValue: state.supplies.toFixed(1), foodValue: state.food.toFixed(1), luckValue: state.luck };
  Object.entries(values).forEach(([id, value]) => {
    const element = $(id);
    const numericValue = Number.parseFloat(value);
    const previous = state.previousStats?.[id];
    element.textContent = value;
    element.classList.remove('stat-rise', 'stat-fall');
    if (previous !== undefined && previous !== numericValue) {
      element.classList.add(numericValue > previous ? 'stat-rise' : 'stat-fall');
    }
    element.classList.toggle('critical-low', ((id === 'suppliesValue' || id === 'foodValue') && numericValue <= 1) || (id === 'radiationValue' && numericValue >= 85));
    if (id === 'healthValue') element.classList.toggle('damage-taken', previous !== undefined && numericValue < previous);
  });
  $('oddsMeter').style.width = `${state.odds}%`;
  $('oddsMeter').style.background = state.odds < 35 ? '#ef704b' : '#a8ff60';
  $('headerDay').textContent = String(state.day).padStart(3, '0');
  state.previousStats = { oddsValue: state.odds, healthValue: state.health, radiationValue: state.radiation, suppliesValue: state.supplies, foodValue: state.food, luckValue: state.luck };
}

function maybeEvent() {
  if (state.lastEvent || state.eventCooldown > 0 || Math.random() > 0.2) {
    state.eventCooldown = Math.max(0, state.eventCooldown - 1);
    return null;
  }
  const event = events[Math.floor(Math.random() * events.length)];
  state.lastEvent = true;
  state.eventCooldown = 4 + Math.floor(Math.random() * 7);
  state.odds = Math.max(0, Math.min(99, state.odds + event[2]));
  state.supplies = Math.max(0, state.supplies + event[3]);
  state.luck = Math.max(0, Math.min(100, state.luck + event[4]));
  $('eventBanner').hidden = true;
  renderStats();
  return event;
}

function choose(index) {
  const choiceList = state.route[state.scenario].choices;
  const choice = choiceList[index];
  if (!choice) return;
  const mode = difficulties[state.difficulty];
  const beforeStats = { oddsValue: state.odds, healthValue: state.health, radiationValue: state.radiation, suppliesValue: state.supplies, foodValue: state.food, luckValue: state.luck };
  const luckSwing = Math.floor((Math.random() * 9) - 4) + Math.floor(state.luck / 25);
  const travelDays = Math.random() < 0.2 ? 2 + Math.floor(Math.random() * 3) : 1;
  state.odds = Math.max(0, Math.min(99, state.odds + choice[1] + luckSwing));
  state.supplies = Math.max(0, state.supplies + choice[2] - mode.drain);
  state.health = Math.max(0, Math.min(100, state.health + choice[3]));
  state.radiation = Math.max(0, Math.min(100, state.radiation + choice[4]));
  state.luck = Math.max(0, Math.min(100, state.luck + Math.floor(Math.random() * 7) - 2));
  state.day = Math.min(365, state.day + travelDays);
  state.region = Math.min(regions.length - 1, Math.floor(state.day / 80));
  state.previousStats = beforeStats;
  applyStoryEffects(choice);
  const needs = applyTravelNeeds(travelDays);
  document.querySelectorAll('.choice').forEach((button) => { button.disabled = true; });
  const randomEvent = maybeEvent();
  const radiationResult = resolveRadiationThreshold();
  const currentScene = state.route[state.scenario];
  const choiceResult = personalizeNarrative(currentScene, choice[5]);
  $('sceneText').textContent = randomEvent ? `${choiceResult}\n\n${randomEvent[0]}\n${randomEvent[1]}` : choiceResult;
  $('promptText').textContent = randomEvent ? 'EVENT INTERRUPTS THE ROAD...' : 'THE ROAD CONTINUES...';
  $('choices').innerHTML = '';
  renderStats();
  const shortageNote = needs.damage ? ` SHORTAGE DAMAGE // -${needs.damage} HEALTH.` : '';
  $('statusMessage').textContent = `FIELD NOTE // ${travelDays} DAY${travelDays === 1 ? '' : 'S'} ON THE ROAD. DAY ${state.day} / 365. ${state.supplies.toFixed(1)} WATER, ${state.food.toFixed(1)} FOOD, ${state.radiation.toFixed(1)} RAD, ${state.health} HEALTH.${shortageNote}`;
  saveGame();
  if (radiationResult.status === 'death' || state.health <= 0) { showEnding(false); return; }
  if (state.day >= 365) { showEnding(true); return; }
  const mutationNote = radiationResult.status === 'mutation' ? `\n\n${radiationResult.message}` : '';
  showInlineContinue(randomEvent ? `${choiceResult}\n\n${randomEvent[0]}\n${randomEvent[1]}${mutationNote}` : `${choiceResult}${mutationNote}`);
}

function showEnding(reached365 = false) {
  const survived = state.health > 0 && reached365;
  $('sceneTitle').textContent = survived ? 'DAY 365 // THE SUN RISES' : 'YOU DIED IN THE AFTERLIGHT';
  $('sceneText').textContent = survived ? 'You wake to birdsong. Real birdsong. The radiation has not vanished, the ruins have not forgiven anyone, but you have outlasted the calendar that ended the old world. The settlement paints your name on its water tower: THE ONE WHO STAYED ALIVE.' : 'The road continues without you. Hunger, thirst, or the wounds you carried finally became heavier than your will to move.';
  $('promptText').textContent = survived ? 'YOU SURVIVED THE AFTERLIGHT' : 'RUN OVER // RESTART REQUIRED';
  $('choices').innerHTML = '';
  if (!survived) {
    const restartChoice = document.createElement('button');
    restartChoice.className = 'choice';
    restartChoice.type = 'button';
    restartChoice.textContent = 'Restart with a new survivor';
    restartChoice.addEventListener('click', restart);
    $('choices').appendChild(restartChoice);
  }
  $('storyPanel').classList.toggle('outcome', true);
  $('storyPanel').classList.toggle('outcome--win', survived);
  $('logLine').textContent = survived ? 'RUN COMPLETE // 365 DAYS SURVIVED' : 'RUN COMPLETE // SIGNAL LOST';
  $('statusMessage').textContent = survived ? 'FIELD NOTE // THE CALENDAR ROLLED OVER. YOU DID NOT.' : 'FIELD NOTE // HEALTH REACHED ZERO. THE RUN IS OVER.';
}

function restart() {
  localStorage.removeItem('afterlight-save-v2');
  Object.assign(state, defaultState());
  briefingStep = 0;
  $('survivorName').value = '';
  $('eventBanner').hidden = true;
  $('storyPanel').classList.remove('outcome', 'outcome--win');
  $('startScreen').hidden = false;
  renderBriefing();
  setDifficulty(state.difficulty);
}

function toggleSound() {
  const audio = $('backgroundMusic');
  if (!musicTracks.length || !audio) {
    $('soundButton').textContent = 'SOUND: UNAVAILABLE';
    return;
  }

  if (state.audio) {
    state.audio.pause();
    state.audio.currentTime = 0;
    state.audio = null;
    $('soundButton').textContent = 'SOUND: OFF';
    $('soundButton').setAttribute('aria-pressed', 'false');
    return;
  }

  audio.src = musicTracks[0];
  audio.volume = 0.35;
  let trackIndex = 0;
  audio.onended = () => {
    if (state.audio !== audio) return;
    trackIndex = (trackIndex + 1) % musicTracks.length;
    audio.src = musicTracks[trackIndex];
    audio.load();
    audio.play().catch(() => {
      state.audio = null;
      $('soundButton').textContent = 'SOUND: OFF';
      $('soundButton').setAttribute('aria-pressed', 'false');
    });
  };
  state.audio = audio;
  audio.load();
  audio.play().then(() => {
    $('soundButton').textContent = 'SOUND: ON';
    $('soundButton').setAttribute('aria-pressed', 'true');
  }).catch(() => {
    state.audio = null;
    $('soundButton').textContent = 'SOUND: OFF';
    $('soundButton').setAttribute('aria-pressed', 'false');
  });
}

function toggleTutorial(visible) {
  $('tutorialPanel').hidden = !visible;
}

const briefingSlides = [
  ['BEFORE THE ASH', 'The old world ended in fire, but the radiation kept changing it after the flames went out.'],
  ['THE LONG SILENCE', 'You were found beneath a collapsed relay station with no memory of the last three days. Your pack was empty, and the ash storms had erased every trail behind you.'],
  ['WHAT REMAINS', 'Settlements trade in water, bullets, old promises, and stranger things. Elves, mutants, zombies, and ordinary people all want a piece of tomorrow.'],
  ['YOUR FIELD LOG', 'Before you enter the wastes, tell the field log what to call you and choose a starting difficulty. The first days are simple. They will not stay that way.']
];
let briefingStep = 0;

function renderBriefing() {
  $('briefingTitle').textContent = briefingSlides[briefingStep][0];
  $('briefingText').textContent = briefingSlides[briefingStep][1];
  $('briefingProgress').style.width = `${((briefingStep + 1) / briefingSlides.length) * 100}%`;
  const isSetup = briefingStep === briefingSlides.length - 1;
  $('nameField').hidden = !isSetup;
  $('briefingButton').textContent = isSetup ? 'ENTER THE WASTES' : 'NEXT TRANSMISSION';
  if (isSetup) renderStartingDifficulty();
}

function finishBriefing() {
  const name = $('survivorName').value.trim();
  if (!name) { $('survivorName').focus(); return; }
  const activeButton = $('startingDifficulty').querySelector('.is-active');
  const selectedDifficulty = Object.entries(difficulties).find(([, mode]) => mode.label === activeButton?.textContent)?.[0];
  state.difficulty = selectedDifficulty || state.difficulty;
  state.playerName = name.toUpperCase();
  setDifficulty(state.difficulty);
  state.started = true;
  $('startScreen').hidden = true;
  renderDifficultyButtons();
  saveGame();
}

$('briefingButton').addEventListener('click', () => { if (briefingStep < briefingSlides.length - 1) { briefingStep += 1; renderBriefing(); } else finishBriefing(); });
$('restartButton').addEventListener('click', restart);
$('soundButton').addEventListener('click', toggleSound);
$('tutorialButton').addEventListener('click', () => toggleTutorial($('tutorialPanel').hidden));
$('closeTutorial').addEventListener('click', () => toggleTutorial(false));
renderBriefing();
setDifficulty(state.difficulty);

