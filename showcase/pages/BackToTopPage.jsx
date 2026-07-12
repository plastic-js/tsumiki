import BackToTop from '../../src/components/BackToTop.jsx'

const scrollItems = Array.from({ length: 25 }, (_, i) => i + 1)

function BackToTopPage(){
  return (
    <div className='container'>
      <div className='hero'>
        <p className='eyebrow'>Navigation</p>
        <h1>BackToTop</h1>
        <p className='hero-copy'>
          A fixed button that appears after scrolling past a threshold.
          Click to smoothly scroll back to the top.
        </p>
      </div>

      <div className='feature-card'>
        <p className='demo-label'>Demo</p>
        <p style={{ fontSize: '13px', color: 'var(--tsu-neutral-11)' }}>
          Scroll inside the box below (not the page) past 200px to reveal the button.
        </p>
        <div className='back-to-top-scroll' style={{ maxHeight: '360px', overflowY: 'auto', border: '1px solid var(--tsu-neutral-6)', borderRadius: 'var(--tsu-radius-l2-md)', position: 'relative' }}>
          <div style={{ padding: '12px 16px', borderBottom: '1px solid var(--tsu-neutral-3)', background: 'var(--tsu-neutral-2)' }}>
            <strong>Scrollable Container</strong>
          </div>
          <div style={{ padding: '12px 16px' }}>
            <BackToTop target={() => document.querySelector('.back-to-top-scroll')} />
            {scrollItems.map(i => (
              <p key={i} style={{ padding: '8px 0', borderBottom: '1px solid var(--tsu-neutral-3)', color: 'var(--tsu-neutral-11)' }}>
                List item {i} — keep scrolling down
              </p>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default BackToTopPage
