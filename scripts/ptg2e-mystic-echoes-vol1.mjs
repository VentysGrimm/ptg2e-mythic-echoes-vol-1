import {
  EXPECTED_SOURCE_PDF,
  MODULE_ID,
  MODULE_TITLE,
  PLANNED_CONTENT_PACKS,
  SOURCE_BOOK_CODE,
  SOURCE_BOOK_TITLE
} from "../module/constants.mjs";

Hooks.once("init", () => {
  game.settings.register(MODULE_ID, "contentVersion", {
    name: "PTG2E_ME1.Settings.ContentVersion.Name",
    hint: "PTG2E_ME1.Settings.ContentVersion.Hint",
    scope: "world",
    config: false,
    type: String,
    default: "0.1.0"
  });
});

Hooks.once("ready", () => {
  const module = game.modules.get(MODULE_ID);
  if (module) {
    module.api = {
      MODULE_ID,
      MODULE_TITLE,
      SOURCE_BOOK_CODE,
      SOURCE_BOOK_TITLE,
      EXPECTED_SOURCE_PDF,
      PLANNED_CONTENT_PACKS
    };
  }

  console.log(`${MODULE_TITLE} | ${game.i18n.localize("PTG2E_ME1.ModuleReady")}`);
});
