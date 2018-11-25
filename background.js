chrome.webRequest.onBeforeRequest.addListener(
  function (details) {
    const url = new URL(details.url)
    if (!url.searchParams.has('fbclid')) return
    url.searchParams.delete('fbclid')
    return { redirectUrl: url.href }
  },
  { urls: ["<all_urls>"] },
  ["blocking"]
)