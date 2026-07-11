import './global.css'
import { NavLink, Route, Router, navigate, onMount, renderApp } from '@plastic-js/plastic'
import FilterableSelectPage from './pages/FilterableSelectPage.jsx'
import FilterableSelectMobilePage from './pages/FilterableSelectMobilePage.jsx'
import SelectMobilePage from './pages/SelectMobilePage.jsx'

const showcases = [
	{ name: 'FilterableSelect', path: '/filterable-select', Component: FilterableSelectPage },
	{ name: 'FilterableSelectMobile', path: '/filterable-select-mobile', Component: FilterableSelectMobilePage },
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