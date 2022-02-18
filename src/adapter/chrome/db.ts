// https://developer.chrome.com/docs/extensions/reference/storage/
export default {
  get(key) {
    return new Promise(resolve => {
      chrome.storage.local.get(key, async res => {
        resolve(res)
      })
    })
  },

  set(key, content: any) {
    return chrome.storage.local.set(key, content)
  },
  remove(key) {
    return chrome.storage.local.remove(key)
  },
  // 清理过期
  clear() {
    return
  },
  getAllKey() {
    return
  }
}
