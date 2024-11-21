const profileIcon = document.getElementById("profile-icon");
const dropdownMenu = document.getElementById("dropdown-menu");

// Toggle the dropdown menu
profileIcon.addEventListener("click", () => {
  dropdownMenu.style.display =
    dropdownMenu.style.display === "block" ? "none" : "block";
});

// Close the dropdown menu when clicking outside
window.addEventListener("click", (event) => {
  if (event.target !== profileIcon && !dropdownMenu.contains(event.target)) {
    dropdownMenu.style.display = "none";
  }
});
