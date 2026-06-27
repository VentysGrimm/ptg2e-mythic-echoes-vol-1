$ErrorActionPreference = "Stop"

$root = Resolve-Path (Join-Path $PSScriptRoot "..")
$manifestPath = Join-Path $root "module.json"
$manifest = Get-Content $manifestPath -Raw | ConvertFrom-Json
$moduleId = $manifest.id
$version = $manifest.version
$dist = Join-Path $root "dist"
$staging = Join-Path $dist "$moduleId"
$zipPath = Join-Path $dist "$moduleId-$version.zip"

if (Test-Path $staging) {
  Remove-Item -LiteralPath $staging -Recurse -Force
}

New-Item -ItemType Directory -Path $staging -Force | Out-Null

$excludeRoots = @(
  ".git",
  ".agents",
  ".codex",
  "dist",
  "node_modules",
  "source-material",
  "tmp",
  ".tmp"
)

Get-ChildItem -LiteralPath $root -Force | Where-Object {
  $excludeRoots -notcontains $_.Name
} | ForEach-Object {
  Copy-Item -LiteralPath $_.FullName -Destination $staging -Recurse -Force
}

if (Test-Path $zipPath) {
  Remove-Item -LiteralPath $zipPath -Force
}

Compress-Archive -LiteralPath $staging -DestinationPath $zipPath -Force
Write-Host "Wrote $zipPath"
