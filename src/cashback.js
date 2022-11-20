
async function fetchCashback() {
  const url = 'https://cors-anywhere.herokuapp.com/https://www.topcashback.de/share/ED1Zx/expert-de';
  let myHeaders = {
    "sec-fetch-mode": "no-cors",
    "sec-fetch-site": "cross-site",
    "origin": "https://www.topcashback.de",
    "X-Requested-With": "XMLHttpRequest",
  };

  let requestOptions = {
    headers: myHeaders,
    redirect: 'follow',
    method: 'GET',
    cors: 'no-cors',
    referrer: "https://www.topcashback.de/share/ED1Zx/expert-de",
    body: null
  };
  const response = await fetch(url, requestOptions);
  const data = await response.text();
  return data;
}


export { fetchCashback };
