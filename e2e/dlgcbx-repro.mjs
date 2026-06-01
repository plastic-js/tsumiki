import puppeteer from 'puppeteer-core'
import { spawn } from 'node:child_process'

const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
const wait = ms=> new Promise(r=> setTimeout(r, ms))
const DEV_URL = 'http://127.0.0.1:4455/e2e/dlgcbx.html'

const waitForUrl = async(url, timeoutMs = 15000)=> {
	const startedAt = Date.now()
	while (Date.now() - startedAt < timeoutMs){
		try {
			const res = await fetch(url, { method: 'GET' })
			if (res.ok){ return }
		} catch {}
		await wait(200)
	}
	throw new Error(`Timed out waiting for ${url}`)
}

const devServer = spawn('npm', ['run', 'dev', '--', '--host', '127.0.0.1', '--port', '4455', '--strictPort', '--open', 'false'], {
	stdio: ['ignore', 'pipe', 'pipe'],
	env: { ...process.env, BROWSER: 'none' },
})

devServer.stdout.on('data', chunk=> process.stdout.write(chunk))
devServer.stderr.on('data', chunk=> process.stderr.write(chunk))

try {
	await waitForUrl(DEV_URL)
	const browser = await puppeteer.launch({ executablePath: CHROME, headless: 'new', args: ['--no-sandbox'] })
	const page = await browser.newPage()
	await page.goto(DEV_URL, { waitUntil: 'networkidle0' })
	await page.waitForSelector('[data-testid="input"]')
	const val = async()=> page.$eval('[data-testid="input"]', e=> e.value)

	await page.click('[data-testid="trigger"]'); await wait(200)
	await page.click('.cb-item[data-value="3"]'); await wait(200)
	console.log('selected:', JSON.stringify(await val()))

	await browser.close()
} finally {
	devServer.kill('SIGTERM')
}
