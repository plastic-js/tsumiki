import { css } from '@emotion/css'
import { splitProps } from '@plastic-js/plastic'

const wrapperClass = css({
	flex: 1,
	minWidth: 0,
	position: 'relative',
})

const inputClass = css({
	width: '100%',
	height: '44px',
	background: 'var(--surface)',
	border: '1px solid var(--border)',
	borderRadius: '10px',
	padding: '0 14px 0 44px',
	color: 'var(--ink)',
	fontSize: '15px',
	fontFamily: 'inherit',
	outline: 'none',
	'&::placeholder': { color: 'var(--muted)' },
	'&:focus': { borderColor: 'var(--accent)' },
})

const iconClass = css({
	position: 'absolute',
	left: '13px',
	top: '50%',
	transform: 'translateY(-50%)',
	color: 'var(--muted)',
	pointerEvents: 'none',
	'& svg': { width: '18px', height: '18px' },
})

const SearchInput = (props)=> {
	const [local, rest] = splitProps(props, ['placeholder', 'onInput'])
	return (
		<div className={wrapperClass}>
			<span aria-hidden='true' className={iconClass}>
				<SearchIcon />
			</span>
			<input
				className={inputClass}
				onInput={local.onInput}
				placeholder={local.placeholder ?? 'Search...'}
				type='search'
				{...rest}
			/>
		</div>
	)
}

function SearchIcon(){
	return (
		<svg
			fill='none' stroke='currentColor' strokeLinecap='round' strokeLinejoin='round'
			strokeWidth='2' viewBox='0 0 24 24'
		>
			<circle cx='11' cy='11' r='7' />
			<path d='M21 21l-4.35-4.35' />
		</svg>
	)
}

export default SearchInput
