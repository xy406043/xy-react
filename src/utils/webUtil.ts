/**
 * 网址补全 - 可用于站点路径访问
 * @param linkUrl 链接
 * @returns 有效的链接地址
 */
export const checkPreHref = (linkUrl: string) => {
  const httpRegex = new RegExp(/http/)
  const preRegex = new RegExp(/\/\//)

  if (httpRegex.test(linkUrl)) {
    return linkUrl
  } else if (preRegex.test(linkUrl) && !httpRegex.test(linkUrl)) {
    return document.location.protocol + linkUrl
  } else {
    return document.location.origin + '/' + linkUrl
  }
}
