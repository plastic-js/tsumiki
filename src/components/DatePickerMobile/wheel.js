import { inertia } from 'popmotion'

export const ITEM_HEIGHT = 36
export const VISIBLE_ITEMS = 5
export const CONTAINER_HEIGHT = ITEM_HEIGHT * VISIBLE_ITEMS
export const CENTER_OFFSET = (CONTAINER_HEIGHT - ITEM_HEIGHT) / 2

export function expandCircular(items, index) {
	const len = items.length
	if (len === 0) return [items, index]
	return [[...items, ...items, ...items], len + index]
}

export function clampOffset(offset, itemCount) {
	const max = CENTER_OFFSET
	const min = CENTER_OFFSET - Math.max(0, itemCount - 1) * ITEM_HEIGHT
	return Math.max(min, Math.min(max, offset))
}

export function makeWheel(displayItems, displayIndex, circular) {
	const baseLen = circular ? Math.round(displayItems.length / 3) : displayItems.length

	let translateY = circular
		? CENTER_OFFSET - displayIndex * ITEM_HEIGHT
		: clampOffset(CENTER_OFFSET - displayIndex * ITEM_HEIGHT, displayItems.length)

	let drag = null
	let animPlayback = null

	function clampOrPass(v) {
		if (!circular) return clampOffset(v, displayItems.length)
		const maxV = CENTER_OFFSET + ITEM_HEIGHT
		const minV = CENTER_OFFSET - (2 * baseLen + 1) * ITEM_HEIGHT
		if (v > maxV) return maxV + (v - maxV) * 0.15
		if (v < minV) return minV + (v - minV) * 0.15
		return v
	}

	function resolveIndex(offset) {
		const raw = Math.round((CENTER_OFFSET - offset) / ITEM_HEIGHT)
		if (circular) return ((raw % baseLen) + baseLen) % baseLen
		return Math.max(0, Math.min(displayItems.length - 1, raw))
	}

	function nearestCopyOffset(idx, currentOffset) {
		if (!circular) return CENTER_OFFSET - idx * ITEM_HEIGHT
		const copies = [0, 1, 2]
			.map((c) => CENTER_OFFSET - (c * baseLen + idx) * ITEM_HEIGHT)
		return copies.reduce((a, b) =>
			Math.abs(a - currentOffset) < Math.abs(b - currentOffset) ? a : b,
		)
	}

	return {
		mount(el) {
			el.style.transition = 'none'
			el.style.transform = `translateY(${translateY}px)`
		},

		destroy() {
			if (animPlayback) animPlayback.stop()
			animPlayback = null
			drag = null
		},

		handlePointerDown(e) {
			e.preventDefault()
			if (animPlayback) animPlayback.stop()

			drag = {
				startY: e.clientY,
				startTranslate: translateY,
				lastY: e.clientY,
				lastTime: performance.now(),
				velocity: 0,
			}
		},

		handlePointerMove(e, el) {
			if (!drag) return
			const dy = e.clientY - drag.startY
			const now = performance.now()
			const dt = now - drag.lastTime

			if (dt > 0) {
				drag.velocity = (e.clientY - drag.lastY) / dt
			}
			drag.lastY = e.clientY
			drag.lastTime = now

			const offset = clampOrPass(drag.startTranslate + dy)
			translateY = offset
			el.style.transition = 'none'
			el.style.transform = `translateY(${offset}px)`
		},

		handlePointerUp(e, el, onChange) {
			if (!drag) return

			const initialVelocity = drag.velocity * 1000
			drag = null

			animPlayback = inertia({
				from: translateY,
				velocity: initialVelocity,
				min: circular ? undefined : CENTER_OFFSET - (displayItems.length - 1) * ITEM_HEIGHT,
				max: circular ? undefined : CENTER_OFFSET,
				bounceStiffness: 250,
				bounceDamping: 25,
				power: 0.8,
				timeConstant: 350,
				restDelta: 0.5,
				modifyTarget: (target) => {
					const idx = resolveIndex(target)
					return nearestCopyOffset(idx, target)
				},
				onUpdate: (v) => {
					translateY = v
					el.style.transform = `translateY(${v}px)`
				},
				onComplete: () => {
					const idx = resolveIndex(translateY)
					onChange(idx)
				},
			})
		},

		handlePointerCancel(e, el) {
			if (!drag) return
			drag = null
			const idx = resolveIndex(translateY)
			const target = nearestCopyOffset(idx, translateY)
			translateY = target
			el.style.transition = 'transform 180ms cubic-bezier(0.32, 0.72, 0, 1)'
			el.style.transform = `translateY(${target}px)`
		},
	}
}
