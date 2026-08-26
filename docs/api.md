# Tsumiki Component API Reference

> Public API contract for `@plastic-js/tsumiki` (v0.1.x).

This document is the authoritative reference for the components exported from the package root (`@plastic-js/tsumiki`). It is part of the version 1.0 API contract: anything documented here is stable; anything not documented here (deep imports into `dist/components`, `.origin` internals, or `...rest` passthrough behavior) is **not** part of the contract and may change without a major version bump.

> Components still **in development** (`Accordion`, `Carousel`, `Combobox`, `Listbox`, `Tour`, `TreeView`) are intentionally **not documented** here — their APIs are not yet frozen. They remain importable but are outside the v1 contract.

## Conventions

### Controlled-only

Tsumiki is **controlled-only**. State-managing components (`value`, `open`, `checked`, …) receive state as a signal and report changes via a callback. There are no `defaultValue` / `defaultOpen` / `defaultChecked` props.

```jsx
const isOpen = createSignal(false)
<Dialog open={isOpen} onOpenChange={v => isOpen(v.open)} />
```

### Reactive props

Any prop may be a static value **or** a Plastic reactive getter function:

```jsx
<Switch size="md" />            // static
<Switch size={() => mySignal()} /> // reactive
```

### Passthrough

Ark-backed components forward all props **not listed** in their table to the underlying Ark primitive's `Root` (unless stated otherwise). This includes Ark/Zag props, ARIA attributes, and DOM event handlers.

### Escape hatch

Every Ark-backed component exposes `.origin` — a mapping to the raw `@plastic-js/ark` sub-parts, for when you need the full headless API:

```jsx
<Checkbox.origin.Root>
  <Checkbox.origin.Control>
    <Checkbox.origin.Indicator />
  </Checkbox.origin.Control>
</Checkbox.origin.Root>
```

### Size values

The shared `size` prop accepts: `xs | sm | md | lg | xl | xxl` (default `md`).

---

## Semantic tokens

The design system exposes a **semantic color layer** (`src/styles/semantic.css`) between the raw Radix palette steps and the components. Components reference *semantics*, never raw steps, so a style stays consistent across light/dark mode and across containers (page vs. sheet/popover).

**Background hierarchy** — container-aware:

| Token | Value | Use |
|---|---|---|
| `--tsu-bg-page` | `neutral-1` | App page background |
| `--tsu-bg-panel` | `neutral-2` | Cards, sheets, popovers, dialogs |
| `--tsu-bg-control` | `neutral-3` | Form controls (inputs, buttons) |
| `--tsu-bg-control-hover` | `neutral-4` | Hover of raised controls |
| `--tsu-bg-overlay` | `rgba(0,0,0,0.5)` | Modal scrim |
| `--tsu-bg-overlay-soft` | `rgba(0,0,0,0.35)` | Sheet / bottom scrim |

**Text hierarchy:** `--tsu-text-primary` (`neutral-12`), `--tsu-text-secondary` (`neutral-11`), `--tsu-text-subtle` (`neutral-9`).

**Palette variants** — every palette (`neutral`, `accent`, `danger`, `success`, `warning`) exposes the same five variants. Each variant provides `-bg`, `-bg-hover`, `-bg-active`, `-border`, `-border-hover`, `-fg` as applicable:

| Variant | Pattern | Example |
|---|---|---|
| `solid` | Filled control, high contrast | `--tsu-accent-solid-bg` = `accent-9`, `--tsu-accent-solid-fg` = white |
| `surface` | Panel-tinted control with border | `--tsu-accent-surface-bg` = `accent-alpha-2`, `--tsu-accent-surface-border` = `accent-alpha-6` |
| `subtle` | Tinted control, no border | `--tsu-accent-subtle-bg` = `accent-alpha-3` |
| `outline` | Transparent control with border | `--tsu-accent-outline-border` = `accent-alpha-7` |
| `plain` | Text-like control | `--tsu-accent-plain-fg` = `accent-11` |

**Hover/active tints use ALPHA tokens** (e.g. `--tsu-accent-alpha-3`), so they read identically over the page background and over panel/sheet backgrounds.

**States:**

- **Pressed/active** — unified via `--tsu-pressed` / `--tsu-pressed-hover` (neutral alpha) and `--tsu-pressed-accent` / `--tsu-pressed-accent-hover` (accent alpha).
- **Disabled** — a uniform state applied on top of any variant: `--tsu-disabled-opacity` (`0.5`) fades the whole component (no grayscale), keeping the `neutral` intent (gray) visually distinct from the accent intent even when disabled.

