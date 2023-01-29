function checkRecaptcha() {
  grecaptcha.ready(function () {
    grecaptcha.execute('6LdjgBokAAAAADvZloidoTl7v_5-EUKhz3vp8TMU', { action: 'submit' }).then(function (token) {
      pushResultsToAPI(token)
    })
  })
}

let button = document.getElementById('startButton');
button.addEventListener('click', function (e) {
  e.preventDefault();
  bestpreisButton();
});

document.getElementById("resultsWrapper").addEventListener("searchFinished", (event) => {
  checkRecaptcha();
});
