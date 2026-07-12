import { createSignal } from '@plastic-js/plastic'
import Dialog from '../../src/components/Dialog.jsx'
import { Select, SelectTrigger } from '../../src/components/Select.jsx'

const dialogCities = [
  { value: 'tpe', label: 'Taipei' },
  { value: 'ntpc', label: 'New Taipei' },
  { value: 'txg', label: 'Taichung' },
  { value: 'tnn', label: 'Tainan' },
  { value: 'kxg', label: 'Kaohsiung' },
]

function SelectInDialogExample(){
  const dialogOpen = createSignal(false)
  const value = createSignal(null)
  const selectOpen = createSignal(false)
  return (
    <div className='feature-card'>
      <p className='demo-label'>Select in Dialog</p>
      <button className='demo-tag-btn' onClick={()=> dialogOpen(true)} type='button'>Open Dialog</button>
      <Dialog mode='sheet' onClose={()=> dialogOpen(false)} open={dialogOpen} title='Pick a city'>
        <Select value={value} onValueChange={v=> value(v)} open={selectOpen} onOpenChange={v=> selectOpen(v)} items={dialogCities} filter>
          <SelectTrigger placeholder='Search a city' />
        </Select>
      </Dialog>
      <div className='demo-value'>
        Selected: {()=> {
          const v = value()
          if (!v) return <em style="color:#999">none</em>
          const item = dialogCities.find(c => c.value === v)
          return item ? item.label : v
        }}
      </div>
    </div>
  )
}

function DialogPage(){
  const modalOpen = createSignal(false)
  const modalOpen2 = createSignal(false)
  const modalOpen3 = createSignal(false)
  const sheetOpen = createSignal(false)
  const sheetOpen3 = createSignal(false)

  return (
    <div className='container'>
      <div className='hero'>
        <p className='eyebrow'>Overlay</p>
        <h1>Dialog</h1>
        <p className='hero-copy'>
          Dialog supports two visual modes: <code>modal</code> (centered) and <code>sheet</code> (bottom sheet).
          Built on Ark UI Dialog with unified scroll lock, focus trap, and lazy mounting.
        </p>
      </div>

      <h2 style="margin:36px 0 24px;font-size:20px;font-weight:700">Modal Mode</h2>

      <div className='feature-card'>
        <p className='demo-label'>Basic Modal Dialog</p>
        <button className='demo-tag-btn' onClick={()=> modalOpen(true)} type='button'>Open Modal</button>
        <Dialog
          mode='modal'
          onClose={()=> modalOpen(false)}
          open={modalOpen}
          title='Account Settings'
          confirmText='Save'
        >
          <p style="font-size:14px;color:var(--tsu-fg);margin:0;line-height:1.6">
            Manage your account preferences and notification settings.
          </p>
        </Dialog>
      </div>

      <div className='feature-card'>
        <p className='demo-label'>Modal — Single Button (Centered)</p>
        <button className='demo-tag-btn' onClick={()=> modalOpen2(true)} type='button'>Show Alert</button>
        <Dialog
          mode='modal'
          confirmText='Got It'
          onClose={()=> modalOpen2(false)}
          onConfirm={()=> modalOpen2(false)}
          open={modalOpen2}
          showCancel={false}
          title='Account Created'
        >
          <p style="font-size:14px;color:var(--tsu-fg);margin:0;line-height:1.6">
            Your account has been created successfully.
          </p>
        </Dialog>
      </div>

      <div className='feature-card'>
        <p className='demo-label'>Modal — Long Content (Scrollable)</p>
        <button className='demo-tag-btn' onClick={()=> modalOpen3(true)} type='button'>Open Long Modal</button>
        <Dialog
          mode='modal'
          confirmText='Save'
          onClose={()=> modalOpen3(false)}
          open={modalOpen3}
          title='Terms of Service'
        >
          <div style="display:flex;flex-direction:column;gap:14px">
            {Array.from({ length: 14 }, (_, i)=> (
              <p key={i} style="font-size:14px;color:var(--tsu-fg);margin:0;line-height:1.7">
                Section {i + 1}. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.
                Duis aute irure dolor in reprehenderit in voluptate velit esse cillum.
              </p>
            ))}
          </div>
        </Dialog>
      </div>

      <h2 style="margin:36px 0 24px;font-size:20px;font-weight:700">Sheet Mode</h2>

      <SelectInDialogExample />

      <div className='feature-card'>
        <p className='demo-label'>Bottom Sheet with Title</p>
        <button className='demo-tag-btn' onClick={()=> sheetOpen(true)} type='button'>Open Sheet</button>
        <Dialog
          mode='sheet'
          onClose={()=> sheetOpen(false)}
          open={sheetOpen}
          title='Options'
        >
          <div style="display:flex;flex-direction:column;gap:6px">
            <p style="font-size:14px;color:var(--tsu-fg);margin:0;line-height:1.6">
              Choose an option from the list below.
            </p>
          </div>
        </Dialog>
      </div>

      <div className='feature-card'>
        <p className='demo-label'>Bottom Sheet — Long Content (Vertical Scroll)</p>
        <button className='demo-tag-btn' onClick={()=> sheetOpen3(true)} type='button'>Open Long Sheet</button>
        <Dialog
          mode='sheet'
          cancelText='Dismiss'
          confirmText='Select'
          onClose={()=> sheetOpen3(false)}
          open={sheetOpen3}
          title='Terms of Service'
        >
          <div style="display:flex;flex-direction:column;gap:14px">
            {Array.from({ length: 14 }, (_, i)=> (
              <p key={i} style="font-size:14px;color:var(--tsu-fg);margin:0;line-height:1.7;text-align:justify">
                Section {i + 1}. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.
                Duis aute irure dolor in reprehenderit in voluptate velit esse cillum.
              </p>
            ))}
          </div>
        </Dialog>
      </div>
    </div>
  )
}

export default DialogPage
