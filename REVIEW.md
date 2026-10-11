# Corporate portfolio redesign — review draft

Production has not been published or changed. This branch retains the existing static HTML/Vercel architecture, clean URLs, contact endpoint, and existing image assets.

## Changes
- Twelve complete pages: home, about, ventures, leadership, news, contact, privacy, disclosures, and four venture profiles.
- Centralized company identity, palette, navigation, legal disclosure, and venture records in `site.config.json`; regenerate HTML with `python scripts/build.py`.
- Existing official brand assets retained; Gazette and VotePG wordmarks downloaded from their public websites.
- Gazette is first in the portfolio with explicit editorial independence; VotePG has a nonpartisan disclosure.
- Corporate form retains `/api/contact` and its existing Resend routing. Added server-side validation, client error handling, and accessible status messages.
- Existing homepage `#about` and `#ecosystem` anchors retained; legacy `#contact` links redirect to the contact page.
- Removed homepage module-count claims and the incorrect three-distinct-entities framing. No legal documents or venture websites changed.
- Added per-page metadata, canonical URLs, organization structured data, sitemap, and privacy/ownership pages.

## Founder review before production
- Approve the proposed tagline and corporate positioning. This draft does not describe the proposed mission or vision as previously adopted policy.
- Review the public ownership and independence wording and founder biography.
- Confirm contact-data retention practices and whether additional operational privacy disclosures are needed. The notice describes only the existing hosting/contact implementation; it does not invent a retention period.
- No approved founder portrait supplied; no substitute likeness used.
- The only corporate news item is the September 11, 2026 Gazette launch, as supplied in the brief. It is not a republished news article.

## Verification limits
- Static routes/assets and metadata checked; JavaScript syntax checked; contact handler tested with mocked email delivery, including failure paths.
- No live email was sent. Production RESEND_API_KEY and sender verification were not inspected or changed.
- Browser automation is unavailable in this environment, so desktop/mobile visual and keyboard QA remain pending before launch.

## Sources reviewed October 11, 2026
The user-supplied redesign brief; the existing GovernUp GitHub source and public website; covenanthq.app; cmpcommunities.com; votepg.org; westphaliagazette.com. No changes were made to corporate legal records.
