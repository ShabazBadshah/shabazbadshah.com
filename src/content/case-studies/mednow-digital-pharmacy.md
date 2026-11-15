---
title: 'Mednow: building a digital pharmacy from 0 to 1'
slug: 'mednow-digital-pharmacy'
order: 4
draft: true
confidential: false
summary: "I was one of two Product Managers on the remote team that built Mednow's digital pharmacy from scratch: a patient app on iOS, Android, and web, and a dashboard pharmacists use to run every order, integrated with the pharmacy's dispensing system."
role: 'Product Manager'
client: 'Mednow'
timeline: 'Feb 2021 - Aug 2022'
team:
  - '4 developers'
  - '1 architect'
  - '1 project manager'
  - '2 PMs'
  - '2 designers'
  - '1 PMM'
stack:
  - 'React (Material UI)'
  - 'Flutter'
  - 'Go'
  - 'Postgres'
  - 'GCP'
  - 'Kroll PMS'
  - 'PharmacyLink'
  - 'StreamChat'
  - 'Moneris'
  - 'Stripe'
  - 'Shopify'
outcome: 'Launched a net-new digital pharmacy that patients loved and that grew revenue through patient acquisition'
---

## The problem

Mednow's founders are pharmacists. Their vision was a pharmacy patients could use entirely from their phone: fill and refill prescriptions, transfer from another pharmacy, pay, and talk to a pharmacist. There was no product yet. We had to work out what a digital pharmacy app should be, how it should work for patients and for pharmacists, and how to build it, under some of the strictest rules in Canadian consumer software.

## My role

I joined in February 2021. With the lead PM, I worked with the founders, marketing, and sales to turn the vision into a product: what the app is, what it does, and in what order. Discovery came first. I shadowed pharmacists at work, studied competitor apps, and mapped what patients expect from a digital pharmacy. I owned push notifications and desktop web, and wrote or co-wrote the pitches for social sign-in, payments, and Quebec support. The team was remote and included outside development vendors for parts of the build.

## Constraints

- **Regulated at every layer.** Federal privacy law (PIPEDA), provincial pharmacy regulations, and pharmacists' scope of practice applied to almost every feature. Quebec added French-language and pharmacy-ownership requirements. Anything that touched consent, data, or clinical communication went through legal review before build.
- **Health data, segregated by jurisdiction.** Every field was classified by risk, and prescriptions, allergies, ID numbers, and chat were high risk. Pharmacies are licensed by province, so the platform modelled a hierarchy (country, province, pharmacy) with a permission service on top. Every dashboard action wrote an audit log entry.
- **Stakeholders who know pharmacy, not software.** The founders and the pharmacists who used the dashboard are pharmacy experts, not technologists. I translated their workflows into requirements, and technical tradeoffs back into pharmacy terms they could decide on.
- **A human in the loop for almost everything.** Very little in pharmacy can be automated. A pharmacist reviews and approves each step, and some steps need the patient to confirm. Every workflow had to be designed around waiting for a person, on both sides.
- **Patients expect fast updates.** People waiting on medication want to know where their order is. Every status change had to reach the patient quickly, and patients always needed a way to reach a pharmacist directly.
- **A legacy dispensing system.** Prescriptions are dispensed in Kroll, the pharmacy management system, through the PharmacyLink API. Linking a patient needed a token that pharmacy staff entered by hand in each store's Kroll instance.

## Key decisions

**1. The pharmacist dashboard drives every order update.** We built an internal dashboard, integrated with Kroll, where pharmacists move each request (new prescription, refill, transfer) through its workflow. The dashboard is the single source of truth for order status. Each status change sends the patient the right update right away, by push notification, text message, or email. Patients can always chat with or call a pharmacist if something looks wrong.

**2. Notifications: push for native, batched email for web.** The native apps got push notifications for messages and order updates. Web users got email, with missed chat messages batched to at most one email every 30 minutes, so an active conversation didn't flood their inbox. Patients chose their channels and categories (chat, orders, promotions) in settings. We designed the experience to encourage patients to install the native app, where updates arrive fastest.

**3. Social sign-in over phone number.** Phone numbers identify patients everywhere in pharmacy, so leadership pushed back on moving sign-in away from them. In consumer apps, Google and Apple sign-in is the norm, and it removes a password and a verification step. I made the case to the C-suite over several discussions and ran an A/B test. The data showed patients choosing social sign-in, so we moved phone number to a secondary option, then phased it out.

