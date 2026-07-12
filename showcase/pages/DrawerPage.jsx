import { createSignal } from '@plastic-js/plastic'
import Drawer, { DrawerTrigger, DrawerContent } from '../../src/components/Drawer.jsx'

function DrawerPage(){
  const openSignal = createSignal(false)

  return (
    <div className='container'>
      <div className='hero'>
        <p className='eyebrow'>Overlay</p>
        <h1>Drawer</h1>
        <p className='hero-copy'>
          A sliding panel that appears from the right side of the screen.
          Built on Ark UI with tsumiki styling.
        </p>
      </div>

      <div className='feature-card'>
        <p className='demo-label'>Basic Drawer</p>
        <Drawer open={openSignal} onOpenChange={v => openSignal(v)}>
          <DrawerTrigger asChild>
            <button type='button' className='demo-tag-btn'>Open Drawer</button>
          </DrawerTrigger>
          <DrawerContent title="Filters" description="Filter the list by category and status.">
            <div style="display:flex;flex-direction:column;gap:8px">
              <label style="display:flex;align-items:center;gap:8px;font-size:14px;cursor:pointer"><input type='checkbox' /> Active</label>
              <label style="display:flex;align-items:center;gap:8px;font-size:14px;cursor:pointer"><input type='checkbox' /> Pending</label>
              <label style="display:flex;align-items:center;gap:8px;font-size:14px;cursor:pointer"><input type='checkbox' /> Archived</label>
            </div>
          </DrawerContent>
        </Drawer>
      </div>
    </div>
  )
}

export default DrawerPage
