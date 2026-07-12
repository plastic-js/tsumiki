import puppeteer from 'puppeteer-core'
import { spawn } from 'node:child_process'

const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
const wait = ms => new Promise(r => setTimeout(r, ms))
const URL = 'http://127.0.0.1:4457/e2e/dialog-portal.html'

const waitForUrl = async (url, timeoutMs = 20000) => {
	const startedAt = Date.now()
	while (Date.now() - startedAt < timeoutMs) {
		try { const res = await fetch(url); if (res.ok) return } catch {}
		await wait(200)
	}
	throw new Error(`Timed out waiting for ${url}`)
}

let failures = 0
const expect = (cond, msg) => {
	console.log(`${cond ? '  ok' : '  FAIL'}  ${msg}`)
	if (!cond) failures++
}

// The original bug polluted <body> directly: every closed dialog left its
// Either anchor (<!--if-->) + null placeholder (<!--null-->) + dynamic markers
// as direct children of document.body (the Portal target). After the fix these
// only live inside the owning card, so <body> itself must stay comment-free
// while every dialog is closed. While one dialog is open, ark's own Backdrop /
// Positioner Eithers may leave a transient `if` anchor in <body> (gone on
// close) — but never a `null` placeholder or dynamic marker.
const bodyDirectCommentKinds = page => page.evaluate(() => {
	const counts = {}
	for (const child of document.body.childNodes){
		if (child.nodeType === 8){
			counts[child.data] = (counts[child.data] || 0) + 1
		}
	}
	return counts
})

const mounted = page => page.evaluate(() => ({
	sheet2: !!document.querySelector('[data-testid="sheet-dlg-2"]'),
	modal1: !!document.querySelector('[data-testid="modal-dlg-1"]'),
	roles: document.querySelectorAll('[role="dialog"]').length,
}))

const click = (page, selector) => page.evaluate(sel => {
	document.querySelector(sel)?.click()
}, selector)

const clickCancel = page => page.evaluate(() => {
	document.querySelector('[data-part="negative-trigger"]')?.click()
})

const devServer = spawn('npm', ['run', 'dev', '--', '.', '--host', '127.0.0.1', '--port', '4457', '--strictPort', '--open', 'false'], {
	stdio: ['ignore', 'pipe', 'pipe'],
	env: { ...process.env, BROWSER: 'none' },
})
devServer.stdout.on('data', c => process.stdout.write(c))
devServer.stderr.on('data', c => process.stderr.write(c))

let browser
try {
	console.log('verify: starting')
	await waitForUrl(URL)
	browser = await puppeteer.launch({ executablePath: CHROME, headless: 'new', args: ['--no-sandbox'] })
	const page = await browser.newPage()
	await page.goto(URL, { waitUntil: 'networkidle0' })
	await page.waitForSelector('[data-testid="open-sheet-2"]')

	console.log('— 8 mounted-but-closed dialogs pollute nothing in <body> —')
	{
		const c = await bodyDirectCommentKinds(page)
		const m = await mounted(page)
		expect(Object.keys(c).length === 0, `closed dialogs leave no comment nodes as <body> children (got ${JSON.stringify(c)})`)
		expect(!m.sheet2 && !m.modal1 && m.roles === 0, `no dialog content mounted while closed (roles=${m.roles})`)
	}

	console.log('— opening a sheet portals content without placeholder pollution —')
	await click(page, '[data-testid="open-sheet-2"]'); await wait(150)
	{
		const m = await mounted(page)
		const c = await bodyDirectCommentKinds(page)
		expect(m.sheet2, 'sheet dialog content appears in <body>')
		expect(m.roles === 1, `exactly one dialog mounted (roles=${m.roles})`)
		expect(!c.null && !c['dynamic-start'] && !c['dynamic-end'], `open dialog has no null/dynamic placeholders in <body> (got ${JSON.stringify(c)})`)
		expect((c.if ?? 0) <= 2, `only ark-internal transient 'if' anchors while open (got ${JSON.stringify(c)})`)
	}

	console.log('— closing removes content and leaves <body> clean —')
	await clickCancel(page); await wait(150)
	{
		const m = await mounted(page)
		const c = await bodyDirectCommentKinds(page)
		expect(!m.sheet2 && m.roles === 0, 'sheet content unmounted after close')
		expect(Object.keys(c).length === 0, `<body> still comment-free after close (got ${JSON.stringify(c)})`)
	}

	console.log('— modal mode behaves identically —')
	await click(page, '[data-testid="open-modal-1"]'); await wait(150)
	{
		const m = await mounted(page)
		expect(m.modal1, 'modal content appears in <body>')
	}
	await clickCancel(page); await wait(150)
	{
		const m = await mounted(page)
		const c = await bodyDirectCommentKinds(page)
		expect(!m.modal1 && m.roles === 0, 'modal content unmounted after close')
		expect(Object.keys(c).length === 0, `<body> comment-free after modal close (got ${JSON.stringify(c)})`)
	}

	console.log('— repeated open/close cycles accumulate nothing —')
	for (let i = 0; i < 3; i++){
		await click(page, '[data-testid="open-sheet-2"]'); await wait(120)
		await clickCancel(page); await wait(120)
	}
	{
		const c = await bodyDirectCommentKinds(page)
		const m = await mounted(page)
		expect(m.roles === 0, 'no dialog remains mounted after cycles')
		expect(Object.keys(c).length === 0, `repeated cycles leave <body> comment-free (got ${JSON.stringify(c)})`)
	}

	console.log(failures === 0 ? '\nPASS' : `\n${failures} FAILURES`)
} catch (err) {
	console.error('verify: ERROR', err)
	failures = 1
} finally {
	await browser?.close()
	devServer.kill('SIGTERM')
	process.exit(failures === 0 ? 0 : 1)
}
