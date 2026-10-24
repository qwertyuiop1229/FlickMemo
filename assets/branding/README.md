# FlickMemo icon assets

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
