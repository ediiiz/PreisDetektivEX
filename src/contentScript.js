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

(() => {
  function loadExpertTokens() {
    const pageTitle = document.head.getElementsByTagName('title')[0].innerHTML;
    if (pageTitle.match("bei expert kaufen")) {
      const csrf_token = document.head.querySelector('meta').getAttribute('content')
      const element = document.querySelector('div.widget-ArticleStatus');
      const cart_id = element.getAttribute('data-cart-id');
      const article_id = element.getAttribute('data-article-id');
      chrome.storage.local.set({ csrf_token: csrf_token }, () => {
        console.log('Stored: ' + csrf_token);
      })
      chrome.storage.local.set({ cart_id: cart_id }, () => {
        console.log('Stored: ' + cart_id);
      })
      chrome.storage.local.set({ article_id: article_id }, () => {
        console.log('Stored: ' + article_id);
      })

    }
  }

  loadExpertTokens()

})();
