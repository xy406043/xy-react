[TOC]

#### @babel/core @babel/eslint-parser

> eslint 所需

#### @babel/cli @babel/core @babel/preset-env @babel/node

> 在本项目仅是为了 构建 chrome 所需的脚本如 background content-scripts 等
> (由于脚本中使用了 ES6 需要先使用 babel 转成 mjs 的形式, 或者脚本以.mjs 结尾)
> (也可以在 package.json 中设置 type 为 module ，但是需要设置 .eslintrc.js 为 .eslintrc.cjs 才能够使 eslint 生效)

##### 配置 babelrc

```json
{
  "presets": [
    [
      "@babel/preset-env",
      {
        "targets": {
          "node": "current"
        }
      }
    ]
  ]
}
```

##### 执行脚本

```json
{
  "scripts": {
    "build": "tsc && babel-node esbuild.config.js"
  }
}
```

#### stylelint stylelint-config-standard

> 解除 css at-rule 某些必要的用法的 warning 比如 tailwind css 的 @apply <本项目使用的 unocss 不支持 @apply 可以使用 shortcuts 自定义>
>
> 需在项目级的 settings.json 中添加以下规则

```json
{
  "css.validate": false, // 交由 stylelint进行检查
  "less.validate": false,
  "scss.validate": false
}
```
