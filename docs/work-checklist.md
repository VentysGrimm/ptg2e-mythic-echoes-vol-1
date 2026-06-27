# PTG2E Mythic Echoes Vol. 1 Work Checklist

## Boilerplate

- [x] Create Foundry module manifest.
- [x] Add module entrypoint.
- [x] Add localization and style placeholders.
- [x] Add local-only source-material drop zone.
- [x] Add validation and packaging helpers.

## Source Intake

- [x] Add `source-material/pdf/PTG2E_MythicEchoes_Vol1.pdf`.
- [x] Extract outline/table of contents.
- [x] Build a PDF page map using PDF viewer page numbers as the authority.
- [x] Extract searchable text into `source-material/.cache/`.
- [x] Identify chapters, player-facing options, GM-facing rules, stat blocks, scenes, and reference tables.

## Foundry Content

- [x] Create readable source-backed rules journals.
- [ ] Create item compendiums for new powers, gear, qualities, rituals, or other rules objects. Giant Relics are started.
- [ ] Create actor compendiums for NPCs, antagonists, followers, spirits, or other statted entities.
- [ ] Create scenes, roll tables, macros, or playlists only where the source calls for them.
- [x] Add pack definitions to `module.json` once real compendium data exists.

## First Source Slice

- [x] Build `Mythic Echoes: Rules Reference` as a managed JournalEntry compendium.
- [x] Seed `00. Mythic Echoes Source Guide` with PDF routing, source map, and build inventory.
- [x] Seed `01. Harder They Fall` with Giant character creation routing, Giant types, missions, relics, pregens, and story targets.
- [ ] Convert Giant types and missions into Part-Time Gods character-choice data after confirming the live schema.
- [x] Convert Giant relics into Part-Time Gods relic item data after confirming the live schema.

## Release Readiness

- [x] Validate module manifest and referenced files.
- [x] Confirm `source-material/` is excluded from git and release archives.
- [x] Add release manifest metadata for repository, manifest, download, readme, changelog, bugs, and license.
- [x] Ensure release packaging omits undeclared future pack folders.
- [x] Add GitHub Actions workflow to publish Foundry release assets from version tags.
- [ ] Publish `dist/module.json` and `dist/ptg2e-mystic-echoes-vol1-0.1.1.zip` to GitHub release `v0.1.1`.
- [ ] Install the module in Foundry and verify it loads beside the `part-time-gods` system.
- [ ] Verify compendiums open and contain readable, organized content.
