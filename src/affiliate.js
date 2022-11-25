
import { setCookie, getCookie, notifyBackgroundPage } from './helper';

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
    'Access-Control-Allow-Origin': '*',
    'X-Requested-With': 'XMLHttpRequest',
    'x-cors-headers': JSON.stringify({
      'Host': 'www.topcashback.de',
      'Origin': 'https://www.topcashback.de',
      'Referer': 'https://www.topcashback.de/share/ED1Zx/expert-de',
      'Access-Control-Allow-Origin': '*',
    }),
  };

  let requestOptions = {
    headers: myHeaders,
    redirect: 'follow',
    method: 'post',
    body: null
  };

  let response = await content.fetch(url, requestOptions);
  let headers = JSON.parse(response.headers.get('cors-received-headers'))
  let tcShareCookies = parseAllCookies(headers['set-cookie'].split(/,\W(?=\D)/g));
  let data = await response.text();
  let document = new DOMParser().parseFromString(data, 'text/html');
  const earnCashback = document.querySelector('html body div.gecko-main.gecko-text-center div.gecko-single-container div.gecko-m15em div.cont-to-merch-wrapper a.gecko-btn-cont.gecko-btn-cont-primary').href.toString().replace('expert.de', 'topcashback.de');

  //////
  await notifyBackgroundPage("switchCookie",
    {
      value: tcShareCookies[0].cookieValue,
      url: 'topcashback.de',
      name: tcShareCookies[0].cookieKey,
      exdays: 0,
      hostOnly: 1
    });
  await notifyBackgroundPage("switchCookie",
    {
      value: tcShareCookies[3].cookieValue,
      url: 'topcashback.de',
      name: tcShareCookies[3].cookieKey,
      exdays: 30,
      hostOnly: 1
    });
  await notifyBackgroundPage("switchCookie",
    {
      value: 'none',
      url: 'topcashback.de',
      name: 'InitialSiteReferrer',
      exdays: 30,
      hostOnly: 1
    });
  await notifyBackgroundPage("switchCookie",
    {
      value: '/share/ED1Zx/expert-de',
      url: 'topcashback.de',
      name: 'InitialLandingPage',
      exdays: 30,
      hostOnly: 1
    });
  //////

  url = `${corsProxy}${earnCashback}`;

  myHeaders = {
    'X-Requested-With': 'XMLHttpRequest',
    'Access-Control-Allow-Origin': '*',
    'x-cors-headers': JSON.stringify({
      'cookie': `InitialSiteReferrer=none; InitialLandingPage=/share/ED1Zx/expert-de; ${tcShareCookies[0].cookieKey}=${tcShareCookies[0].cookieValue}; ${tcShareCookies[3].cookieKey}=${tcShareCookies[3].cookieValue}`,
      'Host': 'www.topcashback.de',
      'Origin': 'https://www.topcashback.de',
      'Referer': 'https://www.topcashback.de/share/ED1Zx/expert-de',
      'Access-Control-Allow-Origin': '*',
    }),
  };

  requestOptions = {
    headers: myHeaders,
    redirect: 'follow',
    method: 'post',
  };

  response = await content.fetch(url, requestOptions);
  headers = JSON.parse(response.headers.get('cors-received-headers'))
  let redirect = `https://www.topcashback.de${response.headers.get('location')}`
  let earnCashbackCookies = parseAllCookies(headers['set-cookie'].split(/,\W(?=\D)/g));

  ///
  await notifyBackgroundPage("switchCookie",
    {
      value: earnCashbackCookies[1].cookieValue,
      url: 'topcashback.de',
      name: earnCashbackCookies[1].cookieKey,
      exdays: 30,
      hostOnly: 1
    });
  await notifyBackgroundPage("switchCookie",
    {
      value: earnCashbackCookies[2].cookieValue,
      url: 'topcashback.de',
      name: earnCashbackCookies[2].cookieKey,
      exdays: 0,
      hostOnly: 1
    });
  ///

  data = await response.text();
  if (redirect) {
    url = `${corsProxy}${redirect}`;
    myHeaders = {
      'X-Requested-With': 'XMLHttpRequest',
      'x-cors-headers': JSON.stringify({
        'cookie': `InitialSiteReferrer=none; InitialLandingPage=/share/ED1Zx/expert-de; ${tcShareCookies[0].cookieKey}=${tcShareCookies[0].cookieValue}; ${tcShareCookies[3].cookieKey}=${tcShareCookies[3].cookieValue};${earnCashbackCookies[1].cookieKey}=${earnCashbackCookies[1].cookieValue};${earnCashbackCookies[2].cookieKey}=${earnCashbackCookies[2].cookieValue}`,
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
    response = await content.fetch(url, requestOptions);
    headers = JSON.parse(response.headers.get('cors-received-headers'))
    data = await response.text();
    document = new DOMParser().parseFromString(data, 'text/html');
    const awin = document.querySelector('html body form#form1 div#pnlContainer.container div div#pnlMainContent div#show-redirect.continue div a#hypRedirectMerchant').href.toString();

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
    response = await content.fetch(url, requestOptions);
    headers = JSON.parse(response.headers.get('cors-received-headers'))
    let awin1Cookies = parseAllCookies(headers['set-cookie'].split(/,\W(?=\D)/g));

    ///
    await notifyBackgroundPage("switchCookie",
      {
        value: awin1Cookies[0].cookieValue,
        url: 'awin1.com',
        name: awin1Cookies[0].cookieKey,
        exdays: 30
      });
    await notifyBackgroundPage("switchCookie",
      {
        value: awin1Cookies[1].cookieValue,
        url: 'awin1.com',
        name: awin1Cookies[1].cookieKey,
        exdays: 0
      });
    ///

    data = await response.text();
    redirect = await response.headers.get('location').split('?')[1];
    //console.log(redirect);

    return redirect;
  }

  // Store Cookies from previos fetches

}

export { fetchCashback };
