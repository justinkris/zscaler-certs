# ZDTE Exam Prep — Claude Code Instructions

Static HTML study site for the Zscaler Digital Transformation Engineer (ZDTE) certification exam. No build system — all files are plain HTML/CSS/JS.

**Sort trigger:** When the user says "sort" (or any variation like "sort this", "sort it"), immediately sort everything currently in the `sort/` folder without asking for clarification.

---

## Project Structure

```
/
├── index.html                  # Main study plan dashboard
├── study-guides.html           # Index of study guides
├── study-bites.html            # Index of study bites
├── study-nibbles.html          # Index of study nibbles
├── memory-palaces.html         # Index of memory palaces
├── mock-exams.html             # Index of mock exams
├── lab-challenges.html         # Index of lab challenges
│
├── bite.css                    # Shared CSS for study bites (cream/orange scheme)
├── nibble.css                  # Shared CSS for study nibbles (cream/orange scheme)
├── study-guide.css             # Shared CSS for study guides (cream/orange scheme)
│
├── study-guides/               # Day-by-day study guides — naming: day-0X-<topic>.html
│   ├── day-01-architecture-identity.html
│   ├── day-02-mock-exam-1.html
│   ├── day-03-connectivity.html
│   ├── day-04-platform-access.html
│   ├── day-05-cyberthreat.html
│   ├── day-06-data-protection.html
│   ├── day-07-risk-zdx.html
│   ├── day-08-zdx-automation.html
│   └── mock-exam-2-review.html
├── study-nibbles/              # Quick-reference nibbles (nibble-*.html)
├── memory-palaces/             # Memory palace pages + palace.css
├── mock-exams/                 # Mock exam review pages
├── study-bites/                # Individual study bites
├── lab-challenges/             # Lab challenge pages + lab-challenges.css (blue/navy scheme)
│   ├── lab-challenges.css      # Shared CSS (blue/navy) — used by lab challenges AND blue-scheme study bites
│   ├── edu-200.html
│   └── edu-202.html
├── notebooklm/                 # NotebookLM episode cards
│   └── index.html
├── sort/                       # Drop files here to be sorted — cleared on each sort
│
└── images/                     # All images — organised by content type
    ├── memory-palaces/
    │   ├── dlp/
    │   ├── get-post/
    │   ├── zdx/
    │   ├── zdx-hospital/
    │   ├── identity-services/  (shared with study-nibbles)
    │   └── itdr/
    ├── study-guides/
    │   └── day-08/
    └── study-nibbles/
        ├── zpa-hierarchy/
        └── identity-services/
```

---

## Nav Hub Button

Every page has a **📚 STUDY MATERIALS** hover-dropdown in the header-right. It must be present on all root pages and all sub-pages. Sub-pages (one level deep) use `../` prefixes for links.

The full nav hub now includes Lab Challenges and NotebookLM:

```html
<div class="nav-hub">
  <div class="nav-hub-trigger">
    <div class="icon">📚</div>
    <div class="label">STUDY MATERIALS</div>
    <div class="hint">hover to explore</div>
  </div>
  <div class="nav-hub-dropdown">
    <a class="nav-hub-item" href="study-guides.html"><span class="nav-icon">📖</span> STUDY GUIDES</a>
    <a class="nav-hub-item" href="memory-palaces.html"><span class="nav-icon">🧠</span> MEMORY PALACES</a>
    <a class="nav-hub-item" href="study-bites.html"><span class="nav-icon">🍐</span> STUDY BITES</a>
    <a class="nav-hub-item" href="study-nibbles.html"><span class="nav-icon">🍔</span> STUDY NIBBLES</a>
    <a class="nav-hub-item" href="mock-exams.html"><span class="nav-icon">📋</span> MOCK EXAMS</a>
    <a class="nav-hub-item" href="lab-challenges.html"><span class="nav-icon">⚗️</span> LAB CHALLENGES</a>
    <a class="nav-hub-item" href="notebooklm/index.html"><span class="nav-icon">🎙️</span> NOTEBOOKLM</a>
  </div>
</div>
```

Sub-pages (in `study-guides/`, `memory-palaces/`, `lab-challenges/`, etc.) prefix all hrefs with `../`. The `notebooklm/index.html` page self-references without `../`.

The nav hub CSS is **not** in any shared CSS file — paste it inline in each page's `<style>` block. Two colour variants exist:
- **Cream/orange** (used on ZDTE-scheme pages): `background: var(--ink)`, hover orange
- **Blue/navy** (used on lab-challenge-scheme pages): `background: rgba(255,255,255,0.08)`, hover `#93c5fd`

---

## Nav Tabs — Scroll Behaviour (CRITICAL)

