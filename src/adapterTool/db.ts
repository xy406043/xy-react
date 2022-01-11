import { isChrome } from './helper'
import defaultDbTool from '@/adapter/default/db'

const db = isChrome ? defaultDbTool : defaultDbTool

// 辅助性能的方法 只需通过环境变化进行区分引入，由vite/rollup 自动进行编译即可

export default {
  get(key, def = null) {
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
