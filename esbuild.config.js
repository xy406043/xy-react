import { build } from 'esbuild' // 使用此语法需要设置 package.json type 为 module；或者使用babel-node 进行执行

const platform = process.env.npm_config_adapter ? process.env.npm_config_adapter : ''

// ?? 需要注意虽然  back 和 content-scripts 在src目录内，但是其构建是使用的esbuild单独构建到public目录，故而不会享受到vite插件 unplugin-auto-imports的作用而自动引入
// ?? 所以在back和content-scripts 目录中使用文本extension Api 需要直接引入 webextension-polyfill

// TODO 尝试也使用vite构建 back 和background

// 构建 chrome 扩展  background.js
// build({
//   entryPoints: ['src/adapter/chrome/back/index.ts'],
//   minify: true,
//   bundle: true,
//   sourcemap: true,
//   tsconfig: './tsconfig.json',
//   outfile: 'public/back/index.js'
// }).catch(() => process.exit(1))

// // 构建 chrome 扩展  content-scrips 脚本
// build({
//   entryPoints: ['src/adapter/chrome/content-scripts/index.ts'],
//   minify: true,
//   bundle: true,
//   sourcemap: true,
//   tsconfig: './tsconfig.json',
//   outfile: 'public/content-scripts/index.js'
// }).catch(() => process.exit(1))

// 构建 chrome 扩展  content-scrips 样式文件
build({
  entryPoints: ['src/adapterContent/content-scripts/index.css'],
  minify: true,
  bundle: true,
  sourcemap: true,
  outfile: `dist/${platform}/content-scripts/index.css`
}).catch(() => process.exit(1))
