import puppeteer from 'puppeteer-core'
import { spawn } from 'node:child_process'

const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
const wait = ms => new Promise(r => setTimeout(r, ms))
const URL = 'http://127.0.0.1:4457/e2e/select-rerender.html'

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

const itemCount = page => page.evaluate(() => {
	const list = document.querySelector('[data-part="list"]')
	if (!list) return -1
	return list.querySelectorAll('[data-part="item"]').length
})

const openSheet = (page, testId) => page.evaluate(testId => {
	document.querySelector(`[data-testid="${testId}"]`)?.click()
}, testId)

const closeSheet = async page => {
	await page.evaluate(() => {
		document.querySelector('[data-part="backdrop"]')?.click()
	})
	await wait(450)
}

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
	await page.waitForSelector('[data-testid="client-trigger"]')

	console.log('— first open: client (3) —')
	await openSheet(page, 'client-trigger'); await wait(400)
	const firstClient = await itemCount(page)
	expect(firstClient === 3, `client items on first open = ${firstClient} (expect 3)`)
	await closeSheet(page)

	console.log('— first open: day (31) —')
	await openSheet(page, 'day-trigger'); await wait(400)
	const firstDay = await itemCount(page)
	expect(firstDay === 31, `day items on first open = ${firstDay} (expect 31)`)
	await closeSheet(page)

	console.log('— second open: client (3) —')
	await openSheet(page, 'client-trigger'); await wait(400)
	const secondClient = await itemCount(page)
	expect(secondClient === 3, `client items on second open = ${secondClient} (expect 3)`)
	await closeSheet(page)

	console.log('— second open: day (31) —')
	await openSheet(page, 'day-trigger'); await wait(400)
	const secondDay = await itemCount(page)
	expect(secondDay === 31, `day items on second open = ${secondDay} (expect 31)`)
	await closeSheet(page)

	console.log('— filter variant: first/second open + filtering —')
	await openSheet(page, 'filter-trigger'); await wait(400)
	const filterFirst = await itemCount(page)
	expect(filterFirst === 3, `filtered select items on first open = ${filterFirst} (expect 3)`)
	await page.type('[data-part="list"] input[type="text"]', 'Client 2')
	await wait(300)
	const filtered = await itemCount(page)
	expect(filtered === 1, `typed filter narrows to 1 (got ${filtered})`)
	await closeSheet(page)
	await openSheet(page, 'filter-trigger'); await wait(400)
	const filterSecond = await itemCount(page)
	expect(filterSecond === 3, `filtered select items on second open = ${filterSecond} (expect 3)`)

	console.log(failures === 0 ? '\nPASS' : `\n${failures} FAILURES`)
} catch (err) {
	console.error('verify: ERROR', err)
	failures = 1
} finally {
	await browser?.close()
	devServer.kill('SIGTERM')
	process.exit(failures === 0 ? 0 : 1)
}
