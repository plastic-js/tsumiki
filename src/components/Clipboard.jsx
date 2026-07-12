import { css, keyframes } from '@emotion/css'
import { mergeProps, splitProps } from '@plastic-js/plastic'
import { createSignal, onCleanup } from '@plastic-js/plastic'

const popAnim = keyframes({
  '0%': { transform: 'scale(0.4)', opacity: 0 },
  '50%': { transform: 'scale(1.15)' },
  '100%': { transform: 'scale(1)', opacity: 1 },
})

const baseClass = css({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '6px',
  border: 'none',
  borderRadius: 'var(--_cb-radius, var(--tsu-radius-l1-md))',
  fontFamily: 'inherit',
  cursor: 'pointer',
  color: 'var(--tsu-text-subtle)',
  backgroundColor: 'transparent',
  userSelect: 'none',
  touchAction: 'manipulation',
  transition: 'background-color var(--tsu-transition-fast), color var(--tsu-transition-fast)',
  '&:focus-visible': { color: 'var(--tsu-fg)', outline: '2px solid var(--tsu-focus-border)', outlineOffset: '2px' },
})

const sizeClasses = {
  xs: css({ height: '28px', minWidth: '28px', padding: '0 6px', fontSize: '14px', '--_cb-radius': 'var(--tsu-radius-l1-xs)' }),
  sm: css({ height: 'var(--tsu-comp-height-xs)', minWidth: '32px', padding: '0 8px', fontSize: '16px', '--_cb-radius': 'var(--tsu-radius-l1-sm)' }),
  md: css({ height: 'var(--tsu-comp-height-sm)', minWidth: '36px', padding: '0 8px', fontSize: '18px', '--_cb-radius': 'var(--tsu-radius-l1-md)' }),
  lg: css({ height: 'var(--tsu-comp-height-md)', minWidth: '40px', padding: '0 10px', fontSize: '20px', '--_cb-radius': 'var(--tsu-radius-l1-lg)' }),
  xl: css({ height: 'var(--tsu-comp-height-lg)', minWidth: '44px', padding: '0 12px', fontSize: '22px', '--_cb-radius': 'var(--tsu-radius-l1-xl)' }),
}

const copiedClass = css({
  color: 'var(--tsu-success-solid-bg)',
})

const iconClass = css({
  flexShrink: 0,
  '& svg': { width: '1em', height: '1em', display: 'block' },
})

const iconCopiedClass = css({
  animation: `${popAnim} var(--tsu-transition-normal)`,
})

const Clipboard = (props = {})=> {
  const [local, rest] = splitProps(
    mergeProps({ size: 'md', copiedDuration: 2000 }, props),
    ['value', 'size', 'className', 'copiedDuration', 'children'],
  )

  let timer = null
  const copied = createSignal(false)

  const handleCopy = async ()=> {
    try {
      if (navigator.clipboard?.writeText){
        await navigator.clipboard.writeText(local.value)
      } else {
        fallbackCopy()
      }
    } catch {
      fallbackCopy()
    }
    copied(true)
    clearTimeout(timer)
    timer = setTimeout(()=> copied(false), local.copiedDuration)
  }

  // Last-resort synchronous fallback for non-secure contexts where the async
  // Clipboard API is unavailable. The hidden textarea + execCommand dance is
  // deprecated but still the only synchronous copy path.
  const fallbackCopy = ()=> {
    const ta = document.createElement('textarea')
    ta.value = local.value
    ta.setAttribute('readonly', '')
    ta.style.cssText = 'position:fixed;top:0;left:0;width:2px;height:2px;padding:0;border:none;outline:none;box-shadow:none;background:transparent;opacity:0;pointer-events:none'
    document.body.appendChild(ta)
    const selection = document.getSelection()
    const prevRange = selection && selection.rangeCount > 0 ? selection.getRangeAt(0) : null
    ta.select()
    ta.setSelectionRange(0, local.value.length)
    document.execCommand('copy')
    document.body.removeChild(ta)
    if (prevRange && selection){
      selection.removeAllRanges()
      selection.addRange(prevRange)
    }
  }

  onCleanup(()=> clearTimeout(timer))

  return (
    <button
      {...rest}
      type="button"
      onClick={handleCopy}
      className={[baseClass, sizeClasses[local.size], copied() && copiedClass, local.className].filter(Boolean).join(' ')}
    >
      <span className={[iconClass, copied() && iconCopiedClass].filter(Boolean).join(' ')}>
        {copied() ? (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M20 6 9 17l-5-5" />
          </svg>
        ) : (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <rect x="9" y="9" width="13" height="13" rx="2" ry="2" /><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
          </svg>
        )}
      </span>
      {local.children}
    </button>
  )
}

export default Clipboard
export { Clipboard }
