import { css } from '@emotion/css'
import { Toast as ArkToast, createToaster as arkCreateToaster } from '@plastic-js/ark'
import { splitProps } from '@plastic-js/plastic'

const createToaster = (options = {})=> {
  return arkCreateToaster({ overlap: false, ...options })
}

const toastClass = css({
  display: 'flex',
  alignItems: 'flex-start',
  gap: '12px',
  width: 'min(92vw, 340px)',
  padding: '16px',
  background: 'var(--tsu-bg-panel)',
  border: '1px solid var(--tsu-border)',
  borderRadius: 'var(--tsu-radius-l2-lg)',
  borderLeft: '3px solid var(--tsu-border-strong)',
  boxShadow: 'var(--tsu-shadow-lg)',
  pointerEvents: 'auto',
  translate: 'var(--x) var(--y)',
  scale: 'var(--scale)',
  zIndex: 'var(--z-index)',
  height: 'var(--height)',
  opacity: 'var(--opacity)',
  willChange: 'translate, opacity, scale',
  transition: `
    translate 400ms cubic-bezier(0.21, 1.02, 0.73, 1),
    scale 400ms cubic-bezier(0.21, 1.02, 0.73, 1),
    opacity 400ms cubic-bezier(0.21, 1.02, 0.73, 1),
    height 400ms cubic-bezier(0.21, 1.02, 0.73, 1),
    box-shadow 200ms cubic-bezier(0.21, 1.02, 0.73, 1)
  `,
  '&[data-state="closed"]': {
    transition: `
      translate 400ms cubic-bezier(0.06, 0.71, 0.55, 1),
      scale 400ms cubic-bezier(0.06, 0.71, 0.55, 1),
      opacity 200ms cubic-bezier(0.06, 0.71, 0.55, 1)
    `,
  },
  '&[data-type="success"]': { borderLeftColor: 'var(--tsu-success-solid-bg)' },
  '&[data-type="error"]':   { borderLeftColor: 'var(--tsu-danger-solid-bg)' },
  '&[data-type="info"]':    { borderLeftColor: 'var(--tsu-accent-solid-bg)' },
  '&[data-type="warning"]': { borderLeftColor: 'var(--tsu-warning-solid-bg)' },
})

const titleClass = css({
  margin: 0,
  fontSize: '15px',
  fontWeight: 'var(--tsu-font-weight-semibold)',
  lineHeight: 1.3,
  letterSpacing: '-0.01em',
  color: 'var(--tsu-fg)',
  wordBreak: 'break-word',
})

const descriptionClass = css({
  margin: '6px 0 0',
  fontSize: '14px',
  lineHeight: 1.5,
  color: 'var(--tsu-text-secondary)',
  wordBreak: 'break-word',
})

const closeClass = css({
  flexShrink: 0,
  alignSelf: 'flex-start',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '28px',
  height: '28px',
  margin: '-4px -8px 0 auto',
  padding: 0,
  border: 'none',
  borderRadius: '999px',
  background: 'transparent',
  color: 'var(--tsu-text-secondary)',
  cursor: 'pointer',
  '& svg': { width: '14px', height: '14px', display: 'block' },
})

const bodyClass = css({
  flex: 1,
  minWidth: 0,
})

const iconClass = css({
  flexShrink: 0,
  width: '20px',
  height: '20px',
  marginTop: '2px',
  '& svg': { display: 'block', width: '100%', height: '100%' },
  '.toast-wrapper[data-type="success"] &': { color: 'var(--tsu-success-solid-bg)' },
  '.toast-wrapper[data-type="error"]   &': { color: 'var(--tsu-danger-solid-bg)' },
  '.toast-wrapper[data-type="info"]    &': { color: 'var(--tsu-accent-solid-bg)' },
  '.toast-wrapper[data-type="warning"] &': { color: 'var(--tsu-warning-solid-bg)' },
})

const typeIcons = {
  success: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>`,
  error:   `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>`,
  info:    `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>`,
  warning: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>`,
  loading: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="2" x2="12" y2="6"/><line x1="12" y1="18" x2="12" y2="22"/><line x1="4.93" y1="4.93" x2="7.76" y2="7.76"/><line x1="16.24" y1="16.24" x2="19.07" y2="19.07"/><line x1="2" y1="12" x2="6" y2="12"/><line x1="18" y1="12" x2="22" y2="12"/><line x1="4.93" y1="19.07" x2="7.76" y2="16.24"/><line x1="16.24" y1="7.76" x2="19.07" y2="4.93"/></svg>`,
}

const wrapperClass = css({
  display: 'contents',
})

const Toast = (props = {})=> {
  const [local, rest] = splitProps(props, ['className'])
  return (
    <span className={wrapperClass}>
      <ArkToast.Root {...rest} className={['toast-wrapper', toastClass, local.className].filter(Boolean).join(' ')} />
    </span>
  )
}

const ToastTitle = (props = {})=> {
  const [local, rest] = splitProps(props, ['className'])
  return <ArkToast.Title {...rest} className={[titleClass, local.className].filter(Boolean).join(' ')} />
}

const ToastDescription = (props = {})=> {
  const [local, rest] = splitProps(props, ['className'])
  return <ArkToast.Description {...rest} className={[descriptionClass, local.className].filter(Boolean).join(' ')} />
}

const ToastCloseTrigger = (props = {})=> {
  const [local, rest] = splitProps(props, ['className'])
  return (
    <ArkToast.CloseTrigger {...rest} className={[closeClass, local.className].filter(Boolean).join(' ')}>
      {local.children || (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M18 6 6 18M6 6l12 12" /></svg>
      )}
    </ArkToast.CloseTrigger>
  )
}

const ToastIcon = ({ icon, type, className } = {})=> {
  const svg = icon ?? (type ? typeIcons[type] : null)
  if (!svg) return null

  if (typeof svg === 'function') {
    const IconComponent = svg
    return <span className={[iconClass, className].filter(Boolean).join(' ')}><IconComponent /></span>
  }

  return <span className={[iconClass, className].filter(Boolean).join(' ')} innerHTML={svg} />
}

const ToastToaster = ArkToast.Toaster

Toast.origin = {
  Root: ArkToast.Root,
  Title: ArkToast.Title,
  Description: ArkToast.Description,
  CloseTrigger: ArkToast.CloseTrigger,
  Toaster: ArkToast.Toaster,
}

export default Toast
export { Toast, ToastTitle, ToastDescription, ToastCloseTrigger, ToastIcon, ToastToaster, createToaster }
