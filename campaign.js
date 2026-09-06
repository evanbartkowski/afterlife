// Ordered campaign beats. Random encounters are inserted only at marked journey breaks.
const storyChoice = (label, result, story = {}, effects = {}, health = 0) =>
  [label, 0, 0, health, 0, result, { ...effects, story }];
const campaignBeats = [
  { id: 'signal', act: 'I // THE VOICE IN THE ASH', title: 'THREE MISSING DAYS', kind: 'context', region: 0,
    objective: 'Find the woman broadcasting from the rail yard.',
    text: 'You wake beneath a collapsed relay station with a burn around your wrist and three days missing from your memory. Inside your coat is a brass access key. Someone has scratched AFTERLIFE into its edge.\n\nAt dusk your radio plays a recording in your own voice: "If I return without the ledger, do not let them turn it on." Then a woman interrupts. "This is Mara. I found your signal. Get water, get warm, then come to the rail yard. You have something people will kill for."\n\nBeyond the Greenbelt, Haven shelters thousands beneath an old storm shield. The shield is failing. Its last engineers expect the winter ashfall to arrive before the year ends.',
    effects: { item: 'AFTERLIFE KEY' } },
  { id: 'mara', act: 'I // THE VOICE IN THE ASH', title: 'THE WOMAN AT THE SIGNAL', region: 0,
    objective: 'Decide how much Mara gets to know.',
    text: 'Mara lowers her rifle when she sees the burn on your wrist. She is a scout in her thirties, exhausted enough to stop pretending otherwise. She helped pull you from the relay station. You begged her not to take you to Haven, then lost consciousness.\n\n"I left to find medicine. When I came back, you were gone." She sets a sealed water tin between you. "Captain Oric is asking about a stolen ledger. Tell me what you remember."',
    choices: [
      storyChoice('Show her the key and admit the memory loss', 'Mara turns the key over without taking it. "Then we find out together." She gives you the medicine she went back for.', { openness: 'honest', metMara: true }, { ally: 'MARA', supplies: 4, food: 3 }, 4),
      storyChoice('Tell her about the broadcast; keep the key hidden', 'She notices you protecting your coat pocket. "Keep your secrets. Just warn me before they start shooting." She shares her supplies anyway.', { openness: 'guarded', metMara: true }, { ally: 'MARA', supplies: 4, food: 3 }, 2)
    ], journey: true },
  { id: 'arrival', act: 'I // THE VOICE IN THE ASH', title: 'WHAT HAVEN COSTS', kind: 'context', day: 35, region: 2, camp: true,
    objective: 'Learn why Haven needs the ledger.',
    text: 'The journey takes weeks. Mara teaches you which wells to boil and which voices on the radio to ignore. At your base you mend boots, trade salvage, and put food aside before the final approach to Haven.\n\nInside its shield, laundry hangs between gun towers. There is a school in an old betting shop. Each evening an official reads the names of people refused entry because the pumps cannot support them. Nobody applauds. Nobody opens the gate.\n\nCaptain Oric meets you beside a wall of those names. "I count the people I keep alive," he says. "Someone has to." He recognizes your key immediately.' },
  { id: 'offer', act: 'I // THE VOICE IN THE ASH', title: 'THE CAPTAIN’S TERMS', region: 2,
    objective: 'Secure access to the shield archives.',
    text: 'Oric offers you shelter and access to the archives if you agree to bring the recovered ledger to him first. He says its technical records could save Haven. Dr. Sable, the shield engineer, stands beside him and will not meet your eyes.\n\nMara refuses the chair he offers her. "Ask him what happened to the south gate." Oric’s jaw tightens. "Ask her why she was not there." This argument began long before you arrived.',
    choices: [
      storyChoice('Promise Oric the first copy', 'Oric signs your archive pass. Mara walks out ahead of you. Sable stays long enough to whisper: "First does not have to mean only."', { pledge: 'oric' }, { supplies: 5, food: 5, reputation: 2 }),
      storyChoice('Insist the records belong to the people outside too', 'Oric signs reluctantly. "Then you can explain the ration cuts." Sable slips you an archive address. For a moment she looks relieved.', { pledge: 'public' }, { supplies: 3, food: 3, reputation: 4 })
    ] },
  { id: 'supper', act: 'II // PEOPLE WORTH LOSING', title: 'A CHAIR LEFT EMPTY', kind: 'context', day: 90, region: 2, camp: true,
    objective: 'Find the missing south-gate records.',
    text: 'By early summer, archive work has become a routine: dead terminals by day, repair shifts by evening, shared meals at your base when the roads allow it. Sable always brings more bread than she eats. Mara always checks the exits.\n\nTonight there is an empty chair. It belonged to Iven, Mara’s husband, who died outside the south gate two winters ago. He was thirty-six. Oric ordered the gate sealed during a storm. Mara was away guiding another convoy.\n\n"I used to hate him for dying while I was busy saving strangers," she says. "It was easier than missing him." Nobody tries to make that sound noble.' },
  { id: 'intimacy', act: 'II // PEOPLE WORTH LOSING', title: 'THE ROOM ABOVE THE KITCHEN', region: 2,
    objective: 'Choose what your relationship with Mara becomes.',
    text: () => `After supper, Mara asks you to stay. Rain taps against a patched window. She talks about the life she wanted before the ash: a garden, bad music, someone who came home.\n\n${state.story.openness === 'honest' ? '"You trusted me when you had nothing to prove who you were," she says. "That mattered."' : '"I know you have not told me everything," she says. "I need you to know I noticed."'}\n\nShe takes your hand, then pauses. "I want this. But only if you do. You do not owe me anything for getting you out of that station."`,
    choices: [
      storyChoice('Kiss her and stay the night', 'You answer by moving closer. She meets you halfway. Later, with the lamp extinguished, you talk until the need to explain yourselves gives way to sleep. In the morning she leaves you the last clean cup.', { bond: 'romance' }, { lover: 'MARA', luck: 3 }),
      storyChoice('Stay, but tell her you want friendship', '"Then stay as my friend." She makes room beside the window. You watch the rain until dawn, and neither of you has to pretend it was a lesser kindness.', { bond: 'friendship' }, { luck: 2 }),
      storyChoice('Tell her you cannot let anyone that close', 'Mara lets go immediately. "All right." She walks you downstairs. Nothing is demanded of you, but the empty space between you is real.', { bond: 'distance' })
    ], journey: true },
  { id: 'ledger', act: 'II // PEOPLE WORTH LOSING', title: 'YOUR SIGNATURE', region: 3,
    objective: 'Decide who learns the truth about AFTERLIFE.',
    text: 'The marsh archive opens to the brass key. AFTERLIFE was the shield’s original operating system. It drew storm energy away from Haven by directing it into the outer settlements. The ledger lists those settlements as acceptable losses.\n\nYour signature authorized the first field test. A later recording shows you trying to stop the next one. When security arrived, you overloaded the relay to destroy its transmitter. The resulting electrical injury explains the missing days. It does not erase the signature.\n\nSable sits down on the wet floor. "I designed the model. You approved it. We both believed the evacuation reports. Then we learned they were fabricated."',
    choices: [
      storyChoice('Transmit the full ledger, including your signature', 'Your confession travels with the evidence. Some listeners call you a murderer. Others ask where their families were sent. Mara stays beside the transmitter until the last page is out.', { ledger: 'public' }, { item: 'AFTERLIFE LEDGER', reputation: -3 }),
      storyChoice('Keep a complete copy; delay publication until the shield is repaired', 'You secure the ledger. Sable agrees to help, but makes you say aloud whose suffering you are asking to wait. Mara says nothing.', { ledger: 'hidden' }, { item: 'AFTERLIFE LEDGER', reputation: 1 })
    ] },
  { id: 'letters', act: 'III // THE PRICE OF TRUST', title: 'LETTERS THAT FIND YOU', kind: 'context', day: 160, region: 2, camp: true,
    objective: 'Return to Haven with a plan to replace the shield.',
    text: () => state.story.ledger === 'public'
      ? 'Summer brings letters to your base. A father encloses a photograph and asks you to name the official who signed his evacuation order. A woman writes that she hates you, then sends the location of a surviving relay.\n\nSable answers every technical question under her own name. You help her build a map of the places the shield was meant to forget. The map offers a different design: several smaller shields sharing the load. It will need Haven’s stored power and the outer settlements’ cooperation.\n\nOric calls the broadcasts an invitation to civil war. The people outside his gate call them proof.'
      : 'Summer brings repair shifts and increasingly careful conversations. You and Sable discover that several smaller shields could share the storm load without sacrificing the outer settlements. The design will need Haven’s stored power and cooperation from people who still do not know what was done to them.\n\nMara finds you reading the casualty pages one evening. "Every day you wait, someone grieves without knowing who to blame." She does not raise her voice. That makes it harder to dismiss.\n\nOric thanks you publicly for protecting the city from dangerous rumors. You hear what your silence has bought him.' },
  { id: 'betrayal', act: 'III // THE PRICE OF TRUST', title: 'THE DOOR OPENED FROM INSIDE', kind: 'event', region: 2,
    objective: 'Survive Oric’s seizure of the ledger.',
    text: 'The soldiers arrive during supper. They know which floorboard hides the ledger. They know the watch schedule. Mara stands by the open door with a folded release order in her hand.\n\nOric has been holding her younger brother Tomas in a labor prison. He offered a transfer out of the radiation works in exchange for your location and the ledger. "He promised no one would be hurt," she says.\n\nA soldier strikes Sable when she reaches for the copies. Mara turns on him, buys you a passage through the kitchen, and follows you into the drains. The ledger is gone. Sable escapes with a broken hand. The release order has no signature.',
    effects: { health: -6, supplies: -1 } },
  { id: 'reckoning', act: 'III // THE PRICE OF TRUST', title: 'WHAT AN APOLOGY CANNOT DO', region: 2,
    objective: 'Decide whether Mara remains part of the mission.',
    text: () => `${state.story.bond === 'romance' ? 'Mara reaches toward you, then stops. The familiarity of the gesture hurts worse than the wound.' : state.story.bond === 'friendship' ? 'Mara sits across from you. The person you trusted with your quietest hours cannot look at you.' : 'Mara keeps her distance. You wonder whether you expected this, or merely wanted to.'}\n\n"I chose him over you," she says. "I thought I could keep both of you alive. I knew I might be wrong, and I did it anyway."\n\nSable binds her hand. "We need the prison relay to recover the shield plans. Mara knows the route. That is a practical fact, not a reason you owe her forgiveness."`,
    choices: [
      storyChoice('Let her help, but end any romance and require full honesty', 'Mara gives you her radio codes and accepts a separate watch. Trust becomes something she will have to earn in small, unglamorous acts.', { mara: 'probation', bond: 'friendship' }, { removeLover: 'MARA' }),
      storyChoice('Keep your bond; tell her repair will take time', 'You do not say it is all right. You say she can stay. She starts by giving Sable the names of every officer involved. Whatever remains between you will have to live with the truth.', { mara: 'reconcile' }),
      storyChoice('Send her away and take the route map', 'She leaves the map, her supplies, and the release order. You let her walk away. Sable does not ask you to call it mercy or cruelty.', { mara: 'exiled', bond: 'distance' }, { removeAlly: 'MARA', removeLover: 'MARA', supplies: 3 })
    ], journey: true },
  { id: 'prison', act: 'IV // THE PEOPLE OUTSIDE', title: 'A PRISON BUILT TO POWER A CITY', region: 4,
    objective: 'Recover the relay plans and decide whom to evacuate.',
    text: () => `The prison draws power from a buried relay. Tomas is alive in its infirmary. He is twenty-eight and can barely stand. The stolen ledger is locked in the relay office; Sable can copy its shield plans while you hold the corridor.\n\n${state.story.mara === 'exiled' ? 'You find Mara already inside, carrying her brother toward the exit. She does not ask to rejoin you.' : 'Mara finds her brother and kneels beside him. For once she has no words.'}\n\nThe labor wards hold sixty more prisoners. Opening them will trigger the alarm and cost you the quiet route out.`,
    choices: [
      storyChoice('Open every ward and escort the prisoners out', 'The alarm carries across the valley. You leave blood on the stairs, but the prisoners hold the doors for one another. Tomas survives the crossing. By dawn, the outer settlements know who opened the wards.', { prisoners: 'freed' }, { item: 'DISTRIBUTED SHIELD PLANS', reputation: 7, supplies: 3 }, -5),
      storyChoice('Take Tomas and the plans through the service exit', 'You get Tomas out alive. Behind the sealed wards, people call after you until the tunnel bends. The plans are intact. Sable refuses to describe the operation as clean.', { prisoners: 'left' }, { item: 'DISTRIBUTED SHIELD PLANS', reputation: -3 })
    ] },
  { id: 'winterwork', act: 'IV // THE PEOPLE OUTSIDE', title: 'THE WORK OF STAYING', kind: 'context', day: 250, region: 4, camp: true,
    objective: 'Win support for a shared shield network.',
    text: () => `Autumn is spent building relay housings and teaching people who distrust Haven how to repair them. Food comes from communal kitchens; most days are work, not adventure. Sable learns to solder with her other hand. Tomas recovers slowly. He thanks you, then asks about the people still inside.\n\n${state.story.prisoners === 'freed' ? 'Former prisoners bring tools, witnesses, and families willing to help. Your first relay stands because they stay after dark to finish it.' : 'Few volunteers arrive. The families of the prisoners you left demand a rescue before they offer labor. You cannot argue them out of knowing what happened.'}\n\n${state.story.mara === 'exiled' ? 'Mara sends route reports through Tomas. The messages contain no request to come back.' : state.story.bond === 'romance' ? 'Mara keeps every promise she makes, including the small ones. One night you reach for her hand first. It is a beginning, not an acquittal.' : 'Mara works the dangerous shifts without announcing it. Some evenings you can sit together again.'}` },
  { id: 'assembly', act: 'IV // THE PEOPLE OUTSIDE', title: 'WHO GETS TO OWN TOMORROW', region: 4,
    objective: 'Choose the terms of the coalition.',
    text: () => `Delegates from the outer settlements arrive at your base. They want independent control of their relays and a public record of the shield experiments. They refuse to exchange one unseen switch in Haven for another in your hands.\n\n${state.story.ledger === 'hidden' ? 'You put your remaining notes on the table and admit what you withheld. The meeting stops while everyone reads your name.' : 'A delegate places your published confession on the table. "Truth was the beginning. Here are the terms."'}\n\nSable offers to testify. "I want to finish the repair," she says. "That does not make me the person who should decide my sentence."`,
    choices: [
      storyChoice('Accept local control and submit yourself to a later hearing', 'The delegates sign. You hand over complete copies of the control designs and your testimony. For the first time the network belongs to people who can refuse you.', { coalition: 'shared', ledger: 'public' }, { reputation: 5, supplies: 5, food: 5 }),
      storyChoice('Demand emergency control until the storm passes', 'Enough delegates sign to begin. Others leave. You promise that emergency authority will expire, and hear how much you sound like Oric.', { coalition: 'command', ledger: 'public' }, { reputation: -2, supplies: 3, food: 3 })
    ], journey: true },
  { id: 'siege', act: 'V // THE LAST SWITCH', title: 'THE CITY WITHOUT ITS CAPTAIN', kind: 'event', day: 330, region: 7, camp: true,
    objective: 'Reach Haven’s central power reserve.',
    text: 'The first black snow falls before winter. Haven’s shield flickers. Oric orders the outer relays disconnected to preserve the city’s reserve, but his own repair crews refuse. They have family outside now; some always did.\n\nThe struggle ends with a barricaded control room, three wounded guards, and a captain whose orders no longer open doors. Your coalition keeps food moving while Sable brings the replacement network online.\n\nOric surrenders to you instead of the crowd. "I kept this city alive for twelve years," he says. He sounds less certain when he adds, "That has to count for something."' },
  { id: 'justice', act: 'V // THE LAST SWITCH', title: 'THE MAN AT THE SOUTH GATE', region: 7,
    objective: 'Decide what justice will look like.',
    text: () => `Oric admits falsifying the evacuation reports. He insists that the alternative was a city-wide collapse. He also admits using Tomas to obtain the ledger. That admission has no arithmetic attached to it.\n\n${state.story.mara === 'exiled' ? 'Tomas brings a statement from Mara. It asks for a public trial. It does not offer forgiveness.' : 'Mara stands at the edge of the room. "I wanted him dead for years," she says. "I still do. That does not mean I should get to decide."'}\n\nThe crowd outside wants an answer before the next shield failure.`,
    choices: [
      storyChoice('Protect him for a public trial with the other officials', 'You order a guarded room and public access to the evidence. People shout that you are protecting your own. You give the tribunal your name as well.', { justice: 'trial' }, { reputation: 3 }),
      storyChoice('Execute him for the deaths and the prison', 'Oric dies in the yard. The crowd falls silent instead of cheering. You have ended his power and his testimony together. Mara’s grief does not leave with him.', { justice: 'execution' }, { evil: 2, reputation: -3 }),
      storyChoice('Let him work under guard in exchange for testimony', 'He agrees to name the officials who signed the false reports and maintain the pumps under guard. The bereaved call it a bargain made over their heads. You will have to answer them.', { justice: 'labor' }, { materials: 3, reputation: -1 })
    ] },
  { id: 'eve', act: 'V // THE LAST SWITCH', title: 'BEFORE THE WEATHER BREAKS', kind: 'context', day: 360, region: 7, camp: true,
    objective: 'Choose how the shield’s last reserve will be used.',
    text: () => `The last repairs take a month. Tonight the kitchens stay open late. People eat beside strangers and write names on their sleeves in case the shelters separate them. Sable brings you the final power estimates: the reserve can feed the shared network, reinforce Haven alone, or cover an evacuation while the old core is destroyed. None is risk-free.\n\n${state.story.mara === 'exiled' ? 'A message arrives from Mara: she and Tomas are guiding families to the western shelters. "Whatever happens, keep the road open." You read it twice.' : state.story.bond === 'romance' ? 'Mara sits beside you on the steps. "If there is a morning," she says, "I want something ordinary with you." You talk about a garden until the warning bell rings.' : state.story.bond === 'friendship' ? 'Mara brings two cups to the steps. You talk about the people who should have been here. When the warning bell rings, neither of you is alone.' : 'You spend the evening helping strangers label their supplies. Someone saves you a seat by the stove. For tonight, it is enough.'}` },
  { id: 'switch', act: 'V // THE LAST SWITCH', title: 'AFTERLIFE', region: 7,
    objective: 'Make the final decision.',
    text: () => `The storm arrives as a wall of black light. Sable opens the reserve controls. The same authorization field that bears your name in the ledger waits for another signature.\n\n${state.story.coalition === 'shared' ? 'The settlement operators report ready. They each hold a local shutdown key. You can give them power; you cannot force them to accept it.' : 'The outer relays report ready, but several settlements have refused your emergency command. The network has gaps you will have to account for.'}\n\nProtecting Haven alone would abandon those outside again. Destroying the core would end that weapon forever, but cost the city its homes. The shared network offers a way through at the risk of failures spreading between relays.`,
    choices: [
      storyChoice('Feed the shared network', 'You send the reserve outward. One relay fails; the others take its load. Operators argue, reroute, and hold the line. For once, the voices answering Haven can say no.', { ending: 'network' }, {}, -3),
      storyChoice('Keep the reserve inside Haven', 'The city shield hardens. Beyond it, the outer relays go dark one by one. You order the western evacuation route kept open, but a road is not a shield.', { ending: 'haven' }, { evil: 3, reputation: -8 }),
      storyChoice('Evacuate Haven and destroy the old core', 'You spend the reserve on a moving corridor to the western shelters. Then Sable burns out the core. People leave their homes carrying what they can. The switch that chose which towns would die will never close again.', { ending: 'evacuation' }, { reputation: 2 }, -5)
    ] },
  { id: 'morning', act: 'EPILOGUE // WHAT YOU LEAVE', title: 'AN ORDINARY MORNING', kind: 'ending', day: 365, region: 7,
    objective: 'Live with what you chose.', text: () => campaignEpilogue() }
];

