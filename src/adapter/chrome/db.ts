// https://developer.chrome.com/docs/extensions/reference/storage/
export default {
  get(key) {
    return new Promise(resolve => {
      browser.storage.local.get(key).then(async res => {
        resolve(res)
      })
    })
  },

  set(key, content: any) {
    return browser.storage.local.set([{ key: content }])
  },

  remove(key) {
    browser.storage.local.remove(key)
  }
}
