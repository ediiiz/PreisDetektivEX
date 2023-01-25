function generateUI() {
  var sidebar = document.getElementById("sidebar");

  // Add a click event listener to the badge
  document.getElementById("badge").addEventListener("click", function () {
    // Check if the sidebar has the class "close"
    if (sidebar.classList.contains("close")) {
      // If the sidebar has the class "close", remove it
      sidebar.classList.remove("close");
      setDisplay("sidebar", "grid");
    } else {
      // If the sidebar doesn't have the class "close", add it
      sidebar.classList.add("close");
    }
  });

  // Get the badge
  var badge = document.getElementById("badge");

  // Add a click event listener to the badge
  badge.addEventListener("click", function () {
    // Add the "active" class to the badge
    badge.classList.add("active");

    // Set a timeout to remove the "active" class after 500 milliseconds
    setTimeout(function () {
      badge.classList.remove("active");
    }, 2000);
  });


  document.getElementById("toggleClose").addEventListener("click", function () {
    if (sidebar.classList.contains("close")) {
      sidebar.classList.remove("close");
    } else {
      sidebar.classList.add("close");
      setTimeout(function () {
        setDisplay("sidebar", "none");
      }, 300);
    }
  });

  let currentMarket = document.getElementById("currentMarket");

  document.getElementById("startButton").addEventListener("click", function () {
    if (currentMarket.classList.contains("inactive")) {
      currentMarket.classList.remove("inactive");
      currentMarket.classList.add("active");
    }
  });
}

function setDisplay(Id, attr) {
  document.getElementById(Id).style.display = attr;
}

export { generateUI };
