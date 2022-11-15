async function handleMessage(request, sender, sendResponse) {
  console.log(`A content script sent a message: ${request.message}`);
  if (request.message === "switchCookie") {
    const cookies = await switchCookie(request.payload);
    return Promise.resolve(
      { response: `Cookie = ${cookies.value}` });
  }
}

browser.runtime.onMessage.addListener(handleMessage);


async function switchCookie(branch_id) {

  const d = new Date();
  d.setTime(d.getTime() + (365 * 24 * 60 * 60 * 1000));

  await browser.cookies.remove({ url: "https://www.expert.de", name: "fmarktcookie" });
  await browser.cookies.set({
    httpOnly: true,
    name: "fmarktcookie",
    path: "/",
    secure: true,
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
