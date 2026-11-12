---
title: 'Collaborative travel companion app: building a 0-to-1 MVP'
slug: 'travel-companion-app'
order: 1
draft: true
confidential: true
summary: "I designed a cross-platform travel app with the client's CTO and built it, from an empty repo to iOS and Android builds, including the real-time collaboration layer and the AI features."
role: 'Product Engineer, lead developer'
client: 'Early-stage founder (name withheld under NDA)'
timeline: '10 weeks '
team: "Me, the client's CTO on solution design, and the founder as product owner "
stack:
  - 'React Native (Expo)'
  - 'Firebase (Auth, Realtime Database, Cloud Functions , Storage)'
  - 'Gemini API'
  - 'On-device text recognition on iOS'
  - 'Google and Apple Sign-In'
outcome: 'MVP delivered on iOS and Android for founder demos and early testers '
---

## The problem

Group trips are planned across chat threads, shared spreadsheets, and screenshots of bookings. Nobody has a single, current version of the plan. The founder wanted one app where a group builds an itinerary together, gets AI-generated suggestions, and keeps travel documents in one place.

## My role

I worked with the CTO on the solution design: the data model, the concurrency approach, and the security model. I implemented it: the backend, the mobile app, the AI integration, and the builds. The founder owned the vision, priorities, and user feedback.

## Constraints

- **No built-in merge for concurrent edits.** Firebase Realtime Database resolves simultaneous writes to the same path with last-write-wins. Two people editing one itinerary item could silently erase each other's changes.
- **Offline writes replay later.** Travellers lose signal in airports and abroad. Firebase queues offline writes and sends them on reconnect, so a stale edit made hours earlier can overwrite newer data.
- **Security rules are the only server-side check.** The app reads and writes the database directly, so every permission (trip membership, member roles, owner-only passport data) had to be enforced in Firebase Security Rules, not in app code.
- **No secrets in the app binary.** Anything shipped in an iOS or Android build can be extracted, so the Gemini API key could not live in the client.
- **AI output is not trusted input.** Text recognition, on the device or through Gemini, can misread a passport photo. Extracted fields needed validation before they were saved.
- **Native sign-in inside Expo.** Google and Apple Sign-In need native modules and per-platform configuration, which rules out Expo Go and requires custom development builds.

## Key decisions

**1. Firebase over a custom backend.** I compared Firebase with a Node and Postgres API. Firebase gave me auth, real-time sync, storage, and security rules without running a server. The cost is vendor lock-in and weaker relational queries. For an MVP that has to prove demand, speed to a working product mattered more.

**2. Field-level locking over last-write-wins.** When two people edited the same trip, the default Firebase behaviour let the second save silently overwrite the first. I considered three options:

| Option                          | Benefit                              | Cost                                           |
| ------------------------------- | ------------------------------------ | ---------------------------------------------- |
| Last-write-wins (default)       | No extra work                        | Silent data loss; users stop trusting the plan |
| CRDTs or operational transforms | Full merge of concurrent edits       | Weeks of work for an MVP                       |
| Field-level locks (chosen)      | Prevents overwrites with little code | One person edits a field at a time             |

When a user starts editing a field, the app writes a lock with their user ID and a timestamp. Other members see the field as "being edited by" that person. Firebase `onDisconnect()` releases the lock if the app crashes or loses signal, and a 60-second expiry clears any lock that is left behind.

**3. Google and Apple Sign-In only.** Social sign-in removes the password step at onboarding. Apple Sign-In was also required: the App Store requires it for apps that offer other third-party sign-in options.

**4. On iOS, passport text never leaves the phone.** On iOS, the app reads the passport with on-device text recognition, so the image is never uploaded. For the most sensitive data in the app, that takes the network, the third-party API, and the server out of the attack surface. On Android, extraction runs through Gemini. Calling the Gemini API from the app would expose the API key, so those calls, and the itinerary suggestions, go through a Cloud Function. On both platforms the app stores only the fields the trip needs (name, nationality, expiry date ), readable only by the owner under security rules, and discards the image.

## What I built

- Trip workspaces with invites, member roles, and a shared itinerary that syncs live on every device.
- The field-locking layer described above, with presence indicators.
- AI itinerary suggestions from the trip's destination, dates, and group preferences, using Gemini.
- Passport capture with on-device text extraction on iOS, Gemini extraction on Android , and owner-only storage.
- Google and Apple Sign-In, and iOS and Android builds from one Expo codebase.

## After launch

I handed the MVP over with build instructions and a list of known limitations. I fixed the bugs found in founder testing, mainly sign-in configuration differences between iOS and Android.

## Outcome

- Working MVP on both platforms in 10 weeks.
- No overwrite conflicts in group testing after field locking shipped.
- The founder used the build for investor and early-user demos.

## What I'd do differently

I would write the Firebase security rules and their tests first, before any feature code. Rules added afterwards are easy to get wrong, and the passport data made that the highest-risk part of the app.
