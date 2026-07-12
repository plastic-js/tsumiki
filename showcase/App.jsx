import '../src/styles/tokens.css'
import '../src/styles/reset.css'
import './global.css'
import './side-menu.css'
import { createEffect, createSignal, Loop, renderApp } from '@plastic-js/plastic'
import AccordionPage from './pages/AccordionPage.jsx'
import AvatarPage from './pages/AvatarPage.jsx'
import BadgePage from './pages/BadgePage.jsx'
import BackToTopPage from './pages/BackToTopPage.jsx'
import BottomNavigationPage from './pages/BottomNavigationPage.jsx'
import ButtonPage from './pages/ButtonPage.jsx'
import CardPage from './pages/CardPage.jsx'
import CardNumberInputPage from './pages/CardNumberInputPage.jsx'
import CarouselPage from './pages/CarouselPage.jsx'
import CheckboxPage from './pages/CheckboxPage.jsx'
import ClipboardPage from './pages/ClipboardPage.jsx'
import CloseButtonPage from './pages/CloseButtonPage.jsx'
import CollapsiblePage from './pages/CollapsiblePage.jsx'
import ColorPickerPage from './pages/ColorPickerPage.jsx'
import ComboboxPage from './pages/ComboboxPage.jsx'
import ConfirmPage from './pages/ConfirmPage.jsx'
import DatePickerPage from './pages/DatePickerPage.jsx'
import DialogPage from './pages/DialogPage.jsx'
import BottomSheetPage from './pages/BottomSheetPage.jsx'
import DrawerPage from './pages/DrawerPage.jsx'
import FieldFieldsetPage from './pages/FieldFieldsetPage.jsx'
import FileUploadPage from './pages/FileUploadPage.jsx'
import FilterGroupPage from './pages/FilterGroupPage.jsx'
import IconPage from './pages/IconPage.jsx'
import InputPage from './pages/InputPage.jsx'
import ListboxPage from './pages/ListboxPage.jsx'
import LinkPage from './pages/LinkPage.jsx'
import MenuPage from './pages/MenuPage.jsx'
import MoneyInputPage from './pages/MoneyInputPage.jsx'
import NumberInputPage from './pages/NumberInputPage.jsx'
import PaginationPage from './pages/PaginationPage.jsx'
import PopoverPage from './pages/PopoverPage.jsx'
import ProgressPage from './pages/ProgressPage.jsx'
import RadioGroupPage from './pages/RadioGroupPage.jsx'
import RatingGroupPage from './pages/RatingGroupPage.jsx'
import SafeAreaPage from './pages/SafeAreaPage.jsx'
import SearchInputPage from './pages/SearchInputPage.jsx'
import SelectPage from './pages/SelectPage.jsx'
import SelectPcPage from './pages/SelectPcPage.jsx'
import SignaturePadPage from './pages/SignaturePadPage.jsx'
import SkeletonPage from './pages/SkeletonPage.jsx'
import SliderPage from './pages/SliderPage.jsx'
import SpinnerPage from './pages/SpinnerPage.jsx'
import SplitterPage from './pages/SplitterPage.jsx'
import StepsPage from './pages/StepsPage.jsx'
import StickyHeaderPage from './pages/StickyHeaderPage.jsx'
import SwipeRevealPage from './pages/SwipeRevealPage.jsx'
import SwitchPage from './pages/SwitchPage.jsx'
import TabsPage from './pages/TabsPage.jsx'
import TagPage from './pages/TagPage.jsx'
import TagsInputPage from './pages/TagsInputPage.jsx'
import ToastPage from './pages/ToastPage.jsx'
import TogglePage from './pages/TogglePage.jsx'
import ToggleGroupPage from './pages/ToggleGroupPage.jsx'
import TourPage from './pages/TourPage.jsx'
import TreeViewPage from './pages/TreeViewPage.jsx'

