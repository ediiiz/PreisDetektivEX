function generateUI() {
  var sidebar = document.getElementById("sidebar");

  // Add a click event listener to the badge
  document.getElementById("badge").addEventListener("click", function () {
    // Check if the sidebar has the class "open"
    if (sidebar.classList.contains("open")) {
      // If the sidebar has the class "open", remove it
      sidebar.classList.remove("open");
    } else {
      // If the sidebar doesn't have the class "open", add it
      sidebar.classList.add("open");
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
}

export { generateUI };
