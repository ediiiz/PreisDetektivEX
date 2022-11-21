
import { setCookie, getCookie } from './helper';

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
  const redirect = `https://www.topcashback.de${response.headers.get('location')}`
  console.log(redirect);
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
  }

  // Fetcj AWIN URL and then store merchant url 
  // Store Cookies from previos fetches

}


export { fetchCashback };
