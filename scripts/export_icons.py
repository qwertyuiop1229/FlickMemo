"""Export production icon sizes from the approved generated master (Pillow)."""
from pathlib import Path
from PIL import Image, ImageFilter

ROOT = Path(__file__).resolve().parents[1]
source = Image.open(ROOT / 'assets/branding/flickmemo-master.png').convert('RGBA')
# Trim the generator's transparent outside margin; retain the rounded tile's alpha.
bounds = source.getchannel('A').filter(ImageFilter.MinFilter(15)).getbbox()
if bounds:
    left, top, right, bottom = bounds
    source = source.crop((max(0, left - 7), max(0, top - 7), min(source.width, right + 7), min(source.height, bottom + 7)))
out = ROOT / 'public/icons'
out.mkdir(parents=True, exist_ok=True)
for size in (16, 32, 48, 64, 128, 180, 192, 256, 512):
    source.resize((size, size), Image.Resampling.LANCZOS).save(out / f'icon-{size}.png', optimize=True)
# PWA maskable icons have their complete mark inside the central 80% safe circle.
# This is a format export with extra padding; the generated artwork stays intact.
background = (243, 239, 231)
for size in (192, 512):
    maskable = Image.new('RGB', (size, size), background)
    content_size = round(size * 0.82)
    content = source.resize((content_size, content_size), Image.Resampling.LANCZOS)
    offset = (size - content_size) // 2
    maskable.paste(content, (offset, offset), content)
    maskable.save(out / f'icon-maskable-{size}.png', optimize=True)
source.resize((256, 256), Image.Resampling.LANCZOS).save(out / 'favicon.ico', sizes=[(16, 16), (32, 32), (48, 48), (64, 64), (128, 128), (256, 256)])
source.resize((512, 512), Image.Resampling.LANCZOS).save(ROOT / 'icon.png', optimize=True)
native = ROOT / 'src-tauri/icons'
source.resize((512, 512), Image.Resampling.LANCZOS).save(native / 'icon.png', optimize=True)
source.resize((256, 256), Image.Resampling.LANCZOS).save(native / 'icon.ico', sizes=[(16, 16), (32, 32), (48, 48), (64, 64), (128, 128), (256, 256)])
print('Exported web, PWA, Apple touch, extension icons and favicon.ico')
