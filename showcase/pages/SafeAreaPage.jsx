import SafeArea from '../../src/components/SafeArea.jsx'

function SafeAreaPage(){
  return (
    <div className='container'>
      <div className='hero'>
        <p className='eyebrow'>Layout</p>
        <h1>SafeArea</h1>
        <p className='hero-copy'>
          Adds padding for device safe areas (notch, status bar, home indicator).
          Uses CSS <span className='tag'>env(safe-area-inset-*)</span>. Best viewed
          on a real mobile device.
        </p>
      </div>

      <div className='feature-card'>
        <p className='demo-label'>Top SafeArea</p>
        <div style={{ background: 'var(--tsu-neutral-2)', border: '1px solid var(--tsu-neutral-6)', borderRadius: 'var(--tsu-radius-l2-md)', overflow: 'hidden' }}>
          <SafeArea position='top'>
            <div style={{ padding: '12px 16px', borderBottom: '1px solid var(--tsu-neutral-6)' }}>
              <strong>SafeArea top</strong> — content starts below the notch
            </div>
          </SafeArea>
          <div style={{ padding: '24px 16px' }}>Main content area</div>
        </div>
      </div>

      <div className='feature-card'>
        <p className='demo-label'>Bottom SafeArea</p>
        <div style={{ background: 'var(--tsu-neutral-2)', border: '1px solid var(--tsu-neutral-6)', borderRadius: 'var(--tsu-radius-l2-md)', overflow: 'hidden' }}>
          <div style={{ padding: '24px 16px', borderBottom: '1px solid var(--tsu-neutral-6)' }}>Main content area</div>
          <SafeArea position='bottom'>
            <div style={{ padding: '12px 16px', display: 'flex', gap: '8px', justifyContent: 'center' }}>
              <span className='demo-value'>Bottom bar above home indicator</span>
            </div>
          </SafeArea>
        </div>
      </div>

      <div className='feature-card'>
        <p className='demo-label'>Usage Note</p>
        <p style={{ fontSize: '13px', color: 'var(--tsu-neutral-11)' }}>
          On desktop browsers, <code>env(safe-area-inset-*)</code> typically resolves to 0,
          so there's no visible change. Test on a physical iPhone or Android device with a notch
          to see the actual padding effect.
        </p>
      </div>
    </div>
  )
}

export default SafeAreaPage
