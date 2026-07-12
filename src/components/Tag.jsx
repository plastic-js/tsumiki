import { css } from '@emotion/css'
import { ark } from '@plastic-js/ark/factory'
import { mergeProps, splitProps } from '@plastic-js/plastic'

const baseClass = css({
  '--_tag-solid-bg': 'transparent',
  '--_tag-solid-fg': 'transparent',
  '--_tag-surface-bg': 'transparent',
  '--_tag-surface-border': 'transparent',
  '--_tag-surface-fg': 'transparent',
  '--_tag-subtle-bg': 'transparent',
  '--_tag-subtle-fg': 'transparent',
  '--_tag-outline-border': 'transparent',
  '--_tag-outline-fg': 'transparent',
  display: 'inline-flex',
  alignItems: 'center',
  gap: 'var(--tsu-spacing-xs)',
  border: '1px solid transparent',
  whiteSpace: 'nowrap',
  userSelect: 'none',
  borderRadius: 'var(--tsu-radius-round)',
  fontFamily: 'inherit',
  lineHeight: 1,
  transition: 'background-color var(--tsu-transition-fast), color var(--tsu-transition-fast), border-color var(--tsu-transition-fast)',
})

const solidClass = css({
  backgroundColor: 'var(--_tag-solid-bg)',
  color: 'var(--_tag-solid-fg)',
})

const surfaceClass = css({
  backgroundColor: 'var(--_tag-surface-bg)',
  borderColor: 'var(--_tag-surface-border)',
  color: 'var(--_tag-surface-fg)',
})

const subtleClass = css({
  backgroundColor: 'var(--_tag-subtle-bg)',
  color: 'var(--_tag-subtle-fg)',
})

const outlineClass = css({
  borderColor: 'var(--_tag-outline-border)',
  color: 'var(--_tag-outline-fg)',
})

const intentClasses = {
  neutral: css({
    '--_tag-solid-bg': 'var(--tsu-neutral-solid-bg)',
    '--_tag-solid-fg': 'var(--tsu-neutral-solid-fg)',
    '--_tag-surface-bg': 'var(--tsu-neutral-surface-bg)',
    '--_tag-surface-border': 'var(--tsu-neutral-surface-border)',
    '--_tag-surface-fg': 'var(--tsu-neutral-surface-fg)',
    '--_tag-subtle-bg': 'var(--tsu-neutral-subtle-bg)',
    '--_tag-subtle-fg': 'var(--tsu-neutral-subtle-fg)',
    '--_tag-outline-border': 'var(--tsu-neutral-outline-border)',
    '--_tag-outline-fg': 'var(--tsu-neutral-outline-fg)',
  }),
  success: css({
    '--_tag-solid-bg': 'var(--tsu-success-solid-bg)',
    '--_tag-solid-fg': 'var(--tsu-success-solid-fg)',
    '--_tag-surface-bg': 'var(--tsu-success-surface-bg)',
    '--_tag-surface-border': 'var(--tsu-success-surface-border)',
    '--_tag-surface-fg': 'var(--tsu-success-surface-fg)',
    '--_tag-subtle-bg': 'var(--tsu-success-subtle-bg)',
    '--_tag-subtle-fg': 'var(--tsu-success-subtle-fg)',
    '--_tag-outline-border': 'var(--tsu-success-outline-border)',
    '--_tag-outline-fg': 'var(--tsu-success-outline-fg)',
  }),
  warning: css({
    '--_tag-solid-bg': 'var(--tsu-warning-solid-bg)',
    '--_tag-solid-fg': 'var(--tsu-warning-solid-fg)',
    '--_tag-surface-bg': 'var(--tsu-warning-surface-bg)',
    '--_tag-surface-border': 'var(--tsu-warning-surface-border)',
    '--_tag-surface-fg': 'var(--tsu-warning-surface-fg)',
    '--_tag-subtle-bg': 'var(--tsu-warning-subtle-bg)',
    '--_tag-subtle-fg': 'var(--tsu-warning-subtle-fg)',
    '--_tag-outline-border': 'var(--tsu-warning-outline-border)',
    '--_tag-outline-fg': 'var(--tsu-warning-outline-fg)',
  }),
  danger: css({
    '--_tag-solid-bg': 'var(--tsu-danger-solid-bg)',
    '--_tag-solid-fg': 'var(--tsu-danger-solid-fg)',
    '--_tag-surface-bg': 'var(--tsu-danger-surface-bg)',
    '--_tag-surface-border': 'var(--tsu-danger-surface-border)',
    '--_tag-surface-fg': 'var(--tsu-danger-surface-fg)',
    '--_tag-subtle-bg': 'var(--tsu-danger-subtle-bg)',
    '--_tag-subtle-fg': 'var(--tsu-danger-subtle-fg)',
    '--_tag-outline-border': 'var(--tsu-danger-outline-border)',
    '--_tag-outline-fg': 'var(--tsu-danger-outline-fg)',
  }),
  accent: css({
    '--_tag-solid-bg': 'var(--tsu-accent-solid-bg)',
    '--_tag-solid-fg': 'var(--tsu-accent-solid-fg)',
    '--_tag-surface-bg': 'var(--tsu-accent-surface-bg)',
    '--_tag-surface-border': 'var(--tsu-accent-surface-border)',
    '--_tag-surface-fg': 'var(--tsu-accent-surface-fg)',
    '--_tag-subtle-bg': 'var(--tsu-accent-subtle-bg)',
    '--_tag-subtle-fg': 'var(--tsu-accent-subtle-fg)',
    '--_tag-outline-border': 'var(--tsu-accent-outline-border)',
    '--_tag-outline-fg': 'var(--tsu-accent-outline-fg)',
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
    padding: '0 8px',
    fontSize: '11px',
  }),
  md: css({
    height: 'var(--tsu-comp-secondary-height-md)',
    minWidth: 'calc(2 * var(--tsu-comp-secondary-height-md))',
    padding: '0 10px',
    fontSize: 'var(--tsu-comp-font-size-sm)',
  }),
  lg: css({
    height: 'var(--tsu-comp-secondary-height-lg)',
    minWidth: 'calc(2 * var(--tsu-comp-secondary-height-lg))',
    padding: '0 12px',
    fontSize: '13px',
  }),
  xl: css({
    height: 'var(--tsu-comp-secondary-height-xl)',
    minWidth: 'calc(2 * var(--tsu-comp-secondary-height-xl))',
    padding: '0 14px',
    fontSize: 'var(--tsu-comp-font-size-md)',
  }),
  '2xl': css({
    height: 'var(--tsu-comp-secondary-height-xxl)',
    minWidth: 'calc(2 * var(--tsu-comp-secondary-height-xxl))',
    padding: '0 18px',
    fontSize: 'var(--tsu-comp-font-size-lg)',
  }),
}

