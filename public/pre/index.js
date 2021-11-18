// popup.js 每次点击都会重新触发一次
// 不会跨域，无法访问原本页面内容

/**
 // 如果不需要在App 内部调用 chrome api，只有一些简单的在background 的操作，则可以使用下面的 方式嵌入
setTimeout(() => {
  let embed = document.createElement('iframe')
  embed.src = 'http://localhost:3000'

  embed.width = 400
  embed.height = 500

  document.body.appendChild(embed)

  console.log('真实Pop环境内的', chrome)
  console.log('content', embed.contentWindow)
})
*/
