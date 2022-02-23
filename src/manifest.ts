import fs from 'fs-extra'

export async function getManifest(platform) {
  const pkg = await fs.readJSON('package.json')
  // manifest 需要加上any,因chrome.manifest 不符合 browser.菜单类型
  let manifest: any = {
    name: pkg.displayName || pkg.name,
    version: pkg.version,
    description: pkg.description,
    icons: {
      18: './dist/img/go.png',
      32: './dist/img/go.png',
      64: './dist/img/go.png'
    }
  }
  if (platform === 'chrome') {
    manifest = {
      ...manifest,
      manifest_version: 3,
      background: {
        service_worker: './dist/back/index.js'
      },
      action: {
        default_popup: './dist/src/popup/index.html'
      },
      options_page: './dist/src/option/index.html',
      permissions: ['scripting', 'activeTab', 'tabs', 'storage', 'contextMenus', 'unlimitedStorage'],
      content_scripts: [
        {
          matches: ['<all_urls>'],
          all_frames: true,
          match_about_blank: true,
          js: ['./dist/content-scripts/index.js'],
          css: ['./dist/content-scripts/index.css']
        }
      ],
      web_accessible_resources: [
        {
          matches: ['<all_urls>'],
          resources: ['**', './dist/src/option/index.html']
        }
      ]
    }
  } else {
    manifest = {
      ...manifest,
      manifest_version: 2,
      background: {
        scripts: ['./dist/back/index.js']
      },
      browser_action: {
        default_popup: './dist/src/popup/index.html'
      },
      options_ui: {
        page: './dist/src/option/index.html',
        open_in_tab: true // 和chrome v3一样，打开新的tab页面，而不是的一个弹窗
      },
      permissions: ['activeTab', 'tabs', 'storage', 'contextMenus', 'unlimitedStorage'],
      content_scripts: [
        {
          matches: ['<all_urls>'],
          all_frames: true,
          match_about_blank: true,
          js: ['./dist/content-scripts/index.js'],
          css: ['./dist/content-scripts/index.css']
        }
      ],
      web_accessible_resources: ['dist/src/option/index.html', 'dist/src/popup/index.html'],
      content_security_policy: "script-src 'self'; object-src 'self'"
    }
  }

  manifest.permissions?.push('webNavigation')

  return manifest
}
