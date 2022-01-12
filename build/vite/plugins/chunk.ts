import type { Plugin, PluginOption } from 'vite'
import type { NormalizedOutputOptions, OutputBundle } from 'rollup'

export function configChunkFileNamePlugin() {
  const chunkFileNamePlugin: Plugin = {
    name: 'named-chunks',
    apply: 'build',

    generateBundle: async (opts: NormalizedOutputOptions, bundle: OutputBundle) => {
      return
    }
  }

  return chunkFileNamePlugin
}
