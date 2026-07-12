import { createSignal } from '@plastic-js/plastic'
import Avatar, { AvatarImage, AvatarFallback } from '../../src/components/Avatar.jsx'

function AvatarPage(){
  const srcSignal = createSignal('https://i.pravatar.cc/128?u=tsumiki')
  const modeSignal = createSignal('image')
  const nameSignal = createSignal('Tsumiki User')
  const genderSignal = createSignal('male')
  const sizeSignal = createSignal(48)

  return (
    <div className='container'>
      <div className='hero'>
        <p className='eyebrow'>Display</p>
        <h1>Avatar</h1>
        <p className='hero-copy'>
          An image with fallback for representing a user. Two display modes:
          <span className='tag'>image</span> (default) and
          <span className='tag'>initials</span>. Built on
          Ark Avatar with
          <span className='tag'>Avatar</span>,
          <span className='tag'>AvatarImage</span>, and
          <span className='tag'>AvatarFallback</span>.
        </p>
      </div>

      <div className='feature-card'>
        <p className='demo-label'>Image Mode (Default)</p>
        <p style={{ fontSize: '12px', color: 'var(--tsu-neutral-11)', marginBottom: '12px' }}>
          When <span className='tag'>mode="image"</span> with a valid
          <span className='tag'>src</span>, the image is displayed.
          <span className='tag'>name</span> is used for the fallback if the image fails to load.
        </p>
        <div className='demo-row'>
          <Avatar name='John Doe' src='https://i.pravatar.cc/128?u=1' style={{ width: '48px', height: '48px', borderRadius: '9999px', overflow: 'hidden' }} />
          <Avatar name='Alice Kim' src='https://i.pravatar.cc/128?u=2' style={{ width: '64px', height: '64px', borderRadius: '9999px', overflow: 'hidden' }} />
          <Avatar name='Mike Chen' src='https://i.pravatar.cc/128?u=3' style={{ width: '80px', height: '80px', borderRadius: '9999px', overflow: 'hidden' }} />
        </div>
      </div>

      <div className='feature-card'>
        <p className='demo-label'>Image Mode + Broken Image → Initials Fallback</p>
        <p style={{ fontSize: '12px', color: 'var(--tsu-neutral-11)', marginBottom: '12px' }}>
          When the image fails to load, initials derived from
          <span className='tag'>name</span> are shown automatically.
        </p>
        <div className='demo-row'>
          <Avatar name='Zero Seven' src='invalid://broken.url' style={{ width: '48px', height: '48px', borderRadius: '9999px', overflow: 'hidden' }} />
          <Avatar name='Team Nova' src='https://also-broken.nope/img.png' style={{ width: '56px', height: '56px', borderRadius: '12px', overflow: 'hidden' }} />
          <Avatar name='SingleWord' src='invalid://x' style={{ width: '48px', height: '48px', borderRadius: '9999px', overflow: 'hidden' }} />
        </div>
      </div>

      <div className='feature-card'>
        <p className='demo-label'>Initials Mode</p>
        <p style={{ fontSize: '12px', color: 'var(--tsu-neutral-11)', marginBottom: '12px' }}>
          Set <span className='tag'>mode="initials"</span> to always show name initials
          as the avatar. No image loading is attempted — even if
          <span className='tag'>src</span> is provided.
        </p>
        <div className='demo-row'>
          <Avatar mode='initials' name='Alice Wang' style={{ width: '48px', height: '48px', borderRadius: '9999px', overflow: 'hidden' }} />
          <Avatar mode='initials' name='Bob Lee' style={{ width: '56px', height: '56px', borderRadius: '12px', overflow: 'hidden' }} />
          <Avatar mode='initials' name='Carol Xu' gender='female' style={{ width: '48px', height: '48px', borderRadius: '9999px', overflow: 'hidden' }} />
        </div>
      </div>

      <div className='feature-card'>
        <p className='demo-label'>No Name → Default Placeholder</p>
        <p style={{ fontSize: '12px', color: 'var(--tsu-neutral-11)', marginBottom: '12px' }}>
          When no <span className='tag'>name</span> is provided, a default
          person icon is shown as the placeholder.
        </p>
        <div className='demo-row'>
          <Avatar mode='initials' style={{ width: '48px', height: '48px', borderRadius: '9999px', overflow: 'hidden' }} />
          <Avatar mode='image' src='invalid://x' style={{ width: '48px', height: '48px', borderRadius: '9999px', overflow: 'hidden' }} />
          <Avatar mode='initials' gender='female' style={{ width: '56px', height: '56px', borderRadius: '12px', overflow: 'hidden' }} />
        </div>
      </div>

      <div className='feature-card'>
        <p className='demo-label'>Gender</p>
        <p style={{ fontSize: '12px', color: 'var(--tsu-neutral-11)', marginBottom: '12px' }}>
          Set <span className='tag'>gender</span> to
          <span className='tag'>"male"</span> or
          <span className='tag'>"female"</span> for gender-appropriate fallback colors.
          Default is <span className='tag'>male</span>.
        </p>
        <div className='demo-row'>
          <Avatar mode='initials' name='Zhang San' gender='male' style={{ width: '48px', height: '48px', borderRadius: '9999px', overflow: 'hidden' }} />
          <Avatar mode='initials' name='Li Si' gender='female' style={{ width: '48px', height: '48px', borderRadius: '9999px', overflow: 'hidden' }} />
        </div>
      </div>

      <div className='feature-card'>
        <p className='demo-label'>Different Sizes</p>
        <div className='demo-row' style={{ alignItems: 'flex-end' }}>
          <Avatar mode='initials' name='X Small' gender='female' style={{ width: '32px', height: '32px', borderRadius: '9999px', overflow: 'hidden' }} />
          <Avatar mode='initials' name='Small' gender='male' style={{ width: '40px', height: '40px', borderRadius: '9999px', overflow: 'hidden' }} />
          <Avatar mode='initials' name='Large Avatar' gender='female' style={{ width: '56px', height: '56px', borderRadius: '9999px', overflow: 'hidden' }} />
          <Avatar mode='initials' name='Extra Large' gender='male' style={{ width: '72px', height: '72px', borderRadius: '9999px', overflow: 'hidden' }} />
        </div>
      </div>

      <div className='feature-card'>
        <p className='demo-label'>With onStatusChange</p>
        <div className='demo-row' style={{ gap: '12px', alignItems: 'center' }}>
          <Avatar
            name='Status Check'
            src='https://i.pravatar.cc/128?u=5'
            onStatusChange={(d) => console.log('Avatar status:', d.status)}
            style={{ width: '48px', height: '48px', borderRadius: '9999px', overflow: 'hidden' }}
          />
          <span style={{ fontSize: '12px', color: 'var(--tsu-neutral-11)' }}>Check the console for status events</span>
        </div>
      </div>

      <div className='feature-card'>
        <p className='demo-label'>Interactive</p>
        <div className='demo-check-row' style={{ gap: '12px', flexWrap: 'wrap' }}>
          <label>
            <span style={{ fontSize: '12px', color: 'var(--tsu-neutral-11)' }}>Mode</span>
            <select className='demo-select' onChange={e => modeSignal(e.target.value)} value={modeSignal()}>
              <option value='image'>Image</option>
              <option value='initials'>Initials</option>
            </select>
          </label>
          <label>
            <span style={{ fontSize: '12px', color: 'var(--tsu-neutral-11)' }}>Name</span>
            <input
              className='demo-select'
              style='width:140px'
              type='text'
              value={nameSignal()}
              onInput={e => nameSignal(e.target.value)}
            />
          </label>
          <label>
            <span style={{ fontSize: '12px', color: 'var(--tsu-neutral-11)' }}>Image URL</span>
            <select className='demo-select' onChange={e => srcSignal(e.target.value)} value={srcSignal()}>
              <option value='https://i.pravatar.cc/128?u=tsumiki'>Valid image</option>
              <option value='invalid://broken'>Broken image</option>
            </select>
          </label>
          <label style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            <span style={{ fontSize: '12px', color: 'var(--tsu-neutral-11)' }}>Size</span>
            <input className='demo-select' max='128' min='32' onChange={e => sizeSignal(Number(e.target.value))} style='width:60px' type='number' value={sizeSignal()} />
          </label>
          <label>
            <span style={{ fontSize: '12px', color: 'var(--tsu-neutral-11)' }}>Gender</span>
            <select className='demo-select' onChange={e => genderSignal(e.target.value)} value={genderSignal()}>
              <option value='male'>Male</option>
              <option value='female'>Female</option>
            </select>
          </label>
        </div>
        <div style={{ marginTop: '12px' }}>
          <Avatar
            mode={modeSignal}
            name={nameSignal}
            src={srcSignal}
            gender={genderSignal}
            style={{ width: `${sizeSignal()}px`, height: `${sizeSignal()}px`, borderRadius: '9999px', overflow: 'hidden' }}
          />
        </div>
      </div>

      <div className='feature-card'>
        <p className='demo-label'>Composable API (Advanced)</p>
        <p style={{ fontSize: '12px', color: 'var(--tsu-neutral-11)', marginBottom: '12px' }}>
          Use <span className='tag'>AvatarImage</span> and
          <span className='tag'>AvatarFallback</span> as children for full manual control.
          The <span className='tag'>AvatarFallback</span> still auto-derives initials from
          <span className='tag'>name</span> unless overridden.
        </p>
        <div className='demo-row'>
          <Avatar name='Manual User' style={{ width: '48px', height: '48px', borderRadius: '9999px', overflow: 'hidden' }}>
            <AvatarImage src='https://i.pravatar.cc/128?u=99' alt='Manual User' style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            <AvatarFallback />
          </Avatar>
          <Avatar name='Override' style={{ width: '48px', height: '48px', borderRadius: '9999px', overflow: 'hidden' }}>
            <AvatarFallback>✦</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </div>
  )
}

export default AvatarPage
