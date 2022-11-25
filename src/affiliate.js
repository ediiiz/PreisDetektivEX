
import { setCookie, getCookie, notifyBackgroundPage, generateCookieObject, parseAllCookies } from './helper';

async function fetchCashback() {
  try {


    const corsProxy = 'https://cashback.dztf.workers.dev/?'
    const topcashbackShare = 'https://www.topcashback.de/share/ED1Zx/expert-de'
    let url = `${corsProxy}${topcashbackShare}`;

    const xCorsHeaders = {
      'Host': 'www.topcashback.de',
      'Origin': 'https://www.topcashback.de',
      'Referer': 'https://www.topcashback.de/share/ED1Zx/expert-de',
      'Access-Control-Allow-Origin': '*',
    }

    const myHeaders = {
      'X-Requested-With': 'XMLHttpRequest',
      'x-cors-headers': JSON.stringify(xCorsHeaders),
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
    const xCorsHeaders1 = await generateCookieObject({ CookieObjects: tcShareCookies, headers: xCorsHeaders });
    let data = await response.text();
    let document = new DOMParser().parseFromString(data, 'text/html');
    const earnCashback = document.querySelector('html body div.gecko-main.gecko-text-center div.gecko-single-container div.gecko-m15em div.cont-to-merch-wrapper a.gecko-btn-cont.gecko-btn-cont-primary').href.toString().replace('expert.de', 'topcashback.de');

    for (const x in tcShareCookies) {
      await notifyBackgroundPage("switchCookie",
        {
          value: tcShareCookies[x].cookieValue,
          url: 'topcashback.de',
          name: tcShareCookies[x].cookieKey,
          exdays: 0,
          hostOnly: 1
        });
    }

    url = `${corsProxy}${earnCashback}`;

    myHeaders['x-cors-headers'] = JSON.stringify(xCorsHeaders1);

    requestOptions = {
      headers: myHeaders,
      redirect: 'follow',
      method: 'post',
    };

    response = await content.fetch(url, requestOptions);
    headers = JSON.parse(response.headers.get('cors-received-headers'))
    let redirect = `https://www.topcashback.de${response.headers.get('location')}`
    let earnCashbackCookies = parseAllCookies(headers['set-cookie'].split(/,\W(?=\D)/g));
    const xCorsHeaders2 = await generateCookieObject({ CookieObjects: earnCashbackCookies, headers: xCorsHeaders });

    for (const x in earnCashbackCookies) {
      await notifyBackgroundPage("switchCookie",
        {
          value: earnCashbackCookies[x].cookieValue,
          url: 'topcashback.de',
          name: earnCashbackCookies[x].cookieKey,
          exdays: 0,
          hostOnly: 1
        });
    }

    data = await response.text();
    if (redirect) {

      url = `${corsProxy}${redirect}`;
      myHeaders['x-cors-headers'] = JSON.stringify(xCorsHeaders2);

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

      myHeaders['x-cors-headers'] = JSON.stringify(xCorsHeaders);

      requestOptions = {
        headers: myHeaders,
        redirect: 'follow',
        method: 'post',
      };

      response = await content.fetch(url, requestOptions);
      headers = JSON.parse(response.headers.get('cors-received-headers'))
      let awin1Cookies = parseAllCookies(headers['set-cookie'].split(/,\W(?=\D)/g));

      ///
      for (const x in awin1Cookies) {
        await notifyBackgroundPage("switchCookie",
          {
            value: awin1Cookies[x].cookieValue,
            url: 'awin1.com',
            name: awin1Cookies[x].cookieKey,
            exdays: 0,
            hostOnly: 0
          });
      }

      data = await response.text();
      redirect = await response.headers.get('location').split('?')[1];

      return redirect;
    }

  } catch (error) {
    console.log(error);
  }

}

export { fetchCashback };
