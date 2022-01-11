import { openUrl as chromiumOpenUrl } from '@/adapter/chrome/helper'
import XyAdapter from './adapter'

export const openUrl = (url: string) => {
  if (XyAdapter.isChrome) {
    return chromiumOpenUrl(url)
  }

  window.open(url)
}
