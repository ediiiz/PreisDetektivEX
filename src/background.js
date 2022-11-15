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
  await browser.cookies.remove({ url: "https://www.expert.de", name: "fmarktcookie" });
  await browser.cookies.set({
    url: "https://www.expert.de",
    name: "fmarktcookie",
    value: `e_${branch_id}`
  });

  // Get cookie from browser
  const cookies = await browser.cookies.get({
    url: "https://www.expert.de",
    name: "fmarktcookie"
  });
  return cookies;
}


