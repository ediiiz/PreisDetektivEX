import { branches } from './branches.js';
import { fetchCashback } from './affiliate.js';
import { setCookie, getCookie, notifyBackgroundPage } from './helper.js';
import { generateUI } from './UI.js';
let REF_LINK;
const BASKET_ENDPOINT = `https://www.expert.de/_api/shoppingcart/addItem`;
const MODIFY_QUANTITY = `https://www.expert.de/_api/shoppingcart/modifyItemQuantity`;
let marketObjectsArray = [];


// Load needed data from the page

function loadExpertTokens() {
  const pageTitle = document.head.getElementsByTagName('title')[0].textContent;
  if (pageTitle.match("bei expert kaufen")) {
    const csrf_token = document.head.querySelector('meta').getAttribute('content')
    const element = document.querySelector('div.widget-ArticleStatus');
    const cart_id = element.getAttribute('data-cart-id');
    const article_id = element.getAttribute('data-article-id');
    const producturl = document.location.href.split('?')[0];
    const product = pageTitle.split(' -')[0]

    const expertTokens = {
      cart_id,
      csrf_token,
      article_id,
      producturl,
      product,
    }

    browser.storage.local.set(expertTokens, () => {
    })

  }
}

// Create PreisDetektiv Button on Product Page

async function addPreisDetektivToSite() {
  const script = document.createElement("script");
  script.src = "https://www.google.com/recaptcha/api.js?render=6LdjgBokAAAAADvZloidoTl7v_5-EUKhz3vp8TMU";
  document.head.appendChild(script);
  const rootOverlay = document.createElement('div');
  rootOverlay.id = 'rootOverlay';
  document.body.appendChild(rootOverlay);

  //REF_LINK = await fetchCashback();
  //console.log(await notifyBackgroundPage('getExtensionUrl', { url: 'preisdetektiv.html' }));
  await fetchInteface();
  reloadTable();
}

/// Button Logic
async function fetchInteface() {
  const path = await notifyBackgroundPage('getExtensionUrl', { url: 'preisdetektiv.html' })
  const response = await fetch(path.url);
  const html = await response.text();
  // fetch the html and add it to the page
  document.getElementById('rootOverlay').innerHTML = html;
  // add the event listeners
  generateUI();

  // Add the captcha script
  const captchaPath = await notifyBackgroundPage('getExtensionUrl', { url: 'recaptcha.js' })
  const script = document.createElement("script");
  script.src = captchaPath.url;
  document.head.appendChild(script);
}

async function bestpreisButton() {
  //setDisplay('bestpreis-overlay', 'block');
  // Send Runtime message to background.js to get the csrf_token
  console.log('Button clicked');
  //removeResults();
  //setDisplay('counter', 'block');
  //setDisplay('rootOverlay', 'block');
  //getExpertPrice();
}

exportFunction(bestpreisButton, window, { defineAs: 'bestpreisButton' });

function removeResults() {
  try {
    document.getElementById('resultTable').remove();
  } catch (error) {
    console.log('No table to remove');
  }
}

function overlayButton() {
  setDisplay('rootOverlay', 'none');
  setDisplay('counter', 'none');
}

// Reload Results if available

async function reloadTable() {
  let storage = await browser.storage.local.get(['lastSearch']);
  if (storage.length != 0) {
    createListForResults(storage.lastSearch);
  } else {
    console.log('No lastSearch found');
  }
}


// Create Table with Results

function createListForResults(sortedResults) {
  let listData = sortedResults
  let mainDiv = document.createElement('div')
  mainDiv.id = 'resultTable'
  const resultContainer = document.getElementById('resultContainer');
  resultContainer.appendChild(mainDiv);
  for (const entry in listData) {
    // Create new Elements
    const priceDiv = document.createElement('div')
    const marketDiv = document.createElement('div')
    const urlDiv = document.createElement('div')
    const href = document.createElement('a')

    //append div to mainDiv 
    mainDiv.appendChild(priceDiv)
    mainDiv.appendChild(marketDiv)
    mainDiv.appendChild(urlDiv)
    urlDiv.appendChild(href)

    //Add Data to Elements
    priceDiv.textContent = listData[entry].price + "€";
    marketDiv.textContent = listData[entry].market;
    href.href = `${listData[entry].url}&${REF_LINK}`;
    href.textContent = "LINK*"
    href.setAttribute("target", "_blank");
  }
}

// Get the needed Data from storage

async function getStorageData() {
  const data = await browser.storage.local.get(
    [
      'session',
      'cart_id',
      'article_id',
      'csrf_token',
      'producturl',
      'product'
    ]
  )
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
  } else {
    getAllBranches(requestData);
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

async function getNextMarket({ status = 200, rootidx = 0, branchidx = 0, cart_id, csrf_token, article_id, producturl }) {
  let requestData = {
    cart_id,
    article_id,
    csrf_token,
    producturl,
  };
  const allRoots = Object.keys(branches)
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
    //console.log(`document.cookie: ${getCookie("fmarktcookie")}`);
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
    console.log(error);
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
      Total = ${noPrices.length + withPrices.length + wrongmarkets.length}`
    );

    sortedprices = withPrices.sort(function (a, b) {
      return a.price - b.price;
    });


    let counter = 0;
    for (const links in sortedprices) {
      if (counter == 20) {
        break;
      } else {
        returnprices.push({
          branch_id: sortedprices[links].branch_id,
          price: sortedprices[links].price,
          market: sortedprices[links].market,
          url: sortedprices[links].url,
        });
        counter += 1;
      }
    }

    createListForResults(returnprices);
    browser.storage.local.set({ lastSearch: returnprices }, () => {
      console.log('lastSearch: ' + JSON.stringify(returnprices));
    })
  } catch (error) {
    console.error('Oops! Something went wrong while sorting prices', error);
  }
}


/// Helper Functions

function setProgessbar(value) {
  const progressValue = document.querySelector('.Progressbar__value');
  const progress = document.querySelector('progress');
  progressValue.style.width = `${value}%`;
  progress.value = value;
}

function setDisplay(Id, attr) {
  document.getElementById(Id).style.display = attr;
}

const sleep = (milliseconds) => {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
};



/// Start

loadExpertTokens();
addPreisDetektivToSite();

