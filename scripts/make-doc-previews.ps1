# Generates a PDF preview for every .docx in public/docs, so written pieces can
# be read in the browser instead of only downloaded.
#
#   npm run docs:previews
#
# Requires Microsoft Word on the machine. Safe to re-run: a preview is only
# rebuilt when the source .docx is newer.

$ErrorActionPreference = 'Stop'

$root     = Split-Path -Parent $PSScriptRoot
$docsDir  = Join-Path $root 'public\docs'
$outDir   = Join-Path $docsDir 'previews'

if (-not (Test-Path $docsDir)) { Write-Error "No docs folder at $docsDir" }
if (-not (Test-Path $outDir))  { New-Item -ItemType Directory -Path $outDir | Out-Null }

$sources = Get-ChildItem -Path $docsDir -Filter '*.docx' -File
if ($sources.Count -eq 0) { Write-Host 'No .docx files to convert.'; exit 0 }

$pending = @()
foreach ($src in $sources) {
  $target = Join-Path $outDir ($src.BaseName + '.pdf')
  if ((-not (Test-Path $target)) -or ($src.LastWriteTime -gt (Get-Item $target).LastWriteTime)) {
    $pending += [pscustomobject]@{ Source = $src.FullName; Target = $target; Name = $src.Name }
  }
}

if ($pending.Count -eq 0) { Write-Host "All $($sources.Count) preview(s) already up to date."; exit 0 }

$word = New-Object -ComObject Word.Application
$word.Visible = $false
$word.DisplayAlerts = 0

try {
  foreach ($job in $pending) {
    Write-Host "Converting $($job.Name)"
    $doc = $word.Documents.Open($job.Source, $false, $true)   # ReadOnly
    try {
      $doc.SaveAs([ref]$job.Target, [ref]17)                  # 17 = wdFormatPDF
    } finally {
      $doc.Close($false)
      [System.Runtime.InteropServices.Marshal]::ReleaseComObject($doc) | Out-Null
    }
  }
} finally {
  $word.Quit()
  [System.Runtime.InteropServices.Marshal]::ReleaseComObject($word) | Out-Null
  [GC]::Collect()
  [GC]::WaitForPendingFinalizers()
}

Write-Host "Done - $($pending.Count) preview(s) written to public\docs\previews."
