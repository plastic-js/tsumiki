import { css } from '@emotion/css'
import { createComputed, Dynamic, mergeProps, splitProps } from '@plastic-js/plastic'

const read = (v) => (typeof v === 'function' ? v() : v)

const rootClass = css({
  position: 'fixed',
  insetInline: '0',
  bottom: '0',
  display: 'flex',
  justifyContent: 'space-around',
  alignItems: 'center',
  height: '56px',
  paddingBottom: 'env(safe-area-inset-bottom)',
  backgroundColor: 'var(--tsu-bg-panel)',
  borderTop: '1px solid var(--tsu-border)',
  zIndex: 'var(--tsu-z-base)',
})

const itemClass = css({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: 'var(--tsu-spacing-xxs)',
  padding: '4px 12px',
  border: 'none',
  background: 'none',
  fontFamily: 'inherit',
  color: 'var(--tsu-text-subtle)',
  textDecoration: 'none',
  cursor: 'pointer',
  userSelect: 'none',
  touchAction: 'manipulation',
  transition: 'color var(--tsu-transition-fast)',
  '&[data-active]': { color: 'var(--tsu-accent-plain-fg)' },
})

const iconClass = css({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '24px',
  height: '24px',
  '& svg': { width: '100%', height: '100%', strokeWidth: 'var(--tsu-nav-icon-stroke-width, 2)' },
})

const labelClass = css({
  fontSize: '11px',
  lineHeight: '14px',
  fontWeight: 'var(--tsu-font-weight-medium)',
})

const BottomNavigationItem = (props = {})=> {
  const [local, rest] = splitProps(
    props,
    ['icon', 'activeIcon', 'label', 'active', 'href', 'onClick', 'className'],
  )

  const tag = local.href ? 'a' : 'button'

  const shown = createComputed(() => (read(local.active) && local.activeIcon != null ? read(local.activeIcon) : read(local.icon)))

  return (
    <Dynamic
      component={tag}
      {...(local.href ? { href: local.href } : { type: 'button' })}
      className={[itemClass, local.className].filter(Boolean).join(' ')}
      data-active={() => (read(local.active) ? '' : undefined)}
      onClick={local.onClick}
    >
      <span className={iconClass}>{shown()}</span>
      <span className={labelClass}>{local.label}</span>
    </Dynamic>
  )
}

const BottomNavigation = (props = {})=> {
  const [local, rest] = splitProps(
    mergeProps({}, props),
    ['className', 'children'],
  )

  return (
    <nav {...rest} className={[rootClass, local.className].filter(Boolean).join(' ')}>
      {local.children}
    </nav>
  )
}

BottomNavigation.Item = BottomNavigationItem
BottomNavigation.origin = { Root: 'nav', Item: BottomNavigationItem }

export default BottomNavigation
export { BottomNavigation, BottomNavigationItem }
