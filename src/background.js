'use strict';

// With background scripts you can communicate with popup
// and contentScript files.
// For more information on background script,
// See https://developer.chrome.com/extensions/background_pages

const reqDataExpert = [];
const reqDataCookies = [];

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type === 'contentScript') {
    const message = `Data received`;

    // Log message coming from the `request` parameter
    reqDataExpert.push(JSON.parse(request.payload.message));
    console.log(reqDataExpert);
    // Send a response message
    sendResponse({
      message,
    });
  }
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type === 'background') {
    const message = `Background received`;

    // Log message coming from the `request` parameter
    reqDataCookies.push(JSON.parse(request.payload.message));
    console.log(reqDataCookies);
    // Send a response message
    sendResponse({
      message,
    });
  }
});
