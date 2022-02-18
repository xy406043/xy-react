//  rollup chunkFileNames
//  https://gist.github.com/isidrok/d42cb4e71e9c54fe0260ffe300125ef1

// export function configChunkFileNamePlugin({ separator = '#' } = {}) {
//   const chunkFileNamePlugin = {
//     name: 'named-chunks',
//     async resolveDynamicImport(source, importer) {
//       const [mod, name] = source.split(separator)
//       const { id } = await this.resolve(mod, importer)
//       name && this.emitFile({ type: 'chunk', id, name })
//       return id
//     }
//   }

//   return chunkFileNamePlugin
// }

// TODO 无法写入

export default {}
