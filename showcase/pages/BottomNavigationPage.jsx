import { createSignal } from '@plastic-js/plastic'
import BottomNavigation, { BottomNavigationItem } from '../../src/components/BottomNavigation.jsx'

const homeIcon = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" /></svg>'
const searchIcon = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" /></svg>'
const bellIcon = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" /><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" /></svg>'
const userIcon = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>'

const homeFilledIcon = '<svg viewBox="0 0 24 24" fill="currentColor" stroke="none"><path fill-rule="evenodd" d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2zM9 22v-10h6v10z" /></svg>'
const searchFilledIcon = '<svg viewBox="0 0 24 24" fill="currentColor" stroke="none"><path fill-rule="evenodd" d="M11 3a8 8 0 1 0 4.905 14.32l4.39 4.387a1 1 0 0 0 1.414-1.414l-4.39-4.387A8 8 0 0 0 11 3zm0 2a6 6 0 1 1 0 12 6 6 0 0 1 0-12z" /></svg>'
const bellFilledIcon = '<svg viewBox="0 0 24 24" fill="currentColor" stroke="none"><path fill-rule="evenodd" d="M6 8a6 6 0 0 1 12 0c0 5.5 2.5 7.5 3.5 8.5 1 1 .3 2.5-1 2.5H3.5c-1.3 0-2-1.5-1-2.5C3.5 15.5 6 13.5 6 8zm6-2a4 4 0 0 0-4 4c0 4.5-1.9 6.4-2.9 7.5h13.8c-1-1.1-2.9-3-2.9-7.5a4 4 0 0 0-4-4z" /><path d="M10.3 20a1.94 1.94 0 0 0 3.4 0z" /></svg>'
const userFilledIcon = '<svg viewBox="0 0 24 24" fill="currentColor" stroke="none"><path fill-rule="evenodd" d="M12 2a5 5 0 1 0 0 10 5 5 0 0 0 0-10zM12 4a3 3 0 1 1 0 6 3 3 0 0 1 0-6zM4 21v-1a6 6 0 0 1 6-6h4a6 6 0 0 1 6 6v1z" /></svg>'

const RawSvg = ({ svg, size = 24 })=> (
  <span
    style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: `${size}px`, height: `${size}px` }}
    ref={(el)=> { if (el && el.innerHTML !== svg) el.innerHTML = svg }}
  />
)

function BottomNavigationPage(){
  const activeSignal = createSignal(0)

  const items = [
    { icon: homeIcon, activeIcon: homeFilledIcon, label: 'Home' },
    { icon: searchIcon, activeIcon: searchFilledIcon, label: 'Search' },
    { icon: bellIcon, activeIcon: bellFilledIcon, label: 'Notifications' },
    { icon: userIcon, activeIcon: userFilledIcon, label: 'Profile' },
  ]

  const navItems = (style)=> (
    <BottomNavigation style={style}>
      {items.map((item, i) => (
        <BottomNavigationItem
          key={item.label}
          icon={<RawSvg svg={item.icon} />}
          activeIcon={<RawSvg svg={item.activeIcon} />}
          label={item.label}
          active={() => activeSignal() === i}
          onClick={() => activeSignal(i)}
        />
      ))}
    </BottomNavigation>
  )

  return (
    <div className='container'>
      <div className='hero'>
        <p className='eyebrow'>Navigation</p>
        <h1>BottomNavigation</h1>
        <p className='hero-copy'>
          Fixed bottom navigation bar with icons and labels.
          Each item accepts an <span className='tag'>activeIcon</span> that replaces the
          plain icon while active. Icon stroke thickness can be tuned via the
          <span className='tag'>--tsu-nav-icon-stroke-width</span> token.
        </p>
      </div>

      <div className='feature-card'>
        <p className='demo-label'>Basic</p>
        <div style={{ border: '1px solid var(--tsu-neutral-6)', borderRadius: '8px', overflow: 'hidden', height: '160px', position: 'relative' }}>
          {navItems(undefined)}
        </div>
        <div className='demo-value'>Active: {() => items[activeSignal()].label}</div>
      </div>

      <div className='feature-card'>
        <p className='demo-label'>Thin icon strokes</p>
        <div style={{ border: '1px solid var(--tsu-neutral-6)', borderRadius: '8px', overflow: 'hidden', height: '160px', position: 'relative' }}>
          {navItems({ '--tsu-nav-icon-stroke-width': '1.5' })}
        </div>
      </div>
    </div>
  )
}

export default BottomNavigationPage
