import puppeteer from 'puppeteer-core'
import { spawn } from 'node:child_process'

const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
const wait = ms => new Promise(r => setTimeout(r, ms))
const URL = 'http://127.0.0.1:4458/e2e/bottomsheet-animation.html'

// The slide-up keyframe runs for --tsu-duration-overlay-enter (350ms). Give
// generous margins so timing jitter cannot cause false failures.
const ENTRANCE_MS = 350
const SETTLE_WAIT = 500

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

const click = (page, id) => page.evaluate(id => {
	document.querySelector(`[data-testid="${id}"]`)?.click()
}, id)

// Polls every animation frame from the moment it starts (immediately after the
// click) and resolves as soon as the sheet is observably mid-entrance: either
// its computed transform is still translateY > 1px (slide still in progress) or
// a running CSS animation with a positive duration is present.
//
// NOTE: this intentionally does NOT use page.waitForFunction — in this setup
// puppeteer's rAF-polling waitForFunction can miss the entrance window (the
// animation is only ~350ms), while a same-page rAF loop started right after the
// click reliably observes it.
const waitForEntrance = (page, dataTestId, timeoutFrames = 90) => page.evaluate(dataTestId => new Promise(resolve => {
	let frame = 0
	const tick = () => {
		frame++
		const sheet = document.querySelector(`[data-testid="${dataTestId}"]`)?.closest('[role="dialog"]')
		if (sheet){
			const running = sheet.getAnimations().filter(a => a.playState === 'running')
			const m = getComputedStyle(sheet).transform.match(/matrix\(1, 0, 0, 1, 0, ([\d.]+)\)/)
			const mid = m ? parseFloat(m[1]) > 1 : false
			const animRunning = running.length >= 1 && running.some(a => (a.effect?.getTiming?.().duration ?? 0) > 0)
			if (mid || animRunning){
				resolve({ sawMid: mid, names: running.map(a => a.animationName) })
				return
			}
		}
		if (frame >= timeoutFrames) resolve({ sawMid: false, names: [] })
		else requestAnimationFrame(tick)
	}
	requestAnimationFrame(tick)
}), dataTestId)

const devServer = spawn('npm', ['run', 'dev', '--', '.', '--host', '127.0.0.1', '--port', '4458', '--strictPort', '--open', 'false'], {
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

	console.log('— open → slide-up entrance animation —')
	await click(page, 'open-a')

	const entrance = await waitForEntrance(page, 'sheet-a')
	expect(entrance.sawMid, `sheet starts below the viewport and slides up (${entrance.names.join(', ') || 'no running animation'})`)
	expect(entrance.names.length >= 1, `a slide-up animation is actively running on open (${entrance.names.join(', ')})`)

	await wait(SETTLE_WAIT)
	{
		const settled = await page.evaluate(() => {
			const sheet = document.querySelector('[data-testid="sheet-a"]')?.closest('[role="dialog"]')
			if (!sheet) return null
			return {
				transform: getComputedStyle(sheet).transform,
				running: sheet.getAnimations().filter(a => a.playState === 'running').length,
			}
		})
		expect(settled && settled.transform === 'matrix(1, 0, 0, 1, 0, 0)', `sheet settles at translateY(0) after entrance (${settled?.transform})`)
		expect(settled && settled.running === 0, `entrance animation finished (${settled?.running} still running)`)
	}

	console.log('— legacy always-mounted mode plays the same slide-up —')
	await click(page, 'open-b')
	const legacyEntrance = await waitForEntrance(page, 'sheet-b')
	expect(legacyEntrance.sawMid, `legacy (always-mounted) sheet also slides up when data-open is applied (${legacyEntrance.names.join(', ') || 'no running animation'})`)

	await wait(SETTLE_WAIT)

	console.log('— close still unmounts after the exit window —')
	await click(page, 'close-a'); await wait(ENTRANCE_MS + 150)
	{
		const gone = await page.evaluate(() => !document.querySelector('[data-testid="sheet-a"]'))
		expect(gone, 'sheet unmounted after close')
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
