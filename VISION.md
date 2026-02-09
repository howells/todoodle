# Todoodle - Vision

> A playful, paw-powered todo app for dog parents who want to stay on top of their pup's needs.

## The Problem

Dog ownership involves a surprising amount of recurring logistics — vet appointments, medication schedules, flea treatments, feeding routines, grooming, walks, training, supplies. Most of this lives in scattered reminders, notes apps, and memory. Miss a flea treatment by a week? Forget when the last vet visit was? It happens to everyone.

Generic todo apps don't understand the rhythms of dog care. They don't know that heartworm meds are monthly, that puppies need more frequent vet visits, or that you have three dogs with different feeding schedules.

## The Solution

**Todoodle** is a todo list app built specifically for dog parents. It understands dog life — recurring care schedules, multiple dogs, health tracking — wrapped in a joyful, playful interface that makes managing your pup's needs feel less like a chore and more like part of the fun.

## Core Principles

1. **Dog-first, not generic** — Every feature is designed around the realities of dog ownership. Categories, recurrence patterns, and terminology all speak "dog."
2. **Joyful & playful** — Dog puns, paw icons, warm colors, subtle animations. This app should make you smile, like your dog does.
3. **Fast & frictionless** — Adding a task should take seconds. Checking one off should feel rewarding. No sign-up walls, no bloat.
4. **Local-first** — Works immediately, stores data on your device. No account required to start. Cloud sync can come later.

## Who Is This For?

- **Dog parents** who want a single place to track all their pup's needs
- **Multi-dog households** juggling different schedules for different dogs
- **New dog owners** who want help remembering what care tasks matter and when
- **Anyone** who's ever said "wait, when was Biscuit's last flea treatment?"

## Key Features

### Dog Profiles
- Add multiple dogs with name, breed, weight, birthday, photo
- Store allergies, vet info, microchip number, and notes per dog
- Quick-switch between dogs or view all tasks across dogs

### Smart Task Management
- **Categories:** Health & Vet, Medications, Grooming, Walks & Exercise, Feeding, Training, Supplies & Errands
- **Recurring tasks:** Daily, weekly, monthly, or custom intervals (e.g. "every 3 months")
- **One-off tasks:** Simple checklist items for ad-hoc needs
- **Per-dog assignment:** Assign tasks to specific dogs or mark as "all dogs"

### Activity Log & History
- Timeline view of completed tasks per dog
- Quick-answer questions like "when was the last vet visit?" or "when did I last give flea meds?"
- Monthly/weekly summaries of care activities

### Reminders
- Browser notifications for upcoming and overdue tasks
- "Due today" and "overdue" sections on the dashboard
- Optional daily digest view

### Playful Personality
- Paw-print icons, dog-themed UI elements
- Encouraging messages on task completion ("Good human! Walkies done!")
- Warm, inviting color palette
- Fun empty states ("No tasks? Time for belly rubs!")

## Technical Direction

| Decision | Choice | Rationale |
|----------|--------|-----------|
| Framework | Next.js (App Router) | Modern React, great DX, easy Vercel deployment |
| Styling | Tailwind CSS | Rapid UI development, easy to maintain |
| Data storage | localStorage / IndexedDB | Local-first, zero auth friction, instant setup |
| State management | Zustand or React Context | Lightweight, fits local-first model |
| Deployment | Vercel | One-click deploys, perfect Next.js support |

## What This Is NOT

- Not a pet health records app (no medical charts or lab results)
- Not a social platform (no sharing, no community features)
- Not a dog training curriculum (tasks, not lessons)
- Not a pet marketplace or directory

## Future Possibilities (Not V1)

- User accounts + cloud sync (Supabase)
- Household sharing (both dog parents see the same tasks)
- Calendar view with drag-and-drop scheduling
- Pet service provider directory (nearby vets, groomers)
- Export care history as PDF for vet visits
- Mobile app (React Native or PWA upgrade)
- AI-suggested care schedules based on breed and age

## Success Looks Like

A dog parent opens Todoodle in the morning, sees exactly what needs doing for each of their dogs today, checks things off as they go, and never again wonders "when did I last do that?" — all while smiling at the playful UI.

---

*Todoodle: Because your dog deserves a todo list too.*
