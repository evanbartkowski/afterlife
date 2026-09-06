# Afterlife

**Afterlight: A Survival Story** is the browser game in this repository: a single-player, text-based survival adventure set in a post-apocalyptic world. Follow an ordered, five-act campaign while managing supplies, navigating relationships, and dealing with unpredictable encounters on the road.

You wake with three days missing from your memory, a brass key in your coat, and a warning recorded in your own voice. The settlement of Haven depends on a failing storm shield. Discover what happened, decide whom to trust, and survive long enough to face the winter storm.

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
- **Reach the final storm and epilogue.** The campaign concludes on day 365 if you survive. Health reaching zero ends the run early.

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

Recurring characters include Mara, a scout; Dr. Sable, a shield engineer; and Captain Oric, Haven's commander. Their interests do not always align with yours. Choices about honesty, loyalty, forgiveness, justice, and power can change later dialogue and the ending.

Romance is optional. You can pursue a relationship, choose friendship, or keep your distance. The story includes adult themes such as grief, betrayal, violence, imprisonment, and moral responsibility, with non-explicit intimacy.

Random encounters are inserted at journey breaks between campaign scenes. Additional interruptions can occur during ordinary encounters, while central campaign decisions remain uninterrupted. Foraging may appear as an alternative on ordinary choice scenes.

Camp chapters move the calendar forward through periods of work, travel, and recovery. They restore health, reduce radiation, and bring food and water up to a minimum reserve. You do not need to click through 365 individual days. Mutating does not restart the campaign, and reaching the end does not reshuffle it into a new loop.

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

The campaign test runs 12 simulated playthroughs across the four difficulties and checks ordered progression, one-time narrative beats, mutation continuity, relationship consequences, and the finales. It uses a lightweight browser stub; it does not replace visual testing in a browser.