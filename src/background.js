try {
  browser.action.onClicked.addListener(tab => {
    browser.windows.create({
      url: browser.runtime.getURL("popup.html"),
      type: "popup",
      height: 800,
      width: 400
    }, function (win) {
    });
  });
} catch (error) {
  console.log(error);
}

function handleMessage(request, sender, sendResponse) {
  console.log(`A content script sent a message: ${request.message}`);
  return Promise.resolve({ response: "response from background script" });
}

browser.runtime.onMessage.addListener(handleMessage);
