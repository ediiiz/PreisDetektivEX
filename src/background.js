try {

  browser.action.onClicked.addListener(tab => {
    browser.windows.create({
      url: browser.runtime.getURL("popup.html"),
      type: "popup",
      height: 800,
      width: 400
    }, function (win) {
    });
  });
} catch (error) {
  console.log(error);

}
