import { createSignal } from '@plastic-js/plastic'
import ConfirmDialog, { confirm } from '../../src/components/ConfirmDialog.jsx'

function ConfirmPage(){
  const confirmOpen = createSignal(false)
  const asyncOpen = createSignal(false)
  const loading = createSignal(false)

  const asyncDelete = ()=> {
    loading(true)
    setTimeout(()=> {
      loading(false)
      asyncOpen(false)
    }, 2000)
  }

  const handlePromiseConfirm = async ()=> {
    try {
      await confirm({
        title: 'Delete Account',
        message: 'This action is irreversible. Continue?',
        confirmText: 'Delete',
        intent: 'danger',
      })
      alert('Confirmed!')
    } catch (err) {
      if (err.code === 'CANCEL') {
        alert('Cancelled.')
      }
    }
  }

  const handleSimplePromise = async ()=> {
    try {
      await confirm({
        title: 'Save Changes',
        message: 'Do you want to save your changes?',
        confirmText: 'Save',
      })
      alert('Saved!')
    } catch {
      // user cancelled
    }
  }

  return (
    <div className='container'>
      <div className='hero'>
        <p className='eyebrow'>Overlay</p>
        <h1>ConfirmDialog</h1>
        <p className='hero-copy'>
          A confirmation dialog with built-in danger styling. Also provides a Promise-based imperative API.
        </p>
      </div>

      <h2 style="margin:36px 0 24px;font-size:20px;font-weight:700">Promise API (Imperative)</h2>

      <div className='feature-card'>
        <p className='demo-label'>Basic Confirm</p>
        <button className='demo-tag-btn' onClick={handleSimplePromise} type='button'>Save Changes</button>
      </div>

      <div className='feature-card'>
        <p className='demo-label'>Danger Confirm</p>
        <button className='demo-tag-btn' onClick={handlePromiseConfirm} type='button'>Delete Account</button>
      </div>

      <h2 style="margin:36px 0 24px;font-size:20px;font-weight:700">Declarative</h2>

      <div className='feature-card'>
        <p className='demo-label'>Basic Confirm</p>
        <button className='demo-tag-btn' onClick={()=> confirmOpen(true)} type='button'>Delete Item</button>
        <ConfirmDialog
          cancelText='Keep it'
          confirmText='Delete'
          intent='danger'
          message='Are you sure you want to delete this item? This action cannot be undone.'
          onCancel={()=> confirmOpen(false)}
          onConfirm={()=> confirmOpen(false)}
          onOpenChange={v => confirmOpen(v)}
          open={confirmOpen}
          title='Delete Item'
        />
      </div>

      <div className='feature-card'>
        <p className='demo-label'>Async Confirm (Loading)</p>
        <button className='demo-tag-btn' onClick={()=> asyncOpen(true)} type='button'>Delete (Async)</button>
        <ConfirmDialog
          cancelText='Cancel'
          confirmText='Delete'
          intent='danger'
          loading={loading}
          message='Simulating a 2-second server request.'
          onCancel={()=> asyncOpen(false)}
          onConfirm={asyncDelete}
          onOpenChange={v => asyncOpen(v)}
          open={asyncOpen}
          title='Async Delete'
        />
      </div>
    </div>
  )
}

export default ConfirmPage
