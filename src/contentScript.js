import { branches } from './branches.js';
import { fetchCashback } from './affiliate.js';
import { setCookie, getCookie, notifyBackgroundPage, setProgessbar, getStorageData, getStoragebyId } from './helper.js';
import { generateUI } from './UI.js';
let REF_LINK;
const BASKET_ENDPOINT = `https://www.expert.de/_api/shoppingcart/addItem`;
const MODIFY_QUANTITY = `https://www.expert.de/_api/shoppingcart/modifyItemQuantity`;
const PREISDETEKTIV_API = 'https://preisdetektiv.lumalala.de/api/product'
const priceListEntries = [];


function loadExpertTokens() {
  const pageTitle = document.head.getElementsByTagName('title')[0].textContent;
  if (pageTitle.match("bei expert kaufen")) {
    const csrfToken = document.head.querySelector('meta').getAttribute('content')
    const element = document.querySelector('div.widget-ArticleStatus');
    const cartId = element.getAttribute('data-cart-id');
    const articleId = element.getAttribute('data-article-id');
    const productUrl = document.location.href.split('?')[0];
    const product = pageTitle.split(' -')[0]
    const webcode = document.getElementsByClassName("widget-ArticleNumber-text")[0].innerText.split(" ")[1]

    const expertTokens = {
      cartId,
      csrfToken,
      articleId,
      productUrl,
      product,
      webcode,
    }

    browser.storage.local.set(expertTokens, () => {
    })

  }
}

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
  const requestData = await getStorageData()
  const {
    cartId,
    csrfToken,
    articleId,
  } = requestData;

  requestData['branch_id'] = branchId;

  if (articleId === '' && cartId === '' && csrfToken === '') {
    throw new Error('Oops! Static Data is empty, cant continue');
  };

  if (branchId != 0) {
    const marketobj = await makeApiRequest(requestData);
  } else {
    const resolvedMarkets = await getAllBranches(requestData);
    sortAndPush(resolvedMarkets);
  };
};

async function getAllBranches({ cartId, csrfToken, articleId, productUrl }) {
  try {
    const resolvedMarkets = await getMarkets({ cartId, csrfToken, articleId, productUrl })
    return resolvedMarkets;
  } catch (error) {
    console.error(
      'Oops! Something went wrong while getting all Branches',
      error
    );
  }
}

async function getMarkets({ status = 200, cartId, csrfToken, articleId, productUrl }) {
  const marketObjectsArray = [];
  const roots = Object.keys(branches);

  for (let rootIndex = 0; rootIndex < roots.length; rootIndex++) {
    setProgessbar((rootIndex / roots.length) * 100);
    const root = roots[rootIndex];
    const branchesForRoot = branches[root];

    for (let branchIndex = 0; branchIndex < branchesForRoot.length; branchIndex++) {
      const branch = branchesForRoot[branchIndex];
      const marketData = {
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

async function makeApiRequest({ cartId, csrfToken, articleId, branchId, productUrl, city }) {
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
    await setCookie({ cname: 'fmarktcookie', cvalue: `e_${branchId}`, exdays: 2555 });
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
      branch_id: branchId,
      price,
      market: city,
      url,
      status: response.status,
    };

    return apiResponse;

  } catch (error) {
    const errorResponse = {
      branch_id: branchId,
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
    const url = (await getStoragebyId('productUrl')).productUrl;

    let searchResult = {
      webcode: `${webcode}`,
      url,
      price: returnprices,
    };

    browser.storage.local.set({ searchResult }, () => { console.log(searchResult) })

    const event = new CustomEvent('searchFinished', {});
    document.getElementById('resultsWrapper').dispatchEvent(event);
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

  content.fetch(PREISDETEKTIV_API, requestOptions);
}

exportFunction(pushResultsToAPI, window, { defineAs: 'pushResultsToAPI' });

/// Start

addPreisDetektivToSite();
