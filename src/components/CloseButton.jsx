import { css } from '@emotion/css'
import { mergeProps, splitProps } from '@plastic-js/plastic'

function XIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M18 6 6 18M6 6l12 12" />
    </svg>
  )
}

const baseClass = css({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: 0,
  border: 'none',
  borderRadius: '50%',
  background: 'transparent',
  color: 'var(--tsu-text-secondary)',
  cursor: 'pointer',
  fontFamily: 'inherit',
  touchAction: 'manipulation',
  transition: 'background-color var(--tsu-transition-fast), color var(--tsu-transition-fast)',
  '&:active:not([disabled])': { color: 'var(--tsu-fg)', backgroundColor: 'var(--tsu-pressed-accent)' },
  '&:focus-visible': { color: 'var(--tsu-fg)', backgroundColor: 'var(--tsu-pressed-accent)', outline: '2px solid var(--tsu-focus-border)', outlineOffset: '2px' },
  '&[disabled]': {
    opacity: 'var(--tsu-disabled-opacity)',
    cursor: 'not-allowed',
  },
  '& svg': { display: 'block', flexShrink: 0 },
})

const sizeClasses = {
  xs: css({ width: '20px', height: '20px', '& svg': { width: '12px', height: '12px' } }),
  sm: css({ width: '24px', height: '24px', '& svg': { width: '14px', height: '14px' } }),
  md: css({ width: '32px', height: '32px', '& svg': { width: '16px', height: '16px' } }),
  lg: css({ width: '40px', height: '40px', '& svg': { width: '18px', height: '18px' } }),
}

const CloseButton = (props = {})=> {
  const [local, rest] = splitProps(
    mergeProps({ size: 'md', 'aria-label': 'Close' }, props),
    ['className', 'size', 'children'],
  )
  return (
    <button {...rest} type="button" className={[baseClass, sizeClasses[typeof local.size === 'function' ? local.size() : local.size], local.className].filter(Boolean).join(' ')}>
      {local.children || <XIcon />}
    </button>
  )
}

export default CloseButton
export { CloseButton }
