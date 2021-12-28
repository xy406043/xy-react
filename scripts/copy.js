const path = require('path')
const fs = require('fs')

// 两种方案 ==
// 1 在构建前将需要的脚本构建到 public目录下
// 2 构建完毕之后将需要的内容 copy 到dist 下

// 1 当然是最优的，2就不看了，只是单一的配置那就直接放到dist目录下就好了
// 如果不是很需要对各个方面的插件做非常独特化的构建方式，那么可以参考  https://github.com/baiy/Ctool 这个插件的开发
// 只是一个工具面板 ，不需要与现有的浏览器页面相关联，用到的api可以进行单独的封装，功能性非常通用

// 删除文件
// const removeFile = filePath => {
//   fs.existsSync(filePath) && fs.unlinkSync(filePath)
// }

// removeFile(path.join(__dirname, "../dist/manifest.json"));

fs.copyFileSync(path.join(__dirname, '../src/utils/content-scripts/index.js'), path.join(__dirname, '../dist/content-scripts/index.js'))
fs.copyFileSync(path.join(__dirname, '../src/utils/back/index.js'), path.join(__dirname, '../dist/back/index.js'))
