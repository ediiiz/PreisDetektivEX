import { branches } from './branches.js';
import { fetchCashback } from './affiliate.js';
import { setCookie, getCookie, notifyBackgroundPage } from './helper.js';
import { generateUI } from './UI.js';
let REF_LINK;
const BASKET_ENDPOINT = `https://www.expert.de/_api/shoppingcart/addItem`;
const MODIFY_QUANTITY = `https://www.expert.de/_api/shoppingcart/modifyItemQuantity`;
const PREISDETEKTIV_API = 'http://localhost:5173/api/product'
let marketObjectsArray = [];


function loadExpertTokens() {
  const pageTitle = document.head.getElementsByTagName('title')[0].textContent;
  if (pageTitle.match("bei expert kaufen")) {
    const csrf_token = document.head.querySelector('meta').getAttribute('content')
    const element = document.querySelector('div.widget-ArticleStatus');
    const cart_id = element.getAttribute('data-cart-id');
    const article_id = element.getAttribute('data-article-id');
    const producturl = document.location.href.split('?')[0];
    const product = pageTitle.split(' -')[0]
    const webcode = document.getElementsByClassName("widget-ArticleNumber-text")[0].innerText.split(" ")[1]

    const expertTokens = {
      cart_id,
      csrf_token,
      article_id,
      producturl,
      product,
      webcode,
    }

    browser.storage.local.set(expertTokens, () => {
    })

  }
}

async function setLocalStorage(token) {
  browser.storage.local.set({ token }, () => {
  })
}

exportFunction(setLocalStorage, window, { defineAs: 'setLocalStorage' });

async function addPreisDetektivToSite() {
  const url = new URL(document.location.href);
  const branchId = url.searchParams.get("branch_id");
  if (!branchId) {
    if (!(await notifyBackgroundPage('readCookie') === 'e_14184028')) {
      await notifyBackgroundPage('switchCookie', { name: 'fmarktcookie', url: 'expert.de', value: `e_14184028`, exdays: 2555, hostOnly: 1 });
      location.reload();
    }
  }
  const script = document.createElement("script");
  script.src = "https://www.google.com/recaptcha/api.js?render=6LdjgBokAAAAADvZloidoTl7v_5-EUKhz3vp8TMU";
  document.head.appendChild(script);
  const rootOverlay = document.createElement('div');
  rootOverlay.id = 'rootOverlay';
  document.body.appendChild(rootOverlay);

  //REF_LINK = await fetchCashback();
  await fetchInteface();
  reloadTable();
  loadExpertTokens();
}

/// Button Logic
async function fetchInteface() {
  const path = await notifyBackgroundPage('getExtensionUrl', { url: 'preisdetektiv.html' })
  const response = await fetch(path.url);
  const html = await response.text();
  document.getElementById('rootOverlay').innerHTML = html;
  const captchaPath = await notifyBackgroundPage('getExtensionUrl', { url: 'recaptcha.js' })
  const script = document.createElement("script");
  script.src = captchaPath.url;
  document.head.appendChild(script);
  generateUI();
}

async function bestpreisButton() {
  removeResults();
  getExpertPrice();
}

exportFunction(bestpreisButton, window, { defineAs: 'bestpreisButton' });

function removeResults() {

  try {
    document.getElementById('resultsTable').remove();
  } catch (error) {
    console.log('No table to remove');
  }
}

async function reloadTable() {
  let storage = await browser.storage.local.get(['lastSearch']);
  if (storage.length != 0) {
    createListForResults(storage.lastSearch);
  } else {
    console.log('No lastSearch found');
  }
}

function createListForResults(sortedResults) {
  const resultsWrapper = document.getElementById('resultsWrapper');
  const results = document.createElement('div');
  results.id = 'resultsTable'
  results.classList.add('grid', 'grid-cols-1', 'auto-cols-auto', 'place-content-start', 'place-items-center', 'gap-8', 'p-4', 'm-4');
  resultsWrapper.appendChild(results);
  for (const entry in sortedResults) {
    results.insertAdjacentHTML('afterbegin',
      `<div class="results w-full bg-gray-900 rounded-lg max-w-5xl">
    <div class="p-8 text-2xl flex flex-col place-items-center gap-4">
      <div>${sortedResults[entry].market}</div>
      <a target="_blank" href="${sortedResults[entry].url}&${REF_LINK}" class="btn btn-block text-2xl h-20">${sortedResults[entry].price}€*</a>
    </div>
  </div>`);
  }
}

