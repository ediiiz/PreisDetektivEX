
import { setCookie, getCookie } from './helper';

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

async function fetchCashback() {
  const corsProxy = 'https://cashback.dztf.workers.dev/?'
  const topcashbackShare = 'https://www.topcashback.de/share/ED1Zx/expert-de'
  let url = `${corsProxy}${topcashbackShare}`;
  let myHeaders = {
    'X-Requested-With': 'XMLHttpRequest',
    'x-cors-headers': JSON.stringify({
      'Host': 'www.topcashback.de',
      'Origin': 'https://www.topcashback.de',
      'Referer': 'https://www.topcashback.de/share/ED1Zx/expert-de',
    }),
  };

  let requestOptions = {
    headers: myHeaders,
    redirect: 'follow',
    method: 'post',
    body: null
  };
  let response = await fetch(url, requestOptions);
  let headers = JSON.parse(response.headers.get('cors-received-headers'))
  //console.log(headers);
  let data = await response.text();
  let document = new DOMParser().parseFromString(data, 'text/html');
  const earnCashback = document.querySelector('html body div.gecko-main.gecko-text-center div.gecko-single-container div.gecko-m15em div.cont-to-merch-wrapper a.gecko-btn-cont.gecko-btn-cont-primary').href.toString().replace('expert.de', 'topcashback.de');
  console.log(earnCashback);
  console.log(parseAllCookies(headers['set-cookie'].split(/,\W(?=\D)/g)));

  url = `${corsProxy}${earnCashback}`;
  myHeaders = {
    'X-Requested-With': 'XMLHttpRequest',
    'x-cors-headers': JSON.stringify({
      'Host': 'www.topcashback.de',
      'Origin': 'https://www.topcashback.de',
      'Referer': 'https://www.topcashback.de/share/ED1Zx/expert-de',
    }),
  };

  requestOptions = {
    headers: myHeaders,
    redirect: 'follow',
    method: 'post',
  };
  response = await fetch(url, requestOptions);
  headers = JSON.parse(response.headers.get('cors-received-headers'))
  let redirect = `https://www.topcashback.de${response.headers.get('location')}`
  console.log(redirect);
  console.log(parseAllCookies(headers['set-cookie'].split(/,\W(?=\D)/g)));
  data = await response.text();
  if (redirect) {
    url = `${corsProxy}${redirect}`;
    myHeaders = {
      'X-Requested-With': 'XMLHttpRequest',
      'x-cors-headers': JSON.stringify({
        'Access-Control-Allow-Origin': '*',
        'Host': 'www.topcashback.de',
        'Origin': 'https://www.topcashback.de',
        'Referer': 'https://www.topcashback.de/share/ED1Zx/expert-de',
        'Sec-fetch-mode': 'no-cors',
        'Sec-fetch-site': 'cross-site',
      }),
    };

    requestOptions = {
      headers: myHeaders,
      redirect: 'follow',
      method: 'post',
    };
    response = await fetch(url, requestOptions);
    headers = JSON.parse(response.headers.get('cors-received-headers'))
    data = await response.text();
    document = new DOMParser().parseFromString(data, 'text/html');
    const awin = document.querySelector('html body form#form1 div#pnlContainer.container div div#pnlMainContent div#show-redirect.continue div a#hypRedirectMerchant').href.toString();
    console.log(awin);
    console.log(parseAllCookies(headers['set-cookie'].split(/,\W(?=\D)/g)));

    url = `${corsProxy}${awin}`;
    myHeaders = {
      'X-Requested-With': 'XMLHttpRequest',
      'x-cors-headers': JSON.stringify({
        'Access-Control-Allow-Origin': '*',
        'Host': 'www.topcashback.de',
        'Origin': 'https://www.topcashback.de',
        'Referer': 'https://www.topcashback.de/share/ED1Zx/expert-de',
        'Sec-fetch-mode': 'no-cors',
        'Sec-fetch-site': 'cross-site',
      }),
    };

    requestOptions = {
      headers: myHeaders,
      redirect: 'follow',
      method: 'post',
    };
    response = await fetch(url, requestOptions);
    headers = JSON.parse(response.headers.get('cors-received-headers'))

    data = await response.text();
    redirect = `${response.headers.get('location')}`
    console.log(redirect);
    //let stcookie = cookieParser(headersetcookie[0]);
    console.log(parseAllCookies(headers['set-cookie'].split(/,\W(?=\D)/g)));
  }

  // Fetcj AWIN URL and then store merchant url 
  // Store Cookies from previos fetches

}






export { fetchCashback };
