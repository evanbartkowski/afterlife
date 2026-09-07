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
- **Read the result before continuing.** The game shows the narrative consequence and a `RESULT` summary of gains and losses.
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

The world readout also tracks your base, allies, lovers, enemies, items, materials, reputation, morality, and gold. These fields describe your survivor and the consequences accumulated during the run; not every resource has a dedicated shop or management screen.

### Gains and losses

Small signed amounts such as `+2` or `-0.62` appear beside changed stats after an action. The result summary includes actual net changes, including costs and applicable random events, rather than just the choice's reward. It can also report changes to items and relationships.

Indicators and the result summary clear on your next click. Green indicates a favorable change; red indicates an unfavorable one. For radiation and corruption, a decrease is favorable.

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
| `script.js` | Game state, survival rules, choice resolution, UI rendering, and music controls. |
| `media/` | Game artwork. |
| `music/` | Background audio tracks. |
| `tests/campaign.test.cjs` | Automated campaign and consequence checks. |

## Development checks

With Node.js installed, run these commands from the repository folder:

```sh
node --check campaign.js
node --check script.js
node tests/campaign.test.cjs
```

The campaign test runs 12 simulated playthroughs across the four difficulties and checks the 100-day timeline, both quest routes, five ending titles, clue persistence, one-time supply grants, romance boundaries, and mutation continuity. It uses a lightweight browser stub; it does not replace visual testing in a browser.