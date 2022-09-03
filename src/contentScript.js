import { branchesArray } from './branches.js';
const REF_LINK = 'wgu=280835_1412755_16548799271947_c5bfd6f8d0&wgexpiry=1662655927&dt_subid2=280835_1412755_16548799271947_c5bfd6f8d0&campaign=affiliate'
const BASKET_ENDPOINT = `https://www.expert.de/_api/shoppingcart/addItem`;
const MODIFY_QUANTITY = `https://www.expert.de/_api/shoppingcart/modifyItemQuantity`;


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

    const obj = {
      cart_id,
      csrf_token,
      article_id,
      producturl,
      product,
    }

    browser.storage.local.set(obj, () => {
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

    //Append resultContainer to Button
    const resultContainer = document.createElement('div');
    resultContainer.className = 'result-container';
    button.appendChild(resultContainer);
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
    const arrayOfMarketObjects = [];
    for (const branch of branchesArray) {

      setProgessbar(branchesArray.indexOf(branch) / branchesArray.length * 100)

      const requestData = {
        cart_id,
        article_id,
        csrf_token,
        branch_id: branch.branch_id,
        producturl,
      };
      const marketObject = await makeApiRequest(requestData);
      arrayOfMarketObjects.push(marketObject);
    }
    const resolvedMarketObjects = await Promise.all(arrayOfMarketObjects);
    sortAndPush(resolvedMarketObjects);
  } catch (error) {
    console.error(
      'Oops! Something went wrong while getting all Branches',
      error
    );
  }
}


async function makeApiRequest({ cart_id, csrf_token, article_id, branch_id, producturl }) {
  const market = branchesArray.find(
    (b) => b.branch_id == branch_id
  ).market;
  console.log(market);
  const url = `${producturl}?branch_id=${branch_id}&gclid=0`;

  // Delete Cookies to Switch to a new one from branches
  await notifyBackgroundPage('switchCookie', branch_id);

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
    credentials: 'include',
  };

  try {
    const response = await fetch(BASKET_ENDPOINT, requestOptions);
    let responsetojson = await response.json();
    if (!response.ok) {
      responsetojson['status'] = response.status
      throw responsetojson;
    }


    const item = await responsetojson.shoppingCart?.itemList.items[0] || '';
    if (item != '') {
      if (item.quantity >= 2) {
        await resetCart(item.id, cart_id, csrf_token)
      }
    }

    const price = await responsetojson.shoppingCart?.lastAdded.price.gross || '';

    document.getElementsByClassName('currentMarket')[0].textContent = market + ': ' + price + "€";

    const apiResponse = {
      branch_id,
      price,
      market,
      url,
      status: response.status,
    };

    return apiResponse;

  } catch (error) {
    console.log(error);
    const apiResponse = {
      branch_id,
      price: 'no price',
      market,
      url,
      status: error.status,
      namespace: error.namespace,
      errorcode: error.errorcode,
    };
    return apiResponse;
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
    credentials: 'include',
  };

  try {
    const response = await fetch(MODIFY_QUANTITY, requestOptions);
    let responsetojson = await response.json();
    if (!response.ok) {
      responsetojson['status'] = response.status
      throw responsetojson;

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

async function notifyBackgroundPage(input, payload) {
  const sending = browser.runtime.sendMessage({
    message: input,
    payload: payload,
  });
  sending.then(handleResponse, handleError);
}

function handleResponse(message) {
  console.log(`Message from the background script: ${message.response}`);
}

function handleError(error) {
  console.log(`Error: ${error}`);
}

/// Start

loadExpertTokens();
addPreisDetektivToSite();
setProgessbar(0);
reloadTable();
