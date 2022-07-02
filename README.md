# Media Speed Control
This extension allows users to adjust the playback rate of HTML5 video and audio elements. It also features a _strict mode_ which enables users to overwrite the default behaviour of media players that might try to reset the playback rate. This extension works for Chromium based browsers and Mozilla Firefox.

## Setup
* Chromium based browsers (Google Chrome, Microsoft Edge, Opera, Vivaldi, etc.):
    1. Type `chrome://extensions` in the address bar. (If you use a browser other than Google Chrome, it will redirect you automatically.) 
    2. Enable the __Developer mode__ temporarily.
    3. Click __Load unpacked extension...__ and select the extension's folder.

* Firefox:
    1. Delete the `manifest.json` file and rename `manifest_firefox.json` to `manifest.json`.
    2. Type `about:debugging#/runtime/this-firefox` in the address bar.
    3. Click __Load Temporary Add-on__ and select the `manifest.json` from the extension's folder.

    _Remarkable Notes:_ Extensions which are installed this way only remain installed until Firefox restarts. Also, Firefox only supports sound for playback rates which are not higher than 4 times the regular playback rate.

## TODOs/ ideas for possible future implementations
* add options page to change and save personal settings
* add keylisteners to control the playback rate