All pages with nav tabs **must** use `navTo()` for smooth scroll. Never use `setTab()` alone (it only highlights, doesn't scroll). Never name the function `scrollTo` — that shadows `window.scrollTo` and breaks everything.

**Required JS:**
```js
function navTo(sectionId, el) {
  document.querySelectorAll('.nav-tab').forEach(t => t.classList.remove('active'));
  el.classList.add('active');
  const section = document.getElementById(sectionId);
  if (section) {
    const top = section.getBoundingClientRect().top + window.scrollY - 60;
    window.scrollTo({ top, behavior: 'smooth' });
  }
}
```

**Required HTML pattern:**
- Every `<div class="section-block">` must have `id="section-<name>"`
- Every nav tab: `<button class="nav-tab" onclick="navTo('section-<name>', this)">`
- The `.section-nav` must have `position: sticky; top: 0; z-index: 50;`

---

## Image Organisation

Never drop images in the root or in content folders. All images live under `/images/` with subdirectories matching content type and topic:

| Content | Path |
|---|---|
| Memory palace images | `images/memory-palaces/<palace-name>/` |
| Study guide images | `images/study-guides/day-XX/` |
| Study nibble images | `images/study-nibbles/<nibble-name>/` |

Give images descriptive names when moving them (e.g. `saml-checkin.png`, not `1.png`).

Image paths from sub-pages use `../images/…`

---

## Adding New Content — Checklists

### New Study Guide
1. Create `study-guides/day-0X-<topic>.html` using `study-guide.css`
2. Add `id="section-<name>"` on every section block
3. Use `navTo()` on all nav tabs (sticky nav, 60px offset)
4. Add entry to `study-guides.html` grid
5. Mark day status on `index.html` (green = complete, amber = in progress)

### New Study Bite
1. Create `study-bites/<name>.html`
   - Default: link `../bite.css` (cream/orange scheme)
   - Blue-component bites (sidebars, quick-refs, API cards): link `../lab-challenges/lab-challenges.css` but add cream/orange overrides inline
2. Add breadcrumb: `../index.html` → `../study-bites.html` → current
3. Add nav hub to `header-right` (use `../` prefixed links, cream/orange scheme)
4. Add card to `study-bites.html` under the correct category label
5. Increment count card on `study-bites.html`

### New Study Nibble
1. Create `study-nibbles/nibble-<topic>.html` using `nibble.css`
2. Add breadcrumb: `../index.html` → `../study-nibbles.html` → current
3. Add card to `study-nibbles.html` under the correct category label
4. Increment the count card on `study-nibbles.html`

### New Memory Palace
1. Create `memory-palaces/memory-palace-<topic>.html`
2. Use `navTo()` on all nav tabs (sticky nav, 60px offset)
3. Add breadcrumb: `../index.html` → `../memory-palaces.html` → current
4. Add nav hub button to `header-right` (use `../` prefixed links)
5. Add card to `memory-palaces.html` under correct category, increment count
6. **Add this new palace to the Related Bites sidebar on ALL existing memory palace pages that have a sidebar**

### New Mock Exam Review
1. Create `mock-exams/day-XX.html`
2. Breadcrumb: `../index.html` → `../mock-exams.html` → current
3. Use `navTo()` on all nav tabs
4. Add nav hub button (use `../` links)
5. Add `id="subtopic-list"` on the sidebar checklist

### New Lab Challenge
1. Create `lab-challenges/edu-XXX.html` linking `lab-challenges.css`
2. Breadcrumb: `../index.html` → `../lab-challenges.html` → current
3. Use `navTo()` on all nav tabs
4. FQDN widget, checkbox persistence (localStorage), topology accordion, per-card counters
5. Add entry to `lab-challenges.html`

---

## CSS Files

| File | Used by | Scheme |
|---|---|---|
| `bite.css` | Study bites (cream/orange pages) | Cream/orange |
| `nibble.css` | Study nibbles — link with `../nibble.css` from sub-pages | Cream/orange |
| `study-guide.css` | Study guides | Cream/orange |
| `memory-palaces/palace.css` | Memory palaces | Cream/orange |
| `lab-challenges/lab-challenges.css` | Lab challenges, blue-scheme study bites | Blue/navy |

Nibble pages that need non-standard layouts add an inline `<style>` block for page-specific CSS only — don't modify `nibble.css`.

Study bites that are blue/navy (e.g. lab companion bites) use `../lab-challenges/lab-challenges.css` instead of `../bite.css`.

---

## Colour Tokens (shared across all pages)

**Cream/orange scheme** (study guides, nibbles, memory palaces, most bites):
```css
--cream: #fef9f0        --cream-dark: #f5eddb
--ink: #1a1209          --ink-soft: #5a4a35       --ink-muted: #8a7660
--orange: #ff6b35       --orange-light: #fff3ec   --orange-border: #ffd5c0
--green: #3a7d44        --green-light: #edf7ee    --green-border: #b2dfb4
--purple: #5c35cc       --purple-light: #ece8ff   --purple-border: #c8bbff
--blue: #1a6bcc         --blue-light: #e8f0fb     --blue-border: #b3ccf0
--red: #a32d2d          --red-light: #fce8e8      --red-border: #f7c1c1
--border: #ede5d8       --amber-light: #fffbe6
```

**Blue/navy scheme** (lab challenges, blue-scheme study bites):
```css
--bg: #dbeafe           --surface: #ffffff        --surface-2: #eff6ff
--border: #bfdbfe       --border-dim: #dbeafe
--text: #0d1e35         --text-soft: #1e3a5c      --text-muted: #5a7a99
--blue: #1a6dcc         --blue-glow: rgba(26,109,204,0.08)  --blue-dim: #bfdbfe
```

Domain tag classes: `.tag-zia` `.tag-zpa` `.tag-zdx` `.tag-arch` `.tag-rev` `.tag-pod` `.tag-weight`

---

## Current Content Inventory

| Type | Count | Notes |
|---|---|---|
| Study guides | 8 | Days 01–08 complete; naming: `day-0X-<topic>.html` |
| Study nibbles | 10 | |
| Study bites | 5 | All cream/orange scheme |
| Memory palaces | 5 | GET+POST · Response Flow · DLP · ZDX Hospital · Identity Airport · ITDR |
| Mock exam reviews | 4 | Days 02, 04, 06, 08 |
| Lab challenges | 2 | EDU-200 · EDU-202 |
| Study days complete | 10 | Day 11 in progress |
| Exam date | 2 May 2026 | Saturday |
