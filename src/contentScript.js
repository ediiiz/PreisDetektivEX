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
    if (element) {
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
        setDisplay('bestpreis-overlay', 'block');
      }

      // Add Overlay to Site
      const overlay = document.createElement('div');
      overlay.id = 'bestpreis-overlay';
      overlay.onclick = function () {
        setDisplay('bestpreis-overlay', 'none');
      }
      element.appendChild(overlay);
    }

  }

  addPreisDetektivToSite();


  function setDisplay(Id, attr) {
    document.getElementById(Id).style.display = attr;
  }

})();