**Elevation** — `--tsu-shadow-sm / md / lg` (downward) and `--tsu-shadow-up` (upward, for bottom sheets), all composed from neutral alpha tokens.

---

## Inputs & Forms

### Field

A labeled field wrapper combining a label, an error message and helper text, backed by `ArkField`.

**Exports:** `Field` · Escape hatch: `Field.origin.{Root, Label, Input, Textarea, Select, HelperText, ErrorText, RequiredIndicator, Item}`

| Prop | Type | Default | Description |
|---|---|---|---|---|
| `label` | `string \| node` | `''` | Label content — any text or JSX. Styling is fixed. |
| `error` | `string \| node` | `''` | Error content; when non-empty the field renders in its error state. Styling is fixed. |
| `helper` | `string \| node` | `''` | Helper content below the control. Styling is fixed. |
| `required` | `boolean` | `false` | Marks the label with a required indicator. |
| `compact` | `boolean` | `false` | Renders in a compact (smaller) layout. |
| `invalid` | `boolean` | `false` | Error state (also implied by a non-empty `error`). |
| `disabled` | `boolean` | — | Disables the control; inherits from an enclosing `Fieldset`. |
| `readOnly` | `boolean` | — | Read-only state. |
| `children` | `node` | — | The input control (e.g. `<Input />`). |

Passthrough: Ark `Field.Root` props (`id`, `ids`, …).

### Fieldset

Groups several `Field`s with a legend, backed by `ArkFieldset` (native `<fieldset>`).

**Exports:** `Fieldset` · Escape hatch: `Fieldset.origin.{Root, Legend, HelperText, ErrorText}`

| Prop | Type | Default | Description |
|---|---|---|---|---|
| `legend` | `string \| node` | `''` | Legend content — any text or JSX. Styling is fixed. |
| `helper` | `string \| node` | `''` | Helper content below the fields. Styling is fixed. |
| `children` | `node` | — | `Field` components to group. |

Passthrough: Ark `Fieldset.Root` props (`disabled`, `invalid`, …).

### Input

**Exports:** `Input` · Escape hatch: `Input.origin.Root`

| Prop | Type | Default | Description |
|---|---|---|---|
| `variant` | `'outline' \| 'solid'` | `'outline'` | Filled background instead of outlined. |
| `intent` | `string` | `'default'` | Border intent (`'default'`, `'neutral'`). `neutral` applies only to the outline variant (ignored when `variant='solid'`). For error states use `invalid` instead. |
| `size` | `string` | `md` | See size values. |
| `disabled` | `boolean` | `false` | Disables the input. |
| `invalid` | `boolean` | `false` | Renders the error/invalid style. |
| `inputClassName` | `string` | — | Class applied to the raw `<input>` element. |
| `type` | `string` | — | Input type (e.g. `text`, `password`). |
| `prefix` | `node` | — | Content rendered before the input (e.g. an icon). |
| `suffix` | `node` | — | Content rendered after the input. |
| `ref` | `ref` | — | Ref to the underlying `<input>`. |

### CardNumberInput

Credit-card number input with automatic `XXXX-XXXX-XXXX-XXXX` grouping.

**Exports:** `CardNumberInput`

| Prop | Type | Default | Description |
|---|---|---|---|
| `value` | `string \| (() => string)` | — | Card number (digits only). |
| `onValueChange` | `(value) => void` | — | Called with the raw digits. |
| `invalid` | `boolean` | `false` | Error state. |
| `disabled` | `boolean` | `false` | Disabled. |
| `placeholder` | `string` | — | Placeholder text. |

### MoneyInput

Currency-formatted numeric input.

**Exports:** `MoneyInput`

| Prop | Type | Default | Description |
|---|---|---|---|
| `value` | `number \| (() => number)` | — | Numeric value. |
| `onValueChange` | `(value) => void` | — | Called with the parsed number. |
| `invalid` | `boolean` | `false` | Error state. |
| `currency` | `string` | — | Currency code (e.g. `TWD`, `USD`). |
| `affix` | `node` | — | Custom prefix/suffix content. |
| `placeholder` | `string` | — | Placeholder text. |
| `disabled` | `boolean` | `false` | Disabled. |

### NumberInput

**Exports:** `NumberInput` · Escape hatch: `NumberInput.origin.{Root, DecrementTrigger, Input, IncrementTrigger}`

