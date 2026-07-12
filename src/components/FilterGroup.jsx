import { css } from '@emotion/css'
import { mergeProps, splitProps } from '@plastic-js/plastic'
import Button from './Button.jsx'

// Design note: FilterGroup renders its pills with the Button component
// (not ToggleGroup) to reuse Button's variant/intent styling and the
// neutral/outline/solid state language. Trade-off: we reimplement the
// multi-select toggle logic here (add/remove values) instead of delegating
// to ToggleGroup's selection machinery. ToggleGroup itself still exists for
// consumers who want a plain segmented control.

const access = (v) => (typeof v === 'function' ? v() : v)

const rootClass = css({
  display: 'flex',
  width: '100%',
  alignItems: 'center',
  gap: 'var(--_fg-gap, var(--tsu-spacing-sm))',
})

const stickyClass = css({
  position: 'sticky',
  top: 0,
  zIndex: 'var(--tsu-z-dropdown)',
  backgroundColor: 'var(--tsu-surface)',
})

const pillClass = css({
  borderRadius: 'var(--tsu-radius-round)',
  flexShrink: 0,
})

const selectedItemClass = css({
  backgroundColor: 'var(--tsu-accent-outline-bg-active)',
})

const groupClass = css({
  display: 'flex',
  alignItems: 'center',
  gap: 'var(--_fg-gap, var(--tsu-spacing-sm))',
  flex: '1 1 auto',
  minWidth: 0,
  overflowX: 'auto',
  overflowY: 'hidden',
  scrollbarWidth: 'none',
  '::-webkit-scrollbar': { display: 'none' },
})

const FilterGroup = (props = {})=> {
  const [local, rest] = splitProps(
    mergeProps({ size: 'md', allLabel: 'All', items: [] }, props),
    ['className', 'items', 'value', 'onValueChange', 'allLabel', 'size', 'buttonClass', 'groupClass', 'sticky'],
  )

  const value = () => access(local.value) ?? []

  const allActive = () => value().length === 0

  const sticky = () => access(local.sticky)

  const emit = (val) => {
    local.onValueChange?.(val)
  }

  const handleAllClick = () => {
    if (allActive()) return
    emit([])
  }

  const handleItemClick = (itemValue) => {
    const current = value()
    const next = current.includes(itemValue)
      ? current.filter((v) => v !== itemValue)
      : [...current, itemValue]
    emit(next)
  }

  const buttonClassNames = [pillClass, local.buttonClass].filter(Boolean).join(' ')
  return (
    <div
      {...rest}
      className={() => [rootClass, sticky() && stickyClass, local.className].filter(Boolean).join(' ')}
      style={() => ({
        '--_fg-gap': 'var(--tsu-spacing-sm)',
        ...(typeof sticky() === 'number' ? { top: `${sticky()}px` } : undefined),
      })}
    >
      <Button
        type="button"
        size={local.size}
        variant={allActive() ? 'solid' : 'outline'}
        intent={allActive() ? 'default' : 'neutral'}
        className={buttonClassNames}
        onClick={handleAllClick}
      >
        {local.allLabel}
      </Button>
      <div className={[groupClass, local.groupClass].filter(Boolean).join(' ')}>
        {local.items.map((item) => {
          const selected = value().includes(item.value)
          return (
            <Button
              key={item.value}
              type="button"
              size={local.size}
              intent={selected ? 'default' : 'neutral'}
              disabled={item.disabled}
              className={[selected && selectedItemClass, buttonClassNames].filter(Boolean).join(' ')}
              onClick={() => handleItemClick(item.value)}
            >
              {item.label}
            </Button>
          )
        })}
      </div>
    </div>
  )
}

FilterGroup.origin = {
  Button,
}

export default FilterGroup
export { FilterGroup }
