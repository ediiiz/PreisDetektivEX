
import { notifyBackgroundPage, generateCookieObject, parseAllCookies } from './helper';

async function fetchCashback() {
  try {
    const corsProxy = 'https://cashback.dztf.workers.dev/?'
    const topcashbackShare = 'https://www.topcashback.de/share/ED1Zx/expert-de'
    const xCorsHeaders = {
      'Host': 'www.topcashback.de',
      'Origin': 'https://www.topcashback.de',
      'Referer': topcashbackShare,
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
    };

    let response = await content.fetch(`${corsProxy}${topcashbackShare}`, requestOptions);
    let headers = JSON.parse(response.headers.get('cors-received-headers'))
    let data = await response.text();
    let tcShareCookies = parseAllCookies(headers['set-cookie'].split(/,\W(?=\D)/g));
    const xCorsHeaders1 = await generateCookieObject({ CookieObjects: tcShareCookies, headers: xCorsHeaders });
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

    ///  Request to earncashback.aspx to get redirect.aspx link
    myHeaders['x-cors-headers'] = JSON.stringify(xCorsHeaders1);
    response = await content.fetch(`${corsProxy}${earnCashback}`, requestOptions);
    headers = JSON.parse(response.headers.get('cors-received-headers'))
    data = await response.text();
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

    if (redirect) {
      ///  Request to redirect to get awin1 link
      myHeaders['x-cors-headers'] = JSON.stringify(xCorsHeaders2);
      response = await content.fetch(`${corsProxy}${redirect}`, requestOptions);
      headers = JSON.parse(response.headers.get('cors-received-headers'))
      data = await response.text();
      document = new DOMParser().parseFromString(data, 'text/html');
      const awin = document.querySelector('html body form#form1 div#pnlContainer.container div div#pnlMainContent div#show-redirect.continue div a#hypRedirectMerchant').href.toString();


      /// Request to awin to get expert affiliate link
      myHeaders['x-cors-headers'] = JSON.stringify(xCorsHeaders);

      response = await content.fetch(`${corsProxy}${awin}`, requestOptions);
      headers = JSON.parse(response.headers.get('cors-received-headers'));
      redirect = await response.headers.get('location').split('?')[1];
      let awin1Cookies = parseAllCookies(headers['set-cookie'].split(/,\W(?=\D)/g));

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
      return redirect;
    }

  } catch (error) {
    console.log(error);
  }
}

export { fetchCashback };
