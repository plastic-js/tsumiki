# Tsumiki Component Guide

A single reference for `@plastic-js/tsumiki` covering the component inventory & status (Classification) and the canonical component API pattern (API Pattern).

---

## Part 1 — Component Classification

All 53 components are classified along two orthogonal axes.

### Axis 1: Development Lifecycle

Whether the component is ready for production use or still under active development.

| Stage | Definition |
|-------|------------|
| **Completed** | Production-ready; API stable. |
| **In Development** | Still being built; API may change. |

### Axis 2: Architectural Foundation

Whether the component is built on top of a same-named Ark primitive, or implemented independently.

| Foundation | Definition |
|------------|------------|
| **Ark-Backed** | Directly wraps a corresponding `@plastic-js/ark` primitive of the same name. |
| **Custom-Built** | Uses no Ark primitive; implemented with `@plastic-js/plastic`, `@emotion/css`, or the Web platform directly. |

### Component Matrix

#### Completed · Ark-Backed (34)

| Component | Ark Primitive |
|-----------|---------------|
| Avatar | `ArkAvatar` |
| Badge | `ark("span")` via factory |
| Button | `ark("button")` via factory |
| Checkbox | `ArkCheckbox` |
| Collapsible | `ArkCollapsible` |
| ColorPicker | `ArkColorPicker` |
| Dialog | `ArkDialog` |
| Drawer | `ArkDrawer` |
| Field | `ArkField` |
| Fieldset | `ArkFieldset` |
| FileUpload | `ArkFileUpload` |
| FocusTrap | `ArkFocusTrap` |
| Input | `ark("input")` via factory |
| Menu | `ArkMenu` |
| NumberInput | `ArkNumberInput` |
| Pagination | `ArkPagination` |
| Popover | `ArkPopover` |
| Portal | `ArkPortal` |
| Presence | `ArkPresence` |
| Progress | `ArkProgress` |
| RadioGroup | `ArkRadioGroup` |
| RatingGroup | `ArkRatingGroup` |
| SelectPc | `ArkSelect` |
| SignaturePad | `ArkSignaturePad` |
| Slider | `ArkSlider` |
| Splitter | `ArkSplitter` |
| Steps | `ArkSteps` |
| Switch | `ArkSwitch` |
| Tabs | `ArkTabs` |
| Tag | `ark("span")` via factory |
| TagsInput | `ArkTagsInput` |
| Toast | `ArkToast` |
| Toggle | `ArkToggle` |
| ToggleGroup | `ArkToggleGroup` |

#### Completed · Custom-Built (13)

| Component | Built With |
|-----------|------------|
| BottomSheet | `@plastic-js/plastic` + `Portal` |
| CardNumberInput | Composes `Input` |
| Clipboard | Web Clipboard API |
| CloseButton | `@emotion/css` |
| ConfirmDialog | Composes `Dialog` |
| DatePicker | `DateWheel` utility |
| Icon | `@emotion/css` |
| MoneyInput | Composes `Input` |
| SearchInput | Composes `Input` |
| Select | Custom state machine with `Loop` |
| Skeleton | Pure CSS |
| Spinner | Pure CSS |
| SwipeReveal | Touch event gestures |

#### In Development · Ark-Backed (6)

| Component | Ark Primitive |
|-----------|---------------|
| Accordion | `ArkAccordion` |
| Carousel | `ArkCarousel` |
| Combobox | `ArkCombobox` |
| Listbox | `ArkListbox` |
| Tour | `ArkTour` |
| TreeView | `ArkTreeView` |

#### In Development · Custom-Built (0)

*No components currently in this quadrant.*

### Summary

```
                    Ark-Backed          Custom-Built
                  ┌─────────────────┬─────────────────┐
    Completed     │       34        │       13        │  47
                  ├─────────────────┼─────────────────┤
 In Development   │        6        │        0        │   6
                  └─────────────────┴─────────────────┘
                        40                   13          53
```

---

## Part 2 — Component API Pattern

This section defines the canonical component API pattern for `@plastic-js/tsumiki`.

### Design Goals

1. **Simplify Ark APIs** — tsumiki wraps `@plastic-js/ark` components with theme styling, default props, and opinionated presets
2. **Unified consumer experience** — all components follow the same access pattern
3. **Escape hatch** — consumers can always reach the raw Ark component when needed
4. **Controlled-only** — all tsumiki components are controlled; uncontrolled mode (`defaultValue`, `defaultOpen`, `defaultChecked`, etc.) is NOT supported even if the underlying Ark component supports it

### Core Rules

#### Rule 0: Controlled-Only — No Uncontrolled Mode

Tsumiki does not support uncontrolled mode. Every component that manages state (`value`, `open`, `checked`, etc.) must receive it as a controlled signal prop and report changes via a callback. No `defaultValue`, `defaultOpen`, `defaultChecked`, or similar props exist on tsumiki components.

```jsx
// CORRECT: Controlled — consumer owns the state signal
const isOpen = createSignal(false)
<Dialog open={isOpen} onOpenChange={v => isOpen(v.open)} />

// WRONG: Uncontrolled (not supported)
<Dialog defaultOpen />
```

If a consumer wants an initial value, they set it in their own `createSignal()` call. No tsumiki component creates internal state for uncontrolled usage.

**Rationale:**
- State ownership is explicit and predictable
- Components are easier to test and debug
- The entire API follows a uniform `value`/`onValueChange` contract
- While Ark primitives may technically accept `default*` props internally, consumers must not rely on this — tsumiki reserves the right to break uncontrolled usage

