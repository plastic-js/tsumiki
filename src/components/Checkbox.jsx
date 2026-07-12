import { css } from '@emotion/css'
import { Checkbox as ArkCheckbox } from '@plastic-js/ark'
import { mergeProps, splitProps } from '@plastic-js/plastic'

const sizeClasses = {
  xs: css({
    '--_cb-size': 'var(--tsu-comp-secondary-height-xs)',
    '--_cb-radius': 'var(--tsu-radius-l1-xs)',
    '--_cb-gap': 'var(--tsu-spacing-sm)',
    '--_cb-min-height': 'var(--tsu-comp-height-xs)',
    '--_cb-font-size': 'var(--tsu-comp-font-size-xs)',
    '--_cb-line-height': 'var(--tsu-comp-line-height-xs)',
    '--_cb-icon-size': '10px',
  }),
  sm: css({
    '--_cb-size': 'var(--tsu-comp-secondary-height-sm)',
    '--_cb-radius': 'var(--tsu-radius-l1-sm)',
    '--_cb-gap': '9px',
    '--_cb-min-height': 'var(--tsu-comp-height-sm)',
    '--_cb-font-size': 'var(--tsu-comp-font-size-sm)',
    '--_cb-line-height': 'var(--tsu-comp-line-height-sm)',
    '--_cb-icon-size': '11px',
  }),
  md: css({
    '--_cb-size': 'var(--tsu-comp-secondary-height-md)',
    '--_cb-radius': 'var(--tsu-radius-l1-md)',
    '--_cb-gap': '10px',
    '--_cb-min-height': 'var(--tsu-comp-height-md)',
    '--_cb-font-size': 'var(--tsu-comp-font-size-md)',
    '--_cb-line-height': 'var(--tsu-comp-line-height-md)',
    '--_cb-icon-size': '12px',
  }),
  lg: css({
    '--_cb-size': 'var(--tsu-comp-secondary-height-lg)',
    '--_cb-radius': 'var(--tsu-radius-l1-lg)',
    '--_cb-gap': '11px',
    '--_cb-min-height': 'var(--tsu-comp-height-lg)',
    '--_cb-font-size': 'var(--tsu-comp-font-size-lg)',
    '--_cb-line-height': 'var(--tsu-comp-line-height-lg)',
    '--_cb-icon-size': '13px',
  }),
  xl: css({
    '--_cb-size': 'var(--tsu-comp-secondary-height-xl)',
    '--_cb-radius': 'var(--tsu-radius-l1-xl)',
    '--_cb-gap': 'var(--tsu-spacing-md)',
    '--_cb-min-height': 'var(--tsu-comp-height-xl)',
    '--_cb-font-size': 'var(--tsu-comp-font-size-xl)',
    '--_cb-line-height': 'var(--tsu-comp-line-height-xl)',
    '--_cb-icon-size': '14px',
  }),
}

const rootClass = css({
  display: 'inline-flex',
  alignItems: 'center',
  gap: 'var(--_cb-gap, 10px)',
  minHeight: 'var(--_cb-min-height, var(--tsu-comp-height-md))',
  cursor: 'pointer',
  fontFamily: 'inherit',
  userSelect: 'none',
  touchAction: 'manipulation',
  scrollMargin: 0,
  '&[data-disabled]': { cursor: 'not-allowed' },
})

const controlClass = css({
  width: 'var(--_cb-size, var(--tsu-comp-secondary-height-md))',
  height: 'var(--_cb-size, var(--tsu-comp-secondary-height-md))',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexShrink: 0,
  borderRadius: 'var(--_cb-radius, var(--tsu-radius-l1-md))',
  border: '1px solid var(--tsu-accent-outline-border)',
  backgroundColor: 'var(--tsu-bg-panel)',
  color: 'transparent',
  transition: 'background-color var(--tsu-transition-fast), border-color var(--tsu-transition-fast), color var(--tsu-transition-fast), transform var(--tsu-transition-fast)',
  '&[data-state="checked"], &[data-state="indeterminate"]': {
    backgroundColor: 'var(--tsu-accent-solid-bg)',
    borderColor: 'var(--tsu-accent-solid-bg)',
    color: 'var(--tsu-accent-solid-fg)',
  },
  '&[data-disabled]': {
    opacity: 'var(--tsu-disabled-opacity)',
  },
  '&:active:not([data-disabled])': { transform: 'scale(0.88)' },
})

const errorClass = css({
  borderColor: 'var(--tsu-danger-outline-border)',
  '&[data-state="checked"], &[data-state="indeterminate"]': {
    backgroundColor: 'var(--tsu-danger-solid-bg)',
    borderColor: 'var(--tsu-danger-solid-bg)',
  },
})

const indicatorClass = css({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
    fontSize: 'var(--_cb-icon-size, 12px)',
  color: 'inherit',
  '& svg': { width: '1em', height: '1em', display: 'block' },
})

const labelClass = css({
  fontSize: 'var(--_cb-font-size, var(--tsu-comp-font-size-md))',
  lineHeight: 'var(--_cb-line-height, var(--tsu-comp-line-height-md))',
  color: 'var(--tsu-fg)',
})

const errorLabelClass = css({
  color: 'var(--tsu-danger-plain-fg)',
})

const roundedClass = css({
  '--_cb-radius': 'var(--tsu-radius-round)',
})

const read = (v)=> typeof v === 'function' ? v() : v

const Checkbox = (props = {})=> {
  const [local, rest] = splitProps(
    mergeProps({ size: 'md', rounded: true, invalid: false }, props),
    ['size', 'rounded', 'invalid', 'className', 'children'],
  )

  const invalid = read(local.invalid)

  return (
    <ArkCheckbox.Root {...rest} className={()=> [
      rootClass,
      sizeClasses[read(local.size)],
      read(local.rounded) && roundedClass,
      local.className,
    ].filter(Boolean).join(' ')}>
      <ArkCheckbox.Control className={() => [controlClass, invalid && errorClass].filter(Boolean).join(' ')}>
        <ArkCheckbox.Indicator className={indicatorClass}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M20 6 9 17l-5-5" />
          </svg>
        </ArkCheckbox.Indicator>
      </ArkCheckbox.Control>
      {local.children && <ArkCheckbox.Label className={() => [labelClass, 'check-label', invalid && errorLabelClass].filter(Boolean).join(' ')}>{local.children}</ArkCheckbox.Label>}
      <ArkCheckbox.HiddenInput />
    </ArkCheckbox.Root>
  )
}

Checkbox.origin = {
  Root: ArkCheckbox.Root,
  Label: ArkCheckbox.Label,
  Control: ArkCheckbox.Control,
  Indicator: ArkCheckbox.Indicator,
  HiddenInput: ArkCheckbox.HiddenInput,
  Group: ArkCheckbox.Group,
}

export default Checkbox
export { Checkbox }
