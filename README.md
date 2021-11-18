### 深入化 React 学习 并配合开发 chrome 插件

#### 规范化

> 之前尝试过使用 vite + vue3 + ts + eslit + prettier + husky + lint-staged 这一套流程开发了一个简单的 Vue3 组件 [viteTools](https://gitee.com/xy406043/xy-vite-tools.git) 放到 npm 上， 并在 一个 ts 项目中成功引用。 虽然有很多地方没做好， 比如依赖太臃肿等

这一次 将 vue3 换成了 react 并且用来开发 chrome 插件 ，一方面是加深 前端规范化常规流程的理解，另一方面也是学习 React，毕竟 似乎 React 的生态要比 Vue 要好，也为了强化了 前端工程化思路。

#### react 开发 chrome 插件 痛点

- 没有办法即时更改，每次代码修改都需要进行 build 而后进行 点击 chrome 插件的更新再进行尝试。
  幸好使用 vite 打包非常快。
- 目前可以通过 iframe 内嵌 http://localhost:3000 端口进行调试
