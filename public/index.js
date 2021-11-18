// setTimeout(function () {
//   // 每一个页面都能触发
//   console.log("可以获取到当前页面的函数方法", window);
//   window.location.href = "http://localhost:3000";

//   // TODO 内嵌 本地页面进行调试
//   setTimeout(() => {
//     console.log("修改后", window);
//   }, 1000);
// }, 300);

setTimeout(() => {
  let embed = document.createElement('iframe')
  embed.src = 'http://localhost:3000'

  embed.width = 300
  embed.height = 220

  document.body.appendChild(embed)
})
