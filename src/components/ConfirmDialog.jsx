import { css } from '@emotion/css'
import { createSignal, mergeProps, renderApp, splitProps } from '@plastic-js/plastic'
import Dialog from './Dialog.jsx'

const messageBodyClass = css({
	fontSize: 'var(--tsu-comp-font-size-lg)',
	lineHeight: 1.5,
	color: 'var(--tsu-fg)',
	textAlign: 'center',
	padding: 'var(--tsu-spacing-sm) 0',
})

const DEFAULT_PROPS = {
	confirmText: 'Confirm',
	cancelText: 'Cancel',
	intent: 'default',
	loading: false,
	title: 'Confirm',
}

function ConfirmDialog(props) {
	const merged = mergeProps(DEFAULT_PROPS, props)
	const [local] = splitProps(merged, [
		'mode', 'open', 'onOpenChange', 'onConfirm', 'onCancel',
		'loading', 'title', 'message', 'confirmText', 'cancelText', 'intent',
	])

	const handleConfirm = ()=> {
		local.onConfirm?.()
	}

	const hasCancel = !!local.onCancel

	return (
		<Dialog
			{...(local.mode ? { mode: local.mode } : {})}
			cancelText={local.cancelText}
			confirmText={local.confirmText}
			intent={local.intent}
			loading={local.loading}
			onConfirm={handleConfirm}
			onCancel={local.onCancel}
			onOpenChange={local.onOpenChange}
			open={local.open}
			closeable={false}
			showCancel={hasCancel}
			showConfirm={true}
			title={local.title}
		>
			<p className={messageBodyClass}>
				{local.message}
			</p>
		</Dialog>
	)
}

// ── Promise API ──────────────────────────────────────────────

let _resolve = null
let _reject = null
let _setState = null

let _initialized = false

function ensureInit() {
	if (_initialized) return
	_initialized = true

	// The container is created lazily (not at import time) so the module can
	// be imported in DOM-less environments (SSR, tests) without crashing.
	const container = document.createElement('div')
	document.body.appendChild(container)

	const state = createSignal(null)
	_setState = state

	const handleConfirm = ()=> {
		_resolve?.()
		state({ ...state(), open: false })
	}

	const handleCancel = ()=> {
		const err = new Error('Cancel')
		err.code = 'CANCEL'
		_reject?.(err)
		state({ ...state(), open: false })
	}

	const handleOpenChange = (open)=> {
		if (!open) {
			_resolve = null
			_reject = null
			state(null)
		}
	}

	renderApp(container, ()=> {
		const s = state()
		if (!s) return null
		return (
			<Dialog
				{...(s.mode ? { mode: s.mode } : {})}
				open={s.open}
				closeable={false}
				showCancel={!s.noCancel}
				showConfirm={true}
				confirmText={s.confirmText || 'Confirm'}
				cancelText={s.cancelText || 'Cancel'}
				intent={s.intent || 'default'}
				title={s.title || 'Confirm'}
				onConfirm={handleConfirm}
				onCancel={handleCancel}
				onOpenChange={handleOpenChange}
			>
				<p className={messageBodyClass}>{s.message}</p>
			</Dialog>
		)
	})
}

/**
 * Open a confirmation dialog imperatively.
 * Resolves on confirm, rejects with `{ code: 'CANCEL' }` on cancel.
 *
 * @example
 * try {
 *   await confirm({
 *     title: 'Delete Item',
 *     message: 'This action cannot be undone.',
 *     confirmText: 'Delete',
 *     intent: 'danger',
 *   })
 * } catch (err) {
 *   if (err.code === 'CANCEL') { ... }
 * }
 *
 * @param {{
 *   mode?: 'modal' | 'sheet',
 *   title?: string,
 *   message?: string,
 *   confirmText?: string,
 *   cancelText?: string,
 *   intent?: 'default' | 'neutral' | 'danger',
 *   noCancel?: boolean
 * }} options
 * @returns {Promise<void>}
 */
const confirm = (options = {})=> {
	ensureInit()
	return new Promise((resolve, reject)=> {
		_resolve = resolve
		_reject = reject
		_setState({ ...options, open: true })
	})
}

export default ConfirmDialog
export { ConfirmDialog, confirm }
