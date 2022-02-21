import * as helperTool from './helper'
import { env } from './helper'
import chromeTools from '@/adapter/chrome/db'
import defaultDbTool from '@/adapter/default/db'
import firefoxDbTool from '@/adapter/firefox/db'

const dbFuncMap = {
  chrome: chromeTools,
  firefox: firefoxDbTool
}
const db = dbFuncMap[env('platform')] || defaultDbTool

// 辅助性能的方法 只需通过环境变化进行区分引入，由vite/rollup 自动进行编译即可

export default {
  get(key, def = null) {
    console.log('获取方法', __APP_INFO__, env('platform'))

    return db.get(key, def)
  },
  set(key, value, expiry = 0) {
    return db.set(key, value, expiry)
  },
  remove(key) {
    return db.remove(key)
  },
  // 清理过期
  clear() {
    return db.clear()
  },
  getAllKey() {
    return db.getAllKey()
  }
}
