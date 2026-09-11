# Real is Rare campaign photography

The new sections deliberately show image placeholders and shot descriptions until photographs are selected. No product, fit, material or model claims have been invented.

## Homepage

The order is campaign hero, four latest-drop products, Shop the Look, campaign photo pair, collections and the existing footer signup. The previous featured product and limited-edition poster sections are disabled so their configuration can be restored in the editor.

| Placement | Photograph to use | Suggested source size |
| --- | --- | --- |
| Hero desktop | Landscape model photograph with the current release, negative space on the left for the headline, and faces/clothing away from the edges. | 2400 × 1350 |
| Hero mobile | Separate portrait composition from the same shoot. Keep the model clear of the headline and leave space around the head and shoes. | 1200 × 1800 |
| Shop the Look | Full-body 4:5 photograph showing the complete outfit, including footwear. Select the exact products worn in that photograph's block. | 1600 × 2000 |
| Campaign pair: In Motion | Vertical environmental portrait with a model wearing the current drop. | 1600 × 2000 |
| Campaign pair: The Details | Matching close-up of fabric, print, stitching or embroidery on the model. | 1600 × 2000 |
| Collection cards | A consistent portrait for each category: upper-body for tees/jackets, full-body for trousers. | 1600 × 2000 |

The hero retains the existing campaign artwork. To replace it, open the Hero section, turn off **Use rare campaign asset**, select the desktop image, enable custom mobile media and select the mobile image. Preview both crops before saving. Use the image picker focal point where needed.

The Latest Drop section currently uses the existing T-shirts collection. Choose the collection containing the release you want to feature. The cards now show names and prices.

## Lookbook

The header links to `/collections/all?view=lookbook` until a Shopify Page with handle `lookbook` exists. This alternate template makes the Lookbook available immediately without an Admin API connection.

For a permanent `/pages/lookbook` address, create a page named Lookbook in Shopify and assign its **lookbook** theme template. The desktop, drawer and homepage campaign links then use that page automatically. Edit the **page** version of the template after this switch; the alternate collection version has independent section settings.

Shop the Look and Worn With show two non-interactive product placeholders until outfit products are selected. These disappear when real products are configured; they do not show invented prices or link to unrelated items.

Add, reorder or remove Photograph / Look blocks in the Campaign Editorial section. Each block supports desktop and mobile images, descriptive alt text, an outfit caption, up to four products and an optional link.

1. LOOK 01: wide campaign shot, 16:9 desktop and 4:5 mobile.
2. LOOK 02: vertical full-body model portrait, 4:5.
3. LOOK 03: matching fabric or print detail, 4:5.
4. LOOK 04: wide candid / location shot showing movement, with a separate mobile crop.

The first and every third subsequent photograph span the desktop grid. Mobile shows one photograph per row. Keep lighting and color treatment consistent across the shoot.

## Collection pages

The Collection Campaign section uses the collection's `custom.campaign_image` image metafield, then the section image, then the collection image. Its placeholder requests a wide campaign image. Add a separate mobile crop in the section when necessary.

The product grid can display an editorial image after eight products on the first results page. It uses `custom.editorial_image`, then the section's Campaign Grid Photograph setting. The image occupies its own full-width row and is hidden in the zoomed-out product view. Collections with fewer than eight products do not show this break. Sorting and filtering still use the normal product list.

Use a landscape image of models in motion, ideally 2400 × 1050. Turn off **Show campaign photo after eight products** if that collection does not need one.

## Product pages

Upload these to each product's normal Media gallery in Shopify, in this order:

1. Clear front view of the actual garment / selected color.
2. Back view.
3. Full-body model photograph showing fit and length.
4. Close-up of fabric, print or construction.
5. Styled campaign image.

The existing gallery keeps thumbnails. Product cards use 4:5 images with the existing second-image hover behavior and an enabled carousel; arrows remain visible on touch devices.

Create these optional product metafield definitions in Shopify Settings → Custom data → Products:

| Namespace and key | Shopify type | Content |
| --- | --- | --- |
| `custom.fit_notes` | Multi-line text | Actual fit, cut, stretch and sizing advice for this garment. |
| `custom.model_size` | Single-line text | Real model height and size worn, matching the photograph. |
| `custom.materials` | Multi-line text | Verified fabric composition, weight and construction. |
| `custom.care_instructions` | Multi-line text | Actual care instructions from the garment label. |
| `custom.size_guide` | Rich text | Garment measurements, units, and how they were taken. |
| `custom.campaign_image` | File, images only | Full-body photograph of this product styled with the outfit. |
| `custom.worn_with` | Product reference, list | Other products actually worn in that photograph. |

Create `custom.campaign_image` and `custom.editorial_image` as image file definitions under Collections for collection-specific photography.

Fit & Details only displays fields that contain content. The old generic Care and Design accordion rows are disabled. Worn With uses each product's photograph and selected products; no unrelated recommendations are labeled as outfit items. Its placeholder can be switched off in the section settings until content is ready.

## Before publishing

- Replace the placeholders, add matching products to each Shop the Look / Lookbook block, and check every link.
- Add meaningful alt text describing the outfit and photograph; avoid repeating marketing copy.
- Preview at mobile, tablet and desktop widths. Check head/shoe crops, header clearance, carousel controls, product links, filters and the cart.
- Use optimized WebP/JPEG photographs, generally below 500 KB for card images and around 1 MB or less for large campaign images when visual quality allows.
- The new images load lazily below the hero; avoid uploading multiple full-resolution camera originals.

Validation so far includes Shopify Theme Check and HTTP render checks against the local Shopify preview. Interactive browser and screenshot verification still needs to be completed because the browser connection was unavailable during implementation.
