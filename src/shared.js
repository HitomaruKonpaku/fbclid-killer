(function (global, factory) {
  console.debug('FBCLID - Shared')
  factory(global)
})(this, function (global) {
  const removalParams = ['fbclid', '__cft__[0]', '__tn__', 'c[0]', 'h']

  global.getCleanUrl = (originUrl) => {
    originUrl = decodeURIComponent(originUrl)

    if (!['facebook', 'fbclid'].some(v => originUrl.includes(v))) {
      // console.debug('Skip', originUrl)
      return originUrl
    }

    try {
      // console.debug('Org', originUrl)
      const tmpUrl = originUrl.replace('https://l.facebook.com/l.php?u=', '')

      let url = new URL(tmpUrl)
      removalParams.forEach(param => {
        const prefix = `${param}=`
        const searchIndex = url.search.indexOf(prefix)
        if (searchIndex >= 0) {
          const search = url.search.substring(0, searchIndex - 1)
          url.search = search
        }
        const pathnameIndex = url.pathname.indexOf(prefix)
        if (pathnameIndex >= 0) {
          let pathname = url.pathname.substring(0, pathnameIndex - 1)
          url.pathname = pathname
        }
      })

      url = new URL(url)
      removalParams.forEach(param => url.searchParams.delete(param))

      const newUrl = url.href
      // console.debug('New', newUrl)
      return newUrl
    } catch (error) {
      console.error('Error handling url', originUrl)
      return originUrl
    }
  }
})
