(function (global, factory) {
  console.debug('FBCLID - Background')
  factory(global)
})(this, function (global) {
  const filter = { urls: ['<all_urls>'], types: ['main_frame'] }
  const extraInfoSpec = ['blocking', 'requestBody']
  chrome.webRequest.onBeforeRequest.addListener(listener, filter, extraInfoSpec)

  function listener(details) {
    const isFbUrl = global.isFbUrl(details.url)
    if (!isFbUrl) {
      return
    }

    const url = global.getCleanUrl(details.url)
    if (url !== details.url) {
      return { redirectUrl: url }
    }
  }
})
