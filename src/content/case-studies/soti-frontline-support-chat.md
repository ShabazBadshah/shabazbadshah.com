---
title: 'SOTI: Building chat and video calling for frontline devices'
slug: 'soti-frontline-support-chat'
order: 2
draft: false
confidential: false
summary: "I defined the product and drove the architecture for a chat and video calling platform built into SOTI's device management diagnostics software, so admins could support frontline workers on the device itself. We shipped an Android app, Windows Modern apps, and a web app."
role: 'Technical Product Manager'
client: 'SOTI'
timeline: 'Nov 2023 - Oct 2024 '
team:
  - '3 developers'
  - '1 PM'
  - '1 QA'
outcome: 'Windows, Android, and Web chat and video calling between admins and frontline workers.'
---

## The problem

Frontline workers, such as warehouse staff, use managed devices that admins configure remotely. When a scanner app crashed or hardware failed, the worker had no direct line to the admin. Support ran through phone calls and email, with no screenshots and no record of what happened. Customers wanted support built into the device and the admin console.

## My role

I owned the requirements, the scope of each release, and the architecture decisions with the engineering lead. I did not write the production code. I wrote the specifications, ran the technical tradeoff reviews, and worked with engineering and QA through release.

## Constraints

- **On-premise and often isolated.** Many customers, including government, run SOTI inside their own network. Some have no outside internet access, so the system could not depend on any cloud service.
- **Locked-down devices.** Frontline devices often run a single app and have no corporate chat account.
- **Data residency.** Messages and files had to stay inside the customer's network and be covered by their backups.

## Key decisions

**1. Build it into the product instead of integrating Microsoft Teams.** Teams needs cloud access and a licensed account for each user. Frontline devices had neither, and isolated customers could not reach Microsoft's cloud at all. A built-in service kept all data inside the customer's deployment.

**2. Consistency over availability during a network split.** In a distributed system, a network partition forces a choice: keep accepting writes and let copies diverge, or pause writes until the nodes agree. Support conversations had to show the same history to the worker and the admin, in the same order. We chose consistency: during a partition, the client shows "reconnecting" and queues the message instead of writing to a copy that may conflict. The cost is a short period where users cannot send.

**3. WebRTC with a relay server inside the customer network.** WebRTC gave us encrypted, real-time audio and video in the clients. Most WebRTC setups rely on public relay (TURN) servers to connect devices across networks. We shipped the relay as part of the on-premise install, so calls never left the customer's network.

**4. Attachments in blob storage, metadata in the database.** Screenshots and logs went to blob storage, with only references and metadata in the database. This kept the database small and fast, and let attachments follow the customer's existing weekly backup schedule.

## What I built

As a PM, I produced the specification and drove the decisions above. The shipped product included:

- One-to-one and group chat between device users and console admins.
- In-app notifications for new messages.
- File attachments, such as screenshots and logs.
- Voice and video calls.
- On-premise deployment that fits the customer's existing weekly backups.

## After launch

I collected feedback from early customers after the Windows release and turned it into the backlog for the next release. The most requested change was screen sharing during calls, so an admin could see the problem directly.

## Outcome

- Windows chat and calling shipped to on-premise customers.
- Admins could resolve device issues in one conversation, with screenshots, instead of phone and email.

## What I'd do differently

I would test a call inside a real isolated customer network much earlier. Problems in on-premise networks, such as firewall rules and blocked ports, appear only in the customer's environment, not in ours.
