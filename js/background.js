const defaultOptions = {
  urls: '',
  enabled: true,
};

function getOptions(callback) {
  chrome.storage.sync.get(defaultOptions, callback);
}

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
    getOptions(options => {
      if (!options.enabled) {
        return;
      }
      if (options.urls.split('\n').indexOf(tabDomain) !== -1) {
        chrome.tabs.update(tabId, {
          url: blockedPage + '?url=' + encodeURIComponent(tab.url),
        });
      }
    });
  }
});