const closeClass = css({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: 0,
  margin: 0,
  marginRight: '-2px',
  border: 'none',
  background: 'none',
  color: 'inherit',
  cursor: 'pointer',
  borderRadius: 'var(--tsu-radius-round)',
  opacity: 0.6,
  transition: 'opacity var(--tsu-transition-fast)',
  '& svg': { display: 'block', flexShrink: 0 },
  '@media (hover: hover)': {
    '&:hover': { opacity: 1 },
  },
  '&:active': { opacity: 1 },
})

const intentMap = { default: 'neutral', info: 'accent' }

const read = (v) => (typeof v === 'function' ? v() : v)

const variantClasses = { solid: solidClass, surface: surfaceClass, subtle: subtleClass, outline: outlineClass }

const Tag = (props = {})=> {
  const [local, rest] = splitProps(
    mergeProps({ variant: 'subtle', intent: 'default', size: 'sm', closable: false }, props),
    ['variant', 'intent', 'size', 'closable', 'onClose', 'className', 'children'],
  )

  return (
    <ark.span
      {...rest}
      data-part="root"
      className={()=> {
        const variant = read(local.variant)
        const intent = intentMap[read(local.intent)] || read(local.intent)
        const size = read(local.size)
        return [baseClass, variantClasses[variant], intentClasses[intent], sizeClasses[size], local.className].filter(Boolean).join(' ')
      }}
    >
      {local.children}
      {()=> read(local.closable) && (
        <button
          type="button"
          data-part="close"
          className={closeClass}
          aria-label="Close"
          onClick={(e)=> { e.stopPropagation(); local.onClose?.() }}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" width="10" height="10" aria-hidden="true"><path d="M18 6 6 18M6 6l12 12" /></svg>
        </button>
      )}
    </ark.span>
  )
}

Tag.origin = { Root: ark.span }

export default Tag
export { Tag }
