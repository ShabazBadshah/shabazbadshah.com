---
title: "Upper Oakville Chiropractic: a clinic's digital front door"
slug: 'upper-oakville-chiropractic'
order: 5
draft: true
confidential: false
status: 'In progress'
summary: 'I am the sole technology partner for an independent chiropractic clinic in Oakville, Ontario. Phase 1, a new website that sends patients to booking, is live. Phase 2, mapping and automating the patient journey, is in discovery now.'
role: 'Product Engineer'
client: 'Upper Oakville Chiropractic, Oakville, Ontario'
timeline: 'Phase 1: 2 weeks, shipped 2026.'
stack:
  - 'WordPress'
  - 'HTML'
  - 'Shadcn CSS'
  - 'Google Business tools'
outcome: 'Phase 1 live; Phase 2 in discovery'
---

## The problem

The clinic's online presence did not turn interest into appointments. New patients could not find services, hours, or a clear way to book on their phone. The front desk answered the same questions by phone every day. Any fix had to respect Ontario's rules for health data and for how chiropractors may advertise.

## My role

I own everything technical: platform choice, design, build, launch, and the plan for what comes next. The clinic's chiropractor owns the content and approves anything patients see.

## Constraints

- **A small clinic.** No IT staff, a small budget, and a team that needs to edit the site without me.
- **Health data.** Patient information is covered by Ontario's PHIPA. The site should not collect health information it does not need.
- **Advertising rules.** The College of Chiropractors of Ontario restricts how clinics advertise, including the use of patient testimonials.

## Key decisions

**1. WordPress over a custom build.** A custom Next.js site would have been faster and more flexible. WordPress let the clinic edit its own content, has cheap hosting, and has plugins for anything they may need later. For a clinic with no developer, owning the site matters more than technical elegance.

**2. Link to the existing booking system instead of building forms.** The clinic already used an online booking provider that handles patient data under PHIPA. Sending patients there kept health information off the website entirely. A custom intake form would have made the website a store of health data, with all the risk that brings.

**3. Accessible and mobile-first from the start.** Most visitors arrive on a phone. I built to WCAG 2.1 AA contrast and structure, with booking reachable in one tap from every page.

## What I built

- A mobile-first website covering services, the practitioner, hours, location, and insurance information.
- A booking call to action on every page that opens the clinic's booking system. Phone calls go to the clinic's own automation agent.
- Content structure and metadata for local search, SEO, and AEO.

## After launch

I maintain the site and handle the clinic's change requests. In November 2026 I started discovery on the full patient journey, from first search to rebooking, to find where the front desk loses time and where patients drop off.

## Outcome so far

- Phase 1 site live and edited by the clinic without developer help.

## What comes next

Phase 2 targets the gaps discovery finds, such as follow-up for patients who stop coming in. Integrations with the clinic's software come only after a measured problem justifies them.
