# Design Direction: Todoodle Full Redesign

## Context

Todoodle is a daily-use task app for dog parents. It tracks walks, vet visits, medications, and more. The current UI is a default shadcn/ui scaffold — cream background, white cards, Geist Sans, standard sidebar. It needs a radical visual identity.

**User profile:** Dog parents (likely 25-45), daily users, emotional about their pets, want something that feels personal — not corporate.

**Design mode:** App UI (balanced density, hybrid chrome)
**Signature element:** Typography drama
**Tone preferences:** Playful + Bold/Editorial

---

## Direction 1: "Ink & Paw" — Bold Editorial

**Tone:** High-contrast editorial. Newspaper meets dog journal. The app reads like a beautifully typeset daily log of your dog's life.

### Typography
- **Display:** Fraunces (optical size axis, high wonk) — characterful, warm serif with quirky ball terminals
- **Body:** DM Sans — clean, geometric, excellent readability
- **Mono:** IBM Plex Mono — for timestamps, IDs

### Color Palette
| Role | Value | Usage |
|------|-------|-------|
| Ink | `oklch(0.15 0.02 60)` | Primary text, headings |
| Paper | `oklch(0.96 0.01 85)` | Background — warm newsprint |
| Cream | `oklch(0.99 0.005 85)` | Card surfaces |
| Vermillion | `oklch(0.58 0.22 28)` | Accent — energetic red-orange |
| Sage | `oklch(0.72 0.08 155)` | Secondary — calming green |
| Faded | `oklch(0.60 0.02 60)` | Muted text |

### Spacing
- Base unit: 4px
- Generous vertical rhythm: 32px between sections, 48px between major groups
- Cards: 24px padding
- Tight line spacing on display type (1.0-1.1), generous on body (1.6)

### Layout — Hybrid Chrome
- Top bar: logo left, compact nav center (text links, no icons), action button right
- No sidebar on desktop — full-width content with max-width constraint
- Mobile: bottom tab bar (4 items)

### Memorable Element
Oversized Fraunces headings at 48-64px on the dashboard. Task dates displayed in a newspaper "dateline" style. Section dividers that look like ruled lines from a notebook.

### Motion
- Page transitions: subtle fade + slide-up (200ms ease-out)
- Task completion: satisfying ink-stamp animation (scale from 0.95 + opacity)
- Staggered list entry: 30ms between items

### Desktop Wireframe
```
┌───────────────────────────────────────────────────────────┐
│  🐾 Todoodle      Dashboard  Pups  Tasks  History  [+ New Task]  │
├───────────────────────────────────────────────────────────┤
│                                                           │
│  Good morning.                         ← Fraunces 48px   │
│  Biscuit has 3 tasks today.            ← DM Sans 16px    │
│                                                           │
│  ─── TODAY ──────────────────────────                     │
│                                                           │
│  ┌─────────────────────────────────────────────────┐      │
│  │ ○  Walk Biscuit                        Due now  │      │
│  │    Walks & Exercise · 🐩                         │      │
│  ├─────────────────────────────────────────────────┤      │
│  │ ○  Evening medication                  7:00 PM  │      │
│  │    Health · 🐩                                   │      │
│  └─────────────────────────────────────────────────┘      │
│                                                           │
│  ─── UPCOMING ───────────────────────                     │
│                                                           │
│  ┌─────────────────────────────────────────────────┐      │
│  │ ○  Vet checkup                         Feb 14   │      │
│  │    Health · 🐩                                   │      │
│  └─────────────────────────────────────────────────┘      │
│                                                           │
└───────────────────────────────────────────────────────────┘
```

### Empty State
```
┌─────────────────────────────────────┐
│                                     │
│  Your story starts here.            │  ← Fraunces 36px
│                                     │
│  Every great dog has a daily        │  ← DM Sans 16px
│  chronicle. Add your first pup      │
│  to begin yours.                    │
│                                     │
│  [Add Your First Pup]              │  ← Vermillion button
│                                     │
└─────────────────────────────────────┘
```

### Anti-Patterns to Avoid
- Don't let the editorial feel become cold/corporate
- No thin serif body text — Fraunces is display only
- No newspaper gray — keep the paper warm

---

## Direction 2: "Bubble" — Playful & Tactile

