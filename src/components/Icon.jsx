import { css } from '@emotion/css'
import { mergeProps, splitProps } from '@plastic-js/plastic'

const read = (v)=> typeof v === 'function' ? v() : v

// Sanitize a raw SVG string before injecting it via innerHTML. Parses the
// markup and strips anything that could execute: <script> elements and any
// on* event-handler attributes or javascript: URLs (e.g. onload, xlink:href).
// Returns an empty string when the input is not a parseable <svg>.
const sanitizeSvg = (svgString)=> {
	let doc
	try {
		doc = new DOMParser().parseFromString(svgString, 'image/svg+xml')
	} catch {
		return ''
	}
	if (!doc || doc.querySelector('parsererror')) return ''
	const svg = doc.querySelector('svg')
	if (!svg) return ''
	svg.querySelectorAll('script').forEach(el => { el.remove() })
	// querySelectorAll('*') excludes the <svg> root, so walk root + descendants.
	const all = [svg, ...Array.from(svg.querySelectorAll('*'))]
	for (const el of all) {
		for (const attr of Array.from(el.attributes)) {
			const name = attr.name.toLowerCase()
			if (name.startsWith('on') || /^\s*javascript:/i.test(attr.value)) {
				el.removeAttribute(attr.name)
			}
		}
	}
	return svg.outerHTML
}

const iconClass = css({
	display: 'inline-flex',
	alignItems: 'center',
	justifyContent: 'center',
	color: 'currentColor',
	'& svg': {
		width: '100%', height: '100%', display: 'block', strokeWidth: 'var(--icon-sw)',
	},
})

const Icon = (props = {})=> {
	const [local] = splitProps(
		mergeProps({ size: 22, strokeWidth: 1.25 }, props),
		['svg', 'size', 'strokeWidth', 'className'],
	)
	return ()=> {
		const svgContent = read(local.svg)
		const s = read(local.size)
		const sw = read(local.strokeWidth)
		const cls = read(local.className)
		const style = { width: `${s}px`, height: `${s}px`, '--icon-sw': sw }
		const setEl = (el)=> {
			if (!el) return
			const safe = sanitizeSvg(svgContent)
			if (el.innerHTML !== safe) el.innerHTML = safe
		}
		return <span className={cls ? `${iconClass} ${cls}` : iconClass} ref={setEl} style={style} />
	}
}

export default Icon
export { Icon }
