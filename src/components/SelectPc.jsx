import { css } from '@emotion/css'
import { Select as ArkSelect } from '@plastic-js/ark'
import { mergeProps, splitProps } from '@plastic-js/plastic'
import * as select from '@zag-js/select'
import Portal from './Portal.jsx'

const read = (v)=> typeof v === 'function' ? v() : v

const triggerBaseClass = css({
  display: 'flex',
  alignItems: 'center',
  gap: 'var(--tsu-spacing-sm)',
  width: '100%',
  borderRadius: 'var(--_trigger-radius, var(--tsu-radius-l1-md))',
  fontFamily: 'inherit',
  appearance: 'none',
  touchAction: 'manipulation',
  transition: 'background-color var(--tsu-transition-fast), border-color var(--tsu-transition-fast)',
  cursor: 'pointer',
  textAlign: 'start',
  color: 'var(--tsu-fg)',
  '&[data-placeholder-shown]': { color: 'var(--tsu-text-secondary)' },
})

const sizeClasses = {
  xs: css({
    height: 'var(--tsu-comp-height-xs)',
    padding: 'var(--tsu-comp-padding-y-xs) var(--tsu-comp-padding-x-xs)',
    fontSize: 'var(--tsu-comp-font-size-xs)',
    '--_trigger-radius': 'var(--tsu-radius-l1-xs)',
  }),
  sm: css({
    height: 'var(--tsu-comp-height-sm)',
    padding: 'var(--tsu-comp-padding-y-sm) var(--tsu-comp-padding-x-sm)',
    fontSize: 'var(--tsu-comp-font-size-sm)',
    '--_trigger-radius': 'var(--tsu-radius-l1-sm)',
  }),
  md: css({
    height: 'var(--tsu-comp-height-md)',
    padding: 'var(--tsu-comp-padding-y-md) var(--tsu-comp-padding-x-md)',
    fontSize: 'var(--tsu-comp-font-size-md)',
    '--_trigger-radius': 'var(--tsu-radius-l1-md)',
  }),
  lg: css({
    height: 'var(--tsu-comp-height-lg)',
    padding: 'var(--tsu-comp-padding-y-lg) var(--tsu-comp-padding-x-lg)',
    fontSize: 'var(--tsu-comp-font-size-lg)',
    '--_trigger-radius': 'var(--tsu-radius-l1-lg)',
  }),
  xl: css({
    height: 'var(--tsu-comp-height-xl)',
    padding: 'var(--tsu-comp-padding-y-xl) var(--tsu-comp-padding-x-xl)',
    fontSize: 'var(--tsu-comp-font-size-xl)',
    '--_trigger-radius': 'var(--tsu-radius-l1-xl)',
  }),
}

const variantClasses = {
  solid: css({
    backgroundColor: 'var(--tsu-bg-control)',
    border: '1px solid transparent',
    '&:hover:not(:disabled)': { backgroundColor: 'var(--tsu-bg-control-hover)' },
    '&:active:not(:disabled)': { backgroundColor: 'var(--tsu-pressed)', borderColor: 'var(--tsu-accent-solid-bg)' },
    '&:focus-visible': { backgroundColor: 'var(--tsu-focus-bg)', borderColor: 'var(--tsu-focus-border)' },
  }),
  outline: css({
    border: '1px solid var(--_sel-border)',
    '&:active:not(:disabled)': { backgroundColor: 'var(--tsu-pressed-accent)', borderColor: 'var(--tsu-accent-solid-bg)' },
    '&:focus-visible': { backgroundColor: 'var(--tsu-focus-bg)', borderColor: 'var(--tsu-focus-border)' },
  }),
}

const intentClasses = {
  default: css({
    '--_sel-border': 'var(--tsu-accent-outline-border)',
  }),
  neutral: css({
    '--_sel-border': 'var(--tsu-neutral-outline-border)',
  }),
}

const errorClass = css({
  borderColor: 'var(--tsu-danger-outline-border) !important',
  '&:focus-visible': { borderColor: 'var(--tsu-danger-outline-border) !important' },
})

const disabledClass = css({
  opacity: 'var(--tsu-disabled-opacity)',
  cursor: 'not-allowed',
})

const indicatorClass = css({
  marginInlineStart: 'auto',
  display: 'flex',
  alignItems: 'center',
  transition: 'transform var(--tsu-transition-fast)',
  color: 'var(--tsu-text-secondary)',
  '&[data-state="open"]': { transform: 'rotate(180deg)' },
})

const positionerClass = css({
  zIndex: 'var(--tsu-z-dropdown)',
})

const contentBaseClass = css({
  backgroundColor: 'var(--tsu-bg-panel)',
  border: '1px solid var(--tsu-border)',
  borderRadius: 'var(--tsu-radius-l2-md)',
  boxShadow: 'var(--tsu-shadow-lg)',
  overflow: 'hidden',
})

