import pkg from '../../package.json'

let popupTitleElement: HTMLElement
let rateControlSection: HTMLElement
let currentRateDisplayElement: HTMLElement
let rateSliderInput: HTMLInputElement
let strictModeToggle: HTMLInputElement
let mediaStatusSection: HTMLElement

export function initUI(handler: (rate: number, strict: boolean) => unknown) {
  // Init UI elements
  popupTitleElement = document.querySelector('#popup-title') as HTMLElement
  rateControlSection = document.querySelector('#rate-control-section') as HTMLElement
  currentRateDisplayElement = document.querySelector('#current-rate-display') as HTMLElement
  rateSliderInput = document.querySelector('#rate-slider-input') as HTMLInputElement
  strictModeToggle = document.querySelector('#strict-mode-toggle') as HTMLInputElement
  mediaStatusSection = document.querySelector('#media-status-section') as HTMLElement

  // Set initial UI state
  popupTitleElement.textContent = pkg.displayName
  rateSliderInput.focus()
  rateSliderInput.addEventListener('input', () =>
    handler(rateSliderInput.valueAsNumber, strictModeToggle.checked)
  )
  strictModeToggle.addEventListener('change', () =>
    handler(rateSliderInput.valueAsNumber, strictModeToggle.checked)
  )
}

export function updateUI(rate: number | null, strict: boolean) {
  // No media element found
  if (rate === null) {
    rateControlSection.classList.add('hidden')
    mediaStatusSection.classList.remove('hidden')
  }
  // Show new playback rate in UI
  else {
    rateControlSection.classList.remove('hidden')
    mediaStatusSection.classList.add('hidden')
    rateSliderInput.value = rate.toString()
    currentRateDisplayElement.textContent = rate.toString()
    strictModeToggle.checked = strict
  }
}
