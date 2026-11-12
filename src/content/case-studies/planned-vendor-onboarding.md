---
title: 'Planned: cutting new-market vendor onboarding from 16 hours to 6'
slug: 'planned-vendor-onboarding'
order: 2
draft: true
confidential: false
summary: 'As a Senior PM, I specified an internal tool and built a working proof of concept for it with an early AI coding agent. The tool automated vendor discovery and import for each new market, which cut onboarding time per market from 16 hours to 6.'
role: 'Senior Product Manager; wrote the requirements and a proof of concept'
client: 'Planned, enterprise event management platform'
timeline: '6 weeks to first production use '
team: 'Business operations team, 4 people '
stack:
  - 'Next.js and React'
  - 'Firebase'
  - 'GraphQL and REST APIs'
  - 'Google Maps Platform'
  - 'OpenAI API'
  - 'Flatfile'
outcome: 'Onboarding per market dropped from 16 hours to 6 hours (a 62.5% reduction)'
---

## The problem

Every new city Planned launched in needed a vetted list of event vendors: venues, caterers, AV, and decor. The business team built it by hand. They searched Google Maps, cross-checked reviews on Yelp, Google, and Reddit, copied details into spreadsheets, and then uploaded the spreadsheets to the main database. One market took about 16 hours. Upload errors went straight into production data.

## My role

I owned the problem end to end. I interviewed the business team, scoped the tool, designed the data schema, and wrote the requirements. To make them concrete, I built a crude proof of concept with an early AI coding agent and handed it to an engineer with the requirements. The engineer built the production tool.

## Constraints

- **No engineering capacity.** The core team was committed to the customer product, so the tool had to be built outside the roadmap. A working proof of concept let an engineer start building without a long back-and-forth on requirements.
- **Production data at risk.** The tool wrote to the same database customers use. A bad import could not be allowed to stick.
- **Non-technical users.** The business team works in spreadsheets, not admin consoles.

## Key decisions

**1. AI extraction, with a human approving every record.** Vendor websites have no common format, so rule-based scrapers broke on most of them. I used the OpenAI API to pull structured fields (services, capacity, price range, contact details) from each vendor's site. LLM output is sometimes wrong, so nothing went to production without a person reviewing it.

**2. Flatfile for review instead of a custom admin UI.** Building an editable, validated data grid would have taken weeks. Flatfile gave the team a spreadsheet-style interface with schema validation and error highlighting in days. The cost is a paid third-party dependency on an internal workflow.

**3. A snapshot before every import, with one-click revert.** Before an import runs, the tool snapshots the affected vendor collections. If an import is wrong, one click restores the previous state. This made it safe to let the business team publish directly, without filing an engineering ticket for each market.

## What I built

My proof of concept set out the pipeline, which runs in four steps:

1. **Discover.** A query engine searches the Google Maps Platform by city and vendor category and collects candidate businesses.
2. **Extract.** For each candidate, the tool fetches the vendor's website and the OpenAI API turns the page into structured fields.
3. **Review.** Records open in Flatfile, where the team fixes, removes, or approves them against the production schema.
4. **Publish.** Approved records go to the main database through the API, after an automatic snapshot.

## After launch

The team used the tool for every market launch after release. Early runs showed duplicate vendors listed under slightly different names, so we added de-duplication on normalized name and address before review.

## Outcome

- Onboarding time per market fell from 16 hours to 6 hours.
- Used for 8 market launches.
- No production data incidents from imports after the snapshot and revert step shipped.

## What I'd do differently

I would log every reviewer correction to the AI-extracted fields from day one. That data shows where extraction fails, and it would have let me improve the prompts with evidence instead of spot checks.
