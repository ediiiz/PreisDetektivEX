(() => {
  function loadExpertTokens() {
    const pageTitle = document.head.getElementsByTagName('title')[0].innerHTML;
    if (pageTitle.match("bei expert kaufen")) {
      const csrf_token = document.head.querySelector('meta').getAttribute('content')
      const element = document.querySelector('div.widget-ArticleStatus');
      const cart_id = element.getAttribute('data-cart-id');
      const article_id = element.getAttribute('data-article-id');
      const producturl = document.location.href.split('?')[0];
      const product = pageTitle.split(' -')[0]
      browser.storage.local.set({ csrf_token: csrf_token }, () => {
        console.log('CSRF: ' + csrf_token);
      })
      browser.storage.local.set({ cart_id: cart_id }, () => {
        console.log('CartID: ' + cart_id);
      })
      browser.storage.local.set({ article_id: article_id }, () => {
        console.log('ArticleID: ' + article_id);
      })
      browser.storage.local.set({ producturl: producturl }, () => {
        console.log('ProductUrl: ' + producturl);
      })
      browser.storage.local.set({ product: product }, () => {
        console.log('Product: ' + product);
      })

    }
  }

  loadExpertTokens();


  function addPreisDetektivToSite() {
    const element = document.getElementsByClassName('widget-ArticleStatus-statusPoint')[0];
    const button = document.getElementById('bestpreis-button');
    if (!button) {
      // Append Div to Site
      const div = document.createElement('div');
      div.className = 'widget-ArticleStatus-button-wrapper';
      element.appendChild(div);

      // Append Button to Site and restyle it
      const button = document.createElement('button');
      button.innerHTML = '💸 Expert Bestpreis finden';
      button.id = 'bestpreis-button';
      div.appendChild(button);
      button.onclick = function () {
        bestpreisButton();
      }

      // Add Overlay to Site
      const overlay = document.createElement('div');
      overlay.id = 'bestpreis-overlay';
      overlay.onclick = function () {
        setDisplay('bestpreis-overlay', 'none');
        setDisplay('counter', 'none');
      }
      element.appendChild(overlay);

      // Append Progess Bar to Button
      const counters = document.createElement('div');
      counters.id = 'counter';
      counters.className = 'counters';

      button.appendChild(counters);
      const progress = document.createElement('div');
      progress.className = 'Progressbar';
      counters.appendChild(progress);

      const progressbar_value = document.createElement('div');
      progressbar_value.className = 'Progressbar__value';
      progress.appendChild(progressbar_value);

      const value = document.createElement('progress');
      value.value = 10;
      value.max = 100;
      value.innerHTML = '100%';
      progress.appendChild(value);
    }

  }

  addPreisDetektivToSite();

  async function bestpreisButton() {
    setDisplay('bestpreis-overlay', 'block');
    // Send Runtime message to background.js to get the csrf_token
    notifyBackgroundPage("Start PreisDetektiv");
    setDisplay('counter', 'block');

  }


  function setProgessbar(value) {
    const progressValue = document.querySelector('.Progressbar__value');
    const progress = document.querySelector('progress');
    progressValue.style.width = `${value}%`;
    progress.value = value;
  }

  setProgessbar(0);

  function setDisplay(Id, attr) {
    document.getElementById(Id).style.display = attr;
  }

  const sleep = (milliseconds) => {
    return new Promise((resolve) => setTimeout(resolve, milliseconds));
  };

  function handleResponse(message) {
    console.log(`Message from the background script: ${message.response}`);
  }

  function handleError(error) {
    console.log(`Error: ${error}`);
  }

  function notifyBackgroundPage(input) {
    const sending = browser.runtime.sendMessage({
      message: input,
    });
    sending.then(handleResponse, handleError);
  }


})();
