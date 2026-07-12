import StickyHeader from '../../src/components/StickyHeader.jsx'

const listItems = Array.from({ length: 12 }, (_, i) => i + 1)

function StickyHeaderPage(){
  return (
    <div className='container'>
      <div className='hero'>
        <p className='eyebrow'>Layout</p>
        <h1>StickyHeader</h1>
        <p className='hero-copy'>
          A header bar that sticks to the top of the viewport when scrolling.
          Supports configurable <span className='tag'>offsetTop</span> and optional <span className='tag'>shadow</span>.
        </p>
      </div>

      <div className='feature-card'>
        <p className='demo-label'>Basic</p>
        <p style={{ fontSize: '13px', color: 'var(--tsu-neutral-11)' }}>Header sticks to the top of the viewport (offsetTop = 0).</p>
        <div style={{ maxHeight: '320px', overflowY: 'auto', border: '1px solid var(--tsu-neutral-6)', borderRadius: 'var(--tsu-radius-l2-md)' }}>
          <StickyHeader shadow>
            <div style={{ padding: '12px 16px', display: 'flex', alignItems: 'center', gap: '12px' }}>
              <strong>Section Title</strong>
              <button type='button' style={{ marginLeft: 'auto', fontSize: '12px', padding: '6px 10px', borderRadius: 'var(--tsu-radius-l1-sm)', border: '1px solid var(--tsu-accent-9)', background: 'transparent', color: 'var(--tsu-accent-11)' }}>Action</button>
            </div>
          </StickyHeader>
          <div style={{ padding: '12px 16px' }}>
            {listItems.map(i => (
              <p key={i} style={{ padding: '8px 0', borderBottom: '1px solid var(--tsu-neutral-3)', color: 'var(--tsu-neutral-11)' }}>
                List item {i} — scroll to see the header stick
              </p>
            ))}
          </div>
        </div>
      </div>

      <div className='feature-card'>
        <p className='demo-label'>With Offset</p>
        <p style={{ fontSize: '13px', color: 'var(--tsu-neutral-11)' }}>Use <code>offsetTop</code> when there's an existing fixed bar above (e.g. 48px).</p>
        <div style={{ maxHeight: '280px', overflowY: 'auto', border: '1px solid var(--tsu-neutral-6)', borderRadius: 'var(--tsu-radius-l2-md)', position: 'relative' }}>
          <div style={{ position: 'sticky', top: '0', zIndex: 'calc(var(--tsu-z-dropdown) + 1)', background: 'var(--tsu-accent-9)', color: '#fff', padding: '8px 16px', fontSize: '12px' }}>
            Fixed Navigation Bar (48px)
          </div>
          <StickyHeader offsetTop={48} shadow>
            <div style={{ padding: '12px 16px' }}>
              <strong>Filter Bar (offsetTop=48)</strong>
            </div>
          </StickyHeader>
          <div style={{ padding: '12px 16px' }}>
            {listItems.slice(0, 10).map(i => (
              <p key={i} style={{ padding: '8px 0', borderBottom: '1px solid var(--tsu-neutral-3)', color: 'var(--tsu-neutral-11)' }}>
                Scroll content {i}
              </p>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default StickyHeaderPage
