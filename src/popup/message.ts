import { Message } from '~/types'

export async function sendRate(rate: number, strict: boolean) {
  const [tab] = await chrome.tabs.query({ currentWindow: true, active: true })
  if (!tab.id) return null

  const message: Message = {
    type: 'SET_RATE',
    payload: { rate, strict }
  }

  const response = await chrome.tabs.sendMessage<Message, number | null>(tab.id, message)
  return response
}

export async function requestRate() {
  const [tab] = await chrome.tabs.query({ currentWindow: true, active: true })
  if (!tab.id) return null

  const message: Message = {
    type: 'GET_RATE'
  }

  try {
    const response = await chrome.tabs.sendMessage<Message, number | null>(tab.id, message)
    return response ?? null
  } catch (error) {
    // No response was sent -> no media found
    // TODO: Consider a more robust solution, e.g. using chrome.scripting.executeScript on all frames
    return null
  }
}