async function getStorageData() {
  const data = await browser.storage.local.get(
    [
      'session',
      'cart_id',
      'article_id',
      'csrf_token',
      'producturl',
      'product',
      'webcode',
    ]
  )
  return data;
}

async function getStoragebyId(id) {
  const data = await browser.storage.local.get(id);
  return data;
}

// Logic if single request is made or if every market is checked
// if branch_id is set, only one market is checked
// if branch_id is not set, all markets are checked

async function getExpertPrice(branch_id = 0) {
  const requestData = await getStorageData()

  // Destructure data
  const {
    cart_id,
    csrf_token,
    article_id,
  } = requestData;

  requestData['branch_id'] = branch_id;

  if (article_id === '' && cart_id === '' && csrf_token === '') {
    throw new Error('Oops! Static Data is empty, cant continue');
  };

  if (branch_id != 0) {
    const marketobj = await makeApiRequest(requestData);
    console.log(marketobj);
    await notifyBackgroundPage('switchCookie', { name: 'fmarktcookie', url: 'expert.de', value: `e_14184028`, exdays: 2555, hostOnly: 1 });
  } else {
    getAllBranches(requestData);
    await notifyBackgroundPage('switchCookie', { name: 'fmarktcookie', url: 'expert.de', value: `e_14184028`, exdays: 2555, hostOnly: 1 });
  };
};

async function getAllBranches({ cart_id, csrf_token, article_id, producturl }) {
  try {
    marketObjectsArray = [];
    await getNextMarket({ cart_id, csrf_token, article_id, producturl })
    const resolvedMarketObjects = await Promise.all(marketObjectsArray);
    sortAndPush(resolvedMarketObjects);
  } catch (error) {
    console.error(
      'Oops! Something went wrong while getting all Branches',
      error
    );
  }
}

async function getNextMarket({ status = 200, rootidx = 0, branchidx = 0,
  cart_id, csrf_token, article_id, producturl }) {
  let requestData = {
    cart_id,
    article_id,
    csrf_token,
    producturl,
  };
  const allRoots = Object.keys(branches)
  setProgessbar((rootidx / allRoots.length) * 100)
  if (rootidx <= allRoots.length - 1) {
    const rootName = Object.keys(branches)[rootidx]
    if (branchidx <= branches[rootName].length - 1) {
      const branchName = branches[rootName][branchidx]
      requestData = { ...requestData, name: branchName.name, branch_id: branchName.id, city: branchName.city };
      const marketObject = await makeApiRequest(requestData);
      marketObjectsArray.push(marketObject);
      marketObject.status = status;

      if (status > 400) {
        ++branchidx
        await getNextMarket({ status, rootidx, branchidx, cart_id, csrf_token, article_id, producturl })

      } else {
        ++rootidx
        branchidx = 0
        await getNextMarket({ status, rootidx, branchidx, cart_id, csrf_token, article_id, producturl })

      }
    } else {
      ++rootidx
      branchidx = 0
      await getNextMarket({ status, rootidx, branchidx, cart_id, csrf_token, article_id, producturl })

    }
  } else {
    console.log("Final Market");
  }
}

async function makeApiRequest({ cart_id, csrf_token, article_id, branch_id, producturl, city }) {
  const url = `${producturl}?branch_id=${branch_id}&gclid=0`;

  let myHeaders = {
    "accept": "application/json, text/javascript, */*; q=0.01",
    "accept-language": "en-DE,en;q=0.9,de-DE;q=0.8,de;q=0.7,en-US;q=0.6",
    "content-type": "application/json; charset=UTF-8",
    "csrf-token": `${csrf_token}`,
  }

  let obj = {
    shoppingCartId: cart_id,
    quantity: "1",
    article: article_id,
  }

  let raw = JSON.stringify(obj);

  let requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow',
    credentials: 'same-origin',
  };

  try {
    await notifyBackgroundPage('switchCookie', { name: 'fmarktcookie', url: 'expert.de', value: `e_${branch_id}`, exdays: 2555, hostOnly: 1 });
    await setCookie({ cname: 'fmarktcookie', cvalue: `e_${branch_id}`, exdays: 2555 });
    const response = await content.fetch(BASKET_ENDPOINT, requestOptions);
    //console.log(`document.cookie: ${ getCookie("fmarktcookie") }`);
    let responsetojson = await response.json();
    if (!response.ok) {
      responsetojson['status'] = response.status
      throw responsetojson;
    }


    const item = await responsetojson.shoppingCart?.itemList.items[0] || '';
    if (item != '') {
      if (item.quantity) {
        await resetCart(item.id, cart_id, csrf_token)
      }
    }

    const price = await responsetojson.shoppingCart?.lastAdded.price.gross || '';

    document.getElementById('currentMarket').textContent = `${city}: ${price}€`;

    const apiResponse = {
      branch_id,
      price,
      market: city,
      url,
      status: response.status,
    };

    return apiResponse;

  } catch (error) {
    const errorResponse = {
      branch_id,
      price: 'no price',
      market: city,
      url,
      status: error.status,
      namespace: error.namespace,
      errorcode: error.errorcode,
    };
    return errorResponse;
  }
}

