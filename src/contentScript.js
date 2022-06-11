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

})();
