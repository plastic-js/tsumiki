import { css } from '@emotion/css'
import { Switch as ArkSwitch } from '@plastic-js/ark'
import { mergeProps, splitProps } from '@plastic-js/plastic'

const sizeClasses = {
  xs: css({
    '--_sw-track-height': 'var(--tsu-comp-secondary-height-xs)',
    '--_sw-track-width': 'calc(2 * var(--tsu-comp-secondary-height-xs))',
    '--_sw-track-radius': 'calc(var(--tsu-comp-secondary-height-xs) / 2)',
    '--_sw-thumb-size': 'calc(var(--tsu-comp-secondary-height-xs) - 4px)',
    '--_sw-thumb-offset': '2px',
    '--_sw-thumb-travel': 'var(--tsu-comp-secondary-height-xs)',
    '--_sw-gap': 'var(--tsu-spacing-sm)',
    '--_sw-min-height': 'var(--tsu-comp-height-xs)',
    '--_sw-font-size': 'var(--tsu-comp-font-size-xs)',
    '--_sw-line-height': 'var(--tsu-comp-line-height-xs)',
  }),
  sm: css({
    '--_sw-track-height': 'var(--tsu-comp-secondary-height-sm)',
    '--_sw-track-width': 'calc(2 * var(--tsu-comp-secondary-height-sm))',
    '--_sw-track-radius': 'calc(var(--tsu-comp-secondary-height-sm) / 2)',
    '--_sw-thumb-size': 'calc(var(--tsu-comp-secondary-height-sm) - 4px)',
    '--_sw-thumb-offset': '2px',
    '--_sw-thumb-travel': 'var(--tsu-comp-secondary-height-sm)',
    '--_sw-gap': '9px',
    '--_sw-min-height': 'var(--tsu-comp-height-sm)',
    '--_sw-font-size': 'var(--tsu-comp-font-size-sm)',
    '--_sw-line-height': 'var(--tsu-comp-line-height-sm)',
  }),
  md: css({
    '--_sw-track-height': 'var(--tsu-comp-secondary-height-md)',
    '--_sw-track-width': 'calc(2 * var(--tsu-comp-secondary-height-md))',
    '--_sw-track-radius': 'calc(var(--tsu-comp-secondary-height-md) / 2)',
    '--_sw-thumb-size': 'calc(var(--tsu-comp-secondary-height-md) - 4px)',
    '--_sw-thumb-offset': '2px',
    '--_sw-thumb-travel': 'var(--tsu-comp-secondary-height-md)',
    '--_sw-gap': '10px',
    '--_sw-min-height': 'var(--tsu-comp-height-md)',
    '--_sw-font-size': 'var(--tsu-comp-font-size-md)',
    '--_sw-line-height': 'var(--tsu-comp-line-height-md)',
  }),
  lg: css({
    '--_sw-track-height': 'var(--tsu-comp-secondary-height-lg)',
    '--_sw-track-width': 'calc(2 * var(--tsu-comp-secondary-height-lg))',
    '--_sw-track-radius': 'calc(var(--tsu-comp-secondary-height-lg) / 2)',
    '--_sw-thumb-size': 'calc(var(--tsu-comp-secondary-height-lg) - 4px)',
    '--_sw-thumb-offset': '2px',
    '--_sw-thumb-travel': 'var(--tsu-comp-secondary-height-lg)',
    '--_sw-gap': '11px',
    '--_sw-min-height': 'var(--tsu-comp-height-lg)',
    '--_sw-font-size': 'var(--tsu-comp-font-size-lg)',
    '--_sw-line-height': 'var(--tsu-comp-line-height-lg)',
  }),
  xl: css({
    '--_sw-track-height': 'var(--tsu-comp-secondary-height-xl)',
    '--_sw-track-width': 'calc(2 * var(--tsu-comp-secondary-height-xl))',
    '--_sw-track-radius': 'calc(var(--tsu-comp-secondary-height-xl) / 2)',
    '--_sw-thumb-size': 'calc(var(--tsu-comp-secondary-height-xl) - 4px)',
    '--_sw-thumb-offset': '2px',
    '--_sw-thumb-travel': 'var(--tsu-comp-secondary-height-xl)',
    '--_sw-gap': 'var(--tsu-spacing-md)',
    '--_sw-min-height': 'var(--tsu-comp-height-xl)',
    '--_sw-font-size': 'var(--tsu-comp-font-size-xl)',
    '--_sw-line-height': 'var(--tsu-comp-line-height-xl)',
  }),
}

