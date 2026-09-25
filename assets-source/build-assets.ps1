# Priprema hero asseta: iz slojeva u assets-source pravi public/hero/*.avif + *.webp
# Pokretanje: powershell -ExecutionPolicy Bypass -File build-assets.ps1
$ErrorActionPreference = "Stop"
Set-Location $PSScriptRoot

$out = "..\public\hero"
New-Item -ItemType Directory -Force $out | Out-Null

Write-Output "== 1. nebo / more / statua (Python) =="
uv run --with pillow --with numpy python make-layers.py

Write-Output "== 2. kamen: vadjenje bijele pozadine (ImageMagick) =="
magick layer-d.png -crop 1098x1378+12+12 +repage d-crop.png
$seed = (magick d-crop.png -format "%[pixel:p{0,0}]" info:)
magick d-crop.png -alpha set -fuzz 22% -fill none `
    -floodfill +0+0 $seed -floodfill +1097+0 $seed `
    -floodfill +0+1377 $seed -floodfill +1097+1377 $seed `
    d-flood.png
# sitne bijele tacke unutar lisca (zatvorene povrsine koje flood fill ne dohvati)
magick d-flood.png -fuzz 7% -fill none -opaque "#ffffff" out/stone-raw.png

# ime, izvor, sirina, webp kvalitet, avif kvalitet
$jobs = @(
    @{ n = "sky";    src = "out/sky-raw.png";    w = 1700; qw = 70; qa = 55 },
    @{ n = "sea";    src = "out/sea-raw.png";    w = 1600; qw = 70; qa = 55 },
    @{ n = "statue"; src = "out/statue-raw.png"; w = 620;  qw = 80; qa = 58 },
    @{ n = "stone";  src = "out/stone-raw.png";  w = 800;  qw = 80; qa = 58 }
)

Write-Output "== 3. WebP + AVIF =="
foreach ($j in $jobs) {
    magick $j.src -resize "$($j.w)x" -strip -define webp:method=6 -quality $j.qw "$out/$($j.n).webp"
    magick $j.src -resize "$($j.w)x" -strip -quality $j.qa "$out/$($j.n).avif"
}

Write-Output "== 4. velicine =="
$avif = 0; $webp = 0
foreach ($j in $jobs) {
    $a = (Get-Item "$out/$($j.n).avif").Length / 1KB
    $w = (Get-Item "$out/$($j.n).webp").Length / 1KB
    $avif += $a; $webp += $w
    "{0,-8} avif {1,6} KB   webp {2,6} KB" -f $j.n, [math]::Round($a, 0), [math]::Round($w, 0)
}
"{0,-8} avif {1,6} KB   webp {2,6} KB" -f "UKUPNO", [math]::Round($avif, 0), [math]::Round($webp, 0)
