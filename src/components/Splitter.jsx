import { css } from '@emotion/css'
import { Splitter as ArkSplitter } from '@plastic-js/ark'
import { mergeProps, splitProps } from '@plastic-js/plastic'

const rootClass = css({
  display: 'flex',
  width: '100%',
  '&[data-orientation="vertical"]': {
    flexDirection: 'column',
  },
})

export const SplitterPanel = (props = {}) => {
  const [local, rest] = splitProps(mergeProps({}, props), ['className', 'children'])
  return (
    <ArkSplitter.Panel {...rest} className={[local.className].filter(Boolean).join(' ')}>
      {local.children}
    </ArkSplitter.Panel>
  )
}

export const SplitterResizeTrigger = (props = {}) => {
  const [local, rest] = splitProps(mergeProps({}, props), ['className', 'children'])
  return (
    <ArkSplitter.ResizeTrigger {...rest} className={[local.className].filter(Boolean).join(' ')}>
      {local.children}
    </ArkSplitter.ResizeTrigger>
  )
}

export const SplitterResizeTriggerIndicator = (props = {}) => {
  const [local, rest] = splitProps(mergeProps({}, props), ['className', 'children'])
  return (
    <ArkSplitter.ResizeTriggerIndicator {...rest} className={[local.className].filter(Boolean).join(' ')}>
      {local.children}
    </ArkSplitter.ResizeTriggerIndicator>
  )
}

const Splitter = (props = {}) => {
  const [local, rest] = splitProps(mergeProps({}, props), ['className', 'children'])
  return (
    <ArkSplitter.Root {...rest} className={[rootClass, local.className].filter(Boolean).join(' ')}>
      {local.children}
    </ArkSplitter.Root>
  )
}

Splitter.origin = {
  Root: ArkSplitter.Root,
  Panel: ArkSplitter.Panel,
  ResizeTrigger: ArkSplitter.ResizeTrigger,
  ResizeTriggerIndicator: ArkSplitter.ResizeTriggerIndicator,
}

export default Splitter
export { Splitter }