**Tone:** Soft, rounded, bubbly. Feels like a plush toy came to life as an app. Friendly and approachable without being childish.

### Typography
- **Display:** Bricolage Grotesque (bold weight) — chunky, characterful, slightly quirky letterforms
- **Body:** Outfit — geometric, friendly, excellent at small sizes
- **Mono:** Geist Mono

### Color Palette
| Role | Value | Usage |
|------|-------|-------|
| Canvas | `oklch(0.97 0.015 290)` | Background — very pale lavender-white |
| Cloud | `oklch(1.0 0 0)` | Card surfaces — pure white |
| Midnight | `oklch(0.22 0.03 280)` | Primary text — deep blue-black |
| Coral | `oklch(0.68 0.18 25)` | Primary action — warm coral |
| Sky | `oklch(0.82 0.08 230)` | Secondary — soft blue |
| Mint | `oklch(0.85 0.1 160)` | Success — fresh green |
| Peach | `oklch(0.88 0.08 60)` | Warning — soft peach |
| Mist | `oklch(0.70 0.02 280)` | Muted text |

### Spacing
- Base unit: 4px
- Extra generous: 16px default padding, 32px card padding
- Section gaps: 48px
- Everything feels padded and soft

### Layout — Hybrid Chrome
- Floating pill navigation at top center (like a capsule)
- Cards have large 16px border-radius
- Dog avatars are large and central to the layout
- Mobile: floating bottom bar with rounded pill shape

### Memorable Element
Giant emoji avatars for each dog (80-120px) that animate on interaction. The navigation is a floating pill that feels tactile. Cards have subtle shadow + background that makes them feel like they're hovering.

### Motion
- Spring animations everywhere (stiffness: 300, damping: 20)
- Cards scale on hover (1.02)
- Task completion: emoji bounces then checkmark drops in
- Navigation pill slides to follow active item

### Desktop Wireframe
```
┌───────────────────────────────────────────────────────────┐
│                                                           │
│        ┌──────────────────────────────────────┐           │
│        │ 🏠 Home   🐾 Pups   ✅ Tasks   🕐 History │     │  ← Floating pill nav
│        └──────────────────────────────────────┘           │
│                                                           │
│    ┌──────────────────────────────────────────────┐       │
│    │                                              │       │
│    │     🐩        Good morning!                  │       │
│    │   (80px)     Biscuit has 3 tasks today       │       │
│    │              ════════════════ 2/3 done        │       │  ← Progress bar
│    │                                              │       │
│    └──────────────────────────────────────────────┘       │
│                                                           │
│    ┌────────────────────┐  ┌────────────────────┐         │
│    │ ○ Walk Biscuit     │  │ ○ Evening meds     │         │
│    │   🚶 Walks         │  │   💊 Health         │         │
│    │   Due now          │  │   7:00 PM           │         │
│    │                    │  │                     │         │
│    └────────────────────┘  └────────────────────┘         │
│                                                           │
│    ┌──────────────────────────────────────────────┐       │
│    │                [+ New Task]                  │       │  ← Large CTA
│    └──────────────────────────────────────────────┘       │
│                                                           │
└───────────────────────────────────────────────────────────┘
```

### Empty State
```
┌─────────────────────────────────────┐
│                                     │
│         🐕                          │
│       (120px, bouncing)             │
│                                     │
│    Who's a good app?               │  ← Bricolage 32px
│                                     │
│    Let's add your first pup and     │
│    start tracking their day!        │
│                                     │
│    [ 🐾 Add a Pup ]                │  ← Coral pill button
│                                     │
└─────────────────────────────────────┘
```

### Anti-Patterns to Avoid
- Don't go childish/infantile — friendly, not kindergarten
- No pastel overload — keep contrast healthy
- Avoid looking like a children's game

---

## Direction 3: "Dark Pack" — Premium Dark Mode

**Tone:** Sophisticated dark UI. Linear meets Things 3. The kind of app that makes you feel like a responsible, organized pet parent. Premium and considered.

### Typography
- **Display:** Space Grotesk (bold) — geometric, distinctive, technical elegance
- **Body:** Inter (400/500) — the workhorse, but at its best in dark mode
- **Mono:** JetBrains Mono

