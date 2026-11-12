---
title: 'Mednow: building an in-house digital pharmacy from 0 to 1'
slug: 'mednow-digital-pharmacy'
order: 3
draft: true
confidential: false
summary: "I was a Product Manager on the team that sunset Mednow's vendor-built patient app and built its replacement from scratch: a patient app on iOS, Android, and web, and a dashboard pharmacists use to fill orders and chat with patients."
role: 'Product Manager, one of two PMs'
client: 'Mednow, Canadian online pharmacy'
timeline: 'February 2021 to July 2022'
team: '3 to 4 developers, 1 architect, 3 designers, 1 QA, 2 PMs'
stack:
  - 'React (Material UI)'
  - 'Native iOS and Android apps'
  - 'Kroll pharmacy system via PharmacyLink'
  - 'Moneris'
  - 'Shopify'
outcome: 'Eight releases from v2.1 to v2.8.0 between March and July 2022, including the Quebec launch'
---

## The problem

Mednow ran on an app built by an outside vendor. The company could not change it fast enough, and pharmacists handled most requests by hand through chat and phone. The in-house platform had to reach feature parity with the old app, then go further, while meeting PIPEDA, provincial pharmacy rules, and app store policies.

## My role

I joined in February 2021 and helped sunset the vendor-built app. Requirements for the new platform started in April 2021, and from July we formalized them as pitches in 5-week cycles. I worked alongside the lead PM. I owned push notifications and desktop web support outright, and wrote or co-wrote the pitches for SSO, account deletion, payments, and Quebec support. For each one I ran competitor research, wrote the requirements, worked with design, split the work into Jira tickets, and ran UAT.

## Constraints

- **Legal review on every patient-facing change.** Federal privacy law (PIPEDA), provincial pharmacy regulations, and pharmacists' scope of practice applied to almost every feature. Requirements touching consent, data, or clinical communication went through legal review before build.
- **Classified health data.** Every field was tagged by risk. Name, contact details, and date of birth were low to moderate risk. Prescriptions, allergies, and ID numbers (health card, passport, driver's licence) were high risk. Chat was treated as high risk because patients could share health information in it.
- **Data segregated by jurisdiction.** Pharmacies are licensed by province, so the platform modelled a hierarchy (country, province, pharmacy) with a permission service on top. Staff saw only the patients and workflows their group and role allowed, and only pharmacists could discuss health concerns.
- **Audit trail on everything.** Every dashboard API call, workflow status change, and assignment change wrote an audit log entry.
- **Session and access security.** Patient sessions ended after 20 minutes of inactivity on web, or 20 minutes in the background on native. Staff signed in to the dashboard only through company Google accounts.
- **Province-specific legal requirements.** Quebec required French-language support and named the affiliated pharmacist-owner on the sign-in screen, so localization and legal copy varied by province.
- **Legacy pharmacy system integration.** Prescriptions were dispensed in Kroll, the pharmacy management system, through the PharmacyLink API. Linking a patient required a token that pharmacy staff entered by hand in each store's Kroll instance.
- **App store policy as a hard deadline.** Apple required in-app account deletion for any app submitted after January 31, 2022. Without it, the iOS app could not launch.

## Key decisions

**1. Account deletion: ship the smallest compliant version.** A fully automated delete could not ship before Apple's deadline, and pharmacy records need review before removal. We shipped a "Delete my account" button that confirms, then emails the privacy inbox, where the product team runs the existing deletion scripts. It met the requirement in time for launch. The cost was a manual step for each request, which was acceptable at our volume.

**2. Payments: Moneris over Stripe and Shopify Payments.** The first payments pitch used Stripe. We reversed it for three reasons. Mednow already had Moneris storefronts and a relationship with Moneris. Moneris fees were lower and it supports Apple Pay and Google Pay. Shopify Payments could not process payments outside Shopify, which would have pushed patients into a web view to check out.

**3. Notifications: push for the native apps, batched email for web.** The native apps got push notifications for messages and order updates. Web users got email, with missed chat messages batched to at most one email every 30 minutes, so an active conversation did not flood their inbox. Patients controlled each category (chat, orders, promotions) in settings. We cut SMS from the cycle to protect the date, and designed the experience to encourage patients to install the native app.

**4. Delivery times: remove what failed, then redesign it.** The original app asked patients for delivery preferences up front. Operations could not meet them, which created upset patients, so we removed the options in v2.5.0 (June 21, 2022). The redesign moved confirmation to the payment step: the pharmacy team proposes delivery windows from the dashboard, and the patient confirms one while they are already in the app to pay.

## What I built

As a PM, my output was the specification and the decisions behind it:

- Pitches with a time budget, problem, user stories, requirements, and explicit out-of-scope items.
- Competitor research on Telus Health, PocketPills, Shoppers Drug Mart, Rexall, and messaging apps such as WhatsApp and Discord for notification behaviour.
- Desktop and tablet layouts based on Material UI breakpoints, with drag-and-drop and multi-image upload (up to 10 images) for prescriptions and insurance cards.
- Quebec support: English and French localization, a province selector that defaults from the user's IP address (Ontario as fallback), and province-specific legal copy.
- Jira breakdowns and UAT for each release.

## After launch

UAT and live use fed a running bug list that I triaged with the team. The v2.1 hotfix release fixed app dead ends, layout bugs, and phone number formats that differed between web and native. I also worked through customer deployment problems and internal pharmacy issues as they came in. Chat turned out to be the largest workflow type by about 10 times, which shaped the later cycles: the delivery-time redesign existed to cut the chats pharmacists opened just to confirm a delivery.

## Outcome

- Eight releases shipped from v2.1 (March 2022) to v2.8.0 (July 2022).
- Apple's account deletion requirement met before the iOS launch.
- Quebec launch supported with bilingual onboarding.
- Pharmacist time spent on delivery coordination: reduced by 30%.

## What I'd do differently

Our pitches stated expected impact ("aiming to increase conversion") without a baseline or a target. I would set one measurable target per pitch and check it after release, so each cycle showed whether the previous one worked.
