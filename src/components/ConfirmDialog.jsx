import { css } from '@emotion/css'
import Dialog from './Dialog.jsx'

const messageClass = css({
	fontSize: '15px',
	lineHeight: 1.5,
	color: 'var(--ink)',
	textAlign: 'center',
	padding: '8px 0',
})

const ConfirmDialog = ({
	open, onOpenChange, onConfirm, loading, title, message, confirmText, cancelText,
})=> {
	const handleConfirm = ()=> {
		onConfirm?.()
	}

	return (
		<Dialog.Root
			cancelText={cancelText ?? 'Cancel'}
			confirmText={confirmText ?? 'Delete'}
			loading={loading}
			onConfirm={handleConfirm}
			onOpenChange={onOpenChange}
			open={open}
			title={title ?? 'Confirm'}
		>
			<p className={messageClass}>
				{message}
			</p>
		</Dialog.Root>
	)
}

export default ConfirmDialog
