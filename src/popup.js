import { branchesArray } from './branches.js';


const refLink = 'wgu=280835_1412755_16548799271947_c5bfd6f8d0&wgexpiry=1662655927&dt_subid2=280835_1412755_16548799271947_c5bfd6f8d0&campaign=affiliate'

const sleep = (milliseconds) => {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
};

const BASKET_ENDPOINT = `https://www.expert.de/_api/shoppingcart/addItem`;
const MODIFY_QUANTITY = `https://www.expert.de/_api/shoppingcart/modifyItemQuantity`;




document.addEventListener('DOMContentLoaded', function () {
  let checkPagebutton = document.getElementById('bestpreis-finden');
  checkPagebutton.addEventListener('click', function () {
    try {
      document.getElementsByClassName('zui-table')[0].remove();
    } catch (error) {
      console.log('No table to remove');
    }
    getExpertPrice()
  });
})

function popup() {
  browser.tabs.query({ currentWindow: true, active: true }, function (tabs) {
    var activeTab = tabs[0];
    console.log(activeTab);
    browser.tabs.sendMessage(activeTab.id, { "message": "start" });
  });
}

async function updateHTML() {
  const data = await getStorageData();
  document.getElementById('productname').innerHTML = data.product;
}

updateHTML();

const input = 0
const progressValue = document.querySelector('.Progressbar__value');
const progress = document.querySelector('progress');

function setValue(value) {
  progressValue.style.width = `${value}%`;
  progress.value = value;
}

setValue(input);

async function reloadTable() {
  let storage = await browser.storage.local.get(['lastSearch']);
  if (storage.length != 0) {
    createListForResults(storage.lastSearch);
  }
}

reloadTable();

async function reloadPageWithBestPrice(sortedResults) {
  const branch_id = sortedResults[0].branch_id
  await browser.cookies.remove({ url: "https://www.expert.de", name: "fmarktcookie" });
  await browser.cookies.set({
    url: "https://www.expert.de",
    name: "fmarktcookie",
    value: `e_${branch_id}`
  });
}


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
    price.innerHTML = listData[entry].price + "€";
    market.innerHTML = listData[entry].market;
    href.href = listData[entry].url + refLink; // reflink should load dynamicly
    href.innerHTML = "LINK"
    href.setAttribute("target", "_blank");
  }
  //reloadPageWithBestPrice(sortedResults);
}


async function getStorageData() {
  const data = await browser.storage.local.get(['session', 'cart_id', 'article_id', 'csrf_token', '__cf_bm', '__cflb', 'producturl', 'product'])
  const cart_id = data.cart_id;
  const csrf_token = data.csrf_token;
  const article_id = data.article_id;
  const producturl = data.producturl;
  const product = data.product;
  const obj = {
    cart_id,
    csrf_token,
    article_id,
    producturl,
    product,
  }
  return obj;
}


async function getExpertPrice(branch_id = 0) {
  const data = await getStorageData()
  const producturl = data.producturl
  const cart_id = data.cart_id
  const csrf_token = data.csrf_token
  const article_id = data.article_id
  if (article_id === '' && cart_id === '' && csrf_token === '') {
    throw new Error('Oops! Static Data is empty, cant continue');
  }
  const requestData = {
    cart_id,
    csrf_token,
    article_id,
    branch_id,
    producturl,
  };
  if (branch_id != 0) {
    const marketobj = await makeApiRequest(requestData);
    console.log(marketobj);
  } else {
    getAllBranches(requestData);
  }
}

async function getAllBranches(initialExpertData) {
  try {
    const arrayOfMarketObjects = [];
    for (const branch of branchesArray) {
      let branchpercent = branchesArray.indexOf(branch) / branchesArray.length * 100;
      setValue(branchpercent)
      const requestData = {
        cart_id: initialExpertData.cart_id,
        article_id: initialExpertData.article_id,
        csrf_token: initialExpertData.csrf_token,
        branch_id: branch.branch_id,
        producturl: initialExpertData.producturl,
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


async function makeApiRequest(requiredData) {
  const market = branchesArray.find(
    (b) => b.branch_id == requiredData.branch_id
  ).market;
  console.log(market);
  const cart_id = requiredData.cart_id;
  const article_id = requiredData.article_id;
  const csrf_token = requiredData.csrf_token;
  const branch_id = requiredData.branch_id;
  const url = `${requiredData.producturl}?branch_id=${requiredData.branch_id}&gclid=0`;


  // Delete Cookies to Switch to a new one from branches
  await browser.cookies.remove({ url: "https://www.expert.de", name: "fmarktcookie" });
  await browser.cookies.set({
    url: "https://www.expert.de",
    name: "fmarktcookie",
    value: `e_${branch_id}`
  });

  var myHeaders = {
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
  };

  try {
    const response = await fetch(BASKET_ENDPOINT, requestOptions);
    const responsetojson = await response.json();
    if (!response.ok) {
      let error = responsetojson
      error['status'] = response.status
      throw error

    }
    const price = await responsetojson.shoppingCart.lastAdded.price.gross;
    document.getElementsByClassName('currentMarket')[0].innerHTML = market + ': ' + price + "€"
    return {
      branch_id,
      price,
      market,
      url,
      status: response.status,
    };
  } catch (error) {
    console.log(error);
    return {
      branch_id,
      price: 'no price',
      market,
      url,
      status: error.status,
      namespace: error.namespace,
      errorcode: error.errorcode,
    };
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
    console.log('Markets with no price =', noPrices.length, 'Markets with Price =', withPrices.length, 'Failed Markets =', wrongmarkets.length, 'Total =', noPrices.length + withPrices.length + wrongmarkets.length);
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

