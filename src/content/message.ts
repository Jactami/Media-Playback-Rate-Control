import { Message } from '~/types'
import { getRate, setRate } from './controller'

chrome.runtime.onMessage.addListener(
  (message: Message, _, sendResponse: (rate: number | null) => unknown) => {
    // Only send response if media elements exist to avoid race conditions between frames
    if (message.type === 'GET_RATE') {
      // Get current playback rate
      const rate = getRate()
      if (rate !== null) sendResponse(rate)
    } else if (message.type === 'SET_RATE') {
      // Set new playback rate and return updated rate
      setRate(message.payload.rate, message.payload.strict)
      const rate = getRate()
      if (rate !== null) sendResponse(rate)
    }

    // Close message channel
    return false
  }
)
