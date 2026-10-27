# FlickMemo icon assets

## Selected identity — 2026-10-27

Generated with the built-in image_gen tool. The user selected the SECOND of four generated images: a rounded charcoal memo with two ivory slots and a small orange bookmark tab, **without an arrow**. The three-concept comparison sheet and sculptural ribbon are previews, not the production identity.

`flickmemo-master.png` is the selected 1254 × 1254 RGBA master. `python scripts/export_icons.py` exports Web/PWA/extension/Apple touch assets in `public/icons/`, Windows PNG/ICO in `src-tauri/icons/`, and `icon.png`. Standard PNG/ICO exports preserve transparent rounded corners. Maskable PWA icons keep an opaque ivory background and safe padding for the operating system's own mask. The script only trims transparent outside margins and resizes the generated artwork.

Installed PWAs, extensions and Windows executables need their respective update. Windows may cache the previous shortcut icon.

Final prompt (prior icon used only as a palette reference):

> Use case: logo-brand. Generate a new final square app icon for FlickMemo, a minimalist modern notes utility. Reference image ONLY for color palette: warm ivory #F3EFE7, almost-black charcoal #262722, small burnt orange #CB5733 accent. Completely replace its symbol: absolutely NO arrows, arrowheads, sending symbol, paper plane, lightning bolt, chevron or folded-page corner. New design: an exceptionally clean abstract memo tile, a slightly tall rounded charcoal rectangle with two clean short ivory horizontal slots, with a single small warm-orange rounded tab gently inset at the top edge, evocative of a bookmark/memo without literally drawing stationery. One unified well-balanced friendly geometric silhouette, sophisticated contemporary 2026 visual identity, distinguishable at tiny favicon sizes, plenty of breathing room. Ivory rounded-square outer tile with a generous smooth squircle corner radius, genuinely transparent outside the rounded tile. No text, no letters, no old-fashioned notebook rings, no pencil, no outlines, no gradients, no textures, no 3D, no shine, no shadows, no mockup. Flat solid colors, precise elegant proportions, one finished app icon centered, square 1024x1024.

## Historical identity (replaced)

2026-10-24 / version 1.3.76

Generated with the built-in image_gen tool. The original blue concept was rejected by the user. The final icon uses warm ivory, charcoal and vermilion. The memo silhouette represents capture; the diagonal arrow represents a quick flick/send. No existing brand assets were used.

- Master: `assets/branding/flickmemo-master.png` (1254 × 1254)
- Compatibility icon: `icon.png` (512 × 512)
- Production exports: `public/icons/`
- Size preview: `docs/icon-preview.png`
- Export again: `python scripts/export_icons.py` (Pillow 12.2.0 was used)

The exporter only resamples the generated artwork and adds maskable safe padding; it does not redraw the design. The maskable marks were checked to fit within the central 80% diameter circle. Standard icons are exported at 16, 32, 48, 64, 128, 180, 192, 256 and 512 pixels; maskable icons at 192 and 512; favicon.ico contains multiple sizes.

Final image-generation prompt:

> Edit this FlickMemo app icon. The user dislikes the blue palette. Change ONLY colors and finish; preserve the exact memo silhouette, its two cutout lines, the separate diagonal flick arrow, proportions, placement and generous padding. Replace the entire blue full-bleed background with a flat warm ivory #F3EFE7, including the line cutouts and negative space. Change the large memo-sheet silhouette from white to near-black warm charcoal #252622. Change only the small separate upper-right arrow from white to a rich restrained vermilion #CB5539, not bright neon. Overall elegant, modern, quiet and distinctive, premium productivity app, absolutely no blue or purple. Remove all grain, texture and gradients: flat crisp clean geometric raster with antialiased edges, no shadow, no text, no mockup, no extra shapes, no exterior margins or rounded outer tile. The background fills the entire square edge to edge. Output a single square final icon.

Web entry points, PWA manifests and extension manifest point at these same exports. The application login/header and download page also use the new identity. Deploying the website and installing/reloading the extension are separate release actions; creating these files does not update an already-installed PWA or the live site.
