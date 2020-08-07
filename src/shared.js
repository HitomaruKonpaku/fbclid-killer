(function (global, factory) {
  console.debug('FBCLID - Shared')
  factory(global)
})(this, function (global) {
  global.getCleanUrl = (originUrl) => {
    const paramsToRemove = ['fbclid', '__cft__[0]', '__tn__']
    try {
      let tmpUrl = decodeURIComponent(originUrl)
        .replace('https://l.facebook.com/l.php?u=', '')
      let url = new URL(tmpUrl)
      if (url.searchParams.get('fbclid')) {
        const index = tmpUrl.indexOf('fbclid=')
        tmpUrl = tmpUrl.slice(0, index)
        url = new URL(tmpUrl)
      }
      paramsToRemove.forEach(param => url.searchParams.delete(param))
      const newUrl = url.href
      return newUrl
    } catch (error) {
      console.error(`Invalid URL '${originUrl}'`)
      return originUrl
    }
  }
})
