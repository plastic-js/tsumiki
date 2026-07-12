import './global.css'
import { NavLink, Route, Router, navigate, onMount, renderApp } from '@plastic-js/plastic'
import DatePickerMobilePage from './pages/DatePickerMobilePage.jsx'
import FilterableSelectPage from './pages/FilterableSelectPage.jsx'
import FilterableSelectMobilePage from './pages/FilterableSelectMobilePage.jsx'
import SelectMobilePage from './pages/SelectMobilePage.jsx'
import FilterableSelectMobileInDialogPage from './pages/FilterableSelectMobileInDialogPage.jsx'

const showcases = [
	{ name: 'DatePickerMobile', path: '/date-picker-mobile', Component: DatePickerMobilePage },
	{ name: 'FilterableSelect', path: '/filterable-select', Component: FilterableSelectPage },
	{ name: 'FilterableSelectMobile', path: '/filterable-select-mobile', Component: FilterableSelectMobilePage },
	{ name: 'FilterableSelectMobile (in Dialog)', path: '/filterable-select-mobile-in-dialog', Component: FilterableSelectMobileInDialogPage },
	{ name: 'SelectMobile', path: '/select-mobile', Component: SelectMobilePage },
]

const Home = ()=> {
	onMount(()=> navigate('/filterable-select', { replace: true }))
	return null
}

const routes = [
	<Route component={Home} path='/' />,
	...showcases.map((s)=> <Route component={s.Component} key={s.path} path={s.path} />),
]

renderApp(
	document.getElementById('app'),
	<div className='app'>
		<aside className='sidebar'>
			<h2>Components</h2>
			{showcases.map((s)=> (
				<NavLink activeClass='active' className='nav-btn' key={s.path} to={s.path}>
					{s.name}
				</NavLink>
			))}
		</aside>
		<main className='main'>
			<Router>{routes}</Router>
		</main>
	</div>,
)