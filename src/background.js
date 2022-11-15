async function handleMessage(request, sender, sendResponse) {
  console.log(`A content script sent a message: ${request.message}`);
  if (request.message === "switchCookie") {
    const cookies = await switchCookie(request.payload);
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

async function switchCookie(branch_id) {

  const d = new Date();
  d.setTime(d.getTime() + (2555 * 24 * 60 * 60 * 1000));

  await browser.cookies.remove({ url: "https://www.expert.de", name: "fmarktcookie" });
  await browser.cookies.set({
    httpOnly: false,
    name: "fmarktcookie",
    path: "/",
    secure: false,
    url: "https://www.expert.de",
    value: `e_${branch_id}`,
    expirationDate: d.valueOf() / 1000
  });

  // Get cookie from browser
  const cookies = await browser.cookies.get({
    url: "https://www.expert.de",
    name: "fmarktcookie"
  });
  return cookies;
}
