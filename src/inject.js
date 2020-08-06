console.debug('FBCLID KILLER')

console.debug = () => { }

const paramsToRemove = ['fbclid', '__tn__', '__cft__[0]']
Object.freeze(paramsToRemove)

const observer = new MutationObserver(mutations => {
  mutations.forEach(mutation => {
    const addedNodes = mutation.addedNodes
    addedNodes.forEach(node => {
      if (!node.querySelectorAll) return
      const anchors = !node.href
        ? Array.from(node.querySelectorAll('a')).filter(a => a.href)
        : [node]
      anchors.forEach(anchor => {
        const originHref = decodeURIComponent(anchor.href)
        let tempHref = originHref.replace('https://l.facebook.com/l.php?u=', '')
        const index = tempHref.indexOf('fbclid')
        if (index >= 0) {
          tempHref = tempHref.slice(0, index)
        }
        let url
        try {
          url = new URL(tempHref)
        } catch (error) {
          console.error(`Invalid URL '${originHref}'`)
          return
        }
        paramsToRemove.forEach(param => url.searchParams.delete(param))
        const newHref = url.href
        console.debug({ new: newHref, org: originHref })
        anchor.href = newHref
      })
    })
  })
})

observer.observe(document.body, {
  subtree: true,
  childList: true
})
