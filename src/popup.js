'use strict';

import './popup.css';

(function () {
  const counterStorage = {
    get: cb => {
      chrome.storage.sync.get(['count'], result => {
        cb(result.count);
      });
    },
    set: (value, cb) => {
      chrome.storage.sync.set(
        {
          count: value,
        },
        () => {
          cb();
        }
      );
    },
  };

  function setupCounter(initialValue = 0) {
    document.getElementById('counter').innerHTML = initialValue;

    document.getElementById('loadCookies').addEventListener('click', () => {
      loadExpertCookies();
    });
  }



  function loadExpertCookies() {
    const expertCookieObj = [];
    chrome.cookies.getAll({ domain: "expert.de" }, cookies => {
      for (const cookie of cookies) {
        if (cookie.httpOnly == true) {
          let obj = {
            name: cookie.name,
            value: cookie.value,
          }
          expertCookieObj.push(obj);
        }
      }
      sendMessage(JSON.stringify(expertCookieObj))
    });
  }

  function restoreCounter() {
    // Restore count value
    counterStorage.get(count => {
      if (typeof count === 'undefined') {
        // Set counter value as 0
        counterStorage.set(0, () => {
          setupCounter(0);
        });
      } else {
        setupCounter(count);
      }
    });
  }

  document.addEventListener('DOMContentLoaded', restoreCounter);


  function sendMessage(stringtoken) {
    chrome.runtime.sendMessage(
      {
        type: 'background',
        payload: {
          message: stringtoken,
        },
      },
      response => {
        console.log(response.message);
      }
    );
  }
  // Communicate with background file by sending a message
})();
