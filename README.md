# Afterlife

**Afterlight: A Survival Story** is the browser game in this repository: a single-player, text-based survival adventure set in a post-apocalyptic world. Follow an ordered, five-act campaign while managing supplies, navigating relationships, and dealing with unpredictable encounters on the road.

Your last shelter is gone. Stella, a rescue radio operator broadcasting from Haven, promises a real sanctuary with clean water, gardens, medical care, and peace. Follow her messages and verify the clues to reach it by day 100, before the mountain passage closes.

## Play locally

1. Download this repository using **Code → Download ZIP**, then extract it, or clone it:

   ```sh
   git clone https://github.com/evanbartkowski/afterlife.git
   cd afterlife
   ```

2. Open `index.html` in a modern browser. Keep the JavaScript, stylesheet, `media`, and `music` files in their original locations.
3. Read the opening transmissions, enter your survivor's name, and select a difficulty.
4. Choose **Enter the Wastes** to begin.

No build step, package installation, or server is required to play. The game uses HTML, CSS, and JavaScript. Google Fonts requires an internet connection; local artwork and music are included in the repository. Repository access is required to clone or download a private copy.

## How a run works

- **Read the scene and current objective.** The story panel identifies your chapter, location, and immediate goal.
- **Make a decision when choices appear.** Choices can affect survival stats, items, relationships, and later story outcomes. Some options require an item and remain disabled without it.
- **Read the result before continuing.** The game shows the narrative consequence and the names of any newly gained items.
- **Choose Continue onward.** This advances to the next scene. Some scenes provide context, dialogue, or an unfolding event instead of a decision.
- **Reach Haven by day 100.** The campaign follows a paced 100-day journey and concludes with your arrival in a genuinely safe sanctuary. Health reaching zero ends the run early.

There is no real-time countdown. Take as long as you want to read. Use the mouse or keyboard to activate buttons, and scroll within the story panel to read longer scenes.

## Survival stats

| Stat | How it works |
| --- | --- |
| Survival odds | A changing indicator affected by choices, luck, and events. It is not a separate instant-death roll; reaching zero health is what ends a run. |
| Health | Your vitality. Injuries and shortages reduce it; some choices and camp chapters restore it. Zero means death. |
| Radiation | Builds through exposure and travel. The first time it reaches 100, you either die or mutate. Mutation changes your race and increases food and water consumption without resetting the storyline. |
| Water | Consumed by choices and travel. Running out can cause shortage damage. |
| Food | Consumed as time passes during choices and travel. Running out can cause shortage damage. |
| Luck | Influences changes to survival odds and can itself change through decisions and events. |

The world readout tracks your base, race, humanity, allies, lovers, enemies, items, materials, reputation, and gold. Base benefits appear under the radio log. Not every resource has a dedicated shop or management screen.

### Gains and losses

Small signed amounts such as `+2` or `-0.62` appear beside changed stats after an action. The line beneath the narrative shows only newly gained item names and stays hidden when no item was gained. Stat badges show actual net changes, including costs and applicable random events.

Indicators and gained item names clear on your next click. Green indicates a favorable change; red indicates an unfavorable one. Less radiation and more humanity are favorable. Food and water balances use whole or half-rations, displayed as 3 or 2.5 instead of long decimals.

### Difficulty

Choose **Beginner**, **Survivor**, **Wasteland**, or **Impossible** before starting. Harder difficulties generally provide weaker starting stats, consume more water per choice, and accumulate radiation faster. Starting values have some variation between runs. The main story stays in the same order on every difficulty.

Difficulty is locked once the run starts. Use **Restart Run** to begin again with a different setting.

## Story, relationships, and random events

The main campaign has five acts and a consequence-based epilogue. Its key scenes follow a fixed sequence, allowing discoveries and relationships to build on earlier events.

Stella, a 29-year-old rescue radio operator from Haven, is your main contact. Calls gradually move from navigation and survival advice into personal conversations. Other travelers include the courier Ellis, his sister June, and the medic Nadi. The broker Rook uses stolen broadcasts to lure survivors off the real route. Your honesty, help for strangers, and protection of rescue frequencies affect trust and later scenes.

Romance with Stella is optional and requires expressed interest and sufficient trust. You can become close friends or choose space for an independent life instead. Rescue and admission to Haven never depend on romance. The story includes adult themes such as grief, betrayal, exploitation, and responsibility, with non-explicit intimacy.

Random encounters are inserted at journey breaks between campaign scenes. Additional interruptions can occur during ordinary encounters, while central campaign decisions remain uninterrupted. Foraging may appear as an alternative on ordinary choice scenes.

Shelter chapters move the calendar forward through periods of travel and recovery. They restore health, reduce radiation, and bring food and water up to a minimum reserve. You do not need to click through 100 individual days. Mutating does not restart the campaign, and reaching the end does not reshuffle it into a new loop.

### Radio clues and branching quests

