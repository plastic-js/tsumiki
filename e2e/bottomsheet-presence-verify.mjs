import puppeteer from 'puppeteer-core'
import { spawn } from 'node:child_process'

const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
const wait = ms => new Promise(r => setTimeout(r, ms))
const URL = 'http://127.0.0.1:4456/e2e/bottomsheet-presence.html'

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

const state = page => page.evaluate(() => ({
	sheets: document.querySelectorAll('[role="dialog"][aria-label="BottomSheet"]').length,
	backdrops: document.querySelectorAll('[data-part="backdrop"]').length,
	a: !!document.querySelector('[data-testid="sheet-a"]'),
	b: !!document.querySelector('[data-testid="sheet-b"]'),
	c: !!document.querySelector('[data-testid="sheet-c"]'),
	d: !!document.querySelector('[data-testid="sheet-d"]'),
}))

const click = (page, id) => page.evaluate(id => {
	document.querySelector(`[data-testid="${id}"]`)?.click()
}, id)

const devServer = spawn('npm', ['run', 'dev', '--', '.', '--host', '127.0.0.1', '--port', '4456', '--strictPort', '--open', 'false'], {
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
	await page.waitForSelector('[data-testid="open-a"]')

	console.log('— initial state —')
	// B (legacy, closed) and C (initially open) are mounted; A and D (never opened) are not.
	{
		const s = await state(page)
		expect(s.sheets === 2, `closed+legacy+initial-open → ${s.sheets} sheet nodes (expect 2)`)
		expect(s.backdrops === 2, `→ ${s.backdrops} backdrop nodes (expect 2)`)
		expect(s.a === false, 'never-opened A renders no node')
		expect(s.b === true, 'legacy B mounted while closed')
		expect(s.c === true, 'initially-open C mounted at load')
		expect(s.d === false, 'never-opened D renders no node')
	}

	console.log('— open → mount —')
	await click(page, 'open-a'); await wait(300)
	{
		const s = await state(page)
		expect(s.sheets === 3 && s.a, `opening A mounts it (${s.sheets} sheets)`)
		expect(s.backdrops === 3, `backdrops follow (${s.backdrops})`)
	}

	console.log('— close → exit window then unmount —')
	await click(page, 'close-a')
	await wait(80)
	{
		const s = await state(page)
		expect(s.a, 'A still mounted inside the exit window')
	}
	await wait(400)
	{
		const s = await state(page)
		expect(s.sheets === 2 && !s.a, `A unmounted after exit animation (${s.sheets} sheets)`)
	}

	console.log('— rapid reopen during exit window cancels the unmount —')
	await click(page, 'open-a'); await wait(300)
	await click(page, 'close-a'); await wait(50)
	await click(page, 'open-a')
	await wait(350)
	{
		const s = await state(page)
		expect(s.a, 'reopen during exit keeps A mounted (timer cancelled)')
	}
	await click(page, 'close-a'); await wait(400)
	{
		const s = await state(page)
		expect(!s.a, 'A unmounted after final close')
	}

	console.log('— legacy mode stays mounted after close —')
	await click(page, 'open-b'); await wait(300)
	await click(page, 'close-b'); await wait(400)
	{
		const s = await state(page)
		expect(s.b, 'legacy B (unmountOnExit=false) stays mounted after close')
	}

	console.log('— drag-to-dismiss close still plays the exit window —')
	await click(page, 'open-d'); await wait(300)
	{
		const s = await state(page)
		expect(s.d, 'D open for drag test')
	}
	const grabber = await page.evaluate(() => {
		const el = document.querySelector('[data-testid="sheet-d"]').closest('[role="dialog"]').querySelector('[data-part="grabber"]')
		const r = el.getBoundingClientRect()
		return { x: r.x + r.width / 2, y: r.y + r.height / 2 }
	})
	await page.mouse.move(grabber.x, grabber.y)
	await page.mouse.down()
	await page.mouse.move(grabber.x, grabber.y + 300, { steps: 12 })
	await page.mouse.up()
	await wait(80)
	{
		const s = await state(page)
		expect(s.d, 'D still mounted inside exit window after drag-dismiss')
	}
	await wait(400)
	{
		const s = await state(page)
		expect(!s.d, 'D unmounted after exit animation')
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
