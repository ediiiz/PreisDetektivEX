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
  const sending = browser.runtime.sendMessage({
    message: input,
    payload: payload,
  });
  sending.then(handleResponse, handleError);
}

function handleResponse(message) {
  //console.log(`🍪: ${message.response}`);
  return message
}

function handleError(error) {
  console.log(`Error: ${error}`);
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


export { getCookie, setCookie, notifyBackgroundPage, parseAllCookies, generateCookieObject };