Radio messages are displayed as text in the story and a persistent radio log. Collected route clues remain in the route notes. The trail leads from a green milepost to a bell tower, then branches into a ridge-mirror crossing or an aqueduct pump-house rescue. Both yield the coordinate needed to locate a weather station and decode the hidden entrance to Haven.

Messages are not always trustworthy: compare the sender and directions with verified clues. Your decisions determine whether you protect the private channel, help a convoy, scout ahead, or expose the route through an open broadcast.

### Different lives in Haven

Five ending titles reflect your choices: **A Home with Stella**, **The People You Brought Home**, **The Keeper of the Road**, **A Friend Beyond the Static**, and **A Room of Your Own**. The epilogue also recalls your chosen route, treatment of other survivors, and accountability. Haven remains a peaceful home in every successful ending; the differences concern your relationships and the life you build there.

## Fantasy quests and consequences

The Haven route now includes an enchanted orchard, a transformative moon pool, a winter-vault heist, and a Bell Court bargain involving a stolen soul. Their consequences return in later shelter encounters and the epilogue. Important decisions display an aftermath paragraph explaining new enemies, allies, changed relationships, race traits, base benefits, or lost humanity. Newly gained item names still appear separately.

**Humanity** runs from 0 to 100. Robbery, exploitation, and binding an innocent person?s shadow reduce it. Restitution can restore some compassion, but does not automatically erase enemies or restart broken romances. Changing species does not itself reduce humanity. Haven remains a sanctuary, with accountability for the people harmed along the way.

### Race traits

| Race | Benefit and cost |
| --- | --- |
| Human | Standard survival rules. |
| Moon elf | Daily radiation gain reduced by 0.25, with a minimum of zero. |
| Ash revenant | Direct choice wounds are halved, rounded down; daily food consumption increases by 0.5. |

Radiation can still cause mutation. Race changes preserve story progress. Food and water continue to use half-unit increments.

### Support bases

Your base is a network of shelters and couriers along the road. Choose one early, then change it at the weather station. Only the active base supplies its mechanical benefits.

| Base | Active benefits |
| --- | --- |
| Moss Caravan | Foraging yields one extra food; shelter food reserves refill to at least 12. |
| Warden Outposts | Travel water use reduced by 0.5 per day; daily radiation gain reduced by 0.25. Difficulty-based water costs still apply. |
| Moon Shrines | Six extra health restored at shelter stops; daily food use reduced by 0.5, to a minimum of 0.5. |

### Other relationships

Lyria is an adult moon elf you can free from an enchanted orchard. Nyx is a 31-year-old smuggler involved in the winter-vault quest. Both have friendship and optional romance paths. Romance is exclusive in this version: choosing another partner ends the earlier commitment openly. Stella respects an existing relationship and remains a friend and rescue contact.

Lyria and Nyx add two ending titles, **An Orchard Under Two Moons** and **Nothing Left to Steal**, bringing the total to seven. Crimes, restitution, your race, and your base add further epilogue variations.

### Fatal decisions

Eight unique death outcomes are attached to dangerous choices along the route. Scene text gives a warning and the option is marked **LETHAL RISK**. Selecting one ends the run immediately, regardless of health or race, and shows its own narrative ending. Some descriptions are gruesome. Safe alternatives remain available. Death prevents further progression until you restart.

## Controls and progress

| Control | Purpose |
| --- | --- |
| Choice buttons | Resolve the selected action and show its consequences. |
| Continue onward | Advance after reading a result or narrative scene. |
| Tutorial | Open or close the optional field manual. |
| Sound | Turn the included background music on or off. Music starts after interaction. |
| Restart Run | Reset your survivor, choices, and campaign progress. |

**Current save behavior:** the game writes state to browser storage, but the current startup code clears that state and begins a fresh run. Reloading or reopening the page does not resume your campaign. Keep the page open to continue the same run.

## Project files

| File or folder | Purpose |
| --- | --- |
| `index.html` | Page structure, setup screen, stat readouts, and story panel. |
| `style.css` | Visual design, responsive layout, and stat feedback styling. |
| `campaign.js` | Ordered campaign, branching dialogue, journey encounters, and epilogues. |
| `expansion.js` | Connected fantasy quests, support bases, humanity, and additional relationships. |
| `script.js` | Game state, survival rules, choice resolution, UI rendering, and music controls. |
| `media/` | Game artwork. |
| `music/` | Background audio tracks. |
| `tests/campaign.test.cjs` | Automated campaign and consequence checks. |

## Development checks

With Node.js installed, run these commands from the repository folder:

```sh
node --check campaign.js
node --check script.js
node --check expansion.js
node tests/campaign.test.cjs
```

The campaign test runs 12 expanded playthroughs across the four difficulties and checks the 100-day timeline, both quest routes, seven ending titles, clue persistence, half-rations, base benefits, crime and restitution, romance boundaries, decision aftermath, item-only rewards, and mutation continuity. It uses a lightweight browser stub; it does not replace visual testing in a browser.