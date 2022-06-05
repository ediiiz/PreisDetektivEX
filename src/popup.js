document.addEventListener('DOMContentLoaded', function () {
  let checkPagebutton = document.getElementById('bestpreis-finden');
  checkPagebutton.addEventListener('click', function () {
    console.log("SUCCESS");
    chrome.tabs.reload();
  });
})
