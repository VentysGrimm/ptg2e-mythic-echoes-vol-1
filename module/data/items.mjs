import { MODULE_ID, SOURCE_BOOK_CODE, SOURCE_BOOK_TITLE } from "../constants.mjs";

const RELIC_ICON = "icons/commodities/treasure/token-runed-os-grey.webp";

const sourceFlag = (pdfPages) => ({
  book: SOURCE_BOOK_CODE,
  title: SOURCE_BOOK_TITLE,
  pdfPages
});

const giantRelics = [
  {
    id: "giant-relic-fefifofumigatic-salts",
    name: "Fefifofumigatic Salts",
    level: 1,
    pdfPages: [32],
    bonus: "+2 Empathy, Survival, or Medicine, reducing by 1 each scene use",
    effect: "Heightens scent enough to track wind changes, sweat, blood, pheromones, drugs, poisons, toxins, and nearby Spark.",
    recharge: "Recharge by spending 1 Fragment or leaving the vial in direct sunlight for 3 hours."
  },
  {
    id: "giant-relic-atlas-belt",
    name: "Atlas Belt",
    level: 2,
    pdfPages: [32],
    bonus: "+2 Strength and +2 close-quarters damage",
    effect: "Amplifies a Giant's already immense strength for direct physical feats and close combat."
  },
  {
    id: "giant-relic-cloak-of-man",
    name: "Cloak of Man",
    level: 2,
    pdfPages: [32],
    bonus: "Pass as an average human",
    effect: "Spending 1 Fragment transforms the Giant into a forgettable human shape until the disguise is pierced or dropped.",
    fragmentCost: 1
  },
  {
    id: "giant-relic-armor-of-hekatonkheires",
    name: "Armor of Hekatonkheires",
    level: 3,
    pdfPages: [32],
    bonus: "+3 Fighting, 2 Quick Actions in a Battle of Fists, and -2 to ranged attacks against the wearer",
    effect: "An ornate plate suit that makes the Giant appear many-armed and overwhelmingly dangerous in combat."
  },
  {
    id: "giant-relic-golden-goose",
    name: "Golden Goose",
    level: 3,
    pdfPages: [33],
    bonus: "+4 Shaping (Transmutation)",
    effect: "Spending 1 Fragment boosts transmutation Shaping for the scene, with additional Fragment spending able to make changes permanent.",
    fragmentCost: 1
  },
  {
    id: "giant-relic-hundred-eyed-helmet",
    name: "Hundred-Eyed Helmet",
    level: 4,
    pdfPages: [33],
    bonus: "+2 Athletics (Throwing), Influence (Intimidation), and Marksmanship (Archery)",
    effect: "Grants broad supernatural sight, reveals spirits and true faces, ignores concealment penalties, and imposes distraction on Discipline (Concentration)."
  },
  {
    id: "giant-relic-storm-chariot",
    name: "Storm Chariot",
    level: 4,
    pdfPages: [33],
    bonus: "+2 Territory Grid movement before Free Time and +2 Speed + Travel",
    effect: "A lightning chariot that moves erratically, diagonally, and with supernatural speed."
  },
  {
    id: "giant-relic-causeway-of-giant-kin",
    name: "Causeway of Giant-kin",
    level: 5,
    pdfPages: [33],
    bonus: "Hidden Giant travel through dimensional archways",
    effect: "Creates or uses access points to enter the Causeway and emerge near a desired destination without normal portal procedures."
  }
];

export const MYTHIC_ECHOES_ITEMS = Object.freeze(giantRelics.map(relicItem));

export const MANAGED_ITEM_IDS = Object.freeze(
  MYTHIC_ECHOES_ITEMS.map((item) => item.id)
);

export function itemToDocumentData(item) {
  return {
    name: item.name,
    type: item.type,
    img: item.img,
    system: item.system,
    ownership: {
      default: 2
    },
    flags: item.flags
  };
}

function relicItem(relic) {
  const fragmentCost = Number(relic.fragmentCost ?? 0);
  const summary = `${relic.bonus}. ${relic.effect}`;
  const fullText = paragraphs(
    `${relic.name} is a Level ${relic.level} Giant Relic from ${SOURCE_BOOK_TITLE}. It is sized for Giants or gods with the Colossal Size entitlement.`,
    `Core benefit: ${summary}`,
    relic.recharge ?? "",
    fragmentCost > 0
      ? `The primary activation spends ${fragmentCost} Fragment${fragmentCost === 1 ? "" : "s"}.`
      : "Use the Relic when its benefit fits the scene; confirm unusual timing, reach, or resistance with the GM."
  );

  return {
    id: relic.id,
    name: relic.name,
    type: "relic",
    img: RELIC_ICON,
    system: {
      summary,
      level: relic.level,
      cost: relic.level,
      bonus: relic.bonus,
      fragmentCost,
      benefit: fullText,
      effect: fullText,
      description: fullText,
      relatedBonus: paragraph(`Core benefit: ${relic.bonus}`),
      sourcePage: relic.pdfPages[0],
      sourcePdfPages: relic.pdfPages,
      notes: sourceNote(relic.pdfPages),
      rules: {
        summary,
        fullText,
        source: {
          book: SOURCE_BOOK_CODE,
          page: relic.pdfPages[0],
          pages: relic.pdfPages,
          section: relic.name,
          type: "relic"
        }
      },
      usage: {
        kind: fragmentCost > 0 ? "active" : "passive",
        trigger: fragmentCost > 0 ? "use" : "always",
        target: "self",
        cost: {
          freeTime: 0,
          wealth: 0,
          pantheonDice: 0,
          fragments: fragmentCost,
          health: 0,
          psyche: 0,
          strain: 0
        }
      },
      automation: {
        enabled: false,
        action: fragmentCost > 0 ? "spend-fragment" : "",
        bonus: null,
        penalty: null,
        roll: null,
        healing: null,
        damage: null,
        condition: null,
        resourceChange: null,
        chatCard: true
      }
    },
    flags: {
      "part-time-gods": {
        premade: true,
        source: SOURCE_BOOK_TITLE,
        page: relic.pdfPages[0]
      },
      [MODULE_ID]: {
        managedId: relic.id,
        source: sourceFlag(relic.pdfPages)
      }
    }
  };
}

function paragraphs(...texts) {
  return texts.filter((text) => String(text ?? "").trim()).map((text) => paragraph(text)).join("");
}

function paragraph(text) {
  return `<p>${escapeHTML(text)}</p>`;
}

function sourceNote(pdfPages) {
  const label = pdfPages.length === 1 ? `PDF p. ${pdfPages[0]}` : `PDF p. ${pdfPages[0]}-${pdfPages.at(-1)}`;
  return `<p>Source: ${escapeHTML(SOURCE_BOOK_TITLE)}, ${label}.</p>`;
}

function escapeHTML(text) {
  return String(text ?? "").replace(/[&<>"']/g, (char) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    "\"": "&quot;",
    "'": "&#39;"
  }[char]));
}
