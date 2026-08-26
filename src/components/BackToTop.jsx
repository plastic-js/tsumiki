import { css } from '@emotion/css'
import { createSignal, mergeProps, onCleanup, splitProps } from '@plastic-js/plastic'

const read = (v) => (typeof v === 'function' ? v() : v)

const baseClass = css({
  position: 'fixed',
  right: 'var(--tsu-spacing-lg)',
  bottom: 'var(--tsu-spacing-xl)',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '48px',
  height: '48px',
  border: 'none',
  borderRadius: '50%',
  backgroundColor: 'var(--tsu-accent-solid-bg)',
  color: 'var(--tsu-accent-solid-fg)',
  boxShadow: 'var(--tsu-shadow-md)',
  cursor: 'pointer',
  userSelect: 'none',
  touchAction: 'manipulation',
  zIndex: 90,
  opacity: 0,
  transform: 'scale(0.8)',
  pointerEvents: 'none',
  transition: 'opacity var(--tsu-transition-normal), transform var(--tsu-transition-normal)',
  '&:active': { transform: 'scale(0.9)' },
  '&:focus-visible': {
    outline: '2px solid var(--tsu-accent-outline-border)',
    outlineOffset: '2px',
  },
})

const visibleClass = css({
  opacity: 1,
  transform: 'scale(1)',
  pointerEvents: 'auto',
})

const iconClass = css({
  display: 'block',
  width: '22px',
  height: '22px',
})

const BackToTop = (props = {})=> {
  const [local] = splitProps(
    mergeProps({ threshold: 350 }, props),
    ['className', 'threshold', 'target', 'icon', 'aria-label', 'onClick'],
  )

  const visible = createSignal(false)

  const getEl = () => (typeof local.target === 'function' ? local.target() : null)

  const onScroll = () => {
    const el = getEl()
    const scrollTop = el ? el.scrollTop : window.scrollY
    visible(scrollTop > read(local.threshold))
  }

  onCleanup(() => {
    window.removeEventListener('scroll', onScroll, true)
  })

  window.addEventListener('scroll', onScroll, { capture: true, passive: true })

  const handleClick = () => {
    const el = getEl()
    if (el) {
      el.scrollTo({ top: 0, behavior: 'smooth' })
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
    local.onClick?.()
  }

  return (
    <button
      type="button"
      className={() => [baseClass, visible() && visibleClass, local.className].filter(Boolean).join(' ')}
      onClick={handleClick}
      aria-label={local['aria-label'] || 'Back to top'}
    >
      {local.icon || (
        <svg className={iconClass} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <title>Back to top</title>
          <path d="m18 15-6-6-6 6" />
        </svg>
      )}
    </button>
  )
}

BackToTop.origin = { Root: 'button' }

export default BackToTop
export { BackToTop }
