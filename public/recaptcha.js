let button = document.getElementById('startButton');
button.addEventListener('click', function (e) {
  bestpreisButton();
  e.preventDefault();
  grecaptcha.ready(function () {
    grecaptcha.execute('6LdjgBokAAAAADvZloidoTl7v_5-EUKhz3vp8TMU', { action: 'submit' }).then(function (token) {
      console.log(token);
    });
  });
});

