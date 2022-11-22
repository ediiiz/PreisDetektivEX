async function handleMessage(request, sender, sendResponse) {
  console.log(`A content script sent a message: ${request.message}`);
  if (request.message === "switchCookie") {
    const cookies = await switchCookie({ value: request.payload.value, url: request.payload.url, name: request.payload.name, exdays: request.payload.exdays });
    return Promise.resolve(
      { response: `Cookie = ${cookies.value}` });
  }
  if (request.message === "readCookie") {
    const cookies = await getCookie(request.payload);
    return Promise.resolve(
      { response: `Cookie = ${cookies.value}` });
  }
}

browser.runtime.onMessage.addListener(handleMessage);

async function getCookie() {
  const cookies = await browser.cookies.get({
    url: "https://www.expert.de",
    name: "fmarktcookie"
  });
  return cookies;
}

async function switchCookie({ value, url, name, exdays = 0 }) {

  const d = new Date();
  d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
  if (exdays === 0) {
    await browser.cookies.set({
      domain: url,
      httpOnly: false,
      name: name,
      path: "/",
      sameSite: "no_restriction",
      secure: false,
      url: `https://${url}/`,
      value: `${value}`,
      storeId: "firefox-default"
    });
  } else {
    await browser.cookies.set({
      domain: url,
      expirationDate: d.valueOf() / 1000,
      httpOnly: false,
      name: name,
      path: "/",
      sameSite: "no_restriction",
      secure: false,
      url: `https://${url}/`,
      value: `${value}`,
      storeId: "firefox-default"
    });
  }
  //await browser.cookies.remove({ url: "https://www.expert.de", name: "fmarktcookie" });


  // Get cookie from browser
  const cookies = await browser.cookies.get({
    url: "https://www.expert.de",
    name: "fmarktcookie"
  });
  return cookies;
}
