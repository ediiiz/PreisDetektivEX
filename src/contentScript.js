import { branches } from './branches.js';
import { fetchCashback } from './affiliate.js';
import { notifyBackgroundPage, setProgessbar, getStoragebyId } from './helper.js';
import { generateUI } from './UI.js';
let REF_LINK;
const BASKET_ENDPOINT = `https://www.expert.de/_api/shoppingcart/addItem`;
const MODIFY_QUANTITY = `https://www.expert.de/_api/shoppingcart/modifyItemQuantity`;
const PREISDETEKTIV_API = 'https://preisdetektiv.lumalala.de/api/product'
const RECAPTCHA_URL = 'https://www.google.com/recaptcha/api.js?render=6LdjgBokAAAAADvZloidoTl7v_5-EUKhz3vp8TMU'
const priceListEntries = [];

let expertTokens = {};

async function bestpreisButton() {
  removeResults();
  if (await loadExpertTokens()) {
    getExpertPrice();
  } else {
    console.log('No expert tokens found');
  }
}

async function loadExpertTokens() {
  const pageTitle = document.head.querySelector('title').textContent;
  if (!pageTitle.includes("bei expert kaufen")) {
    return false;
  }

  const element = document.querySelector('div.widget-ArticleStatus');

  expertTokens = {
    product: pageTitle.split(' -')[0],
    cartId: element.getAttribute('data-cart-id'),
    articleId: element.getAttribute('data-article-id'),
    csrfToken: document.head.querySelector('meta[content]').getAttribute('content'),
    productUrl: document.location.href.split('?')[0],
    webcode: document.querySelector(".widget-ArticleNumber-text").textContent.split(" ")[2],
  };

  return Boolean(expertTokens.cartId);
}

async function addPreisDetektivToSite() {
  const url = new URL(document.location.href);
  const branchId = url.searchParams.get("branch_id");

  // Check if branch ID exists in the URL
  if (!branchId) {
    // Check if cookie `e_14184028` exists
    const cookieExists = await notifyBackgroundPage('readCookie') === 'e_14184028';
    if (!cookieExists) {
      // Set cookie `e_14184028`
      await notifyBackgroundPage('switchCookie', {
        name: 'fmarktcookie',
        url: 'expert.de',
        value: `e_14184028`,
        exdays: 2555,
        hostOnly: 1
      });
      location.reload();
    }
  }

  // Load the Google Recaptcha script
  const recaptchaScript = document.createElement("script");
  recaptchaScript.src = RECAPTCHA_URL;
  document.head.appendChild(recaptchaScript);

  // Create an element to hold the interface
  const rootOverlay = document.createElement('div');
  rootOverlay.id = 'rootOverlay';
  document.body.appendChild(rootOverlay);

  // Load the interface
  await fetchInteface();
  reloadTable();
}

async function fetchInteface() {
  const path = await notifyBackgroundPage('getExtensionUrl', { url: 'preisdetektiv.html' });
  const html = await (await fetch(path.url)).text();
  document.getElementById('rootOverlay').innerHTML = html;

  const captchaPath = await notifyBackgroundPage('getExtensionUrl', { url: 'recaptcha.js' });
  const script = document.createElement("script");
  script.src = captchaPath.url;
  document.head.appendChild(script);

  generateUI();
}

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
    //createListForResults(storage.lastSearch);
  } else {
    console.log('No last Search found');
  }
}



function addEntryToUI(marketObject) {
  const resultsWrapper = document.getElementById('resultsWrapper');
  let resultsTable = document.getElementById('resultsTable');
  // check if results already exists if not create it
  if (!resultsTable) {
    const results = document.createElement('div');
    results.id = 'resultsTable'
    results.classList.add('grid', 'grid-cols-1', 'auto-cols-auto', 'place-content-start', 'place-items-center', 'gap-8', 'p-4', 'm-4');
    resultsWrapper.appendChild(results);
    resultsTable = document.getElementById('resultsTable');
  }

  priceListEntries.push({
    market: marketObject.market,
    webcode: marketObject.webcode,
    url: marketObject.url,
    price: marketObject.price,
    html: `<div class="results w-full bg-gray-900 rounded-lg max-w-5xl">
      <div class="p-8 text-2xl flex flex-col place-items-center gap-4">
        <div>${marketObject.market}</div>
        <a target="_blank" href="${marketObject.url}&${REF_LINK}" class="btn btn-block text-2xl h-20">${marketObject.price}€*</a>
      </div>
    </div>`
  });

  priceListEntries.sort((a, b) => a.price - b.price);

  resultsTable.innerHTML = priceListEntries.map(entry => entry.html).join('');
}



async function getExpertPrice(branchId = 0) {
  const {
    cartId,
    csrfToken,
    articleId,
  } = expertTokens;

  if (!cartId || !csrfToken || !articleId) {
    throw new Error('Static Data is missing, cannot continue');
  }

  if (branchId === 0) {
    const allMarkets = (await getMarkets(expertTokens));
    sortAndPush(allMarkets);
  } else {
    const market = await makeApiRequest({ ...expertTokens, branchId });
  }
}

