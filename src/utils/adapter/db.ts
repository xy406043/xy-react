// https://developer.chrome.com/docs/extensions/reference/storage/
export default {
  get(key) {
    return browser.storage.local.get(key)
  },

  set(key, content: any) {
    // https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/storage/StorageArea/set
    // 使用方法上和storage有些不同，不过有polyfill会作出调整
    // 另外Chrome浏览器有内存限制5M，想要更多的空间需要 添加权限 permissions
    return browser.storage.local.set({ [key]: content })
  },

  remove(key) {
    browser.storage.local.remove(key)
  }
}
