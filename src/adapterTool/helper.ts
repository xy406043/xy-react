import { openUrl as chromiumOpenUrl } from '@/adapter/chrome/helper'

/**
 * 必须从环境变量从取出必要参数， 不可从adapter.ts
 */
const env = (key: string) => {
  return ''
  // if (!import.meta.env['xy_config']) return ''
  // import.meta.env['xy_config'][key] ? import.meta.env['xy_config'][key] : ''
}

export const openUrl = (url: string) => {
  if (env('isChrome')) {
    return chromiumOpenUrl(url)
  }

  window.open(url)
}

export const isChrome = !!env('isChrome')