**4. Payments: Moneris over Stripe and Shopify Payments.** The first payments pitch used Stripe. We reversed it for three reasons. Mednow already had Moneris storefronts and a relationship with Moneris. Moneris fees were lower and it supports Apple Pay and Google Pay. Shopify Payments could not process payments outside Shopify, which would have pushed patients into a web view to check out.

## How we worked

Each release cycle ran the same way:

1. Scope the cycle's decisions and get buy-in from the C-suite.
2. Design the UI, UX, mocks, and flows with the designers.
3. Take the designs to UAT with real users before building.
4. Write the pitch: the problem, the time budget, the requirements, and what is out of scope.
5. Build and ship, then move to the next set of features.

## Timeline

From no app to a full digital pharmacy, in the order we built it:

| Cycle start | What we built                                                                    | Why                                                                                                   |
| ----------- | -------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------- |
| Jun 2021    | Patient registration and sign-in                                                 | The front door: simple sign-up, clear privacy terms, and password recovery                            |
| Jul 2021    | Pharmacist dashboard, groups, and permissions                                    | One tool for pharmacists to serve patients, with data kept inside each province and pharmacy          |
| Aug 2021    | New prescription requests and chat                                               | The core loop: a patient sends a prescription, and a pharmacist picks it up and talks to them         |
| Oct 2021    | Refills, transfers, medication reports, patient notifications, and Kroll linking | What patients do most often, connected to the dispensing system                                       |
| Nov 2021    | Google and Apple sign-in, and legal pages                                        | Faster sign-up to raise conversion                                                                    |
| Jan 2022    | In-app payments with Moneris                                                     | Patients pay inside the app instead of being sent elsewhere                                           |
| Feb 2022    | Quebec support and desktop web                                                   | Launch in Quebec in French and English, and give desktop users a proper layout                        |
| Feb 2022    | Patient-started chat, deep links, and pharmacy and province transfers            | Patients start conversations without waiting, and move between Mednow pharmacies                      |
| Mar 2022    | Native push notifications, a rebrand, and dashboard alerts                       | Bring patients back with timely updates, and stop pharmacists watching the dashboard for new requests |
| Apr 2022    | Prescription management redesign and self-serve transfers                        | One entry point for refills, new prescriptions, and transfers; transfers without a pharmacist call    |
| May 2022    | Saved shipping addresses                                                         | Fewer steps on repeat orders                                                                          |
| Jul 2022    | Delivery-time confirmation and dashboard status filters                          | Fewer chats just to confirm a delivery, and every open request visible at a glance                    |

Dates are when each cycle was scoped.

## What I built

- Pitches with a time budget, problem, user stories, requirements, and explicit out-of-scope items.
- Competitor research on Telus Health, PocketPills, Shoppers Drug Mart, Rexall, and messaging apps such as WhatsApp and Discord for notification behaviour.
- Designs, with the design team. I drew some of the mocks and flows myself.
- Quebec support: English and French, a province selector that defaults from the user's IP address (Ontario as fallback), and province-specific legal copy.
- An internal training program for pharmacists on the new tools, with learning modules, quizzes, and live sessions.
- Jira breakdowns and UAT for each release.

![Mednow app home screen](/case-studies/mednow-digital-pharmacy/home.webp "Home: the latest order's status, an easy prescription transfer, and one tap to fill a prescription or chat with a pharmacist")
![Mednow refill selection screen](/case-studies/mednow-digital-pharmacy/refills.webp 'Refills: patients choose which prescriptions to refill and see how many refills each has left')
![Mednow chat with a pharmacist](/case-studies/mednow-digital-pharmacy/chat.webp 'Chat: a patient asks a pharmacist to transfer their prescriptions to Mednow')

## After launch

We launched, and the app started generating revenue. For a 0-to-1 product, success meant patient acquisition: more patients every month while bringing customer acquisition cost (CAC) down. Every new feature still went through UAT, and live use fed a bug list I triaged with the team. Chat turned out to be the largest workflow type by about 10 times, which pushed later cycles toward cutting the chats pharmacists had to open.

## Outcome

- A net-new digital pharmacy, live on iOS, Android, and web, that patients loved.
- Revenue from launch, with patient acquisition growing while we worked CAC down.
- One pharmacist dashboard, integrated with Kroll, running every order.

## What I'd do differently

I would measure the pharmacist side as closely as the patient side. We tracked acquisition and CAC carefully, but pharmacist time per request was the real limit on scale, because chat volume grew faster than the team. Measuring it from the first release would have moved work like delivery-time confirmation much earlier.
