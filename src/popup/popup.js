let inputContainer
let noMediaContainer
let slider
let feedback
let checkbox

document.addEventListener('DOMContentLoaded', () => {
  // initialize variables
  inputContainer = document.querySelector('#inputContainer')
  noMediaContainer = document.querySelector('#noMediaContainer')
  slider = document.querySelector('#inputSlider')
  feedback = document.querySelector('#rateFeedback')
  checkbox = document.querySelector('#checkbox')

  //get the current playback rate + strict mode setting and display it after click on icon
  updatePopup()

  //wait for userinput
  slider.addEventListener('input', inputHandler)
  checkbox.addEventListener('input', inputHandler)
})

function inputHandler() {
  let rate = slider.value
  let strictMode = checkbox.checked

  // save strictMode setting in storage
  setInStorage('strictMode', strictMode)

  // send query to active tab
  chrome.tabs.query(
    {
      currentWindow: true,
      active: true
    },
    (tabs) => {
      let msg = {
        type: 'input',
        rate: rate,
        strictMode: strictMode
      }
      chrome.tabs.sendMessage(tabs[0].id, msg)

      //update popup view
      updatePopup()
    }
  )
}

function updatePopup() {
  chrome.tabs.query(
    {
      currentWindow: true,
      active: true
    },
    (tabs) => {
      let msg = {
        type: 'update'
      }
      // not particualarly happy with this solution
      chrome.tabs.sendMessage(tabs[0].id, msg, (response) => {
        if (chrome.runtime.lastError) {
          // no response was sent -> no media found
          inputContainer.style.display = 'none'
          noMediaContainer.style.display = 'block'
        } else {
          // media was found
          slider.value = response.currentRate
          feedback.innerHTML = response.currentRate
          getFromStorage('strictMode', (strictMode) => (checkbox.checked = strictMode || false))
          inputContainer.style.display = 'block'
          noMediaContainer.style.display = 'none'
        }
      })
    }
  )
}

// some helper functions to deal with the chrome storage
function setInStorage(key, data) {
  chrome.storage.sync.set(JSON.parse(`{"${key}": ${data}}`), () => {
    if (chrome.runtime.lastError) {
      console.error('Could not set ' + key + ': ' + chrome.runtime.lastError.message)
    }
  })
}

function getFromStorage(key, callback) {
  chrome.storage.sync.get([key], (result) => callback(result[key]))
}