const allCategories = [
  {
    label: 'Inputs & Forms',
    items: [
      { key: '/input', label: 'Input', Component: InputPage },
      { key: '/number-input', label: 'Number Input', Component: NumberInputPage },
      { key: '/money-input', label: 'Money Input', Component: MoneyInputPage },
      { key: '/card-number-input', label: 'Card Number Input', Component: CardNumberInputPage },
      { key: '/search-input', label: 'Search Input', Component: SearchInputPage },
      { key: '/tags-input', label: 'Tags Input', Component: TagsInputPage },
      { key: '/date-picker', label: 'Date Picker', Component: DatePickerPage },
      { key: '/color-picker', label: 'Color Picker', Component: ColorPickerPage },
      { key: '/clipboard', label: 'Clipboard', Component: ClipboardPage },
    ],
  },
  {
    label: 'Buttons & Toggles',
    items: [
      { key: '/button', label: 'Button', Component: ButtonPage },
      { key: '/checkbox', label: 'Checkbox', Component: CheckboxPage },
      { key: '/switch', label: 'Switch', Component: SwitchPage },
      { key: '/radio-group', label: 'Radio Group', Component: RadioGroupPage },
      { key: '/toggle', label: 'Toggle', Component: TogglePage },
      { key: '/toggle-group', label: 'Toggle Group', Component: ToggleGroupPage },
      { key: '/filter-group', label: 'Filter Group', Component: FilterGroupPage },
    ],
  },
  {
    label: 'Selection & Capture',
    items: [
      { key: '/select', label: 'Select', Component: SelectPage },
      { key: '/selectpc', label: 'Select pc', Component: SelectPcPage },
      { key: '/combobox', label: 'Combobox', Component: ComboboxPage },
      { key: '/listbox', label: 'Listbox', Component: ListboxPage },
      { key: '/file-upload', label: 'File Upload', Component: FileUploadPage },
      { key: '/signature-pad', label: 'Signature Pad', Component: SignaturePadPage },
    ],
  },
  {
    label: 'Navigation & Data',
    items: [
      { key: '/tabs', label: 'Tabs', Component: TabsPage },
      { key: '/steps', label: 'Steps', Component: StepsPage },
      { key: '/menu', label: 'Menu', Component: MenuPage },
      { key: '/tour', label: 'Tour', Component: TourPage },
      { key: '/pagination', label: 'Pagination', Component: PaginationPage },
      { key: '/tree-view', label: 'Tree View', Component: TreeViewPage },
      { key: '/bottom-navigation', label: 'Bottom Navigation', Component: BottomNavigationPage },
      { key: '/back-to-top', label: 'Back to Top', Component: BackToTopPage },
    ],
  },
  {
    label: 'Content & Layout',
    items: [
      { key: '/accordion', label: 'Accordion', Component: AccordionPage },
      { key: '/collapsible', label: 'Collapsible', Component: CollapsiblePage },
      { key: '/carousel', label: 'Carousel', Component: CarouselPage },
      { key: '/splitter', label: 'Splitter', Component: SplitterPage },
      { key: '/swipe-reveal', label: 'Swipe Reveal', Component: SwipeRevealPage },
      { key: '/card', label: 'Card', Component: CardPage },
      { key: '/link', label: 'Link', Component: LinkPage },
      { key: '/safe-area', label: 'Safe Area', Component: SafeAreaPage },
      { key: '/sticky-header', label: 'Sticky Header', Component: StickyHeaderPage },
    ],
  },
  {
    label: 'Elements',
    items: [
      { key: '/avatar', label: 'Avatar', Component: AvatarPage },
      { key: '/badge', label: 'Badge', Component: BadgePage },
      { key: '/icon', label: 'Icon', Component: IconPage },
      { key: '/tag', label: 'Tag', Component: TagPage },
      { key: '/close-button', label: 'Close Button', Component: CloseButtonPage },
      { key: '/skeleton', label: 'Skeleton', Component: SkeletonPage },
      { key: '/field-fieldset', label: 'Field & Fieldset', Component: FieldFieldsetPage },
    ],
  },
  {
    label: 'Feedback',
    items: [
      { key: '/slider', label: 'Slider', Component: SliderPage },
      { key: '/rating-group', label: 'Rating Group', Component: RatingGroupPage },
      { key: '/spinner', label: 'Spinner', Component: SpinnerPage },
      { key: '/progress', label: 'Progress', Component: ProgressPage },
    ],
  },
  {
    label: 'Overlays',
    items: [
      { key: '/dialog', label: 'Dialog', Component: DialogPage },
      { key: '/bottom-sheet', label: 'Bottom Sheet', Component: BottomSheetPage },
      { key: '/confirm', label: 'ConfirmDialog', Component: ConfirmPage },
      { key: '/toast', label: 'Toast', Component: ToastPage },
      { key: '/drawer', label: 'Drawer', Component: DrawerPage },
      { key: '/popover', label: 'Popover', Component: PopoverPage },
    ],
  },
]

