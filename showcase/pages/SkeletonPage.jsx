import { createSignal } from '@plastic-js/plastic'
import Skeleton from '../../src/components/Skeleton.jsx'

function SkeletonPage(){
  const widthSignal = createSignal('200px')
  const heightSignal = createSignal('14px')
  const radiusSignal = createSignal('4px')

  return (
    <div className='container'>
      <div className='hero'>
        <p className='eyebrow'>Feedback</p>
        <h1>Skeleton</h1>
        <p className='hero-copy'>
          A placeholder loading indicator with a shimmer animation.
          Configurable <span className='tag'>width</span>,
          <span className='tag'>height</span>, and
          <span className='tag'>radius</span>.
        </p>
      </div>

      <div className='feature-card'>
        <p className='demo-label'>Text Lines</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <Skeleton height='12px' width='60%' />
          <Skeleton height='12px' width='100%' />
          <Skeleton height='12px' width='100%' />
          <Skeleton height='12px' width='80%' />
        </div>
      </div>

      <div className='feature-card'>
        <p className='demo-label'>Block Skeleton</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <Skeleton height='120px' width='100%' radius='var(--tsu-radius-l2-md)' />
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <Skeleton height='16px' width='70%' />
            <Skeleton height='12px' width='50%' />
          </div>
        </div>
      </div>

      <div className='feature-card'>
        <p className='demo-label'>Circle &amp; Avatar</p>
        <div className='demo-row' style={{ gap: '16px' }}>
          <Skeleton width='48px' height='48px' radius='9999px' />
          <Skeleton width='64px' height='64px' radius='9999px' />
          <Skeleton width='80px' height='80px' radius='9999px' />
        </div>
      </div>

      <div className='feature-card'>
        <p className='demo-label'>Card Layout (Loading State)</p>
        <div style={{
          border: '1px solid var(--tsu-neutral-7)',
          borderRadius: 'var(--tsu-radius-l2-md)',
          padding: 'var(--tsu-container-padding-md)',
          display: 'flex',
          flexDirection: 'column',
          gap: '12px',
        }}>
          <div className='demo-row' style={{ gap: '12px' }}>
            <Skeleton width='40px' height='40px' radius='9999px' />
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <Skeleton height='14px' width='40%' />
              <Skeleton height='10px' width='60%' radius='2px' />
            </div>
          </div>
          <Skeleton height='80px' width='100%' radius='var(--tsu-radius-l2-sm)' />
          <div style={{ display: 'flex', gap: '8px' }}>
            <Skeleton height='32px' width='80px' radius='var(--tsu-radius-l1-md)' />
            <Skeleton height='32px' width='80px' radius='var(--tsu-radius-l1-md)' />
          </div>
        </div>
      </div>

      <div className='feature-card'>
        <p className='demo-label'>Interactive</p>
        <div className='demo-check-row' style={{ gap: '12px' }}>
          <label style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            <span style={{ fontSize: '12px', color: 'var(--tsu-neutral-11)' }}>Width</span>
            <input className='demo-select' onChange={e => widthSignal(e.target.value)} style='width:80px' type='text' value={widthSignal()} />
          </label>
          <label style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            <span style={{ fontSize: '12px', color: 'var(--tsu-neutral-11)' }}>Height</span>
            <input className='demo-select' onChange={e => heightSignal(e.target.value)} style='width:80px' type='text' value={heightSignal()} />
          </label>
          <label style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            <span style={{ fontSize: '12px', color: 'var(--tsu-neutral-11)' }}>Radius</span>
            <input className='demo-select' onChange={e => radiusSignal(e.target.value)} style='width:80px' type='text' value={radiusSignal()} />
          </label>
        </div>
        <div style={{ marginTop: '12px' }}>
          <Skeleton width={widthSignal} height={heightSignal} radius={radiusSignal} />
        </div>
      </div>
    </div>
  )
}

export default SkeletonPage
