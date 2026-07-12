import { css } from '@emotion/css'
import { Pagination as ArkPagination, usePaginationContext } from '@plastic-js/ark'
import { splitProps } from '@plastic-js/plastic'

const rootClass = css({
  display: 'flex',
  alignItems: 'center',
  gap: 'var(--tsu-spacing-xs)',
  overflowX: 'auto',
})

const itemClass = css({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  minWidth: 'var(--tsu-level-primary-md)',
  height: 'var(--tsu-level-primary-md)',
  padding: '0 var(--tsu-spacing-sm)',
  border: '1px solid var(--tsu-neutral-outline-border)',
  borderRadius: 'var(--tsu-radius-l2-md)',
  backgroundColor: 'var(--tsu-bg-panel)',
  color: 'var(--tsu-text-secondary)',
  fontSize: 'var(--tsu-font-size-sm)',
  fontWeight: 'var(--tsu-font-weight-medium)',
  cursor: 'pointer',
  fontFamily: 'inherit',
  touchAction: 'manipulation',
  transition: 'background-color var(--tsu-transition-fast), border-color var(--tsu-transition-fast)',
  '&[data-selected]': { backgroundColor: 'var(--tsu-accent-solid-bg)', borderColor: 'var(--tsu-accent-solid-bg)', color: 'var(--tsu-accent-solid-fg)' },
  '&:disabled, &[data-disabled]': {
    opacity: 'var(--tsu-disabled-opacity)',
    cursor: 'not-allowed',
  },
})

const ellipsisClass = css({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '28px',
  color: 'var(--tsu-text-subtle)',
  fontSize: 'var(--tsu-font-size-sm)',
  userSelect: 'none',
})

const Pages = ()=> {
  const pagination = usePaginationContext()
  return () => {
    const api = pagination()
    return (
      <>
        {api.pages.map((page, i) =>
          page.type === 'page'
            ? <ArkPagination.Item key={i} value={page.value} className={itemClass}>{page.value}</ArkPagination.Item>
            : <ArkPagination.Ellipsis key={i} index={i} className={ellipsisClass}>…</ArkPagination.Ellipsis>
        )}
      </>
    )
  }
}

const Pagination = (props = {})=> {
  const [local, rest] = splitProps(props, ['className', 'prevLabel', 'nextLabel', 'prevChildren', 'nextChildren'])
  return (
    <ArkPagination.Root {...rest} className={[rootClass, local.className].filter(Boolean).join(' ')}>
      <ArkPagination.PrevTrigger className={itemClass}>{local.prevChildren ?? local.prevLabel ?? 'Prev'}</ArkPagination.PrevTrigger>
      <Pages />
      <ArkPagination.NextTrigger className={itemClass}>{local.nextChildren ?? local.nextLabel ?? 'Next'}</ArkPagination.NextTrigger>
    </ArkPagination.Root>
  )
}

Pagination.origin = { Root: ArkPagination.Root }

export default Pagination
export { Pagination }