function campaignEpilogue() {
  const s = state.story;
  const passages = [];
  if (s.ending === 'network') passages.push(s.coalition === 'shared'
    ? 'The shared shields hold through the worst of the storm. Two relay crews die stabilizing the marsh line; their names are painted beside the controls. Haven survives as one settlement among many. Its gates remain open because it can no longer survive by closing them.'
    : 'The network saves Haven and most of the outer settlements. Where negotiations failed, evacuation teams work through the night. The survivors demand that your emergency powers end. You sign them away beneath a list of people the gaps in your network cost.');
  else if (s.ending === 'haven') passages.push('Haven survives intact. The western shelters fill with people from the unshielded settlements, and with stories the city cannot make itself hear. Your name goes on a plaque inside the gate. Outside, someone crosses it out on every relief list. Sable leaves copies of the ledger in the school and resigns.');
  else passages.push('Haven becomes an empty outline beneath the ash. Its people reach the western shelters in exhausted columns. Some will never forgive you for their homes. Others salvage the dead core for communal pumps. There is no city left to call itself indispensable.');
  passages.push(s.prisoners === 'freed' ? 'The former prisoners organize the first independent relief crews. Tomas works at their kitchen, slowly getting his strength back.' : 'The surviving labor prisoners are finally released during the relief operation. Tomas helps record the names of those who did not make it. He does not spare you the list.');
  passages.push(s.justice === 'trial' ? 'The hearings begin with Oric, then Sable, then you. Saving lives did not cancel the earlier deaths. For the first time the testimony is public and the verdict is not yours to write.' : s.justice === 'execution' ? 'Oric’s execution becomes the story each faction tells differently. Without his testimony, several officials escape the inquiry. His name remains on the south-gate wall beside the names he helped put there.' : 'Oric repairs pumps under guard and testifies against his former officers. Families attend every hearing to make sure his usefulness does not become an excuse to forget.');
  passages.push(s.mara === 'exiled' ? 'Mara and Tomas settle west of the marsh. Her final letter contains a safe route and a plain goodbye. You can be glad they lived without pretending the distance has healed.' : s.ending === 'haven' ? 'Mara leaves to guide the displaced families. "I know what it costs to choose your own people and call it necessity," she tells you. Whatever you shared cannot survive making that choice into policy.' : s.bond === 'romance' ? 'Mara stays. There are nights you still argue about the open door and the unsigned release order. There are also mornings with bad coffee, repaired windows, and plans for a garden. Love survives as work you both choose.' : s.bond === 'friendship' ? 'Mara keeps a chair at your table. Your friendship has no claim to innocence, but it has survived telling the truth. Some evenings, you can both laugh without apologizing.' : 'You and Mara part without another promise. Months later, you recognize her route markings on a repaired road. People can leave your life and still help you find your way.');
  passages.push('DAY 365. Someone asks what you will do tomorrow. For the first time, the question is not a warning.');
  if (s.pledge === 'oric') passages.splice(passages.length - 1, 0, 'The promise you made to bring Oric the ledger first remains in the public record. When the relief council asks about it, you explain why you made it. People can judge the promise alongside what you did afterward.');
  return passages.join('\n\n');
}

