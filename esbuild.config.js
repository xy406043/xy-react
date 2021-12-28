import { build } from 'esbuild' // 使用此语法需要设置 package.json type 为 module

// 构建 chrome 扩展  background.js
build({
  entryPoints: ['src/utils/back/index.js'],
  minify: true,
  bundle: true,
  sourcemap: true,
  outfile: 'public/back/index.js'
}).catch(() => process.exit(1))

// 构建 chrome 扩展  content-scrips 脚本
build({
  entryPoints: ['src/utils/content-scripts/index.js'],
  minify: true,
  bundle: true,
  sourcemap: true,
  outfile: 'public/content-scripts/index.js'
}).catch(() => process.exit(1))
