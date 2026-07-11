// Anatomy for SelectMobile — the named parts the component renders.
// Every rendered element carries `data-scope="select-mobile"` + `data-part="<name>"`,
// so consumers can target any part with CSS (e.g. [data-part="item"][data-selected]).
export const SCOPE = 'select-mobile'

export const anatomy = [
	'trigger',
	'triggerValue',
	'triggerIndicator',
	'positioner',
	'backdrop',
	'content',
	'grabber',
	'list',
	'item',
	'itemText',
	'itemIndicator',
]

// Returns the data attributes for a given anatomy part.
export const part = name=> ({ 'data-scope': SCOPE, 'data-part': name })