function createCampaignRoute() {
  const route = [];
  const pool = scenarios.filter(scene => ['THE TIN CANARY', 'MOVEMENT IN THE WHITE', 'THE WITCHLIGHT WELL'].includes(scene.title));
  const shuffled = [...pool, ...eventScenes.filter(scene => scene.title !== 'THE BASE REMEMBERS')];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  let encounter = 0;
  campaignBeats.forEach((beat, index) => {
    route.push({ campaignId: beat.id });
    if (beat.id === 'signal') route.push(...introScenes);
    if (beat.journey) {
      const scene = shuffled[encounter++] || eventScenes[0];
      route.push({ ...scene, journeyContext: campaignBeats[index + 1].objective, journeyAct: beat.act, journeyRegion: beat.region });
    }
  });
  return route;
}

function resolveCampaignScene(scene) {
  if (!scene.campaignId) return scene;
  const beat = campaignBeats.find(entry => entry.id === scene.campaignId);
  return { ...beat, campaignId: beat.id, type: `${beat.act} // ${beat.kind ? beat.kind.toUpperCase() : 'DECISION'}`, text: typeof beat.text === 'function' ? beat.text() : beat.text };
}

function renderCampaignContext(scene) {
  const context = $('campaignContext');
  const beat = scene.campaignId ? scene : null;
  context.textContent = beat ? `${beat.act} — ${beat.objective}` : scene.journeyContext ? `${scene.journeyAct} — ON THE ROAD // ${scene.journeyContext}` : 'I // THE VOICE IN THE ASH — Prepare for the journey to Mara’s signal.';
  if (beat || scene.journeyContext) {
    state.region = beat ? beat.region : scene.journeyRegion;
    $('regionValue').textContent = regions[state.region][0];
    $('anomalyValue').textContent = regions[state.region][1];
    $('location').textContent = `${regions[state.region][0]} // DAY ${state.day}`;
  }
}

