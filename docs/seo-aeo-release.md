# SEO/AEO release evidence and editorial gate

This record is for the HotelByte marketing site at `hotelbyte.com`. The target
buyer is a hotel distribution platform or travel seller. The intended search
outcome is a qualified evaluation or demo request, not an unqualified pageview.

## Language publication contract

- English keeps its current paths. The ten additional language codes are
  `zh`, `hi`, `es`, `fr`, `ar`, `pt`, `de`, `tr`, `fil`, and `he`.
- A localized URL is publishable only when its visible body, navigation,
  metadata, structured data, CTA, and linked legal text have been reviewed.
  Review status is declared per route in `src/i18n/locale.ts`.
- Arabic and Hebrew also require RTL review on desktop and mobile. A locale
  without reviewed copy must not render English under a locale-prefixed URL.
- The starting inventory is 85 indexable URLs in the live sitemap on
  2026-09-27: 17 non-story URLs and 68 Daily Stories. New solution, guide,
  integration, and evidence pages increase the inventory and must obey the
  same rule. Each Daily Story translation must preserve the date, slug,
  meaning, visual alt text, and CTA relationship.
- Legal and public-notice translations need a legal/business owner to approve
  their meaning before they are published. The current branch is not a
  full 11-language release until all route-language pairs pass this gate.

## Content evidence rules

Before publishing a numerical or commercial claim, record its source and
the date it was checked. Code integration, configured credentials, supplier
contract, and live availability are different evidence levels; the site must
say which level it can prove. A client name, logo, quote, or outcome needs
explicit publication permission. Product walkthroughs are labeled as product
evidence rather than customer success stories.

The 2026-09-27 source review found 24 supplier initializers in
`hotel-be/supplier/init.go`, including the simulator. This does not prove a
live count for a buyer account. The current entity model includes group,
brand, customer, and account accessors in
`hotel-be/user/domain/entity_accessors.go`; a fixed three- or four-tier
marketing shorthand must not replace a diagram of the actual boundary.
Claims about average implementation time or improvement multiples need
customer evidence before they return to the site.

## Pre-publication checks

1. Run `npm run lint`, `npm run test:locale`, `npm run test:daily-stories`,
   `npm run build`, and `npm run test:seo` with the required public Paddle client
   token configured. The SEO check audits generated HTML and the sitemap; it
   cannot substitute for a live HTTP check on the hosting platform.
2. Inspect every generated canonical page for a nonempty body, one title and
   description, correct `lang` and `dir`, self-canonical, reciprocal
   `hreflang`, visible same-language links, and a sitemap entry.
3. Inspect a non-existent route and every unpublished locale route for a real
   HTTP 404. Check that `/pay` and date aliases retain their intended index
   behavior.
4. Walk the homepage, all top-level menus, footer, language switcher, demo
   and contact path with desktop keyboard and mobile touch. Confirm that
   first-time homepage visitors stay on the homepage.
5. Review factual claims, structured data, translations, and RTL layouts with
   named reviewers. Preserve the review record with the release SHA.

## Search and lead measurement

Search Console access is required to establish the actual baseline; public
`site:` searches cannot supply reliable impressions, clicks, or average
position. At release, verify the domain property and submit the generated
`sitemap.xml`. Save the prior 28 days of Search Console queries, pages,
countries, impressions, clicks, CTR, and average position. Track the Chinese
query `酒店分销` and the English commercial query set separately.

Record qualified inquiries from the site's sales email/demo path with source
URL and locale in the sales process. Report at 28, 56, and 90 days after
publication: indexed locale URLs, non-brand impressions/clicks, target-query
movement, and qualified inquiries. Update pages based on those observations;
a single personalized first-page search result is not the measurement source.