#### Rule 1: The default export IS the render component

```jsx
import { Comp as ArkComp } from '@plastic-js/ark'

const Comp = (props = {}) => (
  <ArkComp.Root className={styles} {...rest}>
    {/* tsumiki theme styling */}
  </ArkComp.Root>
)

export default Comp
```

The default export is always a **renderable component**. It wraps Ark's root with:
- CSS-in-JS via `@emotion/css`
- `var(--tsu-*)` design tokens
- `splitProps` / `mergeProps` for prop defaults
- Simplified, opinionated default behavior

#### Rule 2: `.origin` maps to raw Ark components

```js
Comp.origin = {
  Root: ArkComp.Root,
  Label: ArkComp.Label,
  Control: ArkComp.Control,
}
```

- **`.origin`** (lowercase) is the **only** static property on the component
- It maps tsumiki-friendly names to their raw `@plastic-js/ark` counterparts
- Only mount what exists on the Ark component — if Ark has no `Label` sub-part, don't add it
- The `origin` object serves as the **escape hatch** for consumers who need direct access to Ark's full API

#### Rule 3: No other static properties

```js
// ❌ WRONG — do not attach sub-components as direct properties
Comp.Root = Comp
Comp.Trigger = SomeTrigger
Comp.Content = SomeContent

// ❌ WRONG — do not use Object.assign to spread sub-components
const Comp = Object.assign(CompRoot, { Root: CompRoot, Trigger, Content })

// ✅ CORRECT — only .origin
Comp.origin = { Root: ArkComp.Root, Trigger: ArkComp.Trigger, Content: ArkComp.Content }
```

The component function itself carries **nothing** except `.origin`.

#### Rule 4: Components without an Ark counterpart have no `.origin`

```js
// Fully custom component (no Ark import at all)
import { css } from '@emotion/css'

const Spinner = (props = {}) => <div>...</div>

// No .origin — there is no Ark counterpart
export default Spinner
```

#### Rule 5: Sub-components (when needed) are named exports

For components that have meaningful, tsumiki-wrapped sub-components (see [Multi-Part Component Pattern](#multi-part-component-pattern)), sub-components are exported as **named exports** from the module, NOT attached to the default export.

#### Rule 6: Dual export (default + named)

Every component module **must** export both a default and a named export for the top-level component:

```js
export default Comp
export { Comp }
```

This ensures consumers can import using either style:

```js
import Comp from '@plastic-js/tsumiki/components/Comp.jsx'
import { Comp } from '@plastic-js/tsumiki/components/Comp.jsx'
```

When the internal variable name differs from the component name, use an alias:

```js
export default Root
export { Root as FileUpload }
```

### Naming Conventions

| Element | Convention | Example |
|---------|-----------|---------|
| Ark import alias | `Ark` + PascalCase name | `import { Dialog as ArkDialog }` |
| Component function | PascalCase, same as default export name | `const Dialog = (props) => ...` |
| origin keys | PascalCase, matching Ark sub-part names | `{ Root, Trigger, Content }` |
| `.origin` property | lowercase `origin` | `Dialog.origin = { ... }` |
| CSS class variables | `camelCase` + `Class` suffix | `rootClass`, `contentClass` |

### Consumer Usage

#### Simple component (single wrapper)

```jsx
import { Button } from '@plastic-js/tsumiki'

// Primary usage: tsumiki-styled
<Button variant="solid">Click me</Button>

// Escape hatch: raw Ark API
<Button.origin.Root>...</Button.origin.Root>
```

#### Simple component wrapping multiple Ark sub-parts

```jsx
import { Checkbox } from '@plastic-js/tsumiki'

// Primary usage: tsumiki-styled (wraps Root + Control + Indicator + Label + HiddenInput)
<Checkbox>Accept terms</Checkbox>

// Escape hatch: individual raw Ark sub-parts
<Checkbox.origin.Root>
  <Checkbox.origin.Control>
    <Checkbox.origin.Indicator />
  </Checkbox.origin.Control>
</Checkbox.origin.Root>
```

#### Multi-part component (see below)

```jsx
import Menu, { MenuTrigger, MenuContent, MenuItem } from '@plastic-js/tsumiki'

<Menu>
  <MenuTrigger>Open</MenuTrigger>
  <MenuContent>
    <MenuItem>Action</MenuItem>
  </MenuContent>
</Menu>

// Escape hatch
<Menu.origin.Root>
  <Menu.origin.Trigger>...</Menu.origin.Trigger>
  <Menu.origin.Content>...</Menu.origin.Content>
</Menu.origin.Root>
```

### Multi-Part Component Pattern

For components that have meaningful tsumiki-wrapped sub-components (e.g., Menu, Dialog, Accordion), each sub-component is a named export:

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
```

#### Barrel exports for multi-part components

In `src/index.js`, both default and named exports are re-exported:

```js
export {
  default as Menu,
  MenuTrigger,
  MenuContent,
  MenuItem,
  MenuSeparator,
} from './components/Menu.jsx'
```

### File Structure

```
src/components/Comp.jsx
├── imports (@emotion/css, @plastic-js/ark, @plastic-js/plastic)
├── CSS class definitions (rootClass, triggerClass, etc.)
├── Component function (default export)
├── [Named exports for sub-components, if multi-part]
├── .origin assignment
├── export default Comp
└── export { Comp }
```


