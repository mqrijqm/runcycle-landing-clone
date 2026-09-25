"""Vadi ilustracije iz gotovih kartica (PNG-ovi sa upecanim tekstom).

Kartica izgleda ovako:
    [ bijeli okvir ]
       [ ilustracija ]   <- ovo vadimo
       [ naslov ]         <- tekst, ne vadimo
       [ podnaslov ]

Ilustracija se nalazi kao najduzi neprekidan niz redova koji imaju tamne
piksele (gravura ima dosta crnih linija, a bijeli dio kartice i tekst ispod
su odvojeni praznim redovima).

Detekcija po ivicama nije pouzdana na svijetlim dijelovima (npr. kamen je
bež), pa se za sve tri kartice koristi JEDAN zajednicki izrez (unija sve tri
detekcije) — tako su ilustracije identicno kadrirane. Dodatno se ulazi 30px
unutra, da se izbjegnu bijeli zaobljeni coskovi iz originalne kartice.
"""
from PIL import Image
import numpy as np
import os

SRC = "cards"
OUT = "../public/cards"
INSET = 30
DARK = 190
ROW_MIN = 0.03
COL_MIN = 0.03

# raw fajl -> ime asseta
CARDS = {
    "raw-02-1122x1402.png": "always",   # Uvijek dostupan
    "raw-00-1122x1402.png": "remember",  # Pamti sve
    "raw-01-1122x1402.png": "quiet",    # Bez suma
}


def rough_bbox(path: str) -> tuple[int, int, int, int]:
    """Gruba granica sadrzaja (ilustracije) u jednoj kartici."""
    gray = np.asarray(Image.open(path).convert("L")).astype(np.uint8)
    h, w = gray.shape
    dark = gray < DARK

    rows_on = dark.sum(axis=1) > w * ROW_MIN
    best, start = (0, 0), None
    for y in range(h):
        if rows_on[y] and start is None:
            start = y
        elif not rows_on[y] and start is not None:
            if y - start > best[1] - best[0]:
                best = (start, y)
            start = None
    if start is not None and h - start > best[1] - best[0]:
        best = (start, h)

    top, bottom = best
    cols = dark[top:bottom].sum(axis=0)
    cols_on = np.where(cols > (bottom - top) * COL_MIN)[0]
    return int(cols_on[0]), top, int(cols_on[-1]) + 1, bottom


def main() -> None:
    os.makedirs(OUT, exist_ok=True)
    os.makedirs("out", exist_ok=True)

    boxes = {name: rough_bbox(os.path.join(SRC, name)) for name in CARDS}
    left = min(b[0] for b in boxes.values())
    top = min(b[1] for b in boxes.values())
    right = max(b[2] for b in boxes.values())
    bottom = max(b[3] for b in boxes.values())
    box = (left + INSET, top + INSET, right - INSET, bottom - INSET)
    print(f"zajednicki izrez: {box}  ({box[2]-box[0]}x{box[3]-box[1]})")

    for name, out in CARDS.items():
        img = Image.open(os.path.join(SRC, name)).convert("RGB").crop(box)
        img.save(os.path.join("out", f"card-{out}.png"))
        print(f"  {out:9s} {img.width}x{img.height}")


if __name__ == "__main__":
    main()
