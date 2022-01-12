```json
{
  // 初始使用tsc编译为 scripts/build.js可以使用非 js文件，但是指定了文件无法使用 tsconfig.json。且 build.js 也不能使用别名写法
  "b1": "tsc --target es6 --moduleResolution node  src/config/themeConfig.ts src/adapterTool/adapter.ts && babel-node scripts/build.js",
  // 探索过程    ts-node 可以使用 tsconfig.json 但是 不可以处理ES6,需要设置package.json 的type为module或者tsconfig.json的module为commonjs，但是这两种个人感觉都不太好
  "b2": "ts-node -r tsconfig-paths/register src/ls.ts  --files",
  // 有效版本  esno 使用 esbuild-register 可以处理Typescript &  ESNext ，在tsconfig.json设置别名， build.ts也没有限制了
  "b3": "esno scripts/build.ts --adapter=chrome"
}
```
