import { css } from '@emotion/css'
import { ark } from '@plastic-js/ark/factory'
import { mergeProps, splitProps } from '@plastic-js/plastic'

const baseClass = css({
  '--_badge-solid-bg': 'transparent',
  '--_badge-solid-fg': 'transparent',
  '--_badge-surface-bg': 'transparent',
  '--_badge-surface-border': 'transparent',
  '--_badge-surface-fg': 'transparent',
  '--_badge-subtle-bg': 'transparent',
  '--_badge-subtle-fg': 'transparent',
  '--_badge-outline-border': 'transparent',
  '--_badge-outline-fg': 'transparent',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: 'var(--tsu-spacing-xs)',
  border: '1px solid transparent',
  borderRadius: 'var(--tsu-radius-round)',
  fontFamily: 'inherit',
  fontWeight: 'var(--tsu-font-weight-medium)',
  lineHeight: 1,
  fontVariantNumeric: 'tabular-nums',
  whiteSpace: 'nowrap',
  userSelect: 'none',
})

const solidClass = css({
  backgroundColor: 'var(--_badge-solid-bg)',
  color: 'var(--_badge-solid-fg)',
})

const surfaceClass = css({
  backgroundColor: 'var(--_badge-surface-bg)',
  borderColor: 'var(--_badge-surface-border)',
  color: 'var(--_badge-surface-fg)',
})

const subtleClass = css({
  backgroundColor: 'var(--_badge-subtle-bg)',
  color: 'var(--_badge-subtle-fg)',
})

const outlineClass = css({
  borderColor: 'var(--_badge-outline-border)',
  color: 'var(--_badge-outline-fg)',
})

const intentClasses = {
  neutral: css({
    '--_badge-solid-bg': 'var(--tsu-neutral-solid-bg)',
    '--_badge-solid-fg': 'var(--tsu-neutral-solid-fg)',
    '--_badge-surface-bg': 'var(--tsu-neutral-surface-bg)',
    '--_badge-surface-border': 'var(--tsu-neutral-surface-border)',
    '--_badge-surface-fg': 'var(--tsu-neutral-surface-fg)',
    '--_badge-subtle-bg': 'var(--tsu-neutral-subtle-bg)',
    '--_badge-subtle-fg': 'var(--tsu-neutral-subtle-fg)',
    '--_badge-outline-border': 'var(--tsu-neutral-outline-border)',
    '--_badge-outline-fg': 'var(--tsu-neutral-outline-fg)',
  }),
  accent: css({
    '--_badge-solid-bg': 'var(--tsu-accent-solid-bg)',
    '--_badge-solid-fg': 'var(--tsu-accent-solid-fg)',
    '--_badge-surface-bg': 'var(--tsu-accent-surface-bg)',
    '--_badge-surface-border': 'var(--tsu-accent-surface-border)',
    '--_badge-surface-fg': 'var(--tsu-accent-surface-fg)',
    '--_badge-subtle-bg': 'var(--tsu-accent-subtle-bg)',
    '--_badge-subtle-fg': 'var(--tsu-accent-subtle-fg)',
    '--_badge-outline-border': 'var(--tsu-accent-outline-border)',
    '--_badge-outline-fg': 'var(--tsu-accent-outline-fg)',
  }),
  danger: css({
    '--_badge-solid-bg': 'var(--tsu-danger-solid-bg)',
    '--_badge-solid-fg': 'var(--tsu-danger-solid-fg)',
    '--_badge-surface-bg': 'var(--tsu-danger-surface-bg)',
    '--_badge-surface-border': 'var(--tsu-danger-surface-border)',
    '--_badge-surface-fg': 'var(--tsu-danger-surface-fg)',
    '--_badge-subtle-bg': 'var(--tsu-danger-subtle-bg)',
    '--_badge-subtle-fg': 'var(--tsu-danger-subtle-fg)',
    '--_badge-outline-border': 'var(--tsu-danger-outline-border)',
    '--_badge-outline-fg': 'var(--tsu-danger-outline-fg)',
  }),
  success: css({
    '--_badge-solid-bg': 'var(--tsu-success-solid-bg)',
    '--_badge-solid-fg': 'var(--tsu-success-solid-fg)',
    '--_badge-surface-bg': 'var(--tsu-success-surface-bg)',
    '--_badge-surface-border': 'var(--tsu-success-surface-border)',
    '--_badge-surface-fg': 'var(--tsu-success-surface-fg)',
    '--_badge-subtle-bg': 'var(--tsu-success-subtle-bg)',
    '--_badge-subtle-fg': 'var(--tsu-success-subtle-fg)',
    '--_badge-outline-border': 'var(--tsu-success-outline-border)',
    '--_badge-outline-fg': 'var(--tsu-success-outline-fg)',
  }),
  warning: css({
    '--_badge-solid-bg': 'var(--tsu-warning-solid-bg)',
    '--_badge-solid-fg': 'var(--tsu-warning-solid-fg)',
    '--_badge-surface-bg': 'var(--tsu-warning-surface-bg)',
    '--_badge-surface-border': 'var(--tsu-warning-surface-border)',
    '--_badge-surface-fg': 'var(--tsu-warning-surface-fg)',
    '--_badge-subtle-bg': 'var(--tsu-warning-subtle-bg)',
    '--_badge-subtle-fg': 'var(--tsu-warning-subtle-fg)',
    '--_badge-outline-border': 'var(--tsu-warning-outline-border)',
    '--_badge-outline-fg': 'var(--tsu-warning-outline-fg)',
  }),
}

