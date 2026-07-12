import { createSignal } from '@plastic-js/plastic'
import Splitter, { SplitterPanel, SplitterResizeTrigger } from '../../src/components/Splitter.jsx'

function SplitterPage(){
  const horizontalSplitSignal = createSignal(50)
  const verticalSplitSignal = createSignal(40)

  return (
    <div className='container'>
      <div className='hero'>
        <p className='eyebrow'>Layout</p>
        <h1>Splitter</h1>
        <p className='hero-copy'>
          A resizable split-panel layout. Supports horizontal and vertical
          orientations with <span className='tag'>SplitterPanel</span> and
          <span className='tag'>SplitterResizeTrigger</span> sub-components.
        </p>
      </div>

      <div className='feature-card'>
        <p className='demo-label'>Horizontal Split</p>
        <Splitter value={horizontalSplitSignal} onValueChange={v => horizontalSplitSignal(v)}>
          <SplitterPanel>
            <div style={{
              padding: '16px',
              background: 'var(--tsu-accent-3)',
              borderRadius: 'var(--tsu-radius-l1-md) 0 0 var(--tsu-radius-l1-md)',
              fontSize: 'var(--tsu-comp-font-size-sm)',
              color: 'var(--tsu-accent-9)',
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              minHeight: '120px',
            }}>
              Left Panel
            </div>
          </SplitterPanel>
          <SplitterResizeTrigger style={{
            width: '4px',
            background: 'var(--tsu-neutral-6)',
            cursor: 'col-resize',
          }} />
          <SplitterPanel>
            <div style={{
              padding: '16px',
              background: 'var(--tsu-accent-3)',
              borderRadius: '0 var(--tsu-radius-l1-md) var(--tsu-radius-l1-md) 0',
              fontSize: 'var(--tsu-comp-font-size-sm)',
              color: 'var(--tsu-accent-9)',
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              minHeight: '120px',
            }}>
              Right Panel
            </div>
          </SplitterPanel>
        </Splitter>
      </div>

      <div className='feature-card'>
        <p className='demo-label'>Vertical Split</p>
        <Splitter
          orientation='vertical'
          value={verticalSplitSignal}
          onValueChange={v => verticalSplitSignal(v)}
        >
          <SplitterPanel>
            <div style={{
              padding: '16px',
              background: 'var(--tsu-accent-3)',
              borderRadius: 'var(--tsu-radius-l1-md) var(--tsu-radius-l1-md) 0 0',
              fontSize: 'var(--tsu-comp-font-size-sm)',
              color: 'var(--tsu-accent-9)',
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              minHeight: '80px',
            }}>
              Top Panel
            </div>
          </SplitterPanel>
          <SplitterResizeTrigger style={{
            height: '4px',
            width: '100%',
            background: 'var(--tsu-neutral-6)',
            cursor: 'row-resize',
          }} />
          <SplitterPanel>
            <div style={{
              padding: '16px',
              background: 'var(--tsu-accent-3)',
              borderRadius: '0 0 var(--tsu-radius-l1-md) var(--tsu-radius-l1-md)',
              fontSize: 'var(--tsu-comp-font-size-sm)',
              color: 'var(--tsu-accent-9)',
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              minHeight: '80px',
            }}>
              Bottom Panel
            </div>
          </SplitterPanel>
        </Splitter>
      </div>
    </div>
  )
}

export default SplitterPage
