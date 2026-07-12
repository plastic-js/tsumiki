import { css } from '@emotion/css'
import { ark } from '@plastic-js/ark/factory'
import { mergeProps, splitProps } from '@plastic-js/plastic'
import Spinner from './Spinner.jsx'

const baseClass = css({
  position: 'relative',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  border: '1px solid transparent',
  cursor: 'pointer',
  fontFamily: 'inherit',
  whiteSpace: 'nowrap',
  userSelect: 'none',
  touchAction: 'manipulation',
  transition: 'background-color var(--tsu-transition-fast), border-color var(--tsu-transition-fast), opacity var(--tsu-transition-fast)',
  '&:disabled': {
    opacity: 'var(--tsu-disabled-opacity)',
    cursor: 'not-allowed',
  },
})

const sizeClasses = {
  xs: css({
    height: 'var(--tsu-comp-height-xs)',
    lineHeight: 'var(--tsu-comp-line-height-xs)',
    padding: 'var(--tsu-comp-padding-y-xs) var(--tsu-comp-padding-x-xs)',
    fontSize: 'var(--tsu-comp-font-size-xs)',
    borderRadius: 'var(--tsu-radius-l1-xs)',
  }),
  sm: css({
    height: 'var(--tsu-comp-height-sm)',
    lineHeight: 'var(--tsu-comp-line-height-sm)',
    padding: 'var(--tsu-comp-padding-y-sm) var(--tsu-comp-padding-x-sm)',
    fontSize: 'var(--tsu-comp-font-size-sm)',
    borderRadius: 'var(--tsu-radius-l1-sm)',
  }),
  md: css({
    height: 'var(--tsu-comp-height-md)',
    lineHeight: 'var(--tsu-comp-line-height-md)',
    padding: 'var(--tsu-comp-padding-y-md) var(--tsu-comp-padding-x-md)',
    fontSize: 'var(--tsu-comp-font-size-md)',
    borderRadius: 'var(--tsu-radius-l1-md)',
  }),
  lg: css({
    height: 'var(--tsu-comp-height-lg)',
    lineHeight: 'var(--tsu-comp-line-height-lg)',
    padding: 'var(--tsu-comp-padding-y-lg) var(--tsu-comp-padding-x-lg)',
    fontSize: 'var(--tsu-comp-font-size-lg)',
    borderRadius: 'var(--tsu-radius-l1-lg)',
  }),
  xl: css({
    height: 'var(--tsu-comp-height-xl)',
    lineHeight: 'var(--tsu-comp-line-height-xl)',
    padding: 'var(--tsu-comp-padding-y-xl) var(--tsu-comp-padding-x-xl)',
    fontSize: 'var(--tsu-comp-font-size-xl)',
    borderRadius: 'var(--tsu-radius-l1-xl)',
  }),
};

const variantClasses = {
  solid: css({
    backgroundColor: 'var(--_btn-solid)',
    borderColor: 'var(--_btn-solid)',
    color: 'var(--tsu-bg)',
    '&:active:not(:disabled)': {
      backgroundColor: 'var(--_btn-solid-active)',
      borderColor: 'var(--_btn-solid-active)',
    },
  }),
  outline: css({
    borderColor: 'var(--_btn-border)',
    color: 'var(--tsu-fg)',
    '&:active:not(:disabled)': {
      backgroundColor: 'var(--_btn-tint-bg)',
      borderColor: 'var(--_btn-border-active)',
    },
  }),
};

const intentClasses = {
  default: css({
    '--_btn-solid': 'var(--tsu-accent-solid-bg)',
    '--_btn-solid-active': 'var(--tsu-accent-solid-bg-hover)',
    '--_btn-border': 'var(--tsu-accent-outline-border)',
    '--_btn-border-active': 'var(--tsu-accent-outline-border-hover)',
    '--_btn-tint-bg': 'var(--tsu-accent-outline-bg-active)',
  }),
  neutral: css({
    '--_btn-solid': 'var(--tsu-neutral-solid-bg)',
    '--_btn-solid-active': 'var(--tsu-neutral-solid-bg-hover)',
    '--_btn-border': 'var(--tsu-neutral-outline-border)',
    '--_btn-border-active': 'var(--tsu-neutral-outline-border-hover)',
    '--_btn-tint-bg': 'var(--tsu-neutral-outline-bg-active)',
  }),
  danger: css({
    '--_btn-solid': 'var(--tsu-danger-solid-bg)',
    '--_btn-solid-active': 'var(--tsu-danger-solid-bg-hover)',
    '--_btn-border': 'var(--tsu-danger-outline-border)',
    '--_btn-border-active': 'var(--tsu-danger-outline-border-hover)',
    '--_btn-tint-bg': 'var(--tsu-danger-outline-bg-active)',
  }),
};

const loadingOverlayClass = css({
  position: 'absolute',
  inset: 0,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: 'inherit',
  pointerEvents: 'auto',
})

const loadingMaskClass = css({
  position: 'absolute',
  inset: 0,
  backgroundColor: 'var(--tsu-bg-control)',
  opacity: 0.6,
  borderRadius: 'inherit',
})

const loadingSpinnerClass = css({
  position: 'relative',
  zIndex: 1,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
})

const loadingClass = css({
  pointerEvents: 'none',
})

const read = (v)=> typeof v === 'function' ? v() : v

const Button = (props = {})=> {
  const [local, rest] = splitProps(
    mergeProps({ intent: 'default', variant: 'outline', size: 'md', disabled: false, loading: false }, props),
    ['intent', 'variant', 'size', 'loading', 'disabled', 'className', 'children'],
  )

  return (
    <ark.button
      {...rest}
      disabled={local.disabled}
      aria-disabled={local.loading || local.disabled}
      className={()=> {
        const size = read(local.size)
        const variant = read(local.variant) === 'solid' ? 'solid' : 'outline'
        const loading = read(local.loading)
        let intent = read(local.intent)
        if (intent === 'neutral' && variant === 'solid') intent = 'default'
        return [
          baseClass,
          sizeClasses[size],
          variantClasses[variant],
          intentClasses[intent],
          loading && loadingClass,
          local.className,
        ].filter(Boolean).join(' ')
      }}
    >
      {local.children}
      {()=> {
        if (!read(local.loading)) return null
        const variant = read(local.variant) === 'solid' ? 'solid' : 'outline'
        const size = read(local.size)
        const spinnerSizeMap = { xs: 14, sm: 16, md: 20, lg: 24, xl: 28 }
        return (
          <span className={loadingOverlayClass}>
            <span className={loadingMaskClass} />
            <span className={loadingSpinnerClass}>
              <Spinner size={spinnerSizeMap[size]} strokeWidth={3} color={variant === 'solid' ? 'var(--_btn-solid)' : 'var(--_btn-border)'} />
            </span>
          </span>
        )
      }}
    </ark.button>
  )
}

Button.origin = { Root: ark.button }

export default Button
export { Button }
