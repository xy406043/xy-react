import { build } from 'esbuild' // 使用此语法需要设置 package.json type 为 module；或者使用babel-node 进行执行

const platform = process.env.npm_config_adapter ? process.env.npm_config_adapter : ''

// TODO esbuild 多脚本构建，同化rollup配置;

if (platform === 'chrome') {
  // 构建 chrome 扩展  background.js
  build({
    entryPoints: ['src/adapter/chrome/back/index.ts'],
    minify: true,
    bundle: true,
    sourcemap: true,
    tsconfig: './tsconfig.json',
    outfile: 'public/back/index.js'
  }).catch(() => process.exit(1))

  // 构建 chrome 扩展  content-scrips 脚本
  build({
    entryPoints: ['src/adapter/chrome/content-scripts/index.ts'],
    minify: true,
    bundle: true,
    sourcemap: true,
    tsconfig: './tsconfig.json',
    outfile: 'public/content-scripts/index.js'
  }).catch(() => process.exit(1))

  // 构建 chrome 扩展  content-scrips 样式文件
  build({
    entryPoints: ['src/adapter/chrome/content-scripts/index.css'],
    minify: true,
    bundle: true,
    sourcemap: true,
    outfile: 'public/content-scripts/index.css'
  }).catch(() => process.exit(1))
}
