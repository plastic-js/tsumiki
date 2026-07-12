# Scroll-lock is not stacked

**Status:** Known issue
**Affects:** `Select.jsx:193`, `DatePicker.jsx:293/303`

## Problem

Overlay components set `document.body.style.overflow` directly:

```js
// Select
document.body.style.overflow = v ? 'hidden' : ''

// DatePicker
document.body.style.overflow = 'hidden'   // on open
document.body.style.overflow = ''         // on close
```

When two overlays are open at once (e.g. a `Select` inside a `Dialog`), they
fight over the same flag. Closing either one resets `overflow`, unlocking the
page scroll while the other overlay is still open.

## Fix

Extract a shared scroll-lock counter:

```js
// scroll-lock.js
let count = 0
const lock = () => { count += 1; document.body.style.overflow = 'hidden' }
const unlock = () => { count = Math.max(0, count - 1); if (count === 0) document.body.style.overflow = '' }
```

Use it in every overlay (`Select`, `DatePicker`, …) instead of writing
`document.body.style.overflow` directly.
