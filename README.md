# @plastic-js/tsumiki

A UI component library for Plastic JS.

## Installation

```bash
npm install @plastic-js/tsumiki
```

## Usage

```js
import { Dialog, Combobox, Tooltip, SelectMobile, FilterableSelectMobile } from '@plastic-js/tsumiki'
```

## Components

### SelectMobile

A mobile-optimized bottom-sheet select built with a compound parts pattern. Renders a trigger button and a draggable sheet overlay — ideal for touch interfaces.

```jsx
import { createSignal } from '@plastic-js/plastic'
import { SelectMobile } from '@plastic-js/tsumiki'

function Example(){
  const value = createSignal(null)
  const items = [
    { value: 'tpe', label: 'Taipei' },
    { value: 'kxg', label: 'Kaohsiung' },
  ]

  return (
    <SelectMobile.Root
      value={value}
      onValueChange={v => value(v)}
      items={items}
    >
      <SelectMobile.Trigger placeholder='Choose a city' />
      <SelectMobile.Content />
    </SelectMobile.Root>
  )
}
```

**SelectMobile.Root props:**

| Prop | Type | Default | Description |
|---|---|---|---|
| `value` | `string \| (() => string)` | `''` | Current selected value |
| `onValueChange` | `(value: string) => void` | — | Called when an item is selected |
| `items` | `array \| (() => array)` | `[]` | Data array |
| `itemToValue` | `(item) => string` | `item.value` | Extract value from an item |
| `itemToLabel` | `(item) => node` | `item.label` | Extract label from an item |
| `open` | `(() => boolean)` | — | Controlled open state (getter) |
| `defaultOpen` | `boolean` | `false` | Initial open state (uncontrolled) |
| `onOpenChange` | `(isOpen: boolean) => void` | — | Called when open state changes |

**SelectMobile.Trigger props:**

| Prop | Type | Default | Description |
|---|---|---|---|
| `placeholder` | `string` | `'Select'` | Placeholder text when no item is selected |
| `className` | `string` | — | CSS class for the trigger button |
| `children` | `node` | — | Custom trigger content (replaces default label + chevron) |

**SelectMobile.Content props:**

| Prop | Type | Default | Description |
|---|---|---|---|
| `clearable` | `boolean` | `false` | Show a "clear selection" row at the top |
| `clearLabel` | `string` | `'None'` | Label for the clear row |
| `className` | `string` | — | CSS class for the sheet panel |
| `backdropClassName` | `string` | — | CSS class for the backdrop overlay |
| `backdropStyle` | `object` | — | Inline style for the backdrop overlay |

**SelectMobile.Item props:**

| Prop | Type | Default | Description |
|---|---|---|---|
| `item` | `any` | — | Item from the `items` array (resolves value/label automatically) |
| `value` | `string` | — | Explicit value (use when children are custom) |
| `className` | `string` | — | CSS class for the item button |
| `children` | `node` | — | Custom item content |

---

### FilterableSelectMobile

A mobile bottom-sheet select with a filter input at the top of the list. Wraps `SelectMobile` internally and exposes a flat single-component API.

```jsx
import { createSignal } from '@plastic-js/plastic'
import { FilterableSelectMobile } from '@plastic-js/tsumiki'

function Example(){
  const value = createSignal(null)
  const cities = [
    { value: 'tpe', label: 'Taipei' },
    { value: 'kxg', label: 'Kaohsiung' },
  ]

  return (
    <FilterableSelectMobile
      items={cities}
      itemToValue={item => item.value}
      itemToLabel={item => item.label}
      value={value}
      onValueChange={v => value(v)}
      placeholder='Search city…'
    />
  )
}
```

**Props:**

| Prop | Type | Default | Description |
|---|---|---|---|
| `items` | `array \| (() => array)` | `[]` | Data array |
| `value` | `string \| (() => string)` | `''` | Current selected value |
| `onValueChange` | `(value: string) => void` | — | Called when an item is selected |
| `itemToValue` | `(item) => string` | `item.value ?? item` | Extract value from an item |
| `itemToLabel` | `(item) => string` | `item.label ?? String(item)` | Extract label from an item |
| `placeholder` | `string` | `'Select'` | Placeholder text on the trigger |
| `filter` | `(item, query, itemToLabel) => boolean` | substring match | Custom filter function |
| `clearable` | `boolean` | `false` | Show a "clear" row at the top |
| `clearLabel` | `string` | `'None'` | Label for the clear row |
| `backdropClassName` | `string` | — | CSS class for the backdrop overlay |
| `backdropStyle` | `object` | — | Inline style for the backdrop overlay |

The filter input is auto-focused when the sheet opens and cleared when it closes.

## License

MIT