const rootClass = css({
  display: 'inline-flex',
  alignItems: 'center',
  gap: 'var(--_sw-gap, 10px)',
  minHeight: 'var(--_sw-min-height, var(--tsu-comp-height-md))',
  cursor: 'pointer',
  fontFamily: 'inherit',
  userSelect: 'none',
  touchAction: 'manipulation',
  '&[data-disabled]': { cursor: 'not-allowed' },
})

const intentClasses = {
  default: css({
    '--_sw-track-checked': 'var(--tsu-accent-solid-bg)',
  }),
  danger: css({
    '--_sw-track-checked': 'var(--tsu-danger-solid-bg)',
  }),
}

const controlClass = css({
  position: 'relative',
  width: 'var(--_sw-track-width, calc(2 * var(--tsu-comp-secondary-height-md)))',
  height: 'var(--_sw-track-height, var(--tsu-comp-secondary-height-md))',
  flexShrink: 0,
  borderRadius: 'var(--_sw-track-radius, calc(var(--tsu-comp-secondary-height-md) / 2))',
  backgroundColor: 'var(--tsu-border)',
  transition: 'background-color var(--tsu-transition-fast)',
  '&[data-state="checked"]': { backgroundColor: 'var(--_sw-track-checked)' },
  '&[data-disabled]': { backgroundColor: 'var(--tsu-border-strong)' },
  '&[data-disabled][data-state="checked"]': { backgroundColor: 'var(--tsu-border-strong)' },
})

const thumbClass = css({
  position: 'absolute',
  top: 'var(--_sw-thumb-offset, 2px)',
  left: 'var(--_sw-thumb-offset, 2px)',
  width: 'var(--_sw-thumb-size, calc(var(--tsu-comp-secondary-height-md) - 4px))',
  height: 'var(--_sw-thumb-size, calc(var(--tsu-comp-secondary-height-md) - 4px))',
  borderRadius: '50%',
  backgroundColor: 'var(--tsu-bg-panel)',
  boxShadow: 'var(--tsu-shadow-sm)',
  transform: 'translateX(0)',
  transition: 'transform var(--tsu-transition-fast)',
  '&[data-state="checked"]': { transform: 'translateX(var(--_sw-thumb-travel, var(--tsu-comp-secondary-height-md)))' },
  '&[data-disabled]': { backgroundColor: 'var(--tsu-text-subtle)', boxShadow: 'none' },
  '&[data-disabled][data-state="checked"]': { backgroundColor: 'var(--tsu-bg-panel)' },
})

const labelClass = css({
  fontSize: 'var(--_sw-font-size, var(--tsu-comp-font-size-md))',
  lineHeight: 'var(--_sw-line-height, var(--tsu-comp-line-height-md))',
  color: 'var(--tsu-fg)',
  '&[data-disabled]': {
    opacity: 'var(--tsu-disabled-opacity)',
  },
})

const Switch = (props = {})=> {
  const [local, rest] = splitProps(
    mergeProps({ size: 'md', intent: 'default' }, props),
    ['size', 'intent', 'className', 'children'],
  )

  const classNames = [rootClass, sizeClasses[local.size], intentClasses[local.intent], local.className].filter(Boolean).join(' ')

  return (
    <ArkSwitch.Root {...rest} className={classNames}>
      <ArkSwitch.Control className={controlClass}>
        <ArkSwitch.Thumb className={thumbClass} />
      </ArkSwitch.Control>
      {local.children && <ArkSwitch.Label className={labelClass}>{local.children}</ArkSwitch.Label>}
      <ArkSwitch.HiddenInput />
    </ArkSwitch.Root>
  )
}

Switch.origin = {
  Root: ArkSwitch.Root,
  Control: ArkSwitch.Control,
  Thumb: ArkSwitch.Thumb,
  Label: ArkSwitch.Label,
  HiddenInput: ArkSwitch.HiddenInput,
}

export default Switch
export { Switch }
