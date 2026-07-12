import { css } from '@emotion/css'
import { TreeView as ArkTreeView } from '@plastic-js/ark'
import { splitProps } from '@plastic-js/plastic'

const rootClass = css({
  display: 'flex',
  flexDirection: 'column',
  fontFamily: 'inherit',
})

const branchClass = css({
  display: 'flex',
  flexDirection: 'column',
})

const branchControlClass = css({
  display: 'flex',
  alignItems: 'center',
  gap: 'var(--tsu-spacing-sm)',
})

const branchTriggerClass = css({
  display: 'flex',
  alignItems: 'center',
  gap: 'var(--tsu-spacing-sm)',
  padding: '6px var(--tsu-spacing-sm)',
  borderRadius: 'var(--tsu-radius-l1-md)',
  border: 'none',
  background: 'none',
  color: 'var(--tsu-fg)',
  fontSize: 'var(--tsu-comp-font-size-sm)',
  fontFamily: 'inherit',
  cursor: 'pointer',
  touchAction: 'manipulation',
  '&[disabled]': {
    opacity: 'var(--tsu-disabled-opacity)',
    cursor: 'not-allowed',
  },
  '& svg': { width: '14px', height: '14px', color: 'var(--tsu-text-secondary)', transition: 'transform var(--tsu-transition-fast)' },
  '[data-state="open"] & svg': { transform: 'rotate(90deg)' },
})

const branchContentClass = css({
  paddingLeft: 'var(--tsu-spacing-xl)',
})

const itemClass = css({
  display: 'flex',
  alignItems: 'center',
  padding: '6px var(--tsu-spacing-sm)',
  borderRadius: 'var(--tsu-radius-l1-md)',
  fontSize: 'var(--tsu-comp-font-size-sm)',
  color: 'var(--tsu-fg)',
  cursor: 'pointer',
  '&[data-selected]': { backgroundColor: 'var(--tsu-pressed-accent)', color: 'var(--tsu-accent-subtle-fg)' },
  '&[data-disabled]': {
    opacity: 'var(--tsu-disabled-opacity)',
    pointerEvents: 'none',
  },
})

const TreeView = (props = {})=> {
  const [local, rest] = splitProps(props, ['className'])
  return <ArkTreeView.Root {...rest} className={[rootClass, local.className].filter(Boolean).join(' ')} />
}

const TreeViewBranch = (props = {})=> {
  const [local, rest] = splitProps(props, ['className'])
  return <ArkTreeView.Branch {...rest} className={[branchClass, local.className].filter(Boolean).join(' ')} />
}

const TreeViewBranchTrigger = (props = {})=> {
  const [local, rest] = splitProps(props, ['className'])
  return (
    <ArkTreeView.BranchTrigger {...rest} className={[branchTriggerClass, local.className].filter(Boolean).join(' ')}>
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M9 18l6-6-6-6"></path></svg>
    </ArkTreeView.BranchTrigger>
  )
}

const TreeViewBranchContent = (props = {})=> {
  const [local, rest] = splitProps(props, ['className'])
  return <ArkTreeView.BranchContent {...rest} className={[branchContentClass, local.className].filter(Boolean).join(' ')} />
}

const TreeViewItem = (props = {})=> {
  const [local, rest] = splitProps(props, ['className'])
  return <ArkTreeView.Item {...rest} className={[itemClass, local.className].filter(Boolean).join(' ')} />
}

const TreeViewBranchControl = (props = {})=> {
  const [local, rest] = splitProps(props, ['className'])
  return <ArkTreeView.BranchControl {...rest} className={[branchControlClass, local.className].filter(Boolean).join(' ')} />
}

TreeView.origin = {
  Root: ArkTreeView.Root,
  Branch: ArkTreeView.Branch,
  BranchTrigger: ArkTreeView.BranchTrigger,
  BranchContent: ArkTreeView.BranchContent,
  BranchControl: ArkTreeView.BranchControl,
  BranchText: ArkTreeView.BranchText,
  Item: ArkTreeView.Item,
  ItemText: ArkTreeView.ItemText,
  Label: ArkTreeView.Label,
  Tree: ArkTreeView.Tree,
}

TreeView.treeViewPart = ArkTreeView.Root.treeViewPart
TreeViewBranch.treeViewPart = ArkTreeView.Branch.treeViewPart
TreeViewBranchTrigger.treeViewPart = ArkTreeView.BranchTrigger.treeViewPart
TreeViewBranchContent.treeViewPart = ArkTreeView.BranchContent.treeViewPart
TreeViewBranchControl.treeViewPart = ArkTreeView.BranchControl.treeViewPart
TreeViewItem.treeViewPart = ArkTreeView.Item.treeViewPart

export default TreeView
export {
  TreeView,
  TreeViewBranch,
  TreeViewBranchTrigger,
  TreeViewBranchContent,
  TreeViewBranchControl,
  TreeViewItem,
}
