import { css } from '@emotion/css'
import { createEffect, createSignal } from '@plastic-js/plastic'

const ACTIONS_WIDTH = 160
const SWIPE_THRESHOLD = ACTIONS_WIDTH / 2

const wrapperClass = css`
	position: relative;
	overflow: hidden;
	border-radius: 12px;
	user-select: none;
`

const trackClass = css`
	display: flex;
	align-items: stretch;
	will-change: transform;
	transition: transform 220ms ease;
	touch-action: pan-y;
	&[data-dragging="true"] { transition: none; }
`

const actionsClass = css`
	flex: 0 0 ${ACTIONS_WIDTH}px;
	display: flex;
`

const actionBtnClass = css`
	flex: 1;
	display: flex;
	align-items: center;
	justify-content: center;
	border: none;
	color: #fff;
	font-size: 14px;
	font-weight: 600;
	cursor: pointer;
	font-family: inherit;
`

const contentClass = css`
	flex: 0 0 100%;
`

const SwipeReveal = ({
	actions, children, onSwipeStart, onOpenChange, activeId, thisId,
})=> {
	const isOpen = createSignal(false)

	let trackEl = null
	let startX = 0
	let startY = 0
	let baseOffset = 0
	let currentOffset = 0
	let dragging = false
	let axisLocked = false
	let horizontal = false
	let moved = false

	const setTrackRef = (el)=> { trackEl = el }

	const applyTransform = (px)=> {
		if (trackEl){ trackEl.style.transform = `translateX(${px}px)` }
	}

	const snap = (toOpen)=> {
		currentOffset = toOpen ? -ACTIONS_WIDTH : 0
		if (trackEl){
			trackEl.dataset.dragging = 'false'
			applyTransform(currentOffset)
		}
		onOpenChange?.(toOpen)
		isOpen(toOpen)
	}

	// only one card open at a time — close when another card's swipe activates
	createEffect(()=> {
		const currentActive = typeof activeId === 'function' ? activeId() : activeId
		if (currentActive !== undefined && currentActive !== thisId && isOpen()){
			isOpen(false)
			currentOffset = 0
			if (trackEl){
				trackEl.dataset.dragging = 'false'
				applyTransform(0)
			}
		}
	})

	const onPointerDown = (e)=> {
		if (e.pointerType === 'mouse' && e.button !== 0){ return }
		startX = e.clientX
		startY = e.clientY
		baseOffset = isOpen() ? -ACTIONS_WIDTH : 0
		dragging = true
		axisLocked = false
		horizontal = false
		moved = false
		e.currentTarget.setPointerCapture?.(e.pointerId)
	}

	const onPointerMove = (e)=> {
		if (!dragging){ return }
		const dx = e.clientX - startX
		const dy = e.clientY - startY
		if (!axisLocked){
			if (Math.abs(dx) < 6 && Math.abs(dy) < 6){ return }
			horizontal = Math.abs(dx) > Math.abs(dy)
			axisLocked = true
			if (horizontal && trackEl){ trackEl.dataset.dragging = 'true' }
		}
		if (!horizontal){ return }
		moved = true
		let next = baseOffset + dx
		if (next > 0){ next = 0 }
		if (next < -ACTIONS_WIDTH){ next = -ACTIONS_WIDTH - (next + ACTIONS_WIDTH) * 0.2 }
		currentOffset = next
		applyTransform(next)
	}

	const onPointerUp = (e)=> {
		if (!dragging){ return }
		dragging = false
		e.currentTarget.releasePointerCapture?.(e.pointerId)
		if (!horizontal){ return }
		const shouldOpen = currentOffset < -SWIPE_THRESHOLD
		snap(shouldOpen)
	}

	const handleContentClick = (e)=> {
		if (moved){ e.stopPropagation(); return }
		if (isOpen()){ e.stopPropagation(); snap(false); return }
	}

	const handleActionClick = action=> (e)=> {
		e.stopPropagation()
		snap(false)
		action.onClick?.(e)
	}

	return (
		<div className={wrapperClass}>
			<div
				className={trackClass}
				data-dragging='false'
				onPointerCancel={onPointerUp}
				onPointerDown={onPointerDown}
				onPointerMove={onPointerMove}
				onPointerUp={onPointerUp}
				ref={setTrackRef}
			>
				<div className={contentClass} onClick={handleContentClick}>
					{children}
				</div>
				<div className={actionsClass}>
					{actions.map(action=> (
						// prevent tab focus when actions are hidden off-screen
						<button
							className={actionBtnClass}
							onClick={handleActionClick(action)}
							style={{ background: action.color }}
							tabIndex={isOpen() ? 0 : -1}
							type='button'
						>
							{action.label}
						</button>
					))}
				</div>
			</div>
		</div>
	)
}

export default SwipeReveal
