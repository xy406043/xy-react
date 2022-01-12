import type { Plugin } from 'rollup'
// import { configChunkFileNamePlugin } from './chunkFileName'

export function createRollupPlugin() {
  const rollupPlugins: (false | Plugin | null | undefined)[] | undefined = []

  // rollupPlugins.push(configChunkFileNamePlugin)

  return rollupPlugins
}