const menuItems = allCategories.flatMap((cat)=> {
  const items = cat.items.map(s => ({ type: 'item', key: s.key, label: s.label, path: s.key }))
  return [{ type: 'category', key: cat.label, label: cat.label }, ...items]
})

const allShowcases = allCategories.flatMap(g => g.items)

const hamburgerIcon = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="22" height="22" aria-hidden="true">
    <line x1="4" y1="6" x2="20" y2="6" />
    <line x1="4" y1="12" x2="20" y2="12" />
    <line x1="4" y1="18" x2="20" y2="18" />
  </svg>
)

const sunIcon = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="20" height="20" aria-hidden="true">
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2v2" />
    <path d="M12 20v2" />
    <path d="m4.93 4.93 1.41 1.41" />
    <path d="m17.66 17.66 1.41 1.41" />
    <path d="M2 12h2" />
    <path d="M20 12h2" />
    <path d="m6.34 17.66-1.41 1.41" />
    <path d="m19.07 4.93-1.41 1.41" />
  </svg>
)

const moonIcon = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="20" height="20" aria-hidden="true">
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
  </svg>
)

const HomePage = (props)=> {
  return (
    <>
      <div className="home-header">
        <h2>Tsumiki</h2>
        <p>Mobile-first UI components for Plastic JS</p>
      </div>
      <div className="comp-list">
        {allCategories.map((cat)=> (
          <>
            <div className="comp-group-label">{cat.label}</div>
            {cat.items.map((s)=> (
              <button className="comp-card" key={s.key} onClick={()=> props.navigate(s.key)} type="button">
                <span className="comp-card-label">{s.label}</span>
              </button>
            ))}
          </>
        ))}
        <div className="comp-divider" />
      </div>
    </>
  )
}

const App = ()=> {
  const activeTab = createSignal('/')
  const drawerOpen = createSignal(false)

  const savedDark = localStorage.getItem('tsu-dark')
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
  const darkMode = createSignal(savedDark !== null ? savedDark === 'true' : prefersDark)
  createEffect(() => {
    if (darkMode()) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  })

  const navigate = (path)=> {
    activeTab(path)
    drawerOpen(false)
    window.history.pushState({}, '', path)
  }

  const isHome = activeTab() === '/'

  return (
    <div className="app">
      <div className="app-header">
        {isHome ? (
          <div className="header-placeholder" />
        ) : (
          <button className="header-back" onClick={()=> navigate('/')} type="button">‹</button>
        )}
        <h1>{isHome ? 'Tsumiki' : (allShowcases.find((s)=> s.key === activeTab())?.label || '')}</h1>
        <button className="header-theme-btn" onClick={()=> { const next = !darkMode(); darkMode(next); localStorage.setItem('tsu-dark', String(next)) }} type="button" aria-label="Toggle dark mode">
          {darkMode() ? sunIcon : moonIcon}
        </button>
        <button className="header-menu-btn" onClick={()=> drawerOpen(true)} type="button">
          {hamburgerIcon}
        </button>
      </div>

      <div className="main">
        {isHome && <HomePage navigate={navigate} />}
        {allShowcases.map((s)=> (
          activeTab() === s.key && <s.Component key={s.key} />
        ))}
      </div>

      <div
        className={`side-backdrop${drawerOpen() ? ' open' : ''}`}
        onClick={()=> drawerOpen(false)}
      />
      <div className={`side-panel${drawerOpen() ? ' open' : ''}`}>
        <div className="side-head">
          <h3>Components</h3>
          <button className="side-close" onClick={()=> drawerOpen(false)} type="button">✕</button>
        </div>
        <div className="side-body">
          <Loop each={() => menuItems}>
            {item => {
              if (item.type === 'category') {
                return <div className="side-category" key={item.key}>{item.label}</div>
              }
              return (
                <button className={`side-item${activeTab() === item.path ? ' active' : ''}`} key={item.key} onClick={()=> navigate(item.path)} type="button">
                  <span className="side-item-label">{item.label}</span>
                </button>
              )
            }}
          </Loop>
        </div>
      </div>
    </div>
  )
}

renderApp(document.getElementById('app'), <App />)
