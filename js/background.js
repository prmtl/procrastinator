const BLOCKED_DOMAINS = [
  '9gag.com',
  'reddit.com',
  'www.reddit.com',
];

function getDomain(url) {
  const link = document.createElement('a');
  link.href = url;
  // ??? garbage collection so there will not be milions of 'a'?
  return link.hostname;
}

const blockedPage = chrome.runtime.getURL('/html/blocked.html');

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === 'loading') {
    const tabDomain = getDomain(tab.url);
    if (BLOCKED_DOMAINS.indexOf(tabDomain) !== -1) {
      chrome.tabs.update(tabId, {
        url: blockedPage + '?url=' + encodeURIComponent(tab.url),
      });
    }
  }
});
