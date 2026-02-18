const keyStrict = 'strict'

export async function saveStrictMode(strict: boolean) {
  await saveToStorage(keyStrict, strict)
}

export async function getStrictMode() {
  const strictMode = await getFromStorage(keyStrict)
  return !!strictMode || false
}

async function saveToStorage<T>(key: string, value: T) {
  await chrome.storage.sync.set({ [key]: value })
}

async function getFromStorage(key: string) {
  const result = await chrome.storage.sync.get(key)
  return result[key]
}
