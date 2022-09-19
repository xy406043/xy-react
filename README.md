### 深入化 React 学习 并配合开发 chrome 插件

> 一开始使用 Chrome 的 User Javascript And Css 插件进行 向页面注入脚本 以调整页面内容。为了便于网址收藏以及知识库建立 在此插件中 通过修改 DOM 显示自己需要的网页信息。但是这个插件对于 全局网站匹配 \*\* 不可重复，必须在一个文件内，光是展示网页信息就需要很长的代码。于是又尝试使用了 temperMonkey 油猴插件，只是使用 Es6 的方式默认就会报错，而使用 Es5 的方式又需要对自己的代码进行调整/编译，且插件市场 greasky fork 要求代码可读。开发完成之后，又想着顺便学学 Chrome 插件开发，于是创建了一个简单的基础 html popup 版本，现在正在使用，现在则是希望强化下现有的功能，展示的更加漂亮，于是决定使用 Vite React Typescript Sass 进行开发，正好补充学习下这些知识。

#### 规范化

> 之前尝试过使用 vite + vue3 + ts + eslit + prettier + husky + lint-staged 这一套流程开发了一个简单的 Vue3 组件 [viteTools](https://gitee.com/xy406043/xy-vite-tools.git) 放到 npm 上， 并在 一个 ts 项目中成功引用。 虽然有很多地方没做好， 比如依赖太臃肿等

这一次 将 vue3 换成了 react 并且用来开发 chrome 插件 ，一方面是加深 前端规范化常规流程的理解，另一方面也是学习 React，毕竟 似乎 React 的生态要比 Vue 要好，也为了强化了 前端工程化思路。
实现的功能还是 TDKI 好了， 以及使用 sass 和 unocss 功能尝试

#### 运行

```s
cnpm run  b --adapter=[chrome|firefox|opera|edge]
```

#### 构建

```s
cnpm run b
```

#### react 开发 chrome 插件 痛点

- 没有办法即时更改，每次代码修改都需要进行 build 而后进行 点击 chrome 插件的更新再进行尝试。
  <!-- 幸好使用 vite 打包非常快。-- 只是yarn dev 时 -->
- 目前可以通过 iframe 内嵌 http://localhost:3000 端口进行调试，但是内嵌的无法使用 chrome Api

#### ⚠️⚠️⚠️⚠️ 过程 ⚠️⚠️⚠️⚠️

[依赖](docs/dependencies.md)

1. (仅完全独立开发 Chrome 插件时使用，多端时使用 extension-polyfill-ts 时会去掉)安装@types/chrome 以解决开发环境无 chrome 变量的问题
2. ant-design 4.0 版本 Js 代码默认支持基于 Es module 的 tree shaking

#### 💪🏻💪🏻💪🏻💪🏻 TODO 点 💪🏻💪🏻💪🏻💪🏻💪🏻

- [ ] 打包时如何生成类 webpack 的 chunkName
- [ ] 使用 Antd 进行 内容展示
- [ ] 扩展 TDKI 使用：添加路由、结构清晰、脚本明了
- [ ] background.js 和 content-scripts 使用 ts ？ 如何在构建之后与 manifest.json 仍然有新的内
- [ ] i18n
- [ ] 构建多页面 - 需要转换为使用 [webExtension Api](docs/extension.md) 的 browser\* 命名空间
- [ ] 类似 vben-admin (vue3) 使用 (把自定义 variable 用 响应式注入全局 用来生成 class)；以及使用 namespace 统一配置生成 prefix 在 css 中 生成与 prefixCls 一样的 class 名

```js
const { prefixCls } = useDesign('basic-arrow')
```

```css
@prefix-cls: ~'@{namespace}-icon-picker';

.@{prefix-cls} {
  .ant-input-group-addon {
    padding: 0;
  }

  &-popover {
    width: 300px;

    .ant-popover-inner-content {
      padding: 0;
    }

    .scrollbar {
      height: 220px;
    }
  }
}
```

- [ ] 构建配置符合不同浏览器格式的插件 (先参考 CTool) (src 不直接使用外部 Api,而是先进行封装，通过环境变量区分构建)
- [ ] 编写 vite 插件
