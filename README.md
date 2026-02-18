# Media Speed Control

**Media Speed Control** is a browser extension for Chromium-based browsers that allows users to adjust the playback rate of HTML5 video and audio elements.

---

## Features

- Adjust playback speed of HTML5 video and audio elements
- Optional **Strict Mode** to enforce the selected playback rate
- Lightweight and easy to integrate
- Works with Chromium-based browsers (Google Chrome, Microsoft Edge, Opera, Vivaldi, etc.)

---

## Installation

### Build the Extension

```bash
npm run build
```

The production-ready files will be generated in the dist folder.

### Load the Extension in Your Browser

1. Open <chrome://extensions> in your browser.
(In Chromium-based browsers other than Chrome, you will be redirected automatically.)

2. Enable `Developer Mode`.

3. Click `Load unpacked`.

4. Select the generated dist folder.

The extension is now installed locally.

---

## TODOs

- Add an options page for customizing and saving user preferences

- Implement keyboard shortcuts to control playback speed

- Improve error handling and resilience