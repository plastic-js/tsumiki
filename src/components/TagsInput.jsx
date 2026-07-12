import { css } from '@emotion/css'
import { TagsInput as ArkTagsInput } from '@plastic-js/ark'
import { mergeProps, splitProps } from '@plastic-js/plastic'

const rootClass = css({
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'center',
  gap: 'var(--tsu-spacing-xs)',
  padding: 'var(--tsu-spacing-xs) var(--tsu-spacing-sm)',
  border: '1px solid var(--tsu-accent-outline-border)',
  borderRadius: 'var(--tsu-radius-l1-md)',
  backgroundColor: 'var(--tsu-bg-panel)',
  minHeight: 'var(--tsu-comp-height-lg)',
  '&:focus-within': { borderColor: 'var(--tsu-focus-border)' },
})

const tagClass = css({
  display: 'inline-flex',
  alignItems: 'center',
  gap: '4px',
  padding: '2px 8px',
  borderRadius: 'var(--tsu-radius-l1-xs)',
  backgroundColor: 'var(--tsu-accent-subtle-bg)',
  color: 'var(--tsu-accent-subtle-fg)',
  fontSize: 'var(--tsu-font-size-sm)',
  fontWeight: 'var(--tsu-font-weight-medium)',
})

const tagDeleteClass = css({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '16px',
  height: '16px',
  borderRadius: '50%',
  border: 'none',
  background: 'transparent',
  color: 'var(--tsu-accent-subtle-fg)',
  cursor: 'pointer',
  padding: 0,
  fontSize: '12px',
  lineHeight: 1,
})

const controlClass = css({
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'center',
  gap: 'var(--tsu-spacing-xs)',
})

const previewClass = css({
  display: 'flex',
  alignItems: 'center',
  gap: '4px',
})

const inputClass = css({
  flex: 1,
  minWidth: '80px',
  border: 'none',
  background: 'transparent',
  color: 'var(--tsu-fg)',
  fontSize: 'var(--tsu-comp-font-size-md)',
  fontFamily: 'inherit',
  padding: 0,
  '&::placeholder': { color: 'var(--tsu-text-secondary)' },
})

const labelClass = css({
  fontSize: 'var(--tsu-comp-font-size-md)',
  fontWeight: 'var(--tsu-font-weight-medium)',
  color: 'var(--tsu-fg)',
  marginBottom: 'var(--tsu-spacing-xs)',
})

const TagItem = (props = {})=> {
  const [local, rest] = splitProps(props, ['className', 'children'])
  return (
    <ArkTagsInput.Item {...rest} className={[tagClass, local.className].filter(Boolean).join(' ')}>
      <ArkTagsInput.ItemPreview className={previewClass}>
        <ArkTagsInput.ItemText>{rest.value}</ArkTagsInput.ItemText>
        <ArkTagsInput.ItemDeleteTrigger className={tagDeleteClass}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" width="10" height="10" aria-hidden="true"><path d="M18 6 6 18M6 6l12 12" /></svg>
        </ArkTagsInput.ItemDeleteTrigger>
      </ArkTagsInput.ItemPreview>
      <ArkTagsInput.ItemInput />
    </ArkTagsInput.Item>
  )
}

const TagsInput = (props = {})=> {
  const [local, rest] = splitProps(
    mergeProps({}, props),
    ['className', 'label', 'placeholder'],
  )
  return (
    <ArkTagsInput.Root {...rest} className={[rootClass, local.className].filter(Boolean).join(' ')}>
      {local.label && <ArkTagsInput.Label className={labelClass}>{local.label}</ArkTagsInput.Label>}
      <ArkTagsInput.Control className={controlClass}>
        {() => (rest.value?.() || []).map((tag, i) => <TagItem key={tag} index={i} value={tag} />)}
        <ArkTagsInput.Input className={inputClass} placeholder={local.placeholder} />
      </ArkTagsInput.Control>
    </ArkTagsInput.Root>
  )
}

TagsInput.origin = {
  Root: ArkTagsInput.Root,
  Label: ArkTagsInput.Label,
  Control: ArkTagsInput.Control,
  Input: ArkTagsInput.Input,
  Item: ArkTagsInput.Item,
  ItemPreview: ArkTagsInput.ItemPreview,
  ItemText: ArkTagsInput.ItemText,
  ItemDeleteTrigger: ArkTagsInput.ItemDeleteTrigger,
  ItemInput: ArkTagsInput.ItemInput,
  ClearTrigger: ArkTagsInput.ClearTrigger,
  HiddenInput: ArkTagsInput.HiddenInput,
}

export default TagsInput
export { TagsInput }