### Color Palette
| Role | Value | Usage |
|------|-------|-------|
| Void | `oklch(0.14 0.01 260)` | Background — near-black with blue tint |
| Surface | `oklch(0.19 0.01 260)` | Cards, panels — barely lighter |
| Elevated | `oklch(0.23 0.015 260)` | Hover states, selected items |
| Ghost | `oklch(0.95 0.005 260)` | Primary text — off-white |
| Fog | `oklch(0.55 0.02 260)` | Secondary text — cool gray |
| Ember | `oklch(0.70 0.18 50)` | Accent — warm amber/gold |
| Ember-dim | `oklch(0.55 0.12 50)` | Accent muted — for borders |
| Thorn | `oklch(0.60 0.20 25)` | Destructive — warm red |

### Spacing
- Base unit: 4px
- Tighter than other directions: 12px card padding, 24px section gaps
- Dense but breathable

### Layout — Hybrid Chrome
- Compact icon-only sidebar (48px wide) with tooltips, expands on hover
- Content area: single-column, full-width with max-w-3xl constraint
- Floating action button (bottom-right corner)
- Mobile: bottom icon bar

### Memorable Element
The collapsible icon sidebar that whispers open on hover. Gold amber accents that glow against the dark background. Task priority uses colored dots that pulse subtly for urgent items.

### Motion
- Micro transitions: 150ms ease-out for all state changes
- Sidebar expand: 200ms spring
- Task completion: line-through sweep animation (left to right)
- Reduced motion by default — everything functional, nothing gratuitous

### Desktop Wireframe
```
┌──┬────────────────────────────────────────────────────────┐
│🏠│                                                        │
│🐾│  Today                          ← Space Grotesk 32px  │
│✅│  3 tasks · 1 overdue                                   │
│🕐│                                                        │
│  │  ┌──────────────────────────────────────────────────┐  │
│  │  │ ● Walk Biscuit                     now  ⏱  [✓]  │  │
│  │  │   Walks & Exercise                              │  │
│  │  ├──────────────────────────────────────────────────┤  │
│  │  │ ○ Evening medication              7:00 PM  [✓]  │  │
│  │  │   Health                                        │  │
│  │  ├──────────────────────────────────────────────────┤  │
│  │  │ ○ Vet checkup                    Feb 14   [✓]  │  │
│  │  │   Health                                        │  │
│  │  └──────────────────────────────────────────────────┘  │
│  │                                                        │
│  │                                             [+ ◉]     │  ← FAB
│  │                                                        │
└──┴────────────────────────────────────────────────────────┘
```

### Empty State
```
┌─────────────────────────────────────┐  (dark bg)
│                                     │
│  ◌                                  │  ← Thin circle, ember glow
│                                     │
│  No tasks yet                       │  ← Space Grotesk 24px, Ghost
│  Add your first pup to get started  │  ← Inter 14px, Fog
│                                     │
│  [Add Pup →]                        │  ← Ember outline button
│                                     │
└─────────────────────────────────────┘
```

