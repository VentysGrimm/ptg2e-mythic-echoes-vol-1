import { MODULE_ID, SOURCE_BOOK_CODE, SOURCE_BOOK_TITLE } from "../constants.mjs";

const sourceFlag = (pdfPages) => ({
  book: SOURCE_BOOK_CODE,
  title: SOURCE_BOOK_TITLE,
  pdfPages
});

const sourceNote = (label) => `<p class="ptg2e-me1-source-note"><strong>Source:</strong> ${label}</p>`;
const htmlFormat = () => globalThis.CONST?.JOURNAL_ENTRY_PAGE_FORMATS?.HTML ?? 1;

const sourceMapRows = [
  ["Cover and front matter", "PDF p. 1-5"],
  ["Chapter One: Harder They Fall", "PDF p. 6-43"],
  ["The Quest", "PDF p. 44"],
  ["Chapter Two: Return of Dragons", "PDF p. 45-69"],
  ["Chapter Three: Angels Among Us", "PDF p. 70-107"],
  ["Chapter Four: The Source of All", "PDF p. 108-124"],
  ["Index", "PDF p. 125"],
  ["Giants character sheet", "PDF p. 126-127"],
  ["Nephilim character sheet", "PDF p. 128-130"]
];

const giantTypeRows = [
  ["Cyclopes", "Olympian Giants", "PDF p. 13-14"],
  ["Giale", "Storm Giants", "PDF p. 15"],
  ["Gashadokuro", "Bone Giants", "PDF p. 16"],
  ["Hauberks", "Iron Giants", "PDF p. 17"],
  ["Jotunn", "Frost Giants", "PDF p. 18"],
  ["Oni", "Chaos Giants", "PDF p. 19"],
  ["Skrogs", "Sea Giants", "PDF p. 20"],
  ["Surtr", "Fire Giants", "PDF p. 21"],
  ["Titans", "Mountain Giants", "PDF p. 22"],
  ["Umbra", "Shadow Giants", "PDF p. 23"],
  ["Yeti", "Winter Giants", "PDF p. 24"],
  ["Zephyros", "Cloud Giants", "PDF p. 25"]
];

const giantMissionRows = [
  ["Abstained", "Giants who stepped away from the Source's destructive purpose and can become allies to mortals or gods.", "PDF p. 26"],
  ["God Hunters", "Giants who treat divine beings as prey or targets in the wider conflict.", "PDF p. 27"],
  ["Guised", "Giants who operate through concealment, misdirection, or mortal-facing roles.", "PDF p. 27"],
  ["Keepers", "Giants who preserve, protect, or steward something tied to Giant-kind.", "PDF p. 28"],
  ["Protectors", "Giants defined by guarding people, places, or causes.", "PDF p. 28"],
  ["Sleepers", "Giants whose role involves waiting, hiding, or awakening when the time is right.", "PDF p. 29"],
  ["Watchers", "Giants who observe the divine struggle and act when their charge demands it.", "PDF p. 29"]
];

const giantRelicRows = [
  ["Fefifofumigatic Salts", "1", "Heightens scent and helps track blood, sweat, toxins, and nearby Spark.", "PDF p. 32"],
  ["Atlas Belt", "2", "Enhances close-quarters strength and damage for a Giant wearer.", "PDF p. 32"],
  ["Cloak of Man", "2", "Lets a Giant pass as an ordinary human for discreet movement.", "PDF p. 32"],
  ["Armor of Hekatonkheires", "3", "A war relic that supports multi-limbed close combat and missile defense.", "PDF p. 32"],
  ["Golden Goose", "3", "Improves Shaping tied to transmutation and can support permanent changes.", "PDF p. 33"],
  ["Hundred-Eyed Helmet", "4", "Grants broad supernatural sight and several combat-relevant bonuses, with concentration drawbacks.", "PDF p. 33"],
  ["Storm Chariot", "4", "A lightning chariot that improves Giant-scale travel and speed checks.", "PDF p. 33"],
  ["Causeway of Giant-kin", "5", "Creates hidden Giant travel routes through remote archways and thresholds.", "PDF p. 33"]
];

function table(headers, rows) {
  const head = headers.map((header) => `<th>${header}</th>`).join("");
  const body = rows.map((row) => `<tr>${row.map((cell) => `<td>${cell}</td>`).join("")}</tr>`).join("");
  return `<table><thead><tr>${head}</tr></thead><tbody>${body}</tbody></table>`;
}

