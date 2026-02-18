import { defineManifest } from '@crxjs/vite-plugin'
import pkg from './package.json'

export default defineManifest({
  manifest_version: 3,
  name: pkg.displayName,
  version: pkg.version,
  icons: {
    16: 'public/logo16.png',
    32: 'public/logo32.png',
    48: 'public/logo48.png',
    128: 'public/logo128.png'
  },
  action: {
    default_icon: {
      48: 'public/logo48.png'
    },
    default_popup: 'src/popup/index.html'
  },
  content_scripts: [
    {
      js: ['src/content/main.ts'],
      matches: ['<all_urls>'],
      all_frames: true
    }
  ],
  permissions: ['tabs', 'storage'],
  host_permissions: ['<all_urls>'],
  commands: {
    _execute_action: {
      description: 'Activate Media Playback Rate Control',
      suggested_key: {
        default: 'Ctrl+Shift+V',
        mac: 'Command+Shift+V'
      }
    }
  }
})
