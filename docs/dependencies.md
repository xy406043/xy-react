### @babel/core @babel/eslint-parser

> eslint 所需

#### @babel/cli @babel/core @babel/preset-env @babel/node

> - 在本项目仅是为了 构建 chrome 所需的脚本如 background content-scripts 等
> - (由于脚本中使用了 ES6 需要先使用 babel 转成 cjs 的形式, 或者脚本以.mjs 结尾)
> - (也可以在 package.json 中设置 type 为 module ，但是需要设置 .eslintrc.js 为 .eslintrc.cjs 才能够使 eslint 生效)

```js
babel-node build/build.js
```

#### ts-node tsconfig-paths esno

> - ts-node 用于直接运行 ts,tsconfig-paths 用于使 tsconfig.json 中的 files 在 ts-node 中有效。只是无法直接运行 EsNext 需要 tsconfig.json 设 module 为 commonjs 或者 package.json 设 type 为 modul

```
ts-node -r tsconfig-paths/register src/ls.ts  --files
```

> - esno 可以直接以 Typescript & ESNext 运行

```
esno build/build.ts
```

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

### stylelint stylelint-config-standard

> - 解除 css at-rule 某些必要的用法的 warning 比如 tailwind css 的 @apply <本项目使用的 unocss 不支持 @apply 可以使用 shortcuts 自定义>

> - 需在项目级的 settings.json 中添加以下规则

```json
{
  "css.validate": false, // 交由 stylelint进行检查
  "less.validate": false,
  "scss.validate": false
}
```
