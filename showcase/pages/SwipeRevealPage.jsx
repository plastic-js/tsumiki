import { createSignal } from '@plastic-js/plastic'
import SwipeReveal from '../../src/components/SwipeReveal.jsx'

const CARD_STYLE = {
  padding: 'var(--tsu-container-padding-md)',
  background: 'var(--tsu-bg)',
  borderBottom: '1px solid var(--tsu-neutral-6)',
  fontSize: 'var(--tsu-comp-font-size-md)',
}

function SwipeRevealPage(){
  const activeIdSignal = createSignal(null)

  return (
    <div className='container'>
      <div className='hero'>
        <p className='eyebrow'>Layout</p>
        <h1>Swipe Reveal</h1>
        <p className='hero-copy'>
          Swipe horizontally on a card to reveal action buttons underneath.
          Supports flick gesture, velocity detection, and accordion mode.
        </p>
      </div>

      <div className='feature-card'>
        <p className='demo-label'>Single Action</p>
        <div style={{ borderRadius: 'var(--tsu-radius-l2-md)', overflow: 'hidden' }}>
          <SwipeReveal
            actions={[
              { label: 'Delete', color: '#E17055', onClick: () => alert('Deleted!') },
            ]}
          >
            <div style={CARD_STYLE}>
              <div style={{ fontWeight: 500 }}>Inbox</div>
              <div style={{ fontSize: 'var(--tsu-comp-font-size-sm)', color: 'var(--tsu-neutral-11)' }}>Swipe left to delete</div>
            </div>
          </SwipeReveal>
        </div>
      </div>

      <div className='feature-card'>
        <p className='demo-label'>Multiple Actions</p>
        <div style={{ borderRadius: 'var(--tsu-radius-l2-md)', overflow: 'hidden' }}>
          <SwipeReveal
            actions={[
              { label: 'Archive', color: '#0984E3', onClick: () => alert('Archived!') },
              { label: 'Delete', color: '#E17055', onClick: () => alert('Deleted!') },
            ]}
          >
            <div style={CARD_STYLE}>
              <div style={{ fontWeight: 500 }}>Meeting Notes</div>
              <div style={{ fontSize: 'var(--tsu-comp-font-size-sm)', color: 'var(--tsu-neutral-11)' }}>Swipe left for actions</div>
            </div>
          </SwipeReveal>
        </div>
      </div>

      <div className='feature-card'>
        <p className='demo-label'>Three Actions (Share, Archive, Delete)</p>
        <div style={{ borderRadius: 'var(--tsu-radius-l2-md)', overflow: 'hidden' }}>
          <SwipeReveal
            actions={[
              { label: 'Share', color: '#00B894', onClick: () => alert('Shared!') },
              { label: 'Archive', color: '#0984E3', onClick: () => alert('Archived!') },
              { label: 'Delete', color: '#E17055', onClick: () => alert('Deleted!') },
            ]}
          >
            <div style={CARD_STYLE}>
              <div style={{ fontWeight: 500 }}>Design Review</div>
              <div style={{ fontSize: 'var(--tsu-comp-font-size-sm)', color: 'var(--tsu-neutral-11)' }}>Swipe left to reveal more actions</div>
            </div>
          </SwipeReveal>
        </div>
      </div>

      <div className='feature-card'>
        <p className='demo-label'>Accordion Mode (One at a Time)</p>
        <div style={{ borderRadius: 'var(--tsu-radius-l2-md)', overflow: 'hidden', border: '1px solid var(--tsu-neutral-6)' }}>
          {[
            { title: 'Alice Johnson', subtitle: 'Hey! Are you coming tomorrow?' },
            { title: 'Bob Smith', subtitle: 'The files are ready for review.' },
            { title: 'Carol Williams', subtitle: 'Can we reschedule our meeting?' },
          ].map((item, i) => (
            <SwipeReveal
              key={i}
              thisId={i}
              activeId={activeIdSignal}
              onOpenChange={(open) => open && activeIdSignal(i)}
              actions={[
                { label: 'Pin', color: '#FDCB6E', onClick: () => alert(`Pinned ${item.title}`) },
                { label: 'Delete', color: '#E17055', onClick: () => alert(`Deleted ${item.title}`) },
              ]}
            >
              <div style={CARD_STYLE}>
                <div style={{ fontWeight: 500 }}>{item.title}</div>
                <div style={{ fontSize: 'var(--tsu-comp-font-size-sm)', color: 'var(--tsu-neutral-11)' }}>{item.subtitle}</div>
              </div>
            </SwipeReveal>
          ))}
        </div>
      </div>
    </div>
  )
}

export default SwipeRevealPage
