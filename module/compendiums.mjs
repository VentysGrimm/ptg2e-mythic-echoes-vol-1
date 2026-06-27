import { MODULE_ID, MODULE_TITLE } from "./constants.mjs";
import {
  MANAGED_RULES_JOURNAL_IDS,
  MYTHIC_ECHOES_RULES_JOURNALS,
  rulesJournalToDocumentData
} from "./data/rules-journals.mjs";

const RULES_PACK_ID = `${MODULE_ID}.mythic-echoes-rules`;

export async function populateModuleCompendiums() {
  if (!game.user?.isGM) return;

  await populateRulesJournalPack();
}

async function populateRulesJournalPack() {
  const pack = game.packs.get(RULES_PACK_ID);
  if (!pack) {
    console.warn(`${MODULE_TITLE} | Missing compendium pack ${RULES_PACK_ID}.`);
    return;
  }

  await withUnlockedPack(pack, async () => {
    const index = await pack.getIndex({ fields: [`flags.${MODULE_ID}.managedId`] });
    const managedDocuments = new Map();

    for (const entry of index) {
      const managedId = entry.flags?.[MODULE_ID]?.managedId;
      if (managedId) managedDocuments.set(managedId, entry._id);
    }

    const desiredIds = new Set(MANAGED_RULES_JOURNAL_IDS);
    for (const [managedId, documentId] of managedDocuments.entries()) {
      if (!desiredIds.has(managedId)) {
        const staleDocument = await pack.getDocument(documentId);
        await staleDocument?.delete();
      }
    }

    for (const journal of MYTHIC_ECHOES_RULES_JOURNALS) {
      const existingId = managedDocuments.get(journal.id);
      if (existingId) {
        const existingDocument = await pack.getDocument(existingId);
        await existingDocument?.delete();
      }

      await JournalEntry.create(rulesJournalToDocumentData(journal), {
        pack: pack.collection
      });
    }
  });

  console.log(`${MODULE_TITLE} | Populated Mythic Echoes rules journals.`);
}

async function withUnlockedPack(pack, operation) {
  const wasLocked = pack.locked;
  if (wasLocked) await pack.configure({ locked: false });

  try {
    return await operation();
  } finally {
    if (wasLocked) await pack.configure({ locked: true });
  }
}
