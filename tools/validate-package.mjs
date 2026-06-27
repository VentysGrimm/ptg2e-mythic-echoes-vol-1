import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const manifestPath = path.join(root, "module.json");
const manifest = JSON.parse(fs.readFileSync(manifestPath, "utf8"));
const errors = [];

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

requireString(manifest.id, "id");
requireString(manifest.title, "title");
requireString(manifest.version, "version");
requireString(manifest.description, "description");

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
}

const sourcePath = path.join(root, "source-material");
if (!fs.existsSync(sourcePath) || !fs.statSync(sourcePath).isDirectory()) {
  errors.push("source-material directory is missing.");
}

if (errors.length > 0) {
  console.error("Package validation failed:");
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log(`Validated ${manifest.title} ${manifest.version}.`);
