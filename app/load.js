var url = 'file:///preisdetekiv.html';

// Use the fetch function to retrieve the HTML file at the specified URL
fetch(url)
  .then(function (response) {
    // Use the text method of the response object to get the HTML content as a string
    return response.text();
  })
  .then(function (html) {
    // Get the element on the page where you want to inject the HTML file
    //var container = document.getElementById("container");

    console.log(html);
    // Set the innerHTML of the container element to the HTML content of the response
    //container.innerHTML = html;

  });
