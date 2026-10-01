# Le Biz Brands

Company website for Le Biz Brands LLC, Miami, Florida.

Contact: wholesale@lebizbrands.com  
Cristina Lopez — Director, Purchasing & Wholesale

## Website

Home, For brands, What we buy, Meet Le Biz, Contact, Privacy, and a custom 404 page. Product imagery is illustrative. The contact form prepares an email for the visitor to review and send; it does not send or store form data.

## Build

Run `python3 build.py`. No dependencies are required. Output is in `dist/`.

Edit content in `build.py`, styling in `dist/assets/styles.css`, and interactions in `dist/assets/site.js`. Commit both the source and generated output. `SITE_ORIGIN` overrides the canonical hostname and sitemap URLs.

## Publish

In Settings → Pages, choose GitHub Actions as the source. The Publish Le Biz Brands workflow builds and deploys `dist/` on pushes to `main`, or can be run manually from Actions. It sets the canonical origin from the GitHub Pages configuration.

## Domain

The intended custom domain is `lebizbrands.com`. Add it in GitHub Pages settings before changing its website DNS records in Cloudflare. Keep all Google Workspace MX and TXT records intact. Enable HTTPS after domain verification and certificate provisioning, then rerun the publishing workflow.

## Checks

All seven pages and their local links, anchors, metadata and image attributes were checked. The mobile navigation and email preparation, review, edit and copy logic passed targeted checks. Full visual browser QA remains outstanding.
