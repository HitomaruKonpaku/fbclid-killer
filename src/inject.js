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
    if (!node.querySelectorAll) {
      return
    }
    // Do something with current node
    cleanAnchors(node)
    // Ignore body on init call
    if (node !== document.body) {
      removeSuggestionPost(node)
    }
  }

  function cleanAnchors(node) {
    if (node.href) {
      updateAnchors([node])
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

  function removeSuggestionPost(node) {
    const isSuggestionPost = node => {
      const keywords = ['Suggested for You']
      const isValid = keywords.some(keyword => {
        const spans = Array
          .from(node.querySelectorAll('span'))
          .filter(span => span.innerText === keyword)
        return spans.length
      })
      return isValid
    }

    if (!isSuggestionPost(node)) {
      return
    }
    console.debug('Remove suggestion post', node)
    node.remove()
  }
})
