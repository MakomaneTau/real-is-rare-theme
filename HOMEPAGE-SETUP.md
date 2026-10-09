# Homepage editorial setup

These local enhancements extend Atelier 4.1.3. The checkout already contained uncommitted implementation files on feat/homepage-new-drops-rotation-manifesto when this task started. Base commit: 9b7cbd5bb6dc07f43245c4511885859b2917bc3a. Existing changes were preserved. No theme was published, pushed, or committed.

## Merchant settings

In the Shopify Theme Editor, open the homepage:

1. **Just Dropped:** select the actual New Drops collection. Its Shopify sort order controls the cards. This is deliberately unassigned until the merchant chooses it. An unselected/empty collection hides the section publicly and shows editor-only setup guidance. Show collection badges controls the NEW label.
2. **Stay in Rotation:** select All Pieces, Pants, Outerwear and Sets collections. Existing assignments are all-season-essentials, jackets, and tracksuits-sets. Pants is unassigned. Filters use these collections without guessing tags or product types. Empty categories show the configurable empty-state message. All Pieces must contain products for the section to appear publicly.
3. Configure copy, CTA overrides, counts, badges and pale tile backgrounds in each product section. CTAs default to the selected main collection URL.
4. **Brand Manifesto:** all six captions/statement lines are editable.
5. **Theme settings > Homepage editorial:** choose the display font (default Oswald Bold). The extra font and homepage layout/filter assets load on the homepage only. Shared product-card CSS loads throughout the storefront.
6. **Theme settings > Logo:** keep the existing genuine white inverse logo configured for the mobile homepage. Desktop and other-template logo selection is retained. Account access remains beside the menu.

## Placement and product behavior

Just Dropped follows the hero; Stay in Rotation follows the collection list; the manifesto is the final homepage section before the footer group. Existing cargo product, campaign content, product lists, newsletter and footer remain. The template has 12 sections.

Both product sections use white backgrounds and pale tiles. Just Dropped uses a staggered desktop grid and a mobile swipe strip with a following-card peek. Rotation has four desktop columns, two tablet/mobile columns, and one column below 360px. Products supply real titles, prices, images, availability, URLs and meaningful Shopify swatches. Swatches link to variants. Cards link to product details rather than adding an arbitrary variant. Missing images use a native placeholder; secondary-image transitions respect reduced motion.

## Verification on 9 October 2026

Section schema JSON, setting IDs, homepage order/references/count, 69 repository JSON files (allowing Shopify comments) and Git whitespace were checked locally. Rotation passed local DOM-harness checks for clicking, panel visibility, empty-category status, Home/End, arrow wrapping, RTL and reconnect cleanup. These checks do not substitute for browser testing.

Installed Shopify CLI package version: 4.6.1. Theme Check stalled without output in this environment; no passing result is claimed. The terminal tool failed to start with a helper setup error. Browser inventory is empty and live storefront requests failed. No safe preview URL, screenshots, catalog taxonomy audit, logo visual verification, Theme Editor validation or live menu/search/cart interaction checks were available.

Before release, run npm.cmd run check and npm.cmd run dev from an authenticated terminal. The existing dev script targets sjmihm-my.myshopify.com. Use a development/unpublished theme. Review at 1440, 768, 430, 390, 360 and 320px, including the sticky header, logo, menu/account/search/cart, focus, product/variant links, filters and all preserved content. Photos with opaque dark backgrounds need approved neutral-background product media in Shopify; CSS cannot remove a baked-in background.

## Implementation files

- sections/rir-just-dropped.liquid
- sections/rir-stay-in-rotation.liquid
- sections/rir-brand-manifesto.liquid
- assets/rir-homepage.css
- assets/rir-rotation.js
- snippets/rir-product-card-content.liquid
- snippets/product-card.liquid
- blocks/_header-logo.liquid
- sections/header.liquid
- layout/theme.liquid
- config/settings_schema.json
- templates/index.json
- HOMEPAGE-SETUP.md

## Shared product-card design

The pale portrait tile, bordered square detail arrow, bold title and right-aligned price now apply to collection grids, homepage product lists, product recommendations, search/navigation product previews, campaign products and Worn with suggestions. Native card galleries, swatches, quick-add forms and variant handlers remain in their existing render paths. Quick add uses a separate square control at the lower left so the product detail arrow stays at the lower right. Prices stack below titles for cards narrower than 240px. Collection zoom-out behavior is retained.

THE ROTATION is authorized only for cards with the homepage-rotation context supplied by Stay in Rotation. Just Dropped retains its merchant-controlled NEW label. Other cards retain real sale/sold-out labels where supplied by their existing components.

Additional files: assets/rir-product-cards.css, snippets/rir-card-arrow.liquid, snippets/stylesheets.liquid, snippets/card-gallery.liquid, snippets/resource-card.liquid, sections/campaign-editorial.liquid and sections/product-worn-with.liquid. Card CSS was extracted from assets/rir-homepage.css into the global shared stylesheet.

Shared-card validation: Git whitespace and source asset/snippet-reference checks passed; the rotation badge guard and retained native gallery hooks were inspected. Theme Check again stalled without output. Browser rendering and interaction verification remain outstanding; inspect collections, recommendations, search, navigation previews, campaign cards, swatches/quick add and the zoom-out view in an unpublished preview before release.

Price overlap correction: the full-width block selector now excludes native product-price and productTitleLink elements. Previously its higher specificity made prices span both columns while sharing the title row. Native price containers also inherit the card font rather than the merchant heading preset. Narrow cards retain the separate stacked price row. Git whitespace checks passed; rendered verification remains unavailable.

Shop-the-look exception: campaign-editorial sections using the shop layout retain their original compact single-column product rows (90px thumbnails, adjacent title, price below). Other campaign layouts and storefront cards keep the shared portrait-card design.
