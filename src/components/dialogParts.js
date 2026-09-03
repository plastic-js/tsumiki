import { css } from '@emotion/css'

// Shared presentational parts of the Dialog chrome used by BOTH the ark-based
// center ("modal") mode (Dialog.jsx) and the standalone sheet presentation
// (DialogSheet.jsx). Kept in one module so the two modes cannot drift apart
// visually. Internal only — not exported from the package index.

export const headerClass = css({
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'space-between',
	padding: '18px var(--tsu-container-padding-lg) var(--tsu-spacing-lg)',
	marginBottom: 'var(--tsu-spacing-sm)',
	borderBottom: '1px solid var(--tsu-border)',
	flexShrink: 0,
})

export const titleWrapClass = css({
	display: 'flex',
	alignItems: 'center',
	gap: '10px',
	minWidth: 0,
})

export const titleIconClass = css({
	flexShrink: 0,
	color: 'var(--tsu-accent-solid-bg)',
})

export const titleClass = css({
	fontSize: '18px',
	fontWeight: 'var(--tsu-font-weight-semibold)',
	margin: 0,
})

export const closeBtnClass = css({
	width: '32px',
	height: '32px',
	borderRadius: '50%',
	background: 'transparent',
	border: 'none',
	color: 'var(--tsu-text-secondary)',
	fontSize: '22px',
	lineHeight: 1,
	cursor: 'pointer',
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
	flexShrink: 0,
})

export const bodyClass = css({
	padding: '0 var(--tsu-container-padding-lg)',
	flex: 1,
	minHeight: 0,
	overflowY: 'auto',
	overscrollBehavior: 'contain',
})

export const footerClass = css({
	display: 'flex',
	gap: 'var(--tsu-spacing-md)',
	padding: 'var(--tsu-container-padding-lg)',
	flexShrink: 0,
})

export const footerBtnClass = css({
	display: 'flex',
	gap: '20px',
	width: '100%',
	justifyContent: 'flex-end',
	'&.tsu-dialog-footer--center': {
		justifyContent: 'center',
	},
})

export const negativeBtnClass = css({
	flex: 1,
	borderRadius: 'var(--tsu-radius-l1-lg)',
	fontSize: 'var(--tsu-comp-font-size-lg)',
	fontWeight: 'var(--tsu-font-weight-semibold)',
	fontFamily: 'inherit',
})

export const positiveBtnClass = css({
	flex: 1,
	borderRadius: 'var(--tsu-radius-l1-lg)',
	fontSize: 'var(--tsu-comp-font-size-lg)',
	fontWeight: 'var(--tsu-font-weight-semibold)',
	fontFamily: 'inherit',
})