async function resetCart(item_id, cart_id, csrf_token) {
  let myHeaders = {
    "accept": "application/json, text/javascript, */*; q=0.01",
    "accept-language": "en-DE,en;q=0.9,de-DE;q=0.8,de;q=0.7,en-US;q=0.6",
    "content-type": "application/json; charset=UTF-8",
    "csrf-token": `${csrf_token}`,
  }

  let obj = {
    itemId: item_id,
    quantity: 0,
    shoppingCartId: cart_id,
  }
  let raw = JSON.stringify(obj);

  let requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow',
    credentials: 'same-origin',
  };

  try {
    const response = await content.fetch(MODIFY_QUANTITY, requestOptions);
    let responsetojson = await response.json() || '';
    if (!response.ok) {
      responsetojson['status'] = response.status
      throw responsetojson;

    } else {
      return
    }
  } catch (error) {
    console.log(error);
  }
}

async function sortAndPush(resolvedMarketObjects) {
  try {
    let returnprices = [];
    let sortedprices = [];
    let withPrices = [];
    let noPrices = [];
    let wrongmarkets = [];
    for (const market of resolvedMarketObjects) {
      if (market.price === 'no price') {
        if (market.namespace === undefined) {
          wrongmarkets.push(market);
        } else {
          noPrices.push(market);
        }
      } else {
        withPrices.push(market);
      }
    }

    console.log(
      `Markets with no price = ${noPrices.length},
      Markets with Price = ${withPrices.length}, 
      Failed Markets = ${wrongmarkets.length},
    Total = ${noPrices.length + withPrices.length + wrongmarkets.length} `
    );

    sortedprices = withPrices.sort(function (a, b) {
      return a.price - b.price;
    });


    let counter = 0;
    for (const key in sortedprices) {
      if (counter == 20) {
        break;
      } else {
        returnprices.push({
          price: sortedprices[key].price,
          branchName: sortedprices[key].market,
          branchId: parseInt(sortedprices[key].branch_id),
        });
        counter += 1;
      }
    }

    // Create an event when the search is finished

    const webcode = (await getStoragebyId('webcode')).webcode;
    const url = (await getStoragebyId('producturl')).producturl;

    let searchResult = {
      webcode: `${webcode}`,
      url,
      price: returnprices,
    };

    browser.storage.local.set({ searchResult }, () => {
      console.log(JSON.stringify(searchResult));
    })

    const event = new CustomEvent('searchFinished', {});
    document.getElementById('resultsWrapper').dispatchEvent(event);
    createListForResults(searchResult);
  } catch (error) {
    console.error('Oops! Something went wrong while sorting prices', error);
  }
}


async function pushResultsToAPI(token) {
  const searchResult = (await getStoragebyId('searchResult')).searchResult;

  searchResult['verify'] = token;
  delete searchResult['url'];

  let requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(searchResult),
  };
  const response = await content.fetch(PREISDETEKTIV_API, requestOptions);
  console.log(response);
}

exportFunction(pushResultsToAPI, window, { defineAs: 'pushResultsToAPI' });

/// Helper Functions

function setProgessbar(value) {
  const progress = document.getElementById('progressBar');
  progress.value = value;
}

function setDisplay(Id, attr) {
  document.getElementById(Id).style.display = attr;
}

const sleep = (milliseconds) => {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
};



/// Start

addPreisDetektivToSite();
