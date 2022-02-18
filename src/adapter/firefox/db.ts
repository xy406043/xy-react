import { browser } from 'webextension-polyfill-ts'

// https://developer.browser.com/docs/extensions/reference/storage/
export default {
  async get(key) {
    const res = await browser.storage.local.get(key)

    return Promise.resolve(res)
  },

  set(key, content: any) {
    return browser.storage.local.set([{ key: content }])
  },
  remove(key) {
    return browser.storage.local.remove(key)
  },
  // 清理过期
  clear() {
    return
  },
  getAllKey() {
    return
  }
}
