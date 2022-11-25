async function handleMessage(request, sender, sendResponse) {
  console.log(`A content script sent a message: ${request.message}`);
  if (request.message === "switchCookie") {
    const cookies = await switchCookie({ value: request.payload.value, url: request.payload.url, name: request.payload.name, exdays: request.payload.exdays, hostOnly: request.payload.hostOnly });
    return Promise.resolve(
      { response: `Cookie = ${cookies.value}` });
  }
  if (request.message === "readCookie") {
    const cookies = await getCookie(request.payload);
    return Promise.resolve(
      { response: `Cookie = ${cookies.value}` });
  }
}

async function getCookie() {
  const cookies = await browser.cookies.get({
    url: "https://www.expert.de",
    name: "fmarktcookie"
  });
  return cookies;
}

async function switchCookie({ value, url, name, exdays = 0, hostOnly = 0 }) {
  const d = new Date();
  d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
  let cookiesStore = {
    httpOnly: false,
    name: name,
    path: "/",
    sameSite: "no_restriction",
    secure: false,
    url: `https://www.${url}/`,
    value: `${value}`,
    storeId: "firefox-default"
  }
  cookiesStore = hostOnly === 0 ? { ...cookiesStore, domain: url } : { ...cookiesStore };
  cookiesStore = exdays === 0 ? { ...cookiesStore } : { ...cookiesStore, expirationDate: d.valueOf() / 1000 };
  await browser.cookies.set(cookiesStore);

  // Get cookie from browser
  let getCookieStore = {
    name: name
  }

  getCookieStore = hostOnly === 0 ? { ...getCookieStore, url: `https://${url}/` } : { ...getCookieStore, url: `https://www.${url}/` };
  const cookies = await browser.cookies.get(getCookieStore);
  return cookies;
}

browser.runtime.onMessage.addListener(handleMessage);
