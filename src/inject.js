console.debug('FBCLID KILLER')

const prefixToRemove = ['https://l.facebook.com/l.php?u=', 'https://www.facebook.com/']
const paramsToRemove = ['fbclid', 'h', '__tn__', 'c[0]']
Object.freeze(prefixToRemove)
Object.freeze(paramsToRemove)

const observer = new MutationObserver(mutations => {
  mutations.forEach(mutation => {
    const addedNodes = mutation.addedNodes
    addedNodes.forEach(node => {
      if (!node.querySelectorAll) return
      const anchors = Array
        .from(node.querySelectorAll('a'))
        .filter(a => a.href.includes('fbclid'))
      anchors.forEach(anchor => {
        const originHref = decodeURIComponent(anchor.href)
        let tempHref = originHref
        prefixToRemove.forEach(prefix => tempHref = tempHref.replace(prefix, ''))
        const url = new URL(tempHref)
        paramsToRemove.forEach(param => url.searchParams.delete(param))
        const newHref = url.href
        console.debug({ new: newHref, origin: originHref })
        anchor.href = newHref
      })
    })
  })
})

observer.observe(document.body, {
  childList: true,
  subtree: true
})
