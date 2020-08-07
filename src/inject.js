(function (global, factory) {
  console.debug('FBCLID - Inject')
  factory(global)
})(this, function (global) {
  const observer = new MutationObserver(mutations => {
    mutations.forEach(mutation => {
      const addedNodes = mutation.addedNodes
      addedNodes.forEach(node => execNode(node))
    })
  })

  execNode(document.body)
  observer.observe(document.body, {
    subtree: true,
    childList: true
  })

  function execNode(node) {
    if (node.href) {
      updateAnchors([node])
      return
    }
    if (!node.querySelectorAll) {
      return
    }
    updateAnchors(node.querySelectorAll('a'))
  }

  function updateAnchors(anchors) {
    anchors = Array.from(anchors).filter(a => a.href)
    anchors.forEach(anchor => updateAnchorHref(anchor))
  }

  function updateAnchorHref(anchor) {
    const url = global.getCleanUrl(anchor.href)
    anchor.href = url
  }
})
