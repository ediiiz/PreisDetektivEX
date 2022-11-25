function getCookie(cname) {
  let name = cname + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

async function setCookie({ cname, cvalue, exdays = 0 }) {
  const d = new Date();
  d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
  let expires = "expires=" + d.toUTCString();
  if (exdays === 0) {
    document.cookie = `${cname}=${cvalue};path=/`;
  } else {
    document.cookie = `${cname}=${cvalue};${expires};path=/`;
  }

}

async function notifyBackgroundPage(input, payload) {
  const sending = browser.runtime.sendMessage({
    message: input,
    payload: payload,
  });
  sending.then(handleResponse, handleError);
}

function handleResponse(message) {
  //console.log(`🍪: ${message.response}`);
}

function handleError(error) {
  console.log(`Error: ${error}`);
}


export { getCookie, setCookie, notifyBackgroundPage };
