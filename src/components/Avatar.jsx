import { Avatar as ArkAvatar } from '@plastic-js/ark'
import { createContext, mergeProps, splitProps, useContext } from '@plastic-js/plastic'

const GenderCtx = createContext(() => 'male')
const NameCtx = createContext(() => '')

const read = (v) => typeof v === 'function' ? v() : v

const genderStyles = {
  male: { backgroundColor: 'var(--tsu-accent-subtle-bg)', color: 'var(--tsu-accent-subtle-fg)' },
  female: { backgroundColor: 'var(--tsu-danger-subtle-bg)', color: 'var(--tsu-danger-subtle-fg)' },
}

const getInitials = (name) => {
  if (!name || !name.trim()) return ''
  const parts = name.trim().split(/\s+/)
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase()
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
}

const DefaultPlaceholder = () => (
  <svg width="40%" height="40%" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style={{ opacity: 0.5 }} aria-hidden="true">
    <circle cx="12" cy="8" r="4" />
    <path d="M4 20c0-4 4-7 8-7s8 3 8 7" />
  </svg>
)

const AvatarImage = (props = {}) => {
  return <ArkAvatar.Image {...props} />
}

const AvatarFallback = (props = {}) => {
  const getGenderCtx = useContext(GenderCtx)
  const getNameCtx = useContext(NameCtx)
  const [local, rest] = splitProps(props, ['style', 'children'])

  return () => {
    const gender = getGenderCtx()
    const gStyle = genderStyles[gender] || genderStyles.male
    const name = getNameCtx()
    const content = local.children !== undefined ? local.children : (getInitials(name) || <DefaultPlaceholder />)
    return (
      <ArkAvatar.Fallback
        {...rest}
        style={{
          ...gStyle,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
          height: '100%',
          fontWeight: 'var(--tsu-font-weight-semibold)',
          ...local.style,
        }}
      >
        {content}
      </ArkAvatar.Fallback>
    )
  }
}

const Avatar = (props = {}) => {
  const [local, rest] = splitProps(
    mergeProps({ mode: 'image', name: '', gender: 'male', src: '', alt: '' }, props),
    ['mode', 'name', 'gender', 'children', 'src', 'alt'],
  )

  return (
    <NameCtx.Provider value={() => read(local.name) || ''}>
      <GenderCtx.Provider value={() => read(local.gender)}>
        <ArkAvatar.Root {...rest}>
          {local.children ? local.children : (
            <>
              {read(local.mode) === 'image' && !!read(local.src) && (
                <ArkAvatar.Image
                  src={read(local.src)}
                  alt={read(local.alt) || (read(local.name) || 'avatar')}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              )}
              <AvatarFallback />
            </>
          )}
        </ArkAvatar.Root>
      </GenderCtx.Provider>
    </NameCtx.Provider>
  )
}

Avatar.origin = {
  Root: ArkAvatar.Root,
  Image: ArkAvatar.Image,
  Fallback: ArkAvatar.Fallback,
}

export default Avatar
export { Avatar, AvatarImage, AvatarFallback }
