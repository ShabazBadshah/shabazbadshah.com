# Case studies: integration brief for shabazbadshah.com

Five case studies, one Markdown file each, for the /work section of the site.

| File                             | Slug                          | Order |
| -------------------------------- | ----------------------------- | ----- |
| `travel-companion-app.md`        | `travel-companion-app`        | 1     |
| `planned-vendor-onboarding.md`   | `planned-vendor-onboarding`   | 2     |
| `mednow-digital-pharmacy.md`     | `mednow-digital-pharmacy`     | 3     |
| `soti-frontline-support-chat.md` | `soti-frontline-support-chat` | 4     |
| `upper-oakville-chiropractic.md` | `upper-oakville-chiropractic` | 5     |

## Frontmatter

Each file has the same fields:

- `title`, `slug`, `order`: page title, URL slug, and position on /work.
- `summary`: one or two sentences for the card and the page subtitle.
- `role`, `client`, `timeline`, `team`, `stack`, `outcome`: the summary card. Render these as a card at the top of each page, not in the body. `team` is missing from the Upper Oakville Chiropractic file; SOTI also has `customers`.
- `status`: optional. Only Upper Oakville Chiropractic has it ("In progress"). Show it as a badge.
- `draft`: `true` on every file. Exclude drafts from the production build.
- `confidential`: `true` for the travel app. The client is under NDA: never add the app's name, logo, or screenshots.

The body starts at `## The problem` and uses `##` for each section. Body sections, in order: The problem, My role, Constraints, Key decisions, What I built, After launch, Outcome, What I'd do differently.

## Rules for the build

1. Every file still contains `` markers. These are placeholders the author must confirm or remove.
2. Do not strip, rewrite, or render the markers as normal text.
3. Make the build fail, or keep the page in draft, if a published file contains ``.
4. Set `draft: false` only on a file the author has cleared.
