(()=>{var i=[],m=[],p=new RegExp(/http/);h();chrome.runtime.onMessage.addListener(function(a,d,l){l("background\u4F60\u597D\uFF0C\u6211\u6536\u5230\u4E86\u4F60\u7684\u6D88\u606F\uFF01"+a.type),a.type==="tabUpdate"&&h()});async function h(){i=[],m=[],a(!0);async function a(d){async function l(){let c=[];return c.push(new Promise((e,s)=>{["shortcut icon","icon","alternate icon","mask-icon","apple-touch-icon"].forEach(n=>{let o=document.querySelector(`link[rel="${n}"]`)?.getAttribute("href");o&&i.push(o)}),e(!0)})),d&&c.push(new Promise((e,s)=>{let t=document.querySelector('link[rel="manifest"]')?.getAttribute("href");t?fetch(t).then(async n=>{let o=await n.json();!o.icons||!o.icons.length||(o.icons.forEach((r,u)=>{let g=p.test(r.src)?r.src:document.location.origin+"/"+r.src;i.push(g)}),e(!0))}).catch(()=>{e(!0)}):e(!0)})),c.push(new Promise((e,s)=>{let t=new Image;t.src=document.location.origin+"/favicon.ico",t.crossOrigin="anonymous",t.onload=function(){i.push(t.src),e(!0)},t.onerror=function(){console.log("\u8BE5\u94FE\u63A5\u65E0\u6548",t.src),e(!0)}})),Promise.all(c)}function f(){let c=["description","twitter:description"],e=["og:description","twitter:description"],s=document.getElementsByTagName("meta"),t=[];for(let n=0;n<s.length;n++)c.includes(s[n]?.getAttribute("name"))&&t.push(s[n].getAttribute("content")),e.includes(s[n]?.getAttribute("property"))&&t.push(s[n].getAttribute("content"));return t}async function y(){let c=["image","twitter:image","twitter:image:src"],e=["og:image"],s=["name","property","itemprop"],t=document.getElementsByTagName("meta"),n=[];for(let o=0;o<t.length;o++)s.forEach(r=>{let u=t[o].getAttribute("content"),g=p.test(u)?u:document.location.origin+"/"+u;c.includes(t[o].getAttribute(r))&&n.push(g),e.includes(t[o].getAttribute(r))&&n.push(g)});m=n}let w=document.getElementsByTagName("title")[0]?.innerText,A=window.location.href,b=f()[0]||"",x=document.querySelector('meta[name="keywords"]')?.getAttribute("content");await l(),y(),k();function k(){let c={pageTitle:w,linkUrl:A,desc:b,keywords:x,icons:i,imgs:m};chrome.runtime.sendMessage(c,e=>{console.log("content-scripts \u6536\u5230 \u6765\u81EA\u540E\u53F0\u7684\u56DE\u590D\u6570\u636E",e)})}}}var L={};})();
//# sourceMappingURL=index.js.map
