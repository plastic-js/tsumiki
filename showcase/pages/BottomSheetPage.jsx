import { createSignal } from '@plastic-js/plastic'
import BottomSheet from '../../src/components/BottomSheet.jsx'

function BottomSheetPage(){
	const open1 = createSignal(false)
	const open2 = createSignal(false)
	const open3 = createSignal(false)
	const open4 = createSignal(false)

	return (
		<div className='container'>
			<div className='hero'>
				<p className='eyebrow'>Overlay</p>
				<h1>Bottom Sheet</h1>
				<p className='hero-copy'>
					A free-form presentation layer: a draggable grabber plus a content area.
					Content has no vertical padding and does not scroll — the consumer owns spacing and scrolling.
				</p>
			</div>

			<div className='feature-card'>
				<p className='demo-label'>Normal Length (no scroll)</p>
				<button className='demo-tag-btn' onClick={()=> open1(true)} type='button'>Open Sheet</button>
				<BottomSheet open={open1} onOpenChange={({ open })=> open1(open)}>
					<div style="padding:8px 24px">
						<p style="font-size:15px;font-weight:600;color:var(--tsu-fg);margin:0 0 8px">Options</p>
						<p style="font-size:14px;color:var(--tsu-fg);margin:0 0 24px;line-height:1.6">
							Short content — the sheet sizes to its content, capped at 70vh.
						</p>
					</div>
				</BottomSheet>
			</div>

			<div className='feature-card'>
				<p className='demo-label'>Super Long (max-height cap)</p>
				<button className='demo-tag-btn' onClick={()=> open2(true)} type='button'>Open Long Sheet</button>
				<BottomSheet open={open2} onOpenChange={({ open })=> open2(open)}>
					<div style="padding:8px 24px;display:flex;flex-direction:column;min-height:0;flex:1">
						<p style="font-size:15px;font-weight:600;color:var(--tsu-fg);margin:0 0 8px">List</p>
						<div style="flex:1;min-height:0;overflow-y:auto;display:flex;flex-direction:column;gap:8px">
							{Array.from({ length: 30 }, (_, i)=> (
								<div key={i} style="padding:12px 0;border-bottom:1px solid var(--tsu-neutral-7);font-size:14px;color:var(--tsu-fg)">
									Item {i + 1}
								</div>
							))}
						</div>
					</div>
				</BottomSheet>
			</div>

			<div className='feature-card'>
				<p className='demo-label'>No Grabber</p>
				<button className='demo-tag-btn' onClick={()=> open3(true)} type='button'>Open Without Grabber</button>
				<BottomSheet open={open3} onOpenChange={({ open })=> open3(open)} draggable={false}>
					<div style="padding:16px 24px">
						<p style="font-size:14px;color:var(--tsu-fg);margin:0 0 24px;line-height:1.6">
							No grabber — dismiss via the backdrop. Spacing is fully consumer-owned.
						</p>
					</div>
				</BottomSheet>
			</div>

			<div className='feature-card'>
				<p className='demo-label'>Multiple Parts + Scrolling Section</p>
				<button className='demo-tag-btn' onClick={()=> open4(true)} type='button'>Open Multi-Part Sheet</button>
				<BottomSheet open={open4} onOpenChange={({ open })=> open4(open)}>
					<div style="padding:8px 24px;display:flex;flex-direction:column;min-height:0;flex:1">
						<p style="font-size:15px;font-weight:600;color:var(--tsu-fg);margin:0 0 12px">Confirm Action</p>
						<div style="flex:1;min-height:0;overflow-y:auto;display:flex;flex-direction:column;gap:8px;margin-bottom:12px">
							{Array.from({ length: 20 }, (_, i)=> (
								<div key={i} style="padding:12px 0;border-bottom:1px solid var(--tsu-neutral-7);font-size:14px;color:var(--tsu-fg)">
									Option {i + 1}
								</div>
							))}
						</div>
						<div style="display:flex;gap:12px">
							<button className='demo-tag-btn' style="flex:1" onClick={()=> open4(false)} type='button'>Cancel</button>
							<button className='demo-tag-btn' style="flex:1" onClick={()=> open4(false)} type='button'>Confirm</button>
						</div>
					</div>
				</BottomSheet>
			</div>
		</div>
	)
}

export default BottomSheetPage
