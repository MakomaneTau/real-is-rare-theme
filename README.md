# Real is Rare Shopify theme

The storefront theme for **Real is Rare**, built on Shopify's **Atelier 4.1.3** Online Store 2.0 theme. It combines Atelier's editable theme architecture with a campaign-led fashion storefront: drop announcements, editorial photography, lookbook layouts, collection storytelling, product fit details, and quick shopping interactions.

This repository is a Shopify theme, not a standalone web application. Shopify renders the Liquid templates and supplies products, collections, menus, customer data, metafields, and checkout.

## Contents

- [Technology](#technology)
- [Project structure](#project-structure)
- [Rendering architecture](#rendering-architecture)
- [Storefront pages](#storefront-pages)
- [Campaign customisations](#campaign-customisations)
- [Configuration and content](#configuration-and-content)
- [Local development](#local-development)
- [Theme editing guidelines](#theme-editing-guidelines)
- [Quality checks](#quality-checks)

## Technology

- Shopify Online Store 2.0
- Liquid templates, sections, blocks, snippets, and JSON templates
- Native CSS and JavaScript ES modules/custom elements
- Shopify CLI for development and Theme Check

There is no Sass, Tailwind, React, or application build pipeline. CSS is primarily in `assets/base.css` and section/block-scoped `{% stylesheet %}` tags; interactive behavior lives in `assets/*.js`.

## Project structure

| Path | Purpose |
| --- | --- |
| `layout/` | The site document shells. `theme.liquid` loads metadata, styles, scripts, the header group, page content, footer group, cart drawer, search modal, and optional quick-add UI. |
| `templates/` | JSON page templates that compose sections for product, collection, cart, search, blog, article, page, password, and 404 routes. Also contains the Liquid gift-card template. |
| `sections/` | Editor-configurable page modules and section groups, including the header, footer, hero, product, collection, cart, search, and campaign sections. |
| `blocks/` | Reusable theme-editor blocks used inside sections, such as product-card parts, navigation, buttons, menus, accordions, media, text, footer elements, and AI-generated campaign blocks. |
| `snippets/` | Small reusable Liquid partials for rendering UI primitives, cards, styling variables, metadata, modal/drawer interfaces, and other shared functionality. |
| `assets/` | Global styles, SVG icons, fonts where applicable, and browser-side JavaScript modules/custom elements. |
| `config/` | Theme-wide editor settings (`settings_schema.json`) and this theme instance's saved configuration (`settings_data.json`). |
| `locales/` | Theme translation strings and settings-schema translations. |
| `PHOTOGRAPHY-GUIDE.md` | Content brief for campaign photography, product/collection metafields, lookbook setup, image sizes, and pre-publish checks. |
| `temp/` | Local Shopify/Theme Editor working artifacts. Treat this as temporary material rather than source-of-truth theme code. |

## Rendering architecture

The primary render flow is:

```text
layout/theme.liquid
  ├─ sections/header-group.json
  │   ├─ countdown-banner
  │   └─ header
  ├─ content_for_layout
  │   └─ templates/*.json → sections → blocks → snippets
  ├─ sections/footer-group.json
  ├─ cart drawer and theme drawer
  ├─ predictive search modal
  └─ quick-add modal (when enabled in theme settings)
```

JSON templates define section order and saved merchant settings. Liquid section and block files define the available markup, schema, and editor controls. Reusable snippets provide shared rendering and style behavior.

### Global layout behavior

`layout/theme.liquid` is the application shell. It:

- renders SEO metadata, fonts, stylesheets, scripts, color-palette variables, and Shopify's `content_for_header`;
- renders the accessible skip-to-content link;
- calculates header-height CSS variables early to limit layout shift;
- conditionally loads scroll-reveal behavior on home, product, and collection pages;
- supports page and product view transitions when enabled in theme settings; and
- mounts persistent search, cart, chat, drawer, and quick-add interfaces.

## Storefront pages

### Header and footer

`sections/header-group.json` currently orders the countdown banner above the main header. The header includes the configured menu, search, localization, customer/account actions, sticky-header behavior, and page-specific transparent-header options.

`sections/footer-group.json` composes the footer, logo, and utility/footer content. Menus, signup copy, social links, policies, payment icons, and footer layout remain editable through the Shopify Theme Editor.

### Homepage

`templates/index.json` is the campaign homepage. Its current section sequence includes:

1. A configurable `_blocks` campaign intro/content section.
2. Hero.
3. Collection list.
4. Latest-drop product list.
5. Shop-the-Look campaign editorial.
6. Featured product information.
7. A paired campaign editorial layout.
8. A second product-list section.
9. An exclusive-collection/content `_blocks` section.

The exact images, links, headings, product collections, and block settings are merchant-editable in Shopify. See [PHOTOGRAPHY-GUIDE.md](PHOTOGRAPHY-GUIDE.md) for intended image direction and content setup.

### Collections and lookbook

- `templates/collection.json` contains the standard collection page, including `collection-campaign` and the main product grid.
- `templates/collection.lookbook.json` provides a collection-based lookbook route.
- `templates/page.lookbook.json` provides a page-based lookbook once a Shopify page is created and assigned the **lookbook** template.
- `sections/main-collection.liquid` supports a normal filterable/sortable product grid and an optional editorial campaign image after the first eight products.

The collection campaign image can come from the collection metafield `custom.campaign_image`, a section setting, or the normal Shopify collection image. The product-grid editorial image can use `custom.editorial_image` or the section's configured campaign image.

### Product pages

`templates/product.json` composes the product media, product information, buying controls, recommendations, and related campaign content. The theme includes:

- media gallery, variant selection, quantity, price, inventory, SKU, and buy-button blocks;
- quick add and cart-drawer flows;
- product-card image interaction and carousel support;
- **Fit & Details** content that only renders populated product metafields; and
- a **Worn With** section for products actually styled together.

Recommended product metafields are documented in `PHOTOGRAPHY-GUIDE.md`: `custom.fit_notes`, `custom.model_size`, `custom.materials`, `custom.care_instructions`, `custom.size_guide`, `custom.campaign_image`, and `custom.worn_with`.

### Other templates

The theme also includes cart, search, blog, article, contact page, generic page, list-collections, password, 404, and gift-card templates. Supporting sections cover predictive search, cart drawer, blogs, slideshows, carousels, media-with-content, product recommendations, quick-order lists, and more.

## Campaign customisations

Project-specific features sit alongside the Atelier foundation:

- **Countdown banner** — `sections/countdown-banner.liquid` and its block configuration support a timed drop announcement, timer, expired state, typography, colors, and responsive spacing. It is configured in the header group.
- **Campaign hero and editorial layouts** — `sections/hero.liquid` and `sections/campaign-editorial.liquid` support campaign-led images, mobile-specific crops, look blocks, links, and product associations.
- **Collection storytelling** — `sections/collection-campaign.liquid` and the editorial tile in `sections/main-collection.liquid` add collection-level photography without replacing Shopify filtering or sorting.
- **Product fit and styling context** — `blocks/product-fit-details.liquid`, `sections/product-worn-with.liquid`, and related product configuration present real garment information and selected outfit products.
- **Motion and interactions** — `assets/scroll-reveal.js` uses progressive enhancement for scroll reveals; page transitions respect the relevant theme settings and reduced-motion preferences.
- **Button hover treatment** — `assets/button-hover.css` supplies the shared button hover effect, with palette and component values exposed through CSS custom properties.

## Configuration and content

Use the Shopify Theme Editor for routine content and layout work. It writes saved values into JSON templates, section groups, and `config/settings_data.json`.

Important configuration surfaces:

- **Theme settings:** logo, favicon, color palette, typography, buttons, cards, quick add, cart, transitions, and global visual preferences in `config/settings_schema.json`.
- **Header/footer groups:** navigation menus, announcement/drop banner, localization, customer links, newsletter, social links, payment methods, and legal utilities.
- **Homepage and lookbook sections:** campaign assets, mobile crops, copy, collections, selected products, and destination links.
- **Shopify content:** products, media, collections, menus, pages, blogs, metafields, translations, markets, and policies are managed in Shopify Admin.

Avoid inventing product facts or associating unrelated products with campaign photos. The photography guide deliberately uses placeholders and content briefs until verified images and product information are available.

## Local development

### Prerequisites

- Node.js and npm
- Shopify CLI authenticated to an account that can access the store/theme

### Commands

```powershell
# Install project dependencies if needed
npm.cmd install

# Start Shopify's local theme preview using the store configured in package.json
npm.cmd run dev

# Run Shopify Theme Check
npm.cmd run check
```

The `dev` script currently includes a store domain. Update it if working against another development store, and never commit credentials or access tokens.

On Windows, `npm.cmd` and `shopify.cmd` avoid PowerShell execution-policy issues:

```powershell
shopify.cmd theme check
```

## Theme editing guidelines

- Prefer Theme Editor configuration for merchant content and placement changes; edit Liquid when creating or changing the capabilities of a section/block/snippet.
- Treat `templates/*.json`, `sections/header-group.json`, `sections/footer-group.json`, and `config/settings_data.json` as generated/saved configuration. Make targeted edits and expect Theme Editor changes to overwrite manual values.
- Preserve Liquid schema validity and ensure new sections/blocks expose sensible editor settings.
- Keep desktop and mobile media separate where campaign composition requires different crops.
- Maintain accessible interaction behavior: semantic controls, focus visibility, useful alternative text, keyboard support, no-JavaScript content where appropriate, and `prefers-reduced-motion` support for motion.
- Keep custom styles scoped to their component or section when possible. Use `assets/base.css` for genuine global primitives.
- Keep product, collection, and campaign claims tied to verified Shopify content and metafields.

## Quality checks

Run these before handing off a theme change:

```powershell
npm.cmd run check
git diff --check
```

Theme Check and diff validation confirm source quality; they do not prove storefront appearance or user interaction. Also preview the affected page in Shopify at mobile and desktop sizes. For commerce changes, test the relevant navigation links, product selection, add-to-cart/cart drawer flow, search, filters, and any configured campaign links.

For image/content publishing, complete the checklist in [PHOTOGRAPHY-GUIDE.md](PHOTOGRAPHY-GUIDE.md).