### Anti-Patterns to Avoid
- No pure black (#000) — use tinted darks
- Don't let it feel cold/clinical — the ember accent adds warmth
- Avoid "dev tool" aesthetic — this is for dog parents, not engineers

---

## Direction 4: "Field Notes" — Organic & Handcrafted

**Tone:** Warm, textured, analog. Feels like a beautifully designed notebook or field guide for dog care. Handcrafted touches meet digital precision.

### Typography
- **Display:** Newsreader (italic + regular) — elegant, warm serif with optical sizes
- **Body:** DM Sans — clean companion to the serif display
- **Mono:** IBM Plex Mono — for data/timestamps

### Color Palette
| Role | Value | Usage |
|------|-------|-------|
| Parchment | `oklch(0.95 0.02 75)` | Background — warm khaki-cream |
| Linen | `oklch(0.99 0.01 80)` | Cards — slightly cooler cream |
| Bark | `oklch(0.25 0.04 55)` | Primary text — deep warm brown |
| Clay | `oklch(0.50 0.03 55)` | Secondary text — medium brown |
| Terracotta | `oklch(0.58 0.16 40)` | Accent — earthy red-orange |
| Forest | `oklch(0.45 0.10 155)` | Secondary accent — deep green |
| Straw | `oklch(0.88 0.08 90)` | Highlight — warm yellow |

### Spacing
- Base unit: 4px
- Very generous: 24px card padding, 48-64px section gaps
- Breathing room everywhere — nothing feels cramped

### Layout — Hybrid Chrome
- Thin top bar with left-aligned wordmark in Newsreader italic
- Horizontal tab navigation below the header (underline-style)
- Content is single-column, generous max-width
- Mobile: sticky top tabs that scroll horizontally

### Memorable Element
The Newsreader italic wordmark. Subtle paper texture on the background (CSS noise grain). Section headers that feel like chapter headings in a book. Ruled lines between task groups that mimic notebook paper.

### Motion
- Gentle, slow: 300ms ease-out for enters
- Page transitions feel like turning a page (subtle slide)
- Task completion: handwritten checkmark animation (SVG path draw)
- Minimal spring — everything feels weighted and calm

### Desktop Wireframe
```
┌───────────────────────────────────────────────────────────┐
│  Todoodle                                    [+ New Task] │  ← Newsreader italic
│  ─────────────────────────────────────────────────────    │
│  Dashboard    My Pups    Tasks    History                  │  ← Underline tabs
│                                                           │
│                                                           │
│  ┌─ Today ────────────────────────────────────────────┐   │
│  │                                                    │   │
│  │  ○  Walk Biscuit                                   │   │
│  │     Walks & Exercise · 🐩 · Due now                │   │
│  │  ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─         │   │  ← Dashed rule
│  │  ○  Evening medication                             │   │
│  │     Health · 🐩 · 7:00 PM                         │   │
│  │                                                    │   │
│  └────────────────────────────────────────────────────┘   │
│                                                           │
│  ┌─ Upcoming ─────────────────────────────────────────┐   │
│  │                                                    │   │
│  │  ○  Vet checkup                                    │   │
│  │     Health · 🐩 · February 14                      │   │
│  │                                                    │   │
│  └────────────────────────────────────────────────────┘   │
│                                                           │
└───────────────────────────────────────────────────────────┘
```

### Empty State
```
┌─────────────────────────────────────┐
│                                     │
│  A blank page is full              │  ← Newsreader italic 28px
│  of possibility.                   │
│                                     │
│  Start your dog care journal        │  ← DM Sans 15px
│  by adding your first pup.         │
│                                     │
│  [Begin →]                          │  ← Terracotta button
│                                     │
└─────────────────────────────────────┘
```

### Anti-Patterns to Avoid
- No heavy textures that hurt readability
- Don't go full skeuomorphic — hint at analog, don't recreate it
- Avoid "hipster coffee shop" cliche — keep it warm but modern

---

## Direction 5: "Neon Collar" — Bold & Maximalist

**Tone:** Loud, confident, unapologetically fun. High-energy like a dog park on Saturday morning. Strong graphic design meets app interface.

### Typography
- **Display:** Space Grotesk (black weight) — geometric, punchy, authoritative
- **Body:** Outfit (400/500) — clean geometric companion
- **Accent:** Items (condensed) — for category labels, badges, all-caps treatments

### Color Palette
| Role | Value | Usage |
|------|-------|-------|
| Bone | `oklch(0.97 0.01 95)` | Background — warm off-white |
| Snow | `oklch(1.0 0 0)` | Card surfaces |
| Charcoal | `oklch(0.18 0.01 260)` | Primary text |
| Electric | `oklch(0.60 0.25 145)` | Primary accent — vivid green |
| Tangerine | `oklch(0.72 0.19 55)` | Secondary accent — bright orange |
| Grape | `oklch(0.50 0.20 305)` | Tertiary accent — deep purple |
| Slate | `oklch(0.55 0.01 260)` | Muted text |

### Spacing
- Base unit: 4px
- Compact but confident: 16px card padding, 32px sections
- Tight letter-spacing on display type (-0.03em)
- Generous padding on buttons and interactive elements

### Layout — Hybrid Chrome
- Bold horizontal nav bar at top with oversized text labels
- Content uses asymmetric columns — 60/40 split, not centered
- Large hero area on dashboard with dog info
- Mobile: bottom bar with bold icon + label

### Memorable Element
The massive display type. Category badges in vivid neon colors with condensed all-caps labels. An asymmetric layout that breaks the expected grid. Color-coded everything — each dog gets a signature color.

### Motion
- Snappy springs (stiffness: 500, damping: 25) — everything responds fast
- Hover: bold scale (1.03) + color shift
- Task completion: explosive confetti-like particle burst
- Page transitions: horizontal slide with slight scale

### Desktop Wireframe
```
┌───────────────────────────────────────────────────────────┐
│                                                           │
│  TODOODLE    DASHBOARD    PUPS    TASKS    HISTORY  [+]   │  ← Space Grotesk Black
│                                                           │
├──────────────────────────────────┬────────────────────────┤
│                                  │                        │
│  TODAY                           │  BISCUIT               │
│  ← Space Grotesk 64px           │  🐩                    │
│                                  │  3 tasks               │
│  3 things to do                  │  ══════════ 67%        │
│                                  │                        │
│  ┌─────────────────────────────┐ │  ┌──────────────────┐  │
│  │ ○ Walk Biscuit              │ │  │ WALKS     ██████ │  │
│  │   WALKS & EXERCISE  now ⚡  │ │  │ HEALTH    ████   │  │
│  ├─────────────────────────────┤ │  │ GROOMING  ██     │  │
│  │ ○ Evening medication        │ │  └──────────────────┘  │
│  │   HEALTH          7:00 PM  │ │                        │
│  ├─────────────────────────────┤ │                        │
│  │ ○ Vet checkup              │ │                        │
│  │   HEALTH          Feb 14   │ │                        │
│  └─────────────────────────────┘ │                        │
│                                  │                        │
└──────────────────────────────────┴────────────────────────┘
```

### Empty State
```
┌─────────────────────────────────────┐
│                                     │
│  LET'S                             │  ← Space Grotesk 72px
│  GO.                               │
│                                     │
│  Add your first pup and start       │  ← Outfit 16px
│  checking things off.               │
│                                     │
│  [ADD A PUP ⚡]                    │  ← Electric green button
│                                     │
└─────────────────────────────────────┘
```

### Anti-Patterns to Avoid
- Don't let "bold" become "noisy" — hierarchy is critical
- No competing neon colors in the same view — one accent at a time
- Avoid looking like a sports app — this is warm, not aggressive

---

## Comparison Matrix

| Aspect | 1: Ink & Paw | 2: Bubble | 3: Dark Pack | 4: Field Notes | 5: Neon Collar |
|--------|-------------|-----------|-------------|---------------|----------------|
| **Tone** | Editorial | Playful | Premium | Organic | Bold |
| **Display font** | Fraunces | Bricolage Grotesque | Space Grotesk | Newsreader | Space Grotesk Black |
| **Body font** | DM Sans | Outfit | Inter | DM Sans | Outfit |
| **Background** | Warm paper | Pale lavender | Near-black | Khaki cream | Warm off-white |
| **Accent** | Vermillion | Coral | Amber/Gold | Terracotta | Electric green |
| **Nav style** | Top bar, text | Floating pill | Icon sidebar | Underline tabs | Bold top bar |
| **Personality** | Thoughtful | Friendly | Sophisticated | Handcrafted | Confident |
| **Best for** | Content-lovers | New dog parents | Power users | Journal keepers | Visual maximalists |

---

## Implementation Notes (apply to chosen direction)

- All fonts via `next/font/google` for optimal loading
- CSS variables for the full palette (oklch values)
- Tailwind v4 `@theme inline` for custom tokens
- `motion/react` for any JS-driven animations
- `prefers-reduced-motion` respected throughout
- shadcn/ui components restyled via CSS variables (not replaced)
- Mobile-first responsive approach

---

## CHOSEN DIRECTION: D5 — Neon Collar (Bold & Maximalist)

Light theme only. No dark mode.

### Change Spec

#### Typography
| Element | Before | After | Rule Reference |
|---------|--------|-------|----------------|
| Display headings | 18-20px Geist Sans semibold | 48-72px Space Grotesk Black, -0.05em | typography.md: display hierarchy |
| Body text | 14px Geist Sans regular | 15-16px Outfit 400/500 | typography.md: body readability |
| Nav labels | 14px Geist Sans medium | 13px Space Grotesk 700, uppercase, 0.04em tracking | typography.md: label treatment |
| Category badges | 12px Geist Sans | 10px Outfit 800, uppercase, 0.1em tracking on vivid bg | typography.md: badge differentiation |
| Timestamps/data | 12px Geist Sans | 14px Space Grotesk 700 | typography.md: numeric content |

#### Colors
| Element | Before | After | Rule Reference |
|---------|--------|-------|----------------|
| Background | oklch(0.98 0.005 80) warm cream | oklch(0.97 0.01 95) warm off-white | colors.md: warmth without cream |
| Card surfaces | oklch(1 0 0) pure white | oklch(1.0 0 0) or oklch(0.99 0.005 95) subtle warm | colors.md: surface hierarchy |
| Primary text | oklch(0.18 0.02 50) | oklch(0.18 0.01 260) charcoal | colors.md: neutral headings |
| Primary accent | oklch(0.65 0.2 45) warm orange | oklch(0.60 0.25 145) electric green | colors.md: bold accent |
| Category: Walks | n/a (shared green badge) | oklch(0.60 0.25 145) vivid green | colors.md: semantic by category |
| Category: Health | n/a | oklch(0.72 0.19 55) tangerine | colors.md: semantic by category |
| Category: Grooming | n/a | oklch(0.50 0.20 305) grape purple | colors.md: semantic by category |
| Muted text | oklch(0.5 0.01 50) | oklch(0.55 0.01 260) slate | colors.md: muted hierarchy |
| Borders | oklch(0.9 0.01 80) light | oklch(0.18 0.01 260) heavy black rules | design.md: bold borders |

#### Spacing
| Element | Before | After | Rule Reference |
|---------|--------|-------|----------------|
| Page padding | px-4 md:px-6 (16-24px) | 40-48px generous | spacing.md: start generous |
| Section headers | mb-4 (16px) | mb-8 (32px) with heavy rule divider | spacing.md: grouping |
| Task list items | py-3 px-4 (12-16px) | py-[18px] px-0 with border-top/bottom | spacing.md: rhythmic spacing |
| Card padding | p-5 (20px) | p-8 (32px) side panel | spacing.md: spacious |

#### Layout
| Element | Before | After | Rule Reference |
|---------|--------|-------|----------------|
| Overall structure | Sidebar (md:w-56) + main | Bold top bar + asymmetric 60/40 split | layout.md: break the grid |
| Navigation | Vertical sidebar, icon + text | Horizontal top bar, Space Grotesk uppercase labels | layout.md: hybrid chrome |
| Task list | Card-based (white cards) | Borderless rows with heavy top/bottom rules | design.md: fewer borders, more structure |
| Dashboard | Centered empty state | Giant "TODAY" + right panel with dog stats | layout.md: asymmetric composition |
| Mobile navigation | Bottom tab bar | Bottom bar with bold icon + label | interactions.md: touch targets |

#### Motion
| Element | Before | After | Rule Reference |
|---------|--------|-------|----------------|
| Hover states | shadow-md transition | scale(1.03) + color shift, 150ms | animation.md: snappy feedback |
| Button press | none | active:scale-[0.97], 100ms | animation.md: press feedback |
| Task completion | opacity-50 scale-95 | Confetti-like particle burst + line-through sweep | animation.md: high-impact moments |
| Page load | none | Staggered fade-up, 40ms between items | animation.md: entrance sequence |

### Self-Check
- [x] At least 3 typography changes — 5 major changes (display, body, nav, badges, timestamps)
- [x] Color palette actually different — green/tangerine/grape replaces orange/cream
- [x] Spacing significantly adjusted — larger padding, heavy rules instead of cards
- [x] Memorable element clearly identified — 72px "TODAY" headline, asymmetric layout, vivid category badges

### Implementation Files to Change
1. `src/app/globals.css` — Full palette rewrite, new CSS variables
2. `src/app/layout.tsx` — Remove sidebar, add top nav, change font imports
3. `src/components/layout/sidebar.tsx` — Replace with horizontal top bar
4. `src/components/layout/header.tsx` — Merge into new top bar
5. `src/components/layout/mobile-nav.tsx` — Restyle bottom bar
6. `src/components/tasks/task-card.tsx` — Borderless row style, vivid badges
7. `src/components/tasks/category-badge.tsx` — Vivid color system
8. `src/components/dogs/dog-card.tsx` — Bold type, larger emoji
9. `src/components/shared/empty-state.tsx` — Giant headline style
10. `src/components/shared/page-header.tsx` — Giant display headings
11. `src/app/page.tsx` — Asymmetric dashboard layout
12. All page files — Updated to match new layout/spacing
