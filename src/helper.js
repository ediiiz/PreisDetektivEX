function getCookie(cname) {
  let name = cname + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

async function setCookie({ cname, cvalue, exdays = 0 }) {
  const d = new Date();
  d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
  let expires = "expires=" + d.toUTCString();
  if (exdays === 0) {
    document.cookie = `${cname}=${cvalue};path=/`;
  } else {
    document.cookie = `${cname}=${cvalue};${expires};path=/`;
  }

}

async function notifyBackgroundPage(input, payload) {
  try {
    const sending = await browser.runtime.sendMessage({
      message: input,
      payload: payload,
    });
    return sending.response;
  } catch (error) {
    console.log(`Error: ${error}`);
  }
}

function cookieParser(cookieString) {
  if (cookieString === "")
    return {};
  let pairs = cookieString.split(";");
  let splittedPairs = pairs.map(cookie => cookie.split("="));
  const cookieObject = {};
  splittedPairs.forEach(pair => {
    cookieObject[pair[0]] = pair[1];
  });
  return cookieObject;
}

function parseAllCookies(headersetcookie) {
  const cookieObject = [];
  for (const x in headersetcookie) {
    const setcookie = headersetcookie[x];
    const temp = cookieParser(setcookie);
    const y = getCookieKeyValue(temp);
    cookieObject.push(y);
  }
  return cookieObject;

}

function getCookieKeyValue(cookie) {
  const cookieKey = Object.keys(cookie)[0];
  const cookieValue = Object.values(cookie)[0];
  return { cookieKey, cookieValue };
}

async function generateCookieObject({ CookieObjects, headers }) {
  const newCookieObj = {}
  for (const x in CookieObjects) {
    newCookieObj[CookieObjects[x].cookieKey] = CookieObjects[x].cookieValue;
  }
  const arr = [];
  for (const x in Object.keys(newCookieObj)) {
    arr.push(`${Object.keys(newCookieObj)[x]}=${Object.values(newCookieObj)[x]}`);
  }
  const cookie = {
    cookie: ``
  }
  for (const x in arr) {
    cookie.cookie += `${arr[x]}; `;
  }
  headers = { ...headers, ...cookie }
  return headers;
}

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

async function getStoragebyId(id) {
  const data = await browser.storage.local.get(id);
  return data;
}

async function getStorageData() {
  const data = await browser.storage.local.get(
    [
      'session',
      'cartId',
      'articleId',
      'csrfToken',
      'productUrl',
      'product',
      'webcode',
    ]
  )
  return data;
}


export { getCookie, setCookie, notifyBackgroundPage, parseAllCookies, generateCookieObject, setDisplay, sleep, setProgessbar, getStoragebyId, getStorageData };