async function getMarkets({ cartId, csrfToken, articleId, productUrl, webcode }) {
  const marketObjectsArray = [];
  const roots = Object.keys(branches);

  for (let rootIndex = 0; rootIndex < roots.length; rootIndex++) {
    setProgessbar((rootIndex / roots.length) * 100);
    const root = roots[rootIndex];
    const branchesForRoot = branches[root];

    for (let branchIndex = 0; branchIndex < branchesForRoot.length; branchIndex++) {
      const branch = branchesForRoot[branchIndex];
      const marketData = {
        webcode,
        cartId,
        articleId,
        csrfToken,
        productUrl,
        name: branch.name,
        branchId: branch.id,
        city: branch.city
      };
      const marketObject = await makeApiRequest(marketData);
      marketObjectsArray.push(marketObject);
      if (marketObject.status <= 400) {
        addEntryToUI(marketObject);
        break;
      }
    }
  }
  console.log("All Markets Processed");
  return marketObjectsArray;
}

async function makeApiRequest({ cartId, csrfToken, articleId, branchId, productUrl, city, webcode }) {
  const url = `${productUrl}?branch_id=${branchId}&gclid=0`;

  let headers = {
    "csrf-token": csrfToken,
    "content-type": "application/json; charset=utf-8",
    "accept": "application/json, text/javascript, */*; q=0.01",
    "X-Requested-With": "XMLHttpRequest",
    "TE": "trailers",
  }

  let obj = {
    shoppingCartId: cartId,
    quantity: "1",
    article: articleId,
  }

  let requestOptions = {
    method: 'POST',
    headers: headers,
    body: JSON.stringify(obj),
    redirect: 'follow',
    credentials: 'same-origin',
  };

  try {
    await notifyBackgroundPage('switchCookie', { name: 'fmarktcookie', url: 'expert.de', value: `e_${branchId}`, exdays: 2555, hostOnly: 1 });
    const response = await content.fetch(BASKET_ENDPOINT, requestOptions);
    let bodyData = await response.json();
    if (!response.ok) {
      bodyData['status'] = response.status
      throw bodyData;
    }


    const item = await bodyData.shoppingCart?.itemList.items[0] || '';
    if (item != '') {
      if (item.quantity) {
        await resetCart(item.id, cartId, csrfToken)
      }
    }

    const price = await bodyData.shoppingCart?.lastAdded.price.gross || '';

    document.getElementById('currentMarket').textContent = `${city}: ${price}€`;

    const apiResponse = {
      webcode,
      branchId,
      price,
      market: city,
      url,
      status: response.status,
    };

    return apiResponse;

  } catch (error) {
    const errorResponse = {
      webcode,
      branchId,
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
  let headers = {
    "csrf-token": csrf_token,
    "content-type": "application/json; charset=utf-8",
    "accept": "application/json, text/javascript, */*; q=0.01",
    "X-Requested-With": "XMLHttpRequest",
    "TE": "trailers",
  }

  let obj = {
    itemId: item_id,
    quantity: 0,
    shoppingCartId: cart_id,
  }

  let requestOptions = {
    method: 'POST',
    headers: headers,
    body: JSON.stringify(obj),
    redirect: 'follow',
    credentials: 'same-origin',
  };

  try {
    const response = await content.fetch(MODIFY_QUANTITY, requestOptions);
    let bodyData = await response.json() || '';
    if (!response.ok) {
      bodyData['status'] = response.status
      throw bodyData;

    } else {
      return
    }
  } catch (error) {
    console.log(error);
  }
}

async function sortAndPush(resolvedMarketObjects) {
  try {
    const withPrices = [];
    const noPrices = [];
    const wrongMarkets = [];

    resolvedMarketObjects.forEach(market => {
      if (market.price === 'no price') {
        if (market.namespace === undefined) {
          wrongMarkets.push(market);
        } else {
          noPrices.push(market);
        }
      } else {
        withPrices.push(market);
      }
    });

    console.log(
      `Markets with no price: ${noPrices.length}\n
      Markets with price: ${withPrices.length}\n
      Failed markets: ${wrongMarkets.length}\n
      Total: ${noPrices.length + withPrices.length + wrongMarkets.length}`
    );

    const returnPrices = withPrices.sort((a, b) => a.price - b.price).slice(0, 20).map(market => ({
      price: market.price,
      branchName: market.market,
      branchId: parseInt(market.branchId),
    }));;

    const { webcode, productUrl } = expertTokens;

    const searchResult = {
      webcode,
      url: productUrl,
      price: returnPrices,
    };

    await browser.storage.local.set({ searchResult });
    console.log(searchResult);

    const event = new CustomEvent('searchFinished');
    document.getElementById('resultsWrapper').dispatchEvent(event);
  } catch (error) {
    console.error('An error occurred while sorting prices:', error);
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

  content.fetch(PREISDETEKTIV_API, requestOptions);
}

// Exports

exportFunction(bestpreisButton, window, { defineAs: 'bestpreisButton' });
exportFunction(pushResultsToAPI, window, { defineAs: 'pushResultsToAPI' });

/// Start

addPreisDetektivToSite();