| Prop | Type | Default | Description |
|---|---|---|---|---|
| `size` | `string` | `md` | See size values. |
| `intent` | `'default' \| 'neutral'` | `'default'` | Border color of the group. `neutral` uses the neutral outline border (matching Input's neutral); the checked segment keeps the accent background. |
| `children` | `node` | — | `ToggleGroupItem` elements. |

### FilterGroup

Multi-select filter bar built on the `Button` component. Renders an "All" pill (outline when idle, solid accent when active); item pills are neutral when idle and accent-outline when selected. Selecting any item clears "All", and an empty selection maps back to "All".

> **Design note:** `FilterGroup` renders its pills with `Button` (not `ToggleGroup`) to reuse Button's variant/intent styling and the neutral/outline/solid state language. Trade-off: the multi-select toggle logic is reimplemented here instead of delegating to `ToggleGroup`'s selection machinery. `ToggleGroup` remains available as a standalone segmented control.

**Exports:** `FilterGroup`

| Prop | Type | Default | Description |
|---|---|---|---|
| `value` | `array \| (() => array)` | — | Selected item values (controlled). |
| `onValueChange` | `(value) => void` | — | Called with the new selection array. |
| `items` | `array` | `[]` | Filter items (`{ value, label, disabled? }`). |
| `allLabel` | `string` | `'All'` | Label for the clear/All toggle. |
| `size` | `string` | `md` | See size values. |
| `buttonClass` | `string` | — | Class applied to every button. |
| `groupClass` | `string` | — | Class applied to the inner scroll container. |
| `sticky` | `boolean \| number` | — | Sticky to the top of the scroll container; pass a number for a `top` offset in px. |
| `className` | `string` | — | Root class. |

### RadioGroup

**Exports:** `RadioGroup` · Escape hatch: `RadioGroup.origin.{Root, Label, Item, ItemControl, ItemText, ItemHiddenInput, Indicator}`

| Prop | Type | Default | Description |
|---|---|---|---|
| `label` | `string` | — | Group label text. |
| `items` | `array` | — | Data items (see `SelectPc` collection semantics). |
| `className` | `string` | — | Root class. |

Passthrough: Ark `Root` props (`value`, `onValueChange`, `disabled`, …).

### RatingGroup

**Exports:** `RatingGroup` · Escape hatch: `RatingGroup.origin.{Root, Label, Control, Item, ItemText, HiddenInput}`

| Prop | Type | Default | Description |
|---|---|---|---|
| `count` | `number` | `5` | Number of rating items. |
| `label` | `string` | — | Optional label. |

Passthrough: Ark `Root` props (`value`, `onValueChange`, `readOnly`, …).

---

## Selection & Capture

### Select

Mobile-optimized bottom-sheet select (draggable sheet overlay).

**Exports:** `Select`, `SelectTrigger`

| Prop | Type | Default | Description |
|---|---|---|---|
| `value` | `string \| (() => string)` | — | Selected value. |
| `onValueChange` | `(value) => void` | — | Called when an item is selected. |
| `items` | `array \| (() => array)` | `[]` | Data array. Items may include `disabled: true` to render a non-selectable row. |
| `itemToValue` | `(item) => string` | `item.value` | Extract value from an item. |
| `itemToLabel` | `(item) => node` | `item.label` | Extract label from an item. |
| `open` | `(() => boolean)` | — | **Required** controlled open state. |
| `onOpenChange` | `(open) => void` | — | Open/close callback. |
| `disabled` | `boolean` | `false` | Disabled. |
| `variant` | `'outline' \| 'solid'` | `'outline'` | Filled trigger variant instead of outline. |
| `intent` | `'default' \| 'neutral'` | `'default'` | Border color for trigger and the search input. `neutral` applies only to the outline variant (ignored when `variant='solid'`). For error states use `invalid` instead. |
| `invalid` | `boolean` | `false` | Renders the error/invalid style (red border on the trigger and the search input). |
| `filter` | `(item, query, itemToLabel) => boolean` | — | Custom filter for the search box. |
| `placeholder` | `string` | — | Trigger placeholder. |
| `backdropClassName` | `string` | — | Backdrop class. |
| `backdropStyle` | `object` | — | Backdrop inline styles. |
| `children` | `node` | — | Custom trigger (`SelectTrigger`). |
| `item` | `node` | — | Custom item renderer. |

### SelectPc

Desktop (popover-style) select built on Ark `Select`.

**Exports:** `SelectPc`, `SelectItem` · Escape hatch: `SelectPc.origin.{Root, Trigger, Indicator, Positioner, Content, List, Item, ItemText, ValueText, HiddenSelect}`

| Prop | Type | Default | Description |
|---|---|---|---|
| `variant` | `'outline' \| 'solid'` | `'outline'` | Filled trigger variant. |
| `size` | `string` | `md` | See size values. |
| `disabled` | `boolean` | `false` | Disabled. |
| `invalid` | `boolean` | `false` | Error state. |
| `positioning` | `object` | `{ sameWidth: true }` | Positioning options. |
| `children` | `node` | — | `SelectItem` elements or custom content. |

Passthrough: Ark `Root` props (`value`, `onValueChange`, `collection`, …). Note: unlike `Select`, it is **not** controlled-only at the tsumiki level — state flows through the Ark props.

### FileUpload

**Exports:** `FileUpload`, `FileUploadItemGroup`, `FileUploadItem`, `FileUploadClearTrigger` · Escape hatch: `FileUpload.origin.{Root, Label, Dropzone, Trigger, ItemGroup, Item, ItemName, ItemSizeText, ItemDeleteTrigger, ClearTrigger, HiddenInput}`

| Prop | Type | Default | Description |
|---|---|---|---|
| `className` | `string` | — | Root class. |
| `file` | `object` | — | A controlled file object. |
| `children` | `node` | — | `FileUploadItemGroup` / `FileUploadItem` elements. |

Passthrough: Ark `Root` props (`accept`, `multiple`, `maxFiles`, `onFileAccept`, …).

### SignaturePad

**Exports:** `SignaturePad`, `ClearTrigger` · no `.origin`

| Prop | Type | Default | Description |
|---|---|---|---|
| `label` | `string` | `'Signature'` | Accessible label / placeholder. |
| `height` | `number` | `160` | Canvas height in px. |
| `className` | `string` | — | Root class. |
| `children` | `node` | — | Custom content. |

---

## Navigation & Data

### Tabs

**Exports:** `Tabs` · no `.origin`

| Prop | Type | Default | Description |
|---|---|---|---|
| `triggers` | `array` | — | Tab trigger definitions (`{ value, label }`). |
| `className` | `string` | — | Root class. |
| `children` | `node` | — | Tab panels keyed by value. |

Passthrough: Ark `Root` props (`value`, `onValueChange`, `orientation`, …).

### Steps

**Exports:** `Steps` · Escape hatch: `Steps.origin.{Root, List, Item, Trigger, Content, CompletedContent, Separator, PrevTrigger, NextTrigger, Indicator, Progress}`

| Prop | Type | Default | Description |
|---|---|---|---|
| `items` | `array` | — | Step definitions (`{ title, description, ... }`). |
| `vertical` | `boolean` | `false` | Vertical layout. |
| `value` | `number` | `0` | Active step index. |
| `onValueChange` | `(value) => void` | — | Step-change callback. |
| `completedContent` | `node` | — | Content shown on the last step. |
| `className` | `string` | — | Root class. |

### Menu

**Exports:** `Menu`, `MenuTrigger`, `MenuContent`, `MenuItem`, `MenuSeparator` · Escape hatch: `Menu.origin.{Root, Trigger, Positioner, Content, Item, Separator}`

| Prop | Type | Default | Description |
|---|---|---|---|
| `className` | `string` | — | Root class. |
| `children` | `node` | — | `MenuTrigger` / `MenuContent` elements. |

### Pagination

**Exports:** `Pagination` · Escape hatch: `Pagination.origin.Root`

| Prop | Type | Default | Description |
|---|---|---|---|
| `prevLabel` | `string` | — | Previous-page label. |
| `nextLabel` | `string` | — | Next-page label. |
| `prevChildren` | `node` | — | Custom previous trigger content. |
| `nextChildren` | `node` | — | Custom next trigger content. |
| `className` | `string` | — | Root class. |

Passthrough: Ark `Root` props (`count`, `pageSize`, `page`, `onPageChange`, …).

### BottomNavigation

Fixed bottom navigation bar with icons and labels.

**Exports:** `BottomNavigation`, `BottomNavigationItem`

| Prop | Type | Default | Description |
|---|---|---|---|
| `className` | `string` | — | Root class. |
| `children` | `node` | — | `BottomNavigationItem` elements. |

`BottomNavigationItem`:

| Prop | Type | Default | Description |
|---|---|---|---|
| `icon` | `node` | — | Icon content. |
| `label` | `string` | — | Item label. |
| `active` | `boolean` | `false` | Active state. |
| `href` | `string` | — | When set, renders an `<a>` instead of a `<button>`. |
| `onClick` | `() => void` | — | Click handler. |
| `className` | `string` | — | Item class. |

### BackToTop

Floating scroll-to-top button that appears after scrolling past a threshold.

**Exports:** `BackToTop`

| Prop | Type | Default | Description |
|---|---|---|---|
| `threshold` | `number` | `200` | Scroll offset (px) at which the button appears. |
| `target` | `() => Element` | — | Scroll container. When omitted, uses the window. |
| `icon` | `node` | — | Custom button icon. |
| `onClick` | `() => void` | — | Click callback. |
| `className` | `string` | — | Button class. |

---

## Content & Layout

### Collapsible

**Exports:** `Collapsible`, `CollapsibleTrigger`, `CollapsibleContent` · Escape hatch: `Collapsible.origin.{Root, Trigger, Content}`

| Prop | Type | Default | Description |
|---|---|---|---|
| `className` | `string` | — | Root class. |
| `children` | `node` | — | `CollapsibleTrigger` / `CollapsibleContent` elements. |

### Card

Container with themed background and border radius.

**Exports:** `Card`

| Prop | Type | Default | Description |
|---|---|---|---|
| `className` | `string` | — | Root class. |
| `children` | `node` | — | Content. |

Passthrough: `div` DOM props (`style`, `onClick`, …).

### Link

Styled anchor.

**Exports:** `Link`

| Prop | Type | Default | Description |
|---|---|---|---|
| `className` | `string` | — | Root class. |
| `children` | `node` | — | Content. |

Passthrough: native `<a>` props (`href`, `target`, `rel`, …).

### SafeArea

Adds device safe-area inset padding.

**Exports:** `SafeArea`

| Prop | Type | Default | Description |
|---|---|---|---|
| `position` | `string` | `'top'` | `'top' \| 'bottom' \| 'left' \| 'right'`. |
| `className` | `string` | — | Root class. |
| `children` | `node` | — | Content. |

### StickyHeader

Header that sticks to the top while scrolling.

**Exports:** `StickyHeader`

| Prop | Type | Default | Description |
|---|---|---|---|
| `offsetTop` | `number` | `0` | Sticky top offset (px). |
| `shadow` | `boolean` | `false` | Add a drop shadow when stuck. |
| `className` | `string` | — | Root class. |
| `children` | `node` | — | Content. |

### Splitter

**Exports:** `Splitter`, `SplitterPanel`, `SplitterResizeTrigger`, `SplitterResizeTriggerIndicator` · Escape hatch: `Splitter.origin.{Root, Panel, ResizeTrigger, ResizeTriggerIndicator}`

Passthrough: Ark `Root` props (`size`, `onSizeChange`, `orientation`, …).

### SwipeReveal

Touch-driven swipe-to-reveal row.

**Exports:** `SwipeReveal` · no `.origin`

| Prop | Type | Default | Description |
|---|---|---|---|
| `actions` | `array` | — | Action definitions; each item supplies `{ color, label, ... }` (background is consumer-defined). |
| `activeId` | `string` | — | The id of the currently open row. |
| `thisId` | `string` | — | This row's id (used to coordinate with `activeId`). |
| `onSwipeStart` | `() => void` | — | Called when a swipe begins. |
| `onOpenChange` | `(open) => void` | — | Open/close callback. |
| `children` | `node` | — | Row content. |

---

## Elements

### Avatar

**Exports:** `Avatar`, `AvatarImage`, `AvatarFallback` · Escape hatch: `Avatar.origin.{Root, Image, Fallback}`

| Prop | Type | Default | Description |
|---|---|---|---|
| `mode` | `string` | `'image'` | `'image'` (photo) or `'initials'` (initial letter). |
| `name` | `string` | `''` | Person's name (used for initials/alt). |
| `gender` | `string` | `'male'` | Initials color treatment. |
| `src` | `string` | `''` | Image source. |
| `alt` | `string` | `''` | Image alt text. |
| `style` | `object` | — | Root inline styles. |
| `children` | `node` | — | Fallback content. |

### Icon

**Exports:** `Icon` · no `.origin`

| Prop | Type | Default | Description |
|---|---|---|---|
| `svg` | `node` | — | The SVG element to render. |
| `size` | `number` | `22` | Icon size in px. |
| `strokeWidth` | `number` | `1.25` | Stroke width. |
| `className` | `string` | — | Root class. |

### CloseButton

**Exports:** `CloseButton` · no `.origin`

| Prop | Type | Default | Description |
|---|---|---|---|
| `size` | `string` | `md` | See size values. |
| `className` | `string` | — | Root class. |
| `children` | `node` | — | Close icon (defaults to ✕). |

### Skeleton

Pure-CSS loading placeholder.

**Exports:** `Skeleton` · no `.origin`

Accepts no tsumiki-specific props; `className`/style/DOM props pass through.

### Spinner

Pure-CSS spinner.

**Exports:** `Spinner` · no `.origin`

Accepts no tsumiki-specific props; `className`/style/DOM props pass through.

### Badge

Pill-shaped status indicator.

**Exports:** `Badge` · Escape hatch: `Badge.origin.Root`

| Prop | Type | Default | Description |
|---|---|---|---|
| `variant` | `'solid' \| 'surface' \| 'subtle' \| 'outline'` | `'subtle'` | Filled, panel-tinted, tinted, or outlined badge. |
| `intent` | `string` | `'default'` | Color intent: `'default'`, `'neutral'`, `'accent'`, `'info'`, `'danger'`, `'success'`, `'warning'`. `default`/`info`/`intent` map to `neutral`/`accent`. |
| `size` | `string` | `md` | See size values. |
| `dot` | `boolean` | `false` | Show a small status dot before the label. |
| `className` | `string` | — | Root class. |
| `children` | `node` | — | Label content. |

### Tag

Closable pill label.

**Exports:** `Tag` · Escape hatch: `Tag.origin.Root`

| Prop | Type | Default | Description |
|---|---|---|---|
| `variant` | `'solid' \| 'surface' \| 'subtle' \| 'outline'` | `'subtle'` | Filled, panel-tinted, tinted, or outlined tag. |
| `intent` | `string` | `'default'` | Color intent: `'default'`, `'neutral'`, `'accent'`, `'info'`, `'danger'`, `'success'`, `'warning'`. `default`/`info` map to `neutral`/`accent`. |
| `size` | `string` | `sm` | See size values. |
| `closable` | `boolean` | `false` | Show a close (✕) button; renders `data-part="close"`. |
| `onClose` | `() => void` | — | Called when the close button is clicked. |
| `className` | `string` | — | Root class. |
| `children` | `node` | — | Label content. |

---

## Feedback

### Slider

**Exports:** `Slider` · Escape hatch: `Slider.origin.{Root, Label, Control, Track, Range, Thumb, DraggingIndicator, ValueText, HiddenInput}`

| Prop | Type | Default | Description |
|---|---|---|---|
| `label` | `string` | — | Accessible label. |
| `className` | `string` | — | Root class. |
| `children` | `node` | — | Custom value rendering. |

Passthrough: Ark `Root` props (`value`, `onValueChange`, `min`, `max`, `step`, `thumbAlignment`, …) — defaults `min: 0`, `max: 100`, `step: 1`, `thumbAlignment: 'center'` are supplied by tsumiki.

### Progress

**Exports:** `Progress`, `ProgressLabel` · no `.origin`

| Prop | Type | Default | Description |
|---|---|---|---|
| `size` | `string` | `md` | See size values. |
| `striped` | `boolean` | `false` | Animated striped fill. |
| `className` | `string` | — | Root class. |

Passthrough: Ark `Root` props (`value`, `min`, `max`, …).

---

## Overlays

### Dialog

**Exports:** `Dialog` · Escape hatch: `Dialog.origin.{Root, Trigger, Backdrop, Positioner, Content, Title, Description, CloseTrigger}`

**Rendered DOM parts:** content is `[data-scope="dialog"][data-part="content"]`; tsumiki adds `data-part="header"`, `data-part="body"`, `data-part="footer"`, and the action buttons `data-part="negative-trigger"` / `data-part="positive-trigger"`. `title`, `description`, and `closeTrigger` carry `data-part` from Ark.

> **Note:** Dialog never renders a grabber / drag handle in either mode (`modal` or `sheet`). Drag-to-dismiss and the grabber are exclusive to [`BottomSheet`](#bottomsheet) — this is a deliberate difference between the two components.

> **Note:** Dialog has **enter-only** animations — its content unmounts immediately on close (no exit transition). [`BottomSheet`](#bottomsheet) is the opposite: it stays mounted through its exit transition before the nodes are removed. If you need a closing animation, use `BottomSheet`.

| Prop | Type | Default | Description |
|---|---|---|---|
| `mode` | `string` | `'sheet'` | `'modal'` (centered) or `'sheet'` (bottom sheet). |
| `open` | `boolean \| (() => boolean)` | — | **Required** controlled open state. |
| `onOpenChange` | `(open: boolean) => void` | — | Fired on every open/close with the new `open` boolean; sync your state here. |
| `onOpen` | `() => void` | — | Fired when opened. |
| `onClose` | `() => void` | — | Fired when closed. |
| `title` | `string` | — | Dialog title. |
| `icon` | `node` | — | Optional icon above the title. |
| `showCancel` | `boolean` | `true` | Show the cancel button. |
| `showConfirm` | `boolean` | `true` | Show the confirm button. |
| `cancelText` | `string` | `'Cancel'` | Cancel button label. |
| `confirmText` | `string` | `'Confirm'` | Confirm button label. |
| `onCancel` | `() => void` | — | Cancel callback. |
| `onConfirm` | `() => void` | — | Confirm callback. |
| `loading` | `boolean` | `false` | Confirm button shows a spinner. |
| `intent` | `string` | `'default'` | Confirm button intent (`'default'`, `'neutral'`, `'danger'`). |
| `closeable` | `boolean` | `true` | Show the close (✕) trigger. |
| `lazyMount` | `boolean` | `true` | Mount content lazily. |
| `unmountOnExit` | `boolean` | `true` | Unmount content when closed. |
| `closeOnInteractOutside` | `boolean` | `false` | Close when clicking outside. |
| `footer` | `node` | — | Custom footer replacing the default buttons. |
| `class` | `string` | — | Content class. |
| `children` | `node` | — | Custom body content. |

**Callback hierarchy:**

`onOpenChange` → `onClose` → `onCancel` are **increasingly high-level**. Each is a refinement of the previous:

- `onOpenChange` — raw state sync, fired on every open/close.
- `onClose` — close cleanup, fired whenever the dialog closes for any reason.
- `onCancel` — cancel intent, fired only on an explicit cancel (Cancel button, ✕, Escape, outside pointer).

> **General rule: always use the highest-level callback you need.** Reach for `onCancel` (and `onConfirm`) first — they express intent. Only fall back to `onClose` when you need close cleanup for every path, and to `onOpenChange` only when you need raw open/close control. Passing a lower-level callback just because a higher-level one exists usually means you are bypassing the intent layer.

**Known issues:**
- Pressing <kbd>Escape</kbd> closes both the Dialog and any nested overlay (e.g. `DatePicker`, `Select`) that is open inside it. There is currently no event coordination between the two — both react to the same key press.

### ConfirmDialog

Imperative + declarative confirm dialog built on `Dialog`.

**Exports:** `ConfirmDialog`, `confirm`

| Prop | Type | Default | Description |
|---|---|---|---|
| `mode` | `string` | — | `'alert'` / `'confirm'` / `'prompt'`-style mode. |
| `open` | `boolean \| (() => boolean)` | — | Controlled open state. |
| `onOpenChange` | `(v) => void` | — | Open/close callback. |
| `onConfirm` | `() => void` | — | Confirm callback. |
| `onCancel` | `() => void` | — | Cancel callback. |
| `loading` | `boolean` | `false` | Confirm button loading. |
| `title` | `string` | — | Title. |
| `message` | `string` | — | Body message. |
| `confirmText` | `string` | — | Confirm button label. |
| `cancelText` | `string` | — | Cancel button label. |
| `intent` | `string` | `'default'` | Confirm button intent (`'default'`, `'neutral'`, `'danger'`). |

Imperative API:

```js
await confirm({ title, message, intent, confirmText })
// resolves true/false
```

### Drawer

Side drawer overlay.

**Exports:** `Drawer`, `DrawerTrigger`, `DrawerContent` · Escape hatch: `Drawer.origin.{Root, Trigger, Backdrop, Positioner, Content, Title, Description, CloseTrigger}`

| Prop | Type | Default | Description |
|---|---|---|---|
| `open` | `boolean \| (() => boolean)` | — | **Required** controlled open state. |
| `onOpenChange` | `(v) => void` | — | Open/close callback. |
| `onOpen` | `() => void` | — | Fired when opened. |
| `onClose` | `() => void` | — | Fired when closed. |
| `closeOnInteractOutside` | `boolean` | — | Close when clicking outside. |
| `lazyMount` | `boolean` | — | Mount lazily. |
| `zIndex` | `number` | — | Overlay z-index. |
| `title` | `string` | — | Drawer title. |
| `icon` | `node` | — | Optional icon. |
| `description` | `string` | — | Subtitle text. |
| `children` | `node` | — | Drawer body. |

### Toast

**Exports:** `Toast`, `ToastTitle`, `ToastDescription`, `ToastCloseTrigger`, `ToastIcon`, `ToastToaster`, `createToaster` · Escape hatch: `Toast.origin.{Root, Title, Description, CloseTrigger, Toaster}`

Imperative API:

```js
const toaster = createToaster()
<ToastToaster toaster={toaster} />
toaster.create({ title, description, type: 'success' })
```

| Prop | Type | Default | Description |
|---|---|---|---|
| `toaster` | `object` | — | Toaster instance (on `ToastToaster`). |
| `className` | `string` | — | Root class. |

### Popover

**Exports:** `Popover` · Escape hatch: `Popover.origin.{Root, Trigger, Positioner, Content, Arrow, ArrowTip, CloseTrigger, Title, Description}`

| Prop | Type | Default | Description |
|---|---|---|---|
| `lazyMount` | `boolean` | `true` | Mount content lazily. |
| `unmountOnExit` | `boolean` | `true` | Unmount when closed. |
| `closeable` | `boolean` | `false` | Show the close (✕) trigger. |

Passthrough: Ark `Root` props (`open`, `onOpenChange`, `positioning`, …).

### BottomSheet

A free-form presentation layer: a backdrop, an optional drag grabber, and a scrollable content area (`children`). The content is fully consumer-owned — headers, titles, and footers are just regular content.

**Exports:** `BottomSheet` · no `.origin`

**Rendered DOM parts:** exactly three — `data-part="backdrop"`, `data-part="grabber"` (only when `draggable`), and `data-part="content"`. With the default `lazyMount: true` + `unmountOnExit: true`, a closed sheet that was never opened renders **zero** nodes; after close it stays mounted only long enough for the exit transition, then unmounts. BottomSheet has no focus trap or Escape-to-close — use [`Dialog`](#dialog) when those are required.

> **Design decision:** `content` is a pure container — `display: flex; flex-direction: column` only, with **no padding, no margin, and no scrolling**. Spacing and scrolling are entirely consumer-owned: build your own layout inside `children` (the sheet caps height at `70vh`, so a scrollable section can be a `flex: 1; min-height: 0; overflow-y: auto` child).
>
> **Consumer contract:** any scrollable child inside a `BottomSheet` must set `overscroll-behavior: contain` (or `none` if a hard edge is desired). Otherwise, on iOS the rubber-band overscroll at the child's top/bottom chains into the drag-to-dismiss area and shoves the whole sheet.

| Prop | Type | Default | Description |
|---|---|---|---|---|
| `open` | `boolean \| (() => boolean)` | — | **Required** controlled open state. |
| `onOpenChange` | `({ open }) => void` | — | Fired on open/close; sync your state here. |
| `lazyMount` | `boolean` | `true` | Mount only after the first open. A closed sheet that was never opened renders **no** DOM nodes. |
| `unmountOnExit` | `boolean` | `true` | Unmount after close, once the exit transition has played (the close delay is measured from the sheet's computed `transition-duration`, `200ms` fallback). When `false`, the sheet stays mounted and is hidden with CSS. |
| `dismissible` | `boolean` | `true` | Allow dismiss via backdrop / drag. |
| `draggable` | `boolean` | `true` | Show the grabber and enable drag-to-dismiss. |
| `backdropBlur` | `boolean` | `true` | Blur the backdrop. |
| `backdropClassName` | `string` | — | Extra class for the backdrop. |
| `backdropStyle` | `object` | — | Extra style for the backdrop. |
| `contentClassName` | `string` | — | Extra class for the content area. |
| `portal` | `boolean` | `true` | Render the overlay into `<body>`. When `false` the backdrop + sheet render **inline** at the call site. Prefer keeping `true`: inside a Dialog the overlay needs its own full-screen backdrop, and iOS pins `position: fixed` descendants to a touch-scroll container, so an inline sheet inside a Dialog body renders as plain dialog content. `Select` always portals and pauses the parent Dialog's focus trap while its sheet is open. |
| `class` | `string` | — | Extra class for the sheet. |
| `children` | `node` | — | **Required** body content. |

---

## Utilities

### Portal

**Exports:** `Portal` · no `.origin`

Renders children into `document.body` (or a `container` prop if provided).

### Presence

**Exports:** `Presence` · no `.origin`

Applies presence/mount transitions; used internally by overlay components. Pass-through component.

### FocusTrap

**Exports:** `FocusTrap` · no `.origin`

Traps focus within its children; accepts `disabled`, `initialFocus`, `returnFocus` DOM props.

---