const itemClass = css({
  display: 'flex',
  alignItems: 'center',
  padding: 'var(--_item-padding-y) var(--_item-padding-x)',
  fontSize: 'var(--_item-font-size)',
  fontFamily: 'inherit',
  lineHeight: 1.5,
  cursor: 'pointer',
  color: 'var(--tsu-fg)',
  minHeight: 'var(--_item-min-height)',
  '&:active': { backgroundColor: 'var(--tsu-pressed)' },
  '&[data-highlighted]': { backgroundColor: 'var(--tsu-pressed-accent)', color: 'var(--tsu-accent-subtle-fg)' },
  '&[data-disabled]': {
    opacity: 'var(--tsu-disabled-opacity)',
    pointerEvents: 'none',
  },
})

const sizeItemVars = {
  xs: {
    '--_item-font-size': 'var(--tsu-comp-font-size-xs)',
    '--_item-padding-y': 'var(--tsu-comp-padding-y-xs)',
    '--_item-padding-x': 'var(--tsu-comp-padding-x-xs)',
    '--_item-min-height': 'var(--tsu-comp-height-xs)',
  },
  sm: {
    '--_item-font-size': 'var(--tsu-comp-font-size-sm)',
    '--_item-padding-y': 'var(--tsu-comp-padding-y-sm)',
    '--_item-padding-x': 'var(--tsu-comp-padding-x-sm)',
    '--_item-min-height': 'var(--tsu-comp-height-sm)',
  },
  md: {
    '--_item-font-size': 'var(--tsu-comp-font-size-md)',
    '--_item-padding-y': 'var(--tsu-comp-padding-y-md)',
    '--_item-padding-x': 'var(--tsu-comp-padding-x-md)',
    '--_item-min-height': 'var(--tsu-comp-height-md)',
  },
  lg: {
    '--_item-font-size': 'var(--tsu-comp-font-size-lg)',
    '--_item-padding-y': 'var(--tsu-comp-padding-y-lg)',
    '--_item-padding-x': 'var(--tsu-comp-padding-x-lg)',
    '--_item-min-height': 'var(--tsu-comp-height-lg)',
  },
  xl: {
    '--_item-font-size': 'var(--tsu-comp-font-size-xl)',
    '--_item-padding-y': 'var(--tsu-comp-padding-y-xl)',
    '--_item-padding-x': 'var(--tsu-comp-padding-x-xl)',
    '--_item-min-height': 'var(--tsu-comp-height-xl)',
  },
}

const SelectItem = (props = {})=> {
  const [local, rest] = splitProps(props, ['className'])
  return <ArkSelect.Item {...rest} className={[itemClass, local.className].filter(Boolean).join(' ')} />
}

const SelectPc = (props = {})=> {
  const [local, rest] = splitProps(
    mergeProps({ variant: 'outline', intent: 'default', size: 'md', disabled: false, invalid: false, positioning: { sameWidth: true } }, props),
    ['variant', 'intent', 'size', 'disabled', 'invalid', 'className', 'placeholder', 'children', 'items', 'itemToValue', 'itemToString'],
  )

  const collection = select.collection({
    items: local.items ?? [],
    itemToValue: local.itemToValue ?? (item => String(item?.value ?? item?.id ?? item)),
    itemToString: local.itemToString ?? (item => String(item?.label ?? item?.name ?? item)),
  })

  const triggerClassName = ()=> {
    const variant = read(local.variant) === 'solid' ? 'solid' : 'outline'
    let intent = read(local.intent)
    if (intent === 'neutral' && variant === 'solid') intent = 'default'
    return [
      triggerBaseClass,
      sizeClasses[read(local.size)],
      variant === 'solid' ? variantClasses.solid : variantClasses.outline,
      intentClasses[intent] ?? intentClasses.default,
      read(local.invalid) && errorClass,
      read(local.disabled) && disabledClass,
      read(local.className),
    ].filter(Boolean).join(' ')
  }

  return (
    <ArkSelect.Root disabled={()=> read(local.disabled)} collection={collection} {...rest}>
      <ArkSelect.Trigger className={triggerClassName}>
        <ArkSelect.ValueText placeholder={local.placeholder} />
        <ArkSelect.Indicator className={indicatorClass}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="1em" height="1em">
            <path d="M6 9l6 6 6-6" />
          </svg>
        </ArkSelect.Indicator>
      </ArkSelect.Trigger>
      <Portal>
        <ArkSelect.Positioner className={positionerClass}>
          <ArkSelect.Content className={contentBaseClass} style={()=> sizeItemVars[read(local.size)]}>
            <ArkSelect.List>
              {local.children}
            </ArkSelect.List>
          </ArkSelect.Content>
        </ArkSelect.Positioner>
      </Portal>
      <ArkSelect.HiddenSelect />
    </ArkSelect.Root>
  )
}

SelectPc.origin = {
  Root: ArkSelect.Root,
  Trigger: ArkSelect.Trigger,
  Indicator: ArkSelect.Indicator,
  Positioner: ArkSelect.Positioner,
  Content: ArkSelect.Content,
  List: ArkSelect.List,
  Item: SelectItem,
  ItemText: ArkSelect.ItemText,
  ValueText: ArkSelect.ValueText,
  HiddenSelect: ArkSelect.HiddenSelect,
}

export default SelectPc
export { SelectPc, SelectItem }
