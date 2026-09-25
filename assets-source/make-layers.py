"""Priprema slojeva za parallax hero.

layer-e (more + planina): alpha iz generatora je neupotrebljiv, nebo secemo sami.
Nebo i more imaju slicnu svjetlinu u gornjem dijelu kadra, ali:
  - horizont je ravan i jako se vidi kao skok svjetline naniže,
  - planina je neprekidna tamna masa od svog vrha do horizonta,
  - oblak NIJE (ispod oblaka je opet svijetlo nebo).
Zato: prvo nadjemo horizont globalno, pa po koloni trazimo najvisu tacku od
koje je sve do horizonta tamno. Tako oblaci ne prave rupe.

layer-b (statua) i layer-c (nebo) su u redu; samo seku ivice (artefakt).
layer-d (kamen) je neprovidan — pozadina se vadi u ImageMagicku, ne ovdje.
"""
from PIL import Image, ImageFilter
import numpy as np

CROP = 12
DARK = 134.0  # ispod ove svjetline je "more/planina", iznad je "nebo"


def crop_edges(img: Image.Image) -> Image.Image:
    return img.crop((CROP, CROP, img.width - CROP, img.height - CROP))


def cut_sky(src_path: str, out_path: str) -> None:
    src = crop_edges(Image.open(src_path).convert("RGB"))
    w, h = src.size
    blurred = src.filter(ImageFilter.BoxBlur(16))
    bright = np.asarray(blurred).astype(np.float32).mean(axis=2)

    # 1) horizont = najveci skok svjetline naniže u donjoj polovini
    profile = bright.mean(axis=1)
    k = 10
    steps = profile[:-2 * k] - profile[2 * k :]
    lo, hi = int(h * 0.35), int(h * 0.8)
    horizon = lo + int(np.argmax(steps[lo:hi]))
    print(f"horizont (globalno): y={horizon}")

    # 2) po koloni: najvisa tacka od koje je do horizonta uglavnom tamno.
    #    Dozvoljavamo ~18% svijetlih piksela, jer planina ima pjescanih dijelova
    #    koji bi inace pravili "ploce" i zareze u silueti.
    limit = horizon - 260
    dark = bright < DARK
    bright_count = np.cumsum(~dark, axis=0).astype(np.float32)
    edge = np.full(w, horizon, dtype=np.int32)
    for x in range(w):
        total = bright_count[horizon, x]
        for y in range(limit, horizon):
            inside = total - (bright_count[y - 1, x] if y > 0 else 0)
            if inside <= 0.18 * (horizon - y):
                edge[x] = y
                break

    # 3) glatka kriva: medijan pa jako gaussian (bez platoa i vertikalnih ivica)
    pad = np.pad(edge, 20, mode="edge")
    edge = np.array([int(np.median(pad[i : i + 41])) for i in range(w)], dtype=np.float32)
    kernel = np.exp(-0.5 * (np.arange(-60, 61) / 20.0) ** 2)
    kernel /= kernel.sum()
    padded = np.pad(edge, 60, mode="edge")
    edge = np.convolve(padded, kernel, mode="valid")

    # 4) mekana ivica (izmaglicasti greben se stapa sa nebom)
    alpha = np.zeros((h, w), dtype=np.float32)
    ramp = 20.0
    for x in range(w):
        start = edge[x]
        for y in range(max(0, int(start - ramp)), h):
            if y >= start + 2:
                alpha[y, x] = 255.0
            else:
                alpha[y, x] = 255.0 * (y - (start - ramp)) / (ramp + 2)
    mask = Image.fromarray(np.clip(alpha, 0, 255).astype(np.uint8))

    out = src.convert("RGBA")
    out.putalpha(mask)
    out.save(out_path)
    print(f"{out_path}: {w}x{h}  siluet vrh min={int(edge.min())} max={int(edge.max())}")

def clean_statue(src_path: str, out_path: str) -> None:
    src = crop_edges(Image.open(src_path).convert("RGBA"))
    arr = np.asarray(src).copy()
    a = arr[:, :, 3].astype(np.float32)
    arr[:, :, 3] = (np.clip((a - 30) / (225 - 30), 0, 1) * 255).astype(np.uint8)
    img = Image.fromarray(arr, "RGBA")
    img = img.crop(img.getbbox())
    img.save(out_path)
    print(f"{out_path}: {img.width}x{img.height}")


def reserve_sky(src_path: str, out_path: str) -> None:
    img = crop_edges(Image.open(src_path).convert("RGB"))
    img.save(out_path)
    print(f"{out_path}: {img.width}x{img.height}")


if __name__ == "__main__":
    import os

    os.makedirs("out", exist_ok=True)
    cut_sky("layer-e.png", "out/sea-raw.png")
    clean_statue("layer-b.png", "out/statue-raw.png")
    reserve_sky("layer-c.png", "out/sky-raw.png")
