chrome.action.disable();

chrome.runtime.onInstalled.addListener(() => {
  chrome.declarativeContent.onPageChanged.removeRules(() => {
    chrome.declarativeContent.onPageChanged.addRules([{
      conditions: chrome.runtime.getManifest().host_permissions.map(h => {
        const [, sub, host] = h.match(/:\/\/(\*\.)?([^/]+)/);
        return new chrome.declarativeContent.PageStateMatcher({
          pageUrl: sub ? { hostSuffix: '.' + host } : { hostEquals: host },
        });
      }),
      actions: [new chrome.declarativeContent.ShowAction()],
    }]);
  });
});


chrome.tabs.onUpdated.addListener((tabId, tab) => {
  if (tab.favIconUrl && tab.favIconUrl.includes("expert.de")) {
    console.log(tab);
    loadExpertCookies();
    chrome.storage.local.set({ tabId: tabId }, () => {
      console.log('Stored: ' + tabId);
    })
  }
});

function loadExpertCookies() {
  chrome.cookies.getAll({ domain: "expert.de" }, cookies => {
    for (const cookie of cookies) {
      if (cookie.name.includes("__cflb")) {
        chrome.storage.local.set({ __cflb: cookie.value }, () => {
          console.log('Stored: ' + cookie.value);
        })
      }
      if (cookie.name.includes("__cf_bm")) {
        chrome.storage.local.set({ __cf_bm: cookie.value }, () => {
          console.log('Stored: ' + cookie.value);
        })
      }
      if (cookie.name.includes("session")) {
        chrome.storage.local.set({ session: cookie.value }, () => {
          console.log('Stored: ' + cookie.value);
        })
      }
    }
  })
};