export const MYTHIC_ECHOES_RULES_JOURNALS = Object.freeze([
  {
    id: "source-guide",
    name: "00. Mythic Echoes Source Guide",
    source: sourceFlag([1, 130]),
    pages: [
      {
        id: "source-map",
        name: "PDF Source Map",
        source: sourceFlag([1, 130]),
        content: `
          <section class="ptg2e-me1-journal">
            <h1>PDF Source Map</h1>
            ${sourceNote("PTG2E_MythicEchoes_Vol1.pdf, PDF p. 1-130. PDF page numbers are used as the module authority.")}
            <p>This journal is the working route into Mythic Echoes Vol. 1. It records the PDF page ranges used for the module build so later compendium entries can cite the same source locations consistently.</p>
            ${table(["Section", "PDF Pages"], sourceMapRows)}
          </section>
        `
      },
      {
        id: "build-inventory",
        name: "Build Inventory",
        source: sourceFlag([4, 130]),
        content: `
          <section class="ptg2e-me1-journal">
            <h1>Build Inventory</h1>
            ${sourceNote("Table of contents and outline, PDF p. 4-130.")}
            <h2>Rules and Player Options</h2>
            <ul>
              <li><strong>Giants and Giant-kin:</strong> lore, Giant character creation, Giant missions, Giant size rules, Spark changes, and Giant relics.</li>
              <li><strong>Dragons:</strong> dragon lore, lairs, masking Spark, example dragons, dragon relics, and the Order of Strut theology.</li>
              <li><strong>Nephilim:</strong> angelic houses, Heaven, Nephilim character creation, glyphs, grafts, and pregenerated characters.</li>
              <li><strong>The Source:</strong> truths, source-building procedures, campaign impact, and sample Sources.</li>
            </ul>
            <h2>Foundry Targets</h2>
            <ul>
              <li><strong>Journals:</strong> readable chapter routes, rules summaries, scenario references, and GM-facing source maps.</li>
              <li><strong>Items:</strong> Giant relics, dragon relics, glyphs, grafts, theologies, truths, and other rules objects once the Part-Time Gods item schema is confirmed.</li>
              <li><strong>Actors:</strong> pregenerated characters, example dragons, and other statted entities.</li>
              <li><strong>Scenes:</strong> only story scenes that benefit from Foundry-native scene support.</li>
            </ul>
          </section>
        `
      }
    ]
  },
  {
    id: "harder-they-fall",
    name: "01. Harder They Fall",
    source: sourceFlag([6, 43]),
    pages: [
      {
        id: "chapter-route",
        name: "Chapter Route",
        source: sourceFlag([6, 43]),
        content: `
          <section class="ptg2e-me1-journal">
            <h1>Harder They Fall</h1>
            ${sourceNote("Chapter One, PDF p. 6-43.")}
            <p>This chapter introduces Giants as a playable and GM-facing force in Part-Time Gods 2e. It covers their place in the God Wars, Giant realms, Giant character creation, Giant-scale relics, two pregenerated Giants, and the Lucy in the Sky story.</p>
            <h2>Chapter Routing</h2>
            ${table(["Topic", "PDF Pages"], [
              ["Giant history, realms, and divine conflict", "PDF p. 7-12"],
              ["Giant character creation", "PDF p. 13-31"],
              ["Giant relics", "PDF p. 32-33"],
              ["Pregenerated Giants", "PDF p. 34-37"],
              ["Story: Lucy in the Sky", "PDF p. 38-43"]
            ])}
          </section>
        `
      },
      {
        id: "giant-character-creation",
        name: "Giant Character Creation",
        source: sourceFlag([13, 31]),
        content: `
          <section class="ptg2e-me1-journal">
            <h1>Giant Character Creation</h1>
            ${sourceNote("Creating Giant Characters, PDF p. 13-31.")}
            <p>Giant characters replace the normal occupation step with Giant type, then choose an archetype and mission before applying Giant-specific natural abilities, attachments, skills, Manifestations, Spark, and territory details.</p>
            <ol>
              <li><strong>Choose Giant Type:</strong> establishes nature, built-in benefits, Dominion access, available Truths, and payoff options.</li>
              <li><strong>Choose Archetype:</strong> uses the normal archetype step.</li>
              <li><strong>Choose Mission:</strong> replaces occupation and explains why the Giant is active now.</li>
              <li><strong>Apply Natural Abilities:</strong> records Giant size, modified health, armor, movement, strength, Spark behavior, and related pool rules.</li>
              <li><strong>Spend Attachments:</strong> follows normal Bond spending but does not grant a free Truth from this step.</li>
              <li><strong>Finish the Character:</strong> spends remaining skill and Manifestation points, records specialties, and places territory relationships on the grid.</li>
            </ol>
          </section>
        `
      },
      {
        id: "giant-types",
        name: "Giant Types",
        source: sourceFlag([13, 25]),
        content: `
          <section class="ptg2e-me1-journal">
            <h1>Giant Types</h1>
            ${sourceNote("Step One: Choose Giant Type, PDF p. 13-25.")}
            <p>Each Giant type supplies its own skill profile, resources, Blessing, Curse, Dominion access, available Truths, and payoff options. These entries should become character-choice data after the Part-Time Gods choice schema is confirmed.</p>
            ${table(["Type", "Role", "PDF Pages"], giantTypeRows)}
          </section>
        `
      },
      {
        id: "giant-missions",
        name: "Giant Missions",
        source: sourceFlag([26, 29]),
        content: `
          <section class="ptg2e-me1-journal">
            <h1>Giant Missions</h1>
            ${sourceNote("Step Three: Mission, PDF p. 26-29.")}
            <p>Missions replace occupation for Giant characters. Each mission gives the Giant a reason to move through the modern mythic conflict and should become character-choice data alongside Giant type.</p>
            ${table(["Mission", "Module Summary", "PDF Pages"], giantMissionRows)}
          </section>
        `
      },
      {
        id: "giant-relics",
        name: "Giant Relics",
        source: sourceFlag([32, 33]),
        content: `
          <section class="ptg2e-me1-journal">
            <h1>Giant Relics</h1>
            ${sourceNote("Giant Relics, PDF p. 32-33.")}
            <p>The chapter includes Giant-scale relics that can be used by Giants or suitably colossal divine characters. These should become inspectable Item documents once the module imports against the Part-Time Gods item model.</p>
            ${table(["Relic", "Level", "Module Summary", "PDF Pages"], giantRelicRows)}
          </section>
        `
      },
      {
        id: "story-and-actors",
        name: "Story and Actors",
        source: sourceFlag([34, 43]),
        content: `
          <section class="ptg2e-me1-journal">
            <h1>Story and Actors</h1>
            ${sourceNote("Pregenerated Giants and Lucy in the Sky, PDF p. 34-43.")}
            <h2>Actor Targets</h2>
            <ul>
              <li><strong>Mannock:</strong> pregenerated Giant, PDF p. 34-35.</li>
              <li><strong>Omoi Tsume:</strong> pregenerated Giant, PDF p. 36-37.</li>
            </ul>
            <h2>Story Targets</h2>
            ${table(["Scene", "PDF Pages"], [
              ["Mars Attacks", "PDF p. 38-39"],
              ["Over the River and Through the Woods", "PDF p. 40"],
              ["Head in the Clouds", "PDF p. 41-42"],
              ["Beyond Thunderhome", "PDF p. 43"],
              ["Conclusion", "PDF p. 43"]
            ])}
          </section>
        `
      }
    ]
  }
]);

export const MANAGED_RULES_JOURNAL_IDS = Object.freeze(
  MYTHIC_ECHOES_RULES_JOURNALS.map((journal) => journal.id)
);

export function rulesJournalToDocumentData(journal) {
  return {
    name: journal.name,
    ownership: {
      default: 2
    },
    pages: journal.pages.map((page, index) => ({
      name: page.name,
      type: "text",
      title: {
        show: true,
        level: 1
      },
      sort: (index + 1) * 100000,
      text: {
        format: htmlFormat(),
        content: page.content.trim()
      },
      flags: {
        [MODULE_ID]: {
          managedId: page.id,
          source: page.source
        }
      }
    })),
    flags: {
      [MODULE_ID]: {
        managedId: journal.id,
        source: journal.source
      }
    }
  };
}
