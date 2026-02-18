import pkg from '../../package.json'
import { requestRate, sendRate } from './message'
import { getStrictMode, saveStrictMode } from './storage'
import './style.css'
import { initUI, updateUI } from './ui'

document.addEventListener('DOMContentLoaded', async () => {
  console.log(`${pkg.name} :: Popup loaded!`)

  // Initialize UI elements and define user interaction handler
  initUI(async (rate, strict) => {
    // Save strict mode in storage
    await saveStrictMode(strict)

    // Send new playback rate to content script
    const updatedRate = await sendRate(rate, strict)

    // Display new UI state
    updateUI(updatedRate, strict)
  })

  // Set initial UI state
  const currentRate = await requestRate()
  const currentStrict = await getStrictMode()
  updateUI(currentRate, currentStrict)
})
