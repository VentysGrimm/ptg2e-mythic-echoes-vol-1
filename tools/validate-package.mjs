import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const manifestPath = path.join(root, "module.json");
const manifest = JSON.parse(fs.readFileSync(manifestPath, "utf8"));
const errors = [];
const warnings = [];
const urlPattern = /^https?:\/\//i;

function requireString(value, field) {
  if (typeof value !== "string" || value.trim() === "") {
    errors.push(`${field} must be a non-empty string.`);
  }
}

function requireExistingFile(relativePath, field) {
  const fullPath = path.join(root, relativePath);
  if (!fs.existsSync(fullPath) || !fs.statSync(fullPath).isFile()) {
    errors.push(`${field} references missing file: ${relativePath}`);
  }
}

function requireExistingDirectory(relativePath, field) {
  const fullPath = path.join(root, relativePath);
  if (!fs.existsSync(fullPath) || !fs.statSync(fullPath).isDirectory()) {
    errors.push(`${field} references missing directory: ${relativePath}`);
  }
}

function requireFileOrUrl(value, field) {
  requireString(value, field);
  if (typeof value !== "string" || value.trim() === "") return;
  if (urlPattern.test(value)) return;
  requireExistingFile(value, field);
}

requireString(manifest.id, "id");
requireString(manifest.title, "title");
requireString(manifest.version, "version");
requireString(manifest.description, "description");
requireString(manifest.url, "url");
requireString(manifest.manifest, "manifest");
requireString(manifest.download, "download");

if (typeof manifest.id === "string" && !/^[a-z0-9-]+$/.test(manifest.id)) {
  errors.push("id must be lower-case alphanumeric words separated by hyphens.");
}

if (typeof manifest.version === "string" && !/^\d+\.\d+\.\d+(?:[-+][0-9A-Za-z.-]+)?$/.test(manifest.version)) {
  warnings.push("version is not SemVer-like; Foundry allows strings, but SemVer release tags are easier to update.");
}

if (typeof manifest.download === "string" && typeof manifest.version === "string") {
  const expectedVersionPath = `/v${manifest.version}/`;
  if (!manifest.download.includes(expectedVersionPath)) {
    warnings.push(`download URL does not include expected release path ${expectedVersionPath}.`);
  }
}

requireFileOrUrl(manifest.license, "license");
requireFileOrUrl(manifest.readme, "readme");
requireFileOrUrl(manifest.changelog, "changelog");
if (manifest.bugs !== undefined) requireString(manifest.bugs, "bugs");

if (!manifest.compatibility || typeof manifest.compatibility !== "object") {
  errors.push("compatibility must be present.");
} else {
  requireString(manifest.compatibility.minimum, "compatibility.minimum");
  requireString(manifest.compatibility.verified, "compatibility.verified");
}

for (const [index, scriptPath] of (manifest.esmodules ?? []).entries()) {
  requireExistingFile(scriptPath, `esmodules[${index}]`);
}

for (const [index, stylePath] of (manifest.styles ?? []).entries()) {
  requireExistingFile(stylePath, `styles[${index}]`);
}

for (const [index, language] of (manifest.languages ?? []).entries()) {
  requireString(language.lang, `languages[${index}].lang`);
  requireString(language.name, `languages[${index}].name`);
  requireExistingFile(language.path, `languages[${index}].path`);
}

for (const [index, pack] of (manifest.packs ?? []).entries()) {
  requireString(pack.name, `packs[${index}].name`);
  requireString(pack.label, `packs[${index}].label`);
  requireString(pack.type, `packs[${index}].type`);
  requireExistingDirectory(pack.path, `packs[${index}].path`);

  if (typeof pack.path === "string" && !pack.path.replaceAll("\\", "/").startsWith("packs/")) {
    errors.push(`packs[${index}].path should be inside packs/: ${pack.path}`);
  }

  if (["Actor", "Item", "Adventure"].includes(pack.type) && !pack.system) {
    errors.push(`packs[${index}] must define system for ${pack.type} packs.`);
  }
}

const packNames = new Set();
for (const [index, pack] of (manifest.packs ?? []).entries()) {
  if (packNames.has(pack.name)) errors.push(`packs[${index}].name is duplicated: ${pack.name}`);
  packNames.add(pack.name);
}

for (const [index, folder] of (manifest.packFolders ?? []).entries()) {
  requireString(folder.name, `packFolders[${index}].name`);
  for (const packName of folder.packs ?? []) {
    if (!packNames.has(packName)) {
      errors.push(`packFolders[${index}] references undeclared pack: ${packName}`);
    }
  }
}

const sourcePath = path.join(root, "source-material");
if (!fs.existsSync(sourcePath) || !fs.statSync(sourcePath).isDirectory()) {
  warnings.push("source-material directory is missing; source-backed rebuilds will need the local-only PDF drop zone.");
}

const localPacksPath = path.join(root, "packs");
if (fs.existsSync(localPacksPath)) {
  const declaredPackDirectories = new Set(
    (manifest.packs ?? []).map((pack) => path.basename(pack.path))
  );
  for (const entry of fs.readdirSync(localPacksPath, { withFileTypes: true })) {
    if (entry.isDirectory() && !declaredPackDirectories.has(entry.name)) {
      warnings.push(`packs/${entry.name} is not declared in module.json and will be omitted from release packaging.`);
    }
  }
}

if (errors.length > 0) {
  console.error("Package validation failed:");
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

if (warnings.length > 0) {
  console.warn("Package validation warnings:");
  for (const warning of warnings) console.warn(`- ${warning}`);
}

console.log(`Validated ${manifest.title} ${manifest.version}.`);
