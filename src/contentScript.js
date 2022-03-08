'use strict';

// Content script file will run in the context of web page.
// With content script you can manipulate the web pages using
// Document Object Model (DOM).
// You can also pass information to the parent extension.

// We execute this script by making an entry in manifest.json file
// under `content_scripts` property

// For more information on Content Scripts,
// See https://developer.chrome.com/extensions/content_scripts

// Log `title` of current active web page
const pageTitle = document.head.getElementsByTagName('title')[0].innerHTML;
if (pageTitle.match("bei expert kaufen")) {
  const csrf_token = document.head.querySelector('meta').getAttribute('content');
  const element = document.querySelector('div.widget-ArticleStatus');
  const cart_id = element.getAttribute('data-cart-id');
  const article_id = element.getAttribute('data-article-id');
  const tokens = {
    csrf_token,
    cart_id,
    article_id,
  }
  sendMessage(JSON.stringify(tokens))
}


// Communicate with background file by sending a message

function sendMessage(stringtoken) {
  chrome.runtime.sendMessage(
    {
      type: 'contentScript',
      payload: {
        message: stringtoken,
      },
    },
    response => {
      console.log(response.message);
    }
  );
}

// Listen for message
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type === 'COUNT') {
    console.log(`Current count is ${request.payload.count}`);
  }

  // Send an empty response
  // See https://github.com/mozilla/webextension-polyfill/issues/130#issuecomment-531531890
  sendResponse({});
  return true;
});
