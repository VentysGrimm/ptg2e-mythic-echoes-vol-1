# PTG2E: Mythic Echoes Vol. 1

A Foundry Virtual Tabletop module for the Part-Time Gods 2e supplemental book **PTG2E_MythicEchoes_Vol1**.

This module now includes the first source-backed rules reference pack from the local PDF. The initial content focuses on PDF routing and Chapter One: Harder They Fall, with later slices reserved for item, actor, and scene data after the Part-Time Gods schemas are confirmed.

## Module ID

`ptg2e-mystic-echoes-vol1`

## Source Drop Zone

Put the PDF here:

`source-material/pdf/PTG2E_MythicEchoes_Vol1.pdf`

The source folder is local-only. PDFs, extracted text, image crops, notes, and caches under `source-material/` are ignored by git and should not be included in release archives.

## Current Content

- `Mythic Echoes: Rules Reference` - a managed JournalEntry compendium seeded on GM load.
- `Mythic Echoes: Items and Powers` - a managed Item compendium seeded on GM load.
- `00. Mythic Echoes Source Guide` - PDF source map and build inventory.
- `01. Harder They Fall` - Chapter One routing for Giant character creation, Giant types, Giant missions, Giant relics, pregenerated Giants, and story targets.
- `Giant Relics` - the first source-backed relic item slice from PDF p. 32-33.

## Current Structure

- `module.json` - Foundry package manifest.
- `scripts/ptg2e-mystic-echoes-vol1.mjs` - module entrypoint.
- `module/` - shared constants, compendium seeding, and source-backed content data.
- `packs/mythic-echoes-rules/` - module compendium path for the rules reference pack.
- `packs/mythic-echoes-items/` - module compendium path for item content.
- `lang/en.json` - localization strings.
- `styles/ptg2e-mystic-echoes-vol1.css` - small journal/content styling hooks.
- `docs/work-checklist.md` - source-backed build checklist.
- `source-material/` - local-only source PDF and extraction workspace.
- `tools/validate-package.mjs` - package sanity checks.
- `tools/package-release.ps1` - creates a release zip while excluding source material.

## Validate

Run:

```powershell
node tools/validate-package.mjs
```

The validator checks the manifest, referenced module files, declared compendium paths, pack folder references, and release metadata. It also warns when local future-pack folders exist but are not declared for shipping.

If `node` is not on PATH, use the bundled Codex/Foundry Node runtime or validate the JSON files with PowerShell until a project runtime is configured.

## Package

Run:

```powershell
powershell -ExecutionPolicy Bypass -File tools/package-release.ps1
```

The archive is written to `dist/` and excludes `source-material/`, `.git/`, development caches, and build output.

The release zip contains one top-level folder named `ptg2e-mystic-echoes-vol1`, matching the module ID expected by Foundry. It includes only declared module content, so future actor and scene pack work will not appear in releases until real compendium data is added and declared in `module.json`.

## Release

Pushing a tag that matches the manifest version, such as `v0.1.1`, runs the GitHub Actions release workflow. The workflow validates the module, builds the zip, and publishes these Foundry install assets:

- `module.json`
- `ptg2e-mystic-echoes-vol1-0.1.1.zip`
