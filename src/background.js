function listener(details) {
  const url = new URL(details.url)
  const param = 'fbclid'
  if (!url.searchParams.has(param)) return
  // console.log(url)
  url.searchParams.delete(param)
  return { redirectUrl: url.href }
}

const filter = { urls: ['<all_urls>'] }
const extraInfoSpec = ['blocking', 'requestBody']

chrome.webRequest.onBeforeRequest.addListener(listener, filter, extraInfoSpec)