const sizeClasses = {
  xs: css({
    height: 'var(--tsu-comp-secondary-height-xs)',
    minWidth: 'calc(2 * var(--tsu-comp-secondary-height-xs))',
    padding: '0 6px',
    fontSize: 'var(--tsu-comp-font-size-xs)',
  }),
  sm: css({
    height: 'var(--tsu-comp-secondary-height-sm)',
    minWidth: 'calc(2 * var(--tsu-comp-secondary-height-sm))',
    padding: '0 7px',
    fontSize: 'var(--tsu-comp-font-size-xs)',
  }),
  md: css({
    height: 'var(--tsu-comp-secondary-height-md)',
    minWidth: 'calc(2 * var(--tsu-comp-secondary-height-md))',
    padding: '0 8px',
    fontSize: '11px',
  }),
  lg: css({
    height: 'var(--tsu-comp-secondary-height-lg)',
    minWidth: 'calc(2 * var(--tsu-comp-secondary-height-lg))',
    padding: '0 9px',
    fontSize: 'var(--tsu-comp-font-size-sm)',
  }),
  xl: css({
    height: 'var(--tsu-comp-secondary-height-xl)',
    minWidth: 'calc(2 * var(--tsu-comp-secondary-height-xl))',
    padding: '0 10px',
    fontSize: '13px',
  }),
  '2xl': css({
    height: 'var(--tsu-comp-secondary-height-xxl)',
    minWidth: 'calc(2 * var(--tsu-comp-secondary-height-xxl))',
    padding: '0 14px',
    fontSize: 'var(--tsu-comp-font-size-lg)',
  }),
}

const dotClass = css({
  width: '6px',
  height: '6px',
  borderRadius: '50%',
  backgroundColor: 'currentColor',
})

const intentMap = { default: 'neutral', info: 'accent', intent: 'accent' }

const read = (v) => (typeof v === 'function' ? v() : v)

const variantClasses = { solid: solidClass, surface: surfaceClass, subtle: subtleClass, outline: outlineClass }

const Badge = (props = {}) => {
  const [local, rest] = splitProps(
    mergeProps({ variant: 'subtle', intent: 'default', size: 'md', dot: false }, props),
    ['variant', 'intent', 'size', 'dot', 'className', 'children'],
  )

  return (
    <ark.span
      {...rest}
      data-part="root"
      className={() => {
        const variant = read(local.variant)
        const intent = intentMap[read(local.intent)] || read(local.intent)
        const size = read(local.size)
        return [baseClass, variantClasses[variant], intentClasses[intent], sizeClasses[size], local.className].filter(Boolean).join(' ')
      }}
    >
      {() => read(local.dot) && <span data-part="dot" className={dotClass} aria-hidden="true" />}
      {local.children}
    </ark.span>
  )
}

Badge.origin = { Root: ark.span }

export default Badge
export { Badge }
