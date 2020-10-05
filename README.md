# Media Speed Control
This extension allows users to adjust the playback rate of HTML5 video and audio elements. It also features a _strict mode_ which enables users to overwrite the default behaviour of media players that might try to reset the playback rate. This extension works for Chromium based browsers and Mozilla Firefox.

## Installing
1. Chromium-based browsers:
    1. Open the __Menu__ and navigate to __More Tools__ > __Extensions__ or enter `chrome://extensions/` in the address bar. 
    2. Enable the __Developer mode__ temporarily.
    3. Click __Load unpacked extension...__ and select the extension's directory.

2. Firefox:
    1. Delete the `manifest.json` file and rename `manifest_firefox.json` to `manifest.json`.
    2. Enter `about:debugging#/runtime/this-firefox` in the address bar.
    3. Click __Load Temporary Add-on__.
    4. Open the extension's directory and select any file inside the extension.

    __Note:__ Firefox omly supports sound for playback rates which are not higher than 4 times the regular playback rate.

## TODOs/ ideas for possible future implementations
* add options page to change and save personal settings
* add keylisteners to control the playback rate
