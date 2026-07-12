# @plastic-js/tsumiki

A UI component library for Plastic JS.

## Installation

```bash
npm install @plastic-js/tsumiki
```

## Styles

Import the bundled stylesheet — a single file (`tsumiki.css`) containing the design tokens (`--tsu-*` CSS custom properties) **and** the reset:

```js
import '@plastic-js/tsumiki/styles'
```

Every component is styled with `--tsu-*` tokens, so this import is required for components to render correctly. If you bring your own reset, the reset portion of `tsumiki.css` is safe to keep anyway (it's minimal); to skip it entirely, compose your own stylesheet from the raw token files, e.g. `@plastic-js/tsumiki/styles/color.css`.

> Raw granular imports (`@plastic-js/tsumiki/styles/*.css`) reference Radix Colors scales via `@import '@radix-ui/colors/…'`, so they require your bundler to resolve that package — install it yourself (`npm i @radix-ui/colors`) if you go that route. The bundled `@plastic-js/tsumiki/styles` entry is fully self-contained and needs nothing extra.

> Custom theming: override any `--tsu-*` variable in your own CSS **after** the library styles (see §3.2). Your `:root` overrides apply to both light and dark mode; add a `.dark { … }` block for per-mode colors.

## Usage

```js
import { Dialog, Combobox, Select } from '@plastic-js/tsumiki'
```

## Components

### Select

A mobile-optimized bottom-sheet select. Renders a trigger button and a draggable sheet overlay — ideal for touch interfaces.

```jsx
import { createSignal } from '@plastic-js/plastic'
import { Select, SelectTrigger } from '@plastic-js/tsumiki'

function Example(){
  const value = createSignal(null)
  const items = [
    { value: 'tpe', label: 'Taipei' },
    { value: 'kxg', label: 'Kaohsiung' },
  ]

  return (
    <Select
      value={value}
      onValueChange={v => value(v)}
      items={items}
    >
      <SelectTrigger placeholder='Choose a city' />
    </Select>
  )
}
```

**Select props:**

| Prop | Type | Default | Description |
|---|---|---|---|
| `value` | `string \| (() => string)` | `''` | Current selected value |
| `onValueChange` | `(value: string) => void` | — | Called when an item is selected |
| `items` | `array \| (() => array)` | `[]` | Data array |
| `itemToValue` | `(item) => string` | `item.value` | Extract value from an item |
| `itemToLabel` | `(item) => node` | `item.label` | Extract label from an item |
| `open` | `(() => boolean)` | — | Controlled open state (getter) — REQUIRED |
| `onOpenChange` | `(isOpen: boolean) => void` | — | Called when open state changes |
| `disabled` | `boolean` | `false` | Disable the select |
| `backdropClassName` | `string` | — | CSS class for the backdrop overlay |
| `backdropStyle` | `object` | — | Inline style for the backdrop overlay |
| `filter` | `boolean \| (item, query, itemToLabel) => boolean` | — | Enable filter: `true` for substring match, or a custom filter function |

**SelectTrigger props:**

| Prop | Type | Default | Description |
|---|---|---|---|
| `placeholder` | `string` | `'Select'` | Placeholder text when no item is selected |
| `className` | `string` | — | CSS class for the trigger button |
| `children` | `node` | — | Custom trigger content (replaces default label + chevron) |

> **Note on Trigger element:** The trigger renders `<div role="button" tabIndex={0}>` instead of a native `<button>` as a defense-in-depth measure against a **Chrome iOS (WebKit) focus-lock bug**. Inside a Dialog the sheet still portals to `<body>` as an independent overlay; the Dialog's focus trap is temporarily paused while the sheet is open (shared `@zag-js/focus-trap` stack) so the sheet's filter input keeps focus on iOS.

**Filter usage:**

```jsx
// Enable default substring filter
<Select filter items={cities} ...>
  <SelectTrigger placeholder='Search city…' />
</Select>

// Custom filter function
<Select filter={(item, query, itemToLabel) => itemToLabel(item).toLowerCase().startsWith(query)} ...>
```

The search input is intentionally **not** auto-focused on open (auto-focus mid-slide leaves the field half-focused on iOS); tap to focus. It is cleared when the sheet closes. "No results" is shown when no items match the query.

---

## 1. Project Nature

**Tsumiki** (`@plastic-js/tsumiki`) is a mobile-first UI component library for the [Plastic JS](https://github.com/plastic-js/plastic) reactive framework. It provides 53 production-grade, accessible components built on top of headless UI primitives from Ark UI, styled with a Radix Colors-based design token system.

The name "tsumiki" (積み木) means "building blocks" in Japanese — the library is designed to be composable, tree-shakable, and themeable.

### Key characteristics

- **Mobile-first** — Components default to touch-friendly sizing, with progressive enhancement for desktop interactions
- **Accessible by default** — Powered by Zag.js state machines via Ark UI wrappers; all components meet WAI-ARIA authoring practices
- **Signal-reactive** — All props accept both static values and Plastic reactive getter functions (`() => value`), enabling zero-boilerplate reactive UIs
- **Design-token driven** — Every visual attribute (size, color, radius, spacing, typography) is exposed via CSS custom properties with the `--tsu-` prefix
- **Tree-shakable** — ESM build with `preserveModules: true`; consumers only bundle what they import

---

## 2. Technology Stack

| Layer | Library | Role |
|-------|---------|------|
| **State machines** | [@zag-js](https://zag-js.com/) | Accessible component logic (focus management, keyboard nav, ARIA attributes) |
| **Headless UI** | [@plastic-js/ark](https://github.com/plastic-js/ark) | Plastic JS wrappers around Zag.js machines, exposes composable `Root`/`Control`/`Label` etc. sub-components |
| **Reactive runtime** | [@plastic-js/plastic](https://github.com/plastic-js/plastic) | Signals, `createContext`/`useContext`, `mergeProps`/`splitProps`, JSX runtime |
| **CSS-in-JS** | [@emotion/css](https://emotion.sh/) | Zero-runtime `css()` template literals for static styles; CSS custom properties for dynamic values |
| **Color system** | [@radix-ui/colors](https://www.radix-ui.com/colors) | 12-step color scales with automatic light/dark mode via `prefers-color-scheme` |
| **Build tool** | [Vite](https://vitejs.dev/) | Dev server for `showcase/`, library build for `dist/`, Babel plugin for Plastic JSX transform |
| **JSX transform** | `@plastic-js/babel-preset-plastic` | Compiles JSX to `h()` calls with signal-aware reconciliation |

### Architecture diagram

```
@zag-js/* (state machines)
    │
    ▼
@plastic-js/ark (headless primitives, Plastic-wrapped)
    │
    ▼
tsumiki components (styled, sized, token-connected)
    │
    ▼
Consumer application
```

### Ark component mapping

Every tsumiki component wraps a corresponding `@plastic-js/ark` primitive:

```js
import { Switch as ArkSwitch } from '@plastic-js/ark'
```

The Ark import is always aliased with an `Ark` prefix to distinguish it from the tsumiki component being defined. All 40 Ark-backed components have corresponding tsumiki implementations, plus 13 additional custom/project-specific components (CardNumberInput, ConfirmDialog, Select, Skeleton, mobile variants, etc.).

---

## 3. Design Token System

All tokens live in `src/styles/` and cascade from `reset.css` → `tokens.css` → sub-files. The published package ships one bundled stylesheet built from them (`@plastic-js/tsumiki/styles` → `dist/tsumiki.css`), built from `index.css`. Every token uses the `--tsu-` namespace.

### 3.1 File structure

```
src/styles/
├── index.css          # Bundle entry: imports reset.css (→ tokens.css)
├── reset.css          # Modern CSS reset, imports tokens.css
├── tokens.css         # Aggregator: @import all sub-files + root tokens
├── theme.css          # Radix Colors bridge (generated by `npm run theme`)
├── color.css          # Semantic color tokens + legacy aliases
├── sizing.css         # Component sizing (6 tiers × 2 level sequences)
├── radius.css         # Border radius (L1/L2/L3 per size + round)
├── spacing.css        # 8-step spacing scale
├── typography.css     # Font sizes, family, line-height
├── transition.css     # Timing presets
└── shadow.css         # Elevation shadows
```

### 3.2 Color System

Powered by Radix Colors 12-step scales. The active theme (generated by `scripts/theme.js`) maps:

- **Accent**: Indigo scale → `--tsu-accent-1` through `--tsu-accent-12`
- **Neutral**: Olive scale → `--tsu-neutral-1` through `--tsu-neutral-12`

Additionally, semantic color categories alias Radix scales:

| Category | Radix Source | Token Range | Usage |
|----------|-------------|-------------|-------|
| `accent` | Indigo | `--tsu-accent-1..12` | Primary brand color, focus rings |
| `neutral` | Olive | `--tsu-neutral-1..12` | Text, surfaces, borders |
| `danger` | Red | `--tsu-danger-1..12` | Error states, destructive actions |
| `success` | Green | `--tsu-success-1..12` | Success states, positive feedback |
| `warning` | Amber | `--tsu-warning-1..12` | Warning states |
| `neutral-alpha` | Mauve Alpha | `--tsu-neutral-alpha-1..12` | Shadows, backdrops, translucent overlays |

#### Color scale semantics (standard Radix convention)

- Steps **1–2**: App background / subtle surfaces
- Steps **3–5**: Component backgrounds (hover, active, selected)
- Steps **6–8**: Borders, separators, subtle interactive states
- Steps **9–10**: Solid backgrounds (primary action, checked state)
- Steps **11–12**: High-contrast text, icons

#### Global surface/text primitives

```css
--tsu-bg: var(--tsu-neutral-1);    /* Page & component surfaces */
--tsu-fg: var(--tsu-neutral-12);   /* Primary text */
```

#### State tokens

```css
/* Disabled */
--tsu-disabled-bg:     var(--tsu-neutral-3);
--tsu-disabled-fg:     var(--tsu-neutral-9);
--tsu-disabled-border: var(--tsu-neutral-7);

/* Focus */
--tsu-focus-bg:     var(--tsu-neutral-2);
--tsu-focus-border: var(--tsu-accent-8);
```

#### Legacy aliases (backward compatibility)

```css
--ink:    var(--tsu-fg);
--muted:  var(--tsu-neutral-11);
--accent: var(--tsu-accent-9);
--surface: var(--tsu-bg);
--bg:     var(--tsu-neutral-2);
--border: var(--tsu-neutral-7);
--danger: var(--tsu-danger-9);
```

#### Dark mode

Radix Colors ships both light and dark variants. Dark values are applied when the `.dark` class is present on the root element (`<html>`):

```html
<html class="dark">
```

Toggle it at runtime:

```js
document.documentElement.classList.toggle('dark')
```

When `.dark` is active, every token re-resolves to the dark Radix scale automatically (`--tsu-neutral-1..12`, `--tsu-accent-1..12`, `--tsu-danger-*`, etc.). Tsumiki's theme-level dark overrides (e.g. the lighter page background) live under `:root.dark` in `src/styles/color.css`.

For native form controls (date pickers, scrollbars, etc.) to render in dark mode, also set `color-scheme: dark`:

```css
html.dark {
  color-scheme: dark;
}
```

### 3.3 Sizing System

Six tiers (`xs` → `xxl`) with two level sequences:

| Tier | Primary Height | Secondary Height | Font Size | Line Height | Padding Y | Padding X |
|------|---------------|-------------------|-----------|-------------|-----------|-----------|
| **xs** | 32px | 16px | 12px | 16px | 7px | 8px |
| **sm** | 36px | 18px | 14px | 20px | 7px | 12px |
| **md** | 40px | 20px | 14px | 20px | 9px | 16px |
| **lg** | 44px | 22px | 16px | 24px | 9px | 20px |
| **xl** | 48px | 24px | 18px | 28px | 9px | 24px |
| **xxl** | 64px | 32px | 20px | 30px | 16px | 32px |

- **Primary height** (`--tsu-comp-height-{size}`): Used for buttons, inputs, selects — the full component height
- **Secondary height** (`--tsu-comp-secondary-height-{size}`): Used for checkboxes, radio indicators, switch thumbs — the inner control size

#### Token naming pattern

```
--tsu-comp-height-{size}            # Full component height (e.g. Button)
--tsu-comp-secondary-height-{size}  # Icon/indicator/thumb size (e.g. Checkbox control)
--tsu-comp-font-size-{size}         # Component text size
--tsu-comp-line-height-{size}       # Component text line height
--tsu-comp-padding-y-{size}         # Vertical padding
--tsu-comp-padding-x-{size}         # Horizontal padding
```

### 3.4 Border Radius

Three nesting levels per size tier, plus a fully-round utility:

```
--tsu-radius-l1-{size}   # Atomic: buttons, inputs, toggles (2px–16px)
--tsu-radius-l2-{size}   # Card: cards, popovers, menus
--tsu-radius-l3-{size}   # Modal: dialogs, drawers, bottom sheets
--tsu-radius-round       # 9999px — pill shapes, avatars
```

### 3.5 Spacing

8-step scale for gaps and margins:

| xxs | xs | sm | md | lg | xl | xxl |
|-----|----|----|----|----|----|-----|
| 2px | 4px | 8px | 12px | 16px | 24px | 32px |

Tokens: `--tsu-spacing-{step}`

### 3.6 Typography

General text sizes (separate from component font sizes):

| xs | sm | md | lg | xl | xxl |
|----|----|----|----|----|-----|
| 10px | 12px | 14px | 16px | 20px | 24px |

Global defaults:
```css
--tsu-font-family: system-ui, -apple-system, sans-serif;
--tsu-line-height: 1.5;
```

### 3.7 Transitions

Three timing presets:

```css
--tsu-transition-fast:    0.15s ease;   /* Quick interactions: hover, focus, toggle */
--tsu-transition-normal:  0.3s ease;    /* Medium transitions: expand, slide */
--tsu-transition-overlay: 0.3s ease;    /* Overlays/backdrops: dialog, drawer, popover */
```

### 3.8 Shadows

Three elevation levels using alpha overlay tokens for automatic dark mode adaptation:

```css
--tsu-shadow-sm: 0 1px 2px  var(--tsu-neutral-alpha-6);
--tsu-shadow-md: 0 4px 12px var(--tsu-neutral-alpha-8);
--tsu-shadow-lg: 0 8px 24px var(--tsu-neutral-alpha-10);
```

### 3.9 Z-Index Layers

```css
--tsu-z-base:     0;     /* Default */
--tsu-z-dropdown: 100;   /* Popovers, menus, listboxes */
--tsu-z-modal:    200;   /* Dialogs, drawers */
--tsu-z-toast:    300;   /* Toast notifications */
```

---

## 4. Controlled-Only Policy

Tsumiki enforces a **controlled-only** pattern for all components. Uncontrolled usage (via `defaultValue`, `defaultOpen`, `defaultChecked`, etc.) is **not supported** at the tsumiki component level, even if the underlying Ark component supports it.

### Rationale

- **Predictability** — Controlled state is explicit and deterministic; uncontrolled state creates sources of truth that are hard to reason about
- **Consistency** — Every component follows the same `value`/`onValueChange` pattern, making the API uniform
- **Testability** — Controlled components are easier to test because state is always owned by the consumer

### What this means

- Components take a `value` (or `checked`, `open`, etc.) signal as a controlled prop
- Components call an `onValueChange` (or `onCheckedChange`, `onOpenChange`, etc.) callback when the value changes
- No `defaultValue`, `defaultOpen`, `defaultChecked`, or similar props exist on tsumiki components
- If a consumer wants an initial value, they set it in their own `createSignal`:

```jsx
// CORRECT: Controlled
const isOpen = createSignal(false)
<Dialog open={isOpen} onOpenChange={v => isOpen(v.open)} />

// WRONG: Uncontrolled (not supported)
<Dialog defaultOpen />
```

### Enforcement

- The `src/components/Select.jsx` component **does not** accept `defaultOpen` — `open` is always required
- All Ark-wrapped components pass through their `...rest` props to the underlying Ark primitives. While the Ark primitive may technically accept `default*` props internally, consumers **must not** rely on this behavior as tsumiki reserves the right to break uncontrolled usage in future versions

---

## 5. Component Authoring Patterns

Every tsumiki component follows a consistent set of conventions. Understanding these patterns is essential for adding new components or writing showcase pages.

### 5.1 Standard Import Block

```js
import { css, keyframes } from '@emotion/css'
import { ComponentName as ArkComponentName } from '@plastic-js/ark'
import { mergeProps, splitProps } from '@plastic-js/plastic'
```

- `css` / `keyframes` — from `@emotion/css` for static CSS generation
- Ark primitive — always aliased with `Ark` prefix to avoid name collision with the tsumiki component
- `mergeProps` / `splitProps` — from `@plastic-js/plastic` for layered defaults + prop splitting
- Additional imports (`createContext`, `useContext`) from `@plastic-js/plastic` for compound components

### 5.2 The `read()` Helper

Defined locally in every component file (not imported from a shared location):

```js
const read = (v) => typeof v === 'function' ? v() : v
```

All props can be either **static values** or **Plastic reactive getter functions**. The `read()` helper unwraps them:

```js
// Consumers can pass either:
<Switch size="md" />          // static
<Switch size={() => mySignal()} />  // reactive
```

This is used wherever a prop value is consumed outside of JSX attribute position.

### 5.3 Props Merging Pattern

```js
const [local, rest] = splitProps(
  mergeProps({ size: 'md' /* defaults */ }, props),
  ['size', 'className', 'children' /* consumed props */],
)
```

1. **`mergeProps(defaults, props)`** — layers defaults under user-provided props
2. **`splitProps(merged, keys)`** — separates props into `[consumed, rest]`
3. **`local`** — the tsumiki component's own props (size, className, children, etc.)
4. **`rest`** — everything else, forwarded to the Ark primitive via spread

### 5.4 CSS Architecture: Static Classes + Custom Properties

Tsumiki uses a hybrid approach:

#### Approach A: Direct token references (simple components)

```js
const sizeClasses = {
  md: css({
    height: 'var(--tsu-comp-height-md)',
    padding: 'var(--tsu-comp-padding-y-md) var(--tsu-comp-padding-x-md)',
    fontSize: 'var(--tsu-comp-font-size-md)',
  }),
}
```

#### Approach B: Scoped custom properties (complex components)

Components that need to compute derived dimensions (e.g., track width = 2× secondary height) use private CSS variables:

```js
// Size class defines scoped variables
const sizeClasses = {
  md: css({
    '--_sw-track-height': 'var(--tsu-comp-secondary-height-md)',
    '--_sw-track-width': 'calc(2 * var(--tsu-comp-secondary-height-md))',
    '--_sw-thumb-travel': 'var(--tsu-comp-secondary-height-md)',
  }),
}

// Base class references them with fallbacks
const controlClass = css({
  height: 'var(--_sw-track-height, var(--tsu-comp-secondary-height-md))',
  width: 'var(--_sw-track-width, calc(2 * var(--tsu-comp-secondary-height-md)))',
})
```

**Naming convention**: Private variables use `--_{initials}-` prefix:
- Button: `--_btn-*`
- Checkbox: `--_cb-*`
- Switch: `--_sw-*`
- Toggle: `--_tgl-*`
- Progress: `--_prog-*`

#### Variant / Intent pattern (Button style)

```js
const intentClasses = {
  default: css({
    '--_btn-solid': 'var(--tsu-accent-9)',
    '--_btn-solid-active': 'var(--tsu-accent-8)',
    '--_btn-border': 'var(--tsu-accent-9)',
  }),
  neutral: css({
    '--_btn-solid': 'var(--tsu-neutral-9)',
    '--_btn-solid-active': 'var(--tsu-neutral-8)',
    '--_btn-border': 'var(--tsu-neutral-9)',
  }),
  danger: css({
    '--_btn-solid': 'var(--tsu-danger-9)',
    '--_btn-solid-active': 'var(--tsu-danger-8)',
    '--_btn-border': 'var(--tsu-danger-9)',
  }),
}
```

`intent` takes one of `'default' | 'neutral' | 'danger'` (selected via a single prop, not booleans). `neutral` is only valid on the outline variant — when combined with `solid` it is ignored and falls back to `default`.

### 5.5 Class Name Composition (Reactive)

```js
className={() => [
  baseClass,
  sizeClasses[read(local.size)],
  read(local.rounded) && roundedClass,
  local.className,
].filter(Boolean).join(' ')}
```

This uses a **Plastic reactive getter function** so the className list is re-evaluated whenever signals change. Consumer-provided `className` is appended last for overrides.

### 5.6 Base Style Conventions

All interactive components share these base styles:

```js
const rootClass = css({
  display: 'inline-flex',
  alignItems: 'center',
  cursor: 'pointer',
  fontFamily: 'inherit',
  userSelect: 'none',
  touchAction: 'manipulation',
  WebkitTapHighlightColor: 'transparent',
  '&[data-disabled]': { cursor: 'not-allowed' },
})
```

Transitions always reference the design tokens:
```css
transition: 'background-color var(--tsu-transition-fast)'
```

### 5.7 Disabled State Handling

Disabled is applied via the `disabled` prop on the Ark Root, which sets `data-disabled` attribute internally. Components style it with:

```css
'&[data-disabled]': {
  opacity: 0.5,           /* or use --tsu-disabled-* tokens */
  cursor: 'not-allowed',
}
```

### 5.8 Focus State Styling

Focus states use the focus tokens defined in `color.css`:

```css
'&:focus-visible': {
  backgroundColor: 'var(--tsu-focus-bg)',
  outline: '2px solid var(--tsu-focus-border)',
  outlineOffset: '2px',
}
```

### 5.9 Compound Component Pattern

Complex components (Menu, Dialog, Accordion, etc.) expose tsumiki-wrapped sub-components as **named exports**. The default export is always the root render component:

```jsx
import { Menu as ArkMenu } from '@plastic-js/ark'

// Default export: the root wrapper
const Menu = (props = {}) => (
  <ArkMenu.Root className={rootClass} {...rest}>
    {children}
  </ArkMenu.Root>
)

// Named exports: tsumiki-wrapped sub-components
export const MenuTrigger = (props = {}) => (
  <ArkMenu.Trigger className={triggerClass} {...rest}>
    {children}
  </ArkMenu.Trigger>
)

export const MenuContent = (props = {}) => (
  <ArkMenu.Content className={contentClass} {...rest}>
    {children}
  </ArkMenu.Content>
)

Menu.origin = {
  Root: ArkMenu.Root,
  Trigger: ArkMenu.Trigger,
  Content: ArkMenu.Content,
}

export default Menu
export { Menu }
```

Sub-components are **never** attached as static properties on the default export — no `Menu.Trigger = ...`, no `Object.assign`.

Self-contained components like Progress auto-render their internals (Track + Range), exposing only Progress + ProgressLabel:

```jsx
<Progress size="md" value={75} label="Loading" />
// or with ProgressLabel as child
<Progress size="md" value={75}>
  <ProgressLabel>Loading</ProgressLabel>
</Progress>
```

Internal state sharing uses `createContext` / `useContext` from `@plastic-js/plastic`:

```js
const ProgressContext = createContext()
// In ProgressRoot:
<ProgressContext.Provider value={{ size: read(size) }}>
// In child:
const ctx = useContext(ProgressContext)
```

### 5.10 Ark Pass-through Export (the `.origin` escape hatch)

Components that wrap Ark primitives (Checkbox, Dialog, Switch, etc.) expose the raw Ark sub-components via the `.origin` object. `.origin` is the **only** static property on the component — it maps tsumiki-friendly names to their raw `@plastic-js/ark` counterparts:

```js
import { Checkbox as ArkCheckbox } from '@plastic-js/ark'

const Checkbox = (props = {}) => (
  <ArkCheckbox.Root className={rootClass} {...rest}>
    {children}
  </ArkCheckbox.Root>
)

Checkbox.origin = {
  Root: ArkCheckbox.Root,
  Control: ArkCheckbox.Control,
  Indicator: ArkCheckbox.Indicator,
  Label: ArkCheckbox.Label,
  HiddenInput: ArkCheckbox.HiddenInput,
}

export default Checkbox
export { Checkbox }
```

Key rules:

- `.origin` (lowercase) is an **object**, never a component — do not write `Component.origin = Root`
- Only mount what exists on the Ark component
- No `Object.assign`; the component carries nothing except `.origin`
- Raw Ark parts live in `.origin`; tsumiki-wrapped sub-components are named exports

#### Consumer usage

```jsx
{/* Primary usage: tsumiki-styled */}
<Checkbox>Accept terms</Checkbox>

{/* Escape hatch: raw Ark sub-parts */}
<Checkbox.origin.Root>
  <Checkbox.origin.Control>
    <Checkbox.origin.Indicator />
  </Checkbox.origin.Control>
</Checkbox.origin.Root>
```

#### File-level example (Dialog.jsx)

```js
import { Dialog as ArkDialog } from '@plastic-js/ark'

const Dialog = (props = {}) => {
  const [local, rest] = splitProps(props, ['className'])
  return <ArkDialog.Root {...rest} className={[rootClass, local.className].filter(Boolean).join(' ')} />
}

Dialog.origin = {
  Root: ArkDialog.Root,
  Backdrop: ArkDialog.Backdrop,
  Positioner: ArkDialog.Positioner,
  Content: ArkDialog.Content,
  Title: ArkDialog.Title,
  Description: ArkDialog.Description,
  CloseTrigger: ArkDialog.CloseTrigger,
}

export default Dialog
export { Dialog }
```

Higher-level presets (like `DrawerContent`) are named exports, never static properties.

### 5.11 Component Structure Summary

| Pattern | Example | When to use |
|---------|---------|-------------|
| Simple single-component | Switch, Button, Toggle, Tabs | One interactive element |
| Self-contained compound | Progress, Steps | Auto-renders internals; exposes only the root (+ optional named parts) |
| Multi-part with named exports | Menu, Accordion, TreeView, Drawer | Tsumiki-wrapped sub-components exported by name |
| Ark pass-through + `.origin` | Checkbox, Dialog, Switch | Wraps Ark primitives; raw Ark parts exposed via `.origin` object |
| Pure re-export | Portal, Presence, FocusTrap | No styling, direct passthrough |

### 5.11.1 Forbidden Patterns

Do **not** use `Object.assign` to assemble components, and do **not** attach sub-components as static properties:

```js
// ❌ Forbidden — Object.assign spreading sub-components
const Component = Object.assign(Root, { Trigger: X, Content: Y })

// ❌ Forbidden — static sub-properties
Component.Root = Component
Component.Trigger = SomeTrigger

// ✅ Approved: only .origin (object mapping to raw Ark parts) + named exports
Component.origin = { Root: ArkPrimitive.Root, Trigger: ArkPrimitive.Trigger }
export const ComponentTrigger = ArkPrimitive.Trigger
export default Root
```

The component function carries **nothing** except `.origin`. Any tsumiki-wrapped sub-components must be named exports — never mount points.

### 5.12 File Organization

```
src/components/
├── Accordion.jsx
├── Avatar.jsx
├── Button.jsx
├── Checkbox.jsx
├── Dialog.jsx
├── ...
├── Select.jsx
└── index.js               # Barrel export file
```

All components are single `.jsx` files.

---

## 6. Responsive Design

### Mobile-first approach

Components default to mobile-appropriate sizing. Desktop adaptations are layered on top:

```css
/* Default: bottom sheet on mobile */
'@media (min-width: 640px)': {
  position: 'fixed',
  top: '50%', left: '50%',
  transform: 'translate(-50%, -50%)',
  /* Centered modal on desktop */
}
```

The breakpoint (`640px`) is hard-coded per component, not currently a design token.

---

## 7. Showcase Application

### Structure

```
showcase/
├── index.html
├── global.css          # Showcase-specific styles
├── App.jsx             # SPA shell with client-side routing
└── pages/
    ├── ButtonPage.jsx
    ├── SwitchPage.jsx
    └── ...
```

### Routing

Pure client-side SPA via `window.history.pushState` — no router library. Routes are defined in `allShowcases` array in `App.jsx`:

```js
{ href: '/button', label: 'Button', page: ButtonPage }
```

### Page Template Pattern

Every showcase page follows this structure:

```jsx
import { createSignal } from '@plastic-js/plastic'
import ComponentName from '../../src/components/ComponentName.jsx'

const SIZES = ['xs', 'sm', 'md', 'lg', 'xl']

function ComponentNamePage() {
  const someSignal = createSignal(defaultValue)

  return (
    <div className='container'>
      {/* Hero */}
      <div className='hero'>
        <p className='eyebrow'>Category</p>
        <h1>Component Name</h1>
        <p className='hero-copy'>Description. Uses <span className='tag'>--tsu-*</span> tokens.</p>
      </div>

      {/* Sizes demo */}
      <div className='feature-card'>
        <p className='demo-label'>Sizes</p>
        <div className='demo-row'>
          {SIZES.map(s => <Component key={s} size={s} />)}
        </div>
      </div>

      {/* Variants demo */}
      <div className='feature-card'>
        <p className='demo-label'>Variants</p>
        <div className='demo-row'>
          {/* ... */}
        </div>
      </div>

      {/* Interactive playground */}
      <div className='feature-card'>
        <p className='demo-label'>Interactive</p>
        <div className='demo-check-row'>
          <label>
            <select className='demo-select' onChange={...}>
              {SIZES.map(s => <option value={s}>{s}</option>)}
            </select>
          </label>
        </div>
        <Component size={sizeSignal} ... />
      </div>
    </div>
  )
}

export default ComponentNamePage
```

### Showcase CSS conventions

| Class | Purpose |
|-------|---------|
| `.container` | Page padding (`0 16px 16px`) |
| `.hero` / `.eyebrow` / `.hero-copy` | Page header with category label |
| `.feature-card` | Demo section card (`border`, `border-radius`, `padding: 24px`) |
| `.demo-label` | Section label (12px, uppercase, `letter-spacing: 0.06em`, `color: var(--tsu-neutral-11)`) |
| `.demo-row` | Horizontal flex layout (`display: flex; flex-wrap: wrap; gap: 12px; align-items: center`) |
| `.demo-check-row` | Vertical flex for playground controls |
| `.demo-select` | Styled `<select>` for interactive size/variant pickers |
| `.tag` | Inline code-like label for token references (monospace, accent background) |

---

## 8. Theme Customization

### For consumers

Override any `--tsu-*` CSS custom property at any level of specificity:

```css
:root {
  --tsu-accent-9: #your-color;
  --tsu-comp-height-md: 44px;
}

.my-component {
  --tsu-radius-round: 12px;
}
```

### Regenerating the default theme (maintainers only)

`npm run theme` runs `scripts/theme.js` — an interactive CLI for picking new accent and neutral colors. It regenerates `src/styles/theme.css`, which is the **default theme shipped with the library**. This tool is internal, for library maintainers or anyone forking the library; it is **not** part of the published package.

**Consumers never need this.** To theme the library in your own app, override the `--tsu-*` variables after importing the styles (see "For consumers" above).

### Adding new colors (maintainers only)

Add to `src/styles/color.css` following the existing pattern:

```css
--tsu-info-1: var(--tsu-blue-1);
--tsu-info-2: var(--tsu-blue-2);
/* ... */
```

Then define the Radix scale in `theme.css` by importing the desired color:

```css
@import '@radix-ui/colors/blue.css';
@import '@radix-ui/colors/blue-dark.css';
```

---

## 9. Adding a New Component — Checklist

1. **Create `src/components/NewComponent.jsx`** following the patterns in §5
2. **Export from `src/index.js`** — add to the barrel export
3. **Create `showcase/pages/NewComponentPage.jsx`** following the template in §7
4. **Register the route** in `showcase/App.jsx` `allShowcases` array
5. **Verify**: run `npm run dev` and navigate to `/new-component`

---

## 10. Commands Cheatsheet

| Command | Purpose |
|---------|---------|
| `npm run dev` | Start showcase dev server on port 3456 |
| `npm run build` | Build library to `dist/` |
| `npm run theme` | Regenerate default theme CSS (maintainers only) |
| `npm publish` | Publish (runs `prepublishOnly` → `npm run build`) |


---

## License

MIT