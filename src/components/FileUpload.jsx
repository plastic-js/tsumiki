import { css } from '@emotion/css'
import { FileUpload as ArkFileUpload } from '@plastic-js/ark'
import { splitProps } from '@plastic-js/plastic'

const read = (v) => typeof v === 'function' ? v() : v

const formatSize = (bytes) => {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}

const rootClass = css({
  display: 'flex',
  flexDirection: 'column',
  gap: 'var(--tsu-spacing-md)',
})

const dropzoneClass = css({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  gap: 'var(--tsu-spacing-sm)',
  padding: 'var(--tsu-spacing-xl)',
  border: '2px dashed var(--tsu-accent-outline-border)',
  borderRadius: 'var(--tsu-radius-l2-md)',
  backgroundColor: 'var(--tsu-bg-panel)',
  cursor: 'pointer',
  minHeight: '120px',
  transition: 'border-color var(--tsu-transition-fast), background-color var(--tsu-transition-fast)',
  touchAction: 'manipulation',
  '&[data-disabled]': {
    opacity: 'var(--tsu-disabled-opacity)',
    cursor: 'not-allowed',
    pointerEvents: 'none',
  },
})

const dropzoneTextClass = css({
  fontSize: 'var(--tsu-font-size-sm)',
  color: 'var(--tsu-text-subtle)',
  textAlign: 'center',
})

const itemGroupClass = css({
  display: 'flex',
  flexDirection: 'column',
  gap: 'var(--tsu-spacing-sm)',
  listStyle: 'none',
  margin: 0,
  padding: 0,
})

const itemClass = css({
  display: 'flex',
  alignItems: 'center',
  gap: 'var(--tsu-spacing-sm)',
  padding: 'var(--tsu-spacing-sm) var(--tsu-spacing-md)',
  backgroundColor: 'var(--tsu-bg-panel)',
  border: '1px solid var(--tsu-border)',
  borderRadius: 'var(--tsu-radius-l2-md)',
})

const itemNameClass = css({
  flex: 1,
  fontSize: 'var(--tsu-font-size-sm)',
  color: 'var(--tsu-fg)',
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
})

const itemSizeTextClass = css({
  fontSize: 'var(--tsu-font-size-xs)',
  color: 'var(--tsu-text-subtle)',
  marginTop: 'var(--tsu-spacing-xxs)',
})

const itemDeleteClass = css({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: 'var(--tsu-level-primary-sm)',
  height: 'var(--tsu-level-primary-sm)',
  flexShrink: 0,
  border: 'none',
  background: 'none',
  color: 'var(--tsu-text-subtle)',
  cursor: 'pointer',
  borderRadius: 'var(--tsu-radius-l1-md)',
  padding: 0,
})

const clearClass = css({
  display: 'inline-flex',
  alignItems: 'center',
  gap: 'var(--tsu-spacing-xs)',
  padding: 'var(--tsu-spacing-sm) var(--tsu-spacing-md)',
  border: '1px solid var(--tsu-neutral-outline-border)',
  borderRadius: 'var(--tsu-radius-l2-md)',
  backgroundColor: 'var(--tsu-bg-panel)',
  color: 'var(--tsu-text-secondary)',
  fontSize: 'var(--tsu-font-size-sm)',
  cursor: 'pointer',
  fontFamily: 'inherit',
  touchAction: 'manipulation',
  '&:disabled': {
    opacity: 'var(--tsu-disabled-opacity)',
    cursor: 'not-allowed',
  },
})

const deleteIcon = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="16" height="16" aria-hidden="true"><path d="M18 6 6 18M6 6l12 12" /></svg>
)

const FileUpload = (props = {})=> {
  const [local, rest] = splitProps(props, ['className', 'children'])
  return (
    <ArkFileUpload.Root {...rest} className={[rootClass, local.className].filter(Boolean).join(' ')}>
      <ArkFileUpload.Dropzone className={dropzoneClass}>
        <span className={dropzoneTextClass}>Drop files here or click to browse</span>
      </ArkFileUpload.Dropzone>
      {local.children}
      <ArkFileUpload.HiddenInput />
    </ArkFileUpload.Root>
  )
}

const FileUploadItemGroup = (props = {})=> {
  const [local, rest] = splitProps(props, ['className', 'children'])
  return <ArkFileUpload.ItemGroup {...rest} className={[itemGroupClass, local.className].filter(Boolean).join(' ')}>{local.children}</ArkFileUpload.ItemGroup>
}

const FileUploadItem = (props = {})=> {
  const [local, rest] = splitProps(props, ['className', 'file'])
  return (
    <ArkFileUpload.Item {...rest} file={local.file} className={[itemClass, local.className].filter(Boolean).join(' ')}>
      <ArkFileUpload.ItemName className={itemNameClass}>{read(local.file).name}</ArkFileUpload.ItemName>
      <ArkFileUpload.ItemSizeText className={itemSizeTextClass}>{formatSize(read(local.file).size)}</ArkFileUpload.ItemSizeText>
      <ArkFileUpload.ItemDeleteTrigger className={itemDeleteClass}>{deleteIcon}</ArkFileUpload.ItemDeleteTrigger>
    </ArkFileUpload.Item>
  )
}

const FileUploadClearTrigger = (props = {})=> {
  const [local, rest] = splitProps(props, ['className', 'children'])
  return <ArkFileUpload.ClearTrigger {...rest} className={[clearClass, local.className].filter(Boolean).join(' ')}>{local.children || 'Clear'}</ArkFileUpload.ClearTrigger>
}

FileUpload.origin = {
  Root: ArkFileUpload.Root,
  Label: ArkFileUpload.Label,
  Dropzone: ArkFileUpload.Dropzone,
  Trigger: ArkFileUpload.Trigger,
  ItemGroup: ArkFileUpload.ItemGroup,
  Item: ArkFileUpload.Item,
  ItemName: ArkFileUpload.ItemName,
  ItemSizeText: ArkFileUpload.ItemSizeText,
  ItemDeleteTrigger: ArkFileUpload.ItemDeleteTrigger,
  ClearTrigger: ArkFileUpload.ClearTrigger,
  HiddenInput: ArkFileUpload.HiddenInput,
}

export default FileUpload
export { FileUpload, FileUploadItemGroup, FileUploadItem, FileUploadClearTrigger }
