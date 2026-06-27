# PTG2E: Mythic Echoes Vol. 1

A Foundry Virtual Tabletop module scaffold for the Part-Time Gods 2e supplemental book **PTG2E_MythicEchoes_Vol1**.

This starts as a clean module shell. The next step is to drop the source PDF into the local source folder, then build source-backed journals, items, actors, scenes, and compendiums from the book.

## Module ID

`ptg2e-mystic-echoes-vol1`

## Source Drop Zone

Put the PDF here:

`source-material/pdf/PTG2E_MythicEchoes_Vol1.pdf`

The source folder is local-only. PDFs, extracted text, image crops, notes, and caches under `source-material/` are ignored by git and should not be included in release archives.

## Current Structure

- `module.json` - Foundry package manifest.
- `scripts/ptg2e-mystic-echoes-vol1.mjs` - module entrypoint.
- `module/` - shared constants and future content indexes.
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

If `node` is not on PATH, use the bundled Codex/Foundry Node runtime or validate the JSON files with PowerShell until a project runtime is configured.

## Package

Run:

```powershell
powershell -ExecutionPolicy Bypass -File tools/package-release.ps1
```

The archive is written to `dist/` and excludes `source-material/`, `.git/`, development caches, and build output.
