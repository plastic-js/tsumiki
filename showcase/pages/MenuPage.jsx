import Button from '../../src/components/Button.jsx'
import Menu, { MenuTrigger, MenuContent, MenuItem, MenuSeparator } from '../../src/components/Menu.jsx'

function MenuPage(){
  return (
    <div className='container'>
      <div className='hero'>
        <p className='eyebrow'>Overlay</p>
        <h1>Menu</h1>
        <p className='hero-copy'>
          A dropdown context menu with items, separators, and
          keyboard-accessible highlighted navigation.
        </p>
      </div>

      <div className='feature-card'>
        <p className='demo-label'>Basic</p>
        <Menu>
          <MenuTrigger asChild>
            <Button size='sm'>Actions</Button>
          </MenuTrigger>
          <MenuContent>
            <MenuItem value='edit'>Edit</MenuItem>
            <MenuItem value='duplicate'>Duplicate</MenuItem>
            <MenuSeparator />
            <MenuItem value='archive'>Archive</MenuItem>
            <MenuItem value='delete'>Delete</MenuItem>
          </MenuContent>
        </Menu>
      </div>

      <div className='feature-card'>
        <p className='demo-label'>Disabled Items</p>
        <Menu>
          <MenuTrigger asChild>
            <Button size='sm'>Options</Button>
          </MenuTrigger>
          <MenuContent>
            <MenuItem value='copy'>Copy</MenuItem>
            <MenuItem value='paste'>Paste</MenuItem>
            <MenuSeparator />
            <MenuItem value='share'>Share</MenuItem>
            <MenuItem value='export' disabled>Export (disabled)</MenuItem>
          </MenuContent>
        </Menu>
      </div>
    </div>
  )
}

export default MenuPage
