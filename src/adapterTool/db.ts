import * as helperTool from './helper'
import chromeTools from '@/adapter/chrome/db'

const db = helperTool.isChrome ? chromeTools : chromeTools

// 辅助性能的方法 只需通过环境变化进行区分引入，由vite/rollup 自动进行编译即可

export default {
  get(key) {
    return db.get(key)
  },
  set(key, value) {
    return db.set(key, value)
  },
  remove(key) {
    return db.remove(key)
  }
}
