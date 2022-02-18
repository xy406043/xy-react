import type { Plugin, PluginOption } from 'vite'
import type { NormalizedOutputOptions, OutputBundle } from 'rollup'

export function configChunkFileNamePlugin() {
  const chunkFileNamePlugin: Plugin = {
    name: 'xy-named-chunks',
    apply: 'build',
    options(opts) {
      console.log('opts参数', opts)

      return {}
    }
  }

  return chunkFileNamePlugin
}
