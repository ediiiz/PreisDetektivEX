import { branches } from './branches.js';
import { fetchCashback } from './cashback.js';
import { getCookie, setCookie, notifyBackgroundPage } from './helper.js';
const REF_LINK = 'wgu=280835_1412755_16548799271947_c5bfd6f8d0&wgexpiry=1662655927&dt_subid2=280835_1412755_16548799271947_c5bfd6f8d0&campaign=affiliate'
const BASKET_ENDPOINT = `https://www.expert.de/_api/shoppingcart/addItem`;
const MODIFY_QUANTITY = `https://www.expert.de/_api/shoppingcart/modifyItemQuantity`;
let marketObjectsArray = [];
const refUrl = 'https://www.topcashback.de/share/ED1Zx/expert-de';


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

function addPreisDetektivToSite() {
  const element = document.getElementsByClassName('widget-ArticleStatus-statusPoint')[0];
  const button = document.getElementById('bestpreis-button');
  if (!button) {
    // Append Div to Site
    const div = document.createElement('div');
    div.className = 'widget-ArticleStatus-button-wrapper';
    element.appendChild(div);

    // Append Button to Site and restyle it
    const button = document.createElement('button');
    button.textContent = '💸 Expert Bestpreis finden';
    button.id = 'bestpreis-button';
    div.appendChild(button);
    button.onclick = function () {
      bestpreisButton();
    }

    // Add Overlay to Site
    const overlay = document.createElement('div');
    overlay.id = 'bestpreis-overlay';
    element.appendChild(overlay);
    overlay.onclick = function () {
      //overlayButton();
    }

    // Append Progess Bar to Button
    const counters = document.createElement('div');
    counters.id = 'counter';
    counters.className = 'counters';

    button.appendChild(counters);
    const progress = document.createElement('div');
    progress.className = 'Progressbar';
    counters.appendChild(progress);

    const progressbar_value = document.createElement('div');
    progressbar_value.className = 'Progressbar__value';
    progress.appendChild(progressbar_value);

    const value = document.createElement('progress');
    value.value = 0;
    value.max = 100;
    value.textContent = '100%';
    progress.appendChild(value);

    //Append currentMarket to Counter
    const currentMarket = document.createElement('div');
    const label = document.createElement('label');
    const paragraph = document.createElement('p');
    paragraph.className = 'currentMarket';
    counters.appendChild(currentMarket);
    currentMarket.appendChild(label);
    label.appendChild(paragraph);

    //Append resultContainer to Price
    const price = document.getElementsByClassName('widget-ArticlePrice')[0];
    const resultContainer = document.createElement('div');
    resultContainer.className = 'result-container';
    price.appendChild(resultContainer);
  }

}

/// Button Logic

async function bestpreisButton() {
  //setDisplay('bestpreis-overlay', 'block');
  // Send Runtime message to background.js to get the csrf_token
  removeResults();
  setDisplay('counter', 'block');
  getExpertPrice();
}

function removeResults() {
  try {
    document.getElementsByClassName('zui-table')[0].remove();
  } catch (error) {
    console.log('No table to remove');
  }
}

function overlayButton() {
  setDisplay('bestpreis-overlay', 'none');
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
  let table = document.createElement('table')
  table.classList.add("zui-table")
  let tbody = document.createElement('tbody')
  for (const entry in listData) {
    // Create new Elements
    let href = document.createElement('a')
    let tr = document.createElement('tr')
    let market = document.createElement('td');
    let price = document.createElement('td');
    let url = document.createElement('td');
    const body = document.getElementsByClassName('result-container')[0];

    //Add Elements to DOM
    body.appendChild(table);
    table.appendChild(tbody);
    tbody.appendChild(tr);
    tr.appendChild(price);
    tr.appendChild(market);
    tr.appendChild(url);
    url.appendChild(href);

    //Add Data to Elements
    price.textContent = listData[entry].price + "€";
    market.textContent = listData[entry].market;
    href.href = listData[entry].url + REF_LINK; // reflink should load dynamicly
    href.textContent = "LINK"
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
    await notifyBackgroundPage('switchCookie', { name: 'fmarktcookie', url: 'expert.de', value: `e_${branch_id}`, exdays: 2555 });
    await setCookie({ cname: 'fmarktcookie', cvalue: `e_${branch_id}`, exdays: 2555 });
    const response = await fetch(BASKET_ENDPOINT, requestOptions);
    console.log(`document.cookie: ${getCookie("fmarktcookie")}`);
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

    document.getElementsByClassName('currentMarket')[0].textContent = city + ': ' + price + "€";

    const apiResponse = {
      branch_id,
      price,
      market: city,
      url,
      status: response.status,
    };

    return apiResponse;

  } catch (error) {
    //console.log(error);
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
    const response = await fetch(MODIFY_QUANTITY, requestOptions);
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
setProgessbar(0);
reloadTable();
fetchCashback();
