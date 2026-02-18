const strictListeners = new WeakMap<HTMLMediaElement, EventListener>()

function findMediaElements(root: Document | ShadowRoot = document) {
  // Find all media elements in the current root
  const media: HTMLMediaElement[] = Array.from(root.querySelectorAll('video, audio'))

  // Find media elements in shadow DOMs
  const elements = root.querySelectorAll('*')
  elements.forEach((el) => {
    if (el.shadowRoot) {
      media.push(...findMediaElements(el.shadowRoot))
    }
  })

  return media
}

export function getRate() {
  const media = findMediaElements()
  const rate = media[0] ? media[0].playbackRate : null
  return rate
}

export function setRate(rate: number, strict: boolean) {
  const media = findMediaElements()

  media.forEach((m) => {
    // Remove existing listeners to prevent listener stacking
    const oldListener = strictListeners.get(m)
    if (oldListener) {
      m.removeEventListener('ratechange', oldListener)
      strictListeners.delete(m)
    }

    // Update playback rate
    m.playbackRate = rate

    // Add listener in strict mode to prevent players from resetting the rate
    if (strict) {
      const newListener = () => {
        if (m.playbackRate !== rate) {
          m.playbackRate = rate
        }
      }

      m.addEventListener('ratechange', newListener)
      strictListeners.set(m, newListener)
    }
  })
}
