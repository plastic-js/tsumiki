import { createSignal } from '@plastic-js/plastic'
import Dialog from '../../src/components/Dialog.jsx'
import FilterableSelectMobile from '../../src/components/FilterableSelectMobile.jsx'

// ── sample data ──────────────────────────────────────────────────────────
const cities = [
	{ value: 'tpe', label: '台北市 Taipei' },
	{ value: 'ntpc', label: '新北市 New Taipei' },
	{ value: 'txg', label: '台中市 Taichung' },
	{ value: 'tnn', label: '台南市 Tainan' },
	{ value: 'kxg', label: '高雄市 Kaohsiung' },
	{ value: 'tao', label: '桃園市 Taoyuan' },
	{ value: 'hsq', label: '新竹市 Hsinchu' },
	{ value: 'hld', label: '花蓮縣 Hualien' },
	{ value: 'ttt', label: '台東縣 Taitung' },
	{ value: 'ilo', label: '宜蘭縣 Yilan' },
	{ value: 'cyi', label: '嘉義市 Chiayi' },
	{ value: 'kln', label: '基隆市 Keilung' },
	{ value: 'mia', label: '苗栗縣 Miaoli' },
	{ value: 'nnt', label: '南投縣 Nantou' },
	{ value: 'phd', label: '澎湖縣 Penghu' },
	{ value: 'kmm', label: '金門縣 Kinmen' },
	{ value: 'lien', label: '連江縣 Lienchiang' },
]

// ── FilterableSelectMobile inside Dialog ─────────────────────────────────
export default function FilterableSelectMobileInDialogPage(){
	const value = createSignal(null)
	const open = createSignal(false)

	return (
		<div className='demo-col'>
			<h3 className='demo-h3'>FilterableSelectMobile inside Dialog</h3>
			<p style={{ color: '#666', fontSize: '14px', marginBottom: '12px' }}>
				This reproduces the Chrome iOS focus-lock bug when FilterableSelectMobile is nested inside Dialog.Root.
			</p>
			<button
				onClick={() => open(true)}
				style={{
					padding: '10px 16px',
					fontSize: '15px',
					borderRadius: '8px',
					border: '1px solid var(--border)',
					background: 'var(--accent)',
					color: '#fff',
					cursor: 'pointer',
				}}
			>
				Open Dialog
			</button>

			<Dialog.Root open={open} onOpenChange={open}>
				<Dialog.Backdrop />
				<Dialog.Positioner>
					<Dialog.Content style={{ maxWidth: '480px', width: '100%' }}>
						<Dialog.Title style={{ padding: '16px 20px', borderBottom: '1px solid var(--border)' }}>
							Select City
						</Dialog.Title>
						<div style={{ padding: '20px' }}>
							<FilterableSelectMobile
								items={cities}
								itemToValue={item => item.value}
								itemToLabel={item => item.label}
								value={value}
								onValueChange={v => value(v)}
								placeholder='Search city…'
							/>
							<div style={{ marginTop: '16px', fontSize: '14px', color: '#666' }}>
								Selected: {() => {
									const v = value()
									if (!v) return <em style={{ color: '#999' }}>none</em>
									const item = cities.find(c => c.value === v)
									return item ? item.label : v
								}}
							</div>
						</div>
						<div style={{ padding: '14px 20px 20px', display: 'flex', gap: '10px', borderTop: '1px solid var(--border)' }}>
							<Dialog.CloseTrigger
								style={{
									flex: 1,
									padding: '10px',
									borderRadius: '8px',
									border: '1px solid var(--border)',
									background: 'transparent',
									color: 'var(--ink)',
									cursor: 'pointer',
								}}
							>
								Cancel
							</Dialog.CloseTrigger>
						</div>
					</Dialog.Content>
				</Dialog.Positioner>
			</Dialog.Root>
		</div>
	)
}
