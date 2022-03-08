'use strict';

// With background scripts you can communicate with popup
// and contentScript files.
// For more information on background script,
// See https://developer.chrome.com/extensions/background_pages

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type === 'csrf_token') {
    const message = `Data received`;

    // Log message coming from the `request` parameter
    console.log(JSON.parse(request.payload.message));
    // Send a response message
    sendResponse({
      message,
    });
  }
});

chrome.cookies.getAll({ domain: "expert.de" }, cookies => {
  for (const cookie of cookies) {
    if (cookie.httpOnly == true) {
      console.log(cookie);
    }
  }
});
