import Tour, { TourContent, TourCloseTrigger } from '../../src/components/Tour.jsx'

function TourPage(){
  return (
    <div className='container'>
      <div className='hero'>
        <p className='eyebrow'>Overlay</p>
        <h1>Tour</h1>
        <p className='hero-copy'>
          A guided product tour with spotlight, step-by-step content,
          and close trigger. Best used with highlight targets.
        </p>
      </div>

      <div className='feature-card'>
        <p className='demo-label'>Tour Step</p>
        <Tour>
          <TourContent>
            <TourCloseTrigger aria-label='Close'>×</TourCloseTrigger>
            <div style="margin-bottom:6px;font-weight:600;font-size:14px">Welcome to Tsumiki</div>
            <div style="font-size:12px;color:var(--tsu-neutral-11);line-height:1.5">
              This is a guided tour step. Use the navigation buttons to move between steps.
            </div>
            <div style="display:flex;gap:8px;margin-top:10px">
              <button style="flex:1;padding:6px 0;border:1px solid var(--tsu-neutral-7);border-radius:6px;background:transparent;color:var(--tsu-fg);font-size:13px;cursor:pointer;font-family:'inherit'">Skip</button>
              <button style="flex:1;padding:6px 0;border:none;border-radius:6px;background:var(--tsu-accent-9);color:white;font-size:13px;cursor:pointer;font-family:'inherit'">Next</button>
            </div>
          </TourContent>
        </Tour>
      </div>
    </div>
  )
}

export default TourPage