function renderCampaignBeat(scene) {
  if (!scene.kind) return false;
  const before = captureOutcome();
  if (!state.story.seen.includes(scene.id)) {
    state.story.seen.push(scene.id);
    if (scene.day) state.day = Math.max(state.day, scene.day);
    if (scene.camp) {
      state.food = Math.max(state.food, 10);
      state.supplies = Math.max(state.supplies, 12);
      state.health = Math.min(100, state.health + 12);
      state.radiation = Math.max(0, state.radiation - 12);
    }
    if (scene.kind === 'ending' && state.story.ending === 'haven') {
      state.lovers = state.lovers.filter(name => name !== 'MARA');
      state.allies = state.allies.filter(name => name !== 'MARA');
    }
    if (scene.effects) {
      applyStoryEffects([null, 0, 0, 0, 0, '', scene.effects]);
      state.health = clamp(state.health + (scene.effects.health || 0), 0, 100);
    }
  }
  renderStats(); renderWorldState(); renderCampaignContext(scene);
  $('storyInterlude').hidden = true;
  $('promptText').textContent = scene.camp ? 'TIME PASSES // REST, WORK, AND SHARED SUPPLIES' : 'FIELD RECORD // CONTINUE WHEN READY';
  showInlineContinue(scene.text);
  if (scene.camp || scene.effects) showOutcomeFeedback(before);
  if (state.health <= 0) showEnding(false);
  else if (scene.kind === 'ending') {
    showEnding(true);
    $('sceneTitle').textContent = scene.title;
    $('sceneText').textContent = scene.text;
    const button = document.createElement('button');
    button.className = 'choice'; button.textContent = 'Begin a different story'; button.type = 'button';
    button.addEventListener('click', restart); $('choices').appendChild(button);
  }
  saveGame();
  return true;
}