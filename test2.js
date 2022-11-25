let xCorsHeaders = {
  'Host': 'www.topcashback.de',
  'Origin': 'https://www.topcashback.de',
  'Referer': 'https://www.topcashback.de/share/ED1Zx/expert-de',
  'Access-Control-Allow-Origin': '*',
}

const myHeaders = {
  'X-Requested-With': 'XMLHttpRequest',
  'x-cors-headers': JSON.stringify({
    'Host': 'www.topcashback.de',
    'Origin': 'https://www.topcashback.de',
    'Referer': 'https://www.topcashback.de/share/ED1Zx/expert-de',
    'Access-Control-Allow-Origin': '*',
    'cookie': `InitialSiteReferrer=none; InitialLandingPage=/share/ED1Zx/expert-de; `,
  }),
};



let arrrWithCO = [
  {
    cookieValue: 'none',
    cookieKey: 'InitialSiteReferrer'
  },
  {
    cookieValue: '/share/ED1Zx/expert-de',
    cookieKey: 'InitialLandingPage'
  },
  {
    cookieValue: 'hello',
    cookieKey: 'InitialSiteReferrer'
  }
];


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


xCorsHeaders = await generateCookieObject({ CookieObjects: arrrWithCO, headers: xCorsHeaders });


const myHeaders2 = {
  'X-Requested-With': 'XMLHttpRequest',
  'x-cors-headers': JSON.stringify(xCorsHeaders),
};

//console.log(xCorsHeaders);
console.log(myHeaders);
console.log(myHeaders2);


