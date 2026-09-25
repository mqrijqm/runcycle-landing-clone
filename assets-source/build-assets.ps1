# Priprema asseta: iz slojeva i kartica u assets-source pravi
# public/hero/*  i  public/cards/*  (AVIF + WebP)
# Pokretanje: powershell -ExecutionPolicy Bypass -File build-assets.ps1
$ErrorActionPreference = "Stop"
Set-Location $PSScriptRoot

New-Item -ItemType Directory -Force out | Out-Null

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

Write-Output "== 3. ilustracije za kartice (Python) =="
uv run --with pillow --with numpy python extract-cards.py

# ime, izvor, sirina, webp kvalitet, avif kvalitet, izlazni folder
$jobs = @(
    @{ n = "sky";      src = "out/sky-raw.png";      w = 1700; qw = 70; qa = 55; dir = "hero" },
    @{ n = "sea";      src = "out/sea-raw.png";      w = 1600; qw = 70; qa = 55; dir = "hero" },
    @{ n = "statue";   src = "out/statue-raw.png";   w = 620;  qw = 80; qa = 58; dir = "hero" },
    @{ n = "stone";    src = "out/stone-raw.png";    w = 800;  qw = 80; qa = 58; dir = "hero" },
    @{ n = "always";   src = "out/card-always.png";   w = 700; qw = 80; qa = 58; dir = "cards" },
    @{ n = "remember"; src = "out/card-remember.png"; w = 700; qw = 80; qa = 58; dir = "cards" },
    @{ n = "quiet";    src = "out/card-quiet.png";    w = 700; qw = 80; qa = 58; dir = "cards" }
)

Write-Output "== 4. WebP + AVIF =="
foreach ($j in $jobs) {
    $target = "..\public\$($j.dir)"
    New-Item -ItemType Directory -Force $target | Out-Null
    magick $j.src -resize "$($j.w)x" -strip -define webp:method=6 -quality $j.qw "$target/$($j.n).webp"
    magick $j.src -resize "$($j.w)x" -strip -quality $j.qa "$target/$($j.n).avif"
}

Write-Output "== 5. velicine =="
$avif = 0; $webp = 0
foreach ($j in $jobs) {
    $a = (Get-Item "..\public\$($j.dir)/$($j.n).avif").Length / 1KB
    $w = (Get-Item "..\public\$($j.dir)/$($j.n).webp").Length / 1KB
    $avif += $a; $webp += $w
    "{0,-10} {1,-6} avif {2,6} KB   webp {3,6} KB" -f $j.n, $j.dir, [math]::Round($a, 0), [math]::Round($w, 0)
}
"{0,-10} {1,-6} avif {2,6} KB   webp {3,6} KB" -f "UKUPNO", "", [math]::Round($avif, 0), [math]::Round($webp, 0)
