import puppeteer from 'puppeteer-core'
import { spawn } from 'node:child_process'

const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
const wait = ms => new Promise(r => setTimeout(r, ms))
const URL = 'http://127.0.0.1:4459/e2e/select-in-dialog.html'

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

// Where does the open Select sheet live in the DOM? It must be portaled to
// <body> — an independent overlay outside the Dialog's content tree — so the
// backdrop is a real full-screen layer (inline inside the dialog body, a
// `-webkit-overflow-scrolling: touch` container, iOS pins `position: fixed`
// descendants to it).
const sheetLocation = page => page.evaluate(() => {
	const input = document.querySelector('[data-part="list"] input[type="text"]')
	const sheet = input?.closest('[aria-label="BottomSheet"]')
	if (!input || !sheet) return { mounted: false }
	return {
		mounted: true,
		portaledToBody: sheet.parentElement === sheet.ownerDocument.body,
		insideDialogScope: !!input.closest('[data-scope="dialog"]'),
		dialogCount: document.querySelectorAll('[role="dialog"]').length,
	}
})

// Simulate a tap on the filter input and check it receives focus (the WebKit
// focus-lock symptom is that focus is stolen back, so document.activeElement
// stays on the dialog instead of the input).
const tapInput = page => page.evaluate(() => {
	const input = document.querySelector('[data-part="list"] input[type="text"]')
	input.focus()
	input.dispatchEvent(new MouseEvent('mousedown', { bubbles: true }))
	input.dispatchEvent(new MouseEvent('mouseup', { bubbles: true }))
	input.dispatchEvent(new MouseEvent('click', { bubbles: true }))
	return {
		activeIsInput: document.activeElement === input,
		activeTag: document.activeElement?.tagName?.toLowerCase(),
	}
})

const click = (page, sel) => page.evaluate(s => { document.querySelector(s)?.click() }, sel)

const devServer = spawn('npm', ['run', 'dev', '--', '.', '--host', '127.0.0.1', '--port', '4459', '--strictPort', '--open', 'false'], {
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
	await page.waitForSelector('[data-testid="open-dialog"]')

	console.log('— opening the dialog —')
	await click(page, '[data-testid="open-dialog"]'); await wait(250)
	{
		const dialogs = await page.evaluate(() => document.querySelectorAll('[role="dialog"]').length)
		expect(dialogs >= 1, `dialog is open (dialogs=${dialogs})`)
	}

	console.log('— opening the Select inside the dialog —')
	await click(page, '[data-testid="select-trigger"]'); await wait(450)
	{
		const loc = await sheetLocation(page)
		expect(loc.mounted, 'Select sheet is mounted')
		expect(loc.portaledToBody, 'Select sheet portals to <body> (independent overlay, own backdrop)')
		expect(!loc.insideDialogScope, 'Select sheet is OUTSIDE the Dialog content tree')
	}

	console.log('— tapping the filter input keeps focus (no focus-lock) —')
	{
		const r = await tapInput(page)
		expect(r.activeIsInput, `filter input holds focus after tap (activeElement=${r.activeTag})`)
	}

	console.log('— the item list inside the dialog is scrollable —')
	{
		const r = await page.evaluate(() => {
			const list = document.querySelector('[data-part="list"]')
			if (!list) return { mounted: false }
			const before = list.scrollTop
			list.scrollTop = 120
			const scrolled = list.scrollTop
			list.scrollTop = before
			return {
				mounted: true,
				scrollable: list.scrollHeight > list.clientHeight,
				canScroll: scrolled === 120,
			}
		})
		expect(r.mounted, 'Select list is mounted')
		expect(r.scrollable, 'Select list overflows (scrollHeight > clientHeight)')
		expect(r.canScroll, 'Select list scrolls (scrollTop changes)')
	}

	console.log('— closing the Select sheet via backdrop keeps the dialog open —')
	await page.evaluate(() => {
		// The Select sheet portals to <body>; its backdrop is the body child with
		// data-part=backdrop that is NOT the Dialog's (the Dialog's has
		// data-scope=dialog and sits earlier in DOM order).
		document.querySelector('body > [data-part="backdrop"]:not([data-scope])')?.click()
	})
	await wait(450)
	{
		const state = await page.evaluate(() => ({
			sheets: document.querySelectorAll('[data-part="list"]').length,
			dialogs: document.querySelectorAll('[role="dialog"]').length,
		}))
		expect(state.sheets === 0 && state.dialogs === 1, `sheet closed, dialog still open (sheets=${state.sheets}, dialogs=${state.dialogs})`)
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
