import { createSignal } from '@plastic-js/plastic'
import Button from '../../src/components/Button.jsx'
import Toast, {
  ToastToaster,
  ToastIcon,
  ToastTitle,
  ToastDescription,
  ToastCloseTrigger,
  createToaster,
} from '../../src/components/Toast.jsx'

const bodyStyle = { flex: 1, minWidth: 0 }

function ToastPage(){
  const toaster = createToaster({ placement: 'top-end', overlap: false, gap: 10 })
  const count = createSignal(1)

  const addToast = (type, title, description)=> {
    count(count() + 1)
    toaster.create({ type, title: `${title} #${count()}`, description, duration: 3000 })
  }

  return (
    <div className='container'>
      <div className='hero'>
        <p className='eyebrow'>Overlay</p>
        <h1>Toast</h1>
        <p className='hero-copy'>
          A notification toast system with createToaster API. Shows
          stacked notifications with type-based colors and icons.
        </p>
      </div>

      <div className='feature-card'>
        <p className='demo-label'>Trigger Toasts</p>
        <div className='demo-row'>
          <Button size='sm' onClick={()=> addToast('success', 'Success', 'Your changes have been saved.')}>Success</Button>
          <Button size='sm' onClick={()=> addToast('error', 'Error', 'Something went wrong. Please try again.')}>Error</Button>
          <Button size='sm' onClick={()=> addToast('info', 'Info', 'A new version is available.')}>Info</Button>
          <Button size='sm' onClick={()=> addToast('warning', 'Warning', 'Your session will expire soon.')}>Warning</Button>
        </div>
      </div>

      <ToastToaster toaster={toaster} reverse>
        {toast => (
          <Toast key={toast.id}>
            <ToastIcon type={toast.type} />
            <div style={bodyStyle}>
              <ToastTitle>{() => toast.title}</ToastTitle>
              {toast.description && <ToastDescription>{() => toast.description}</ToastDescription>}
            </div>
            <ToastCloseTrigger />
          </Toast>
        )}
      </ToastToaster>
    </div>
  )
}

export default ToastPage
