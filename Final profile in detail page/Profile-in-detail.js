function showTab(tabId) {
  // Remove 'active' class from all tabs
  const tabs = document.querySelectorAll(".nav-links .tab");
  tabs.forEach((tab) => tab.classList.remove("active"));

  // Add 'active' class to the clicked tab
  event.target.classList.add("active");

  // Hide all tab content
  const contents = document.querySelectorAll(".tab-content");
  contents.forEach((content) => content.classList.remove("active"));

  // Show the selected tab content
  document.getElementById(tabId).classList.add("active");
}

// Function to navigate back to the previous page
function goBack() {
  window.history.back();
}

document.addEventListener("DOMContentLoaded", () => {
  const editBtn = document.getElementById("edit-btn");
  const inputs = document.querySelectorAll(
    ".profile-details input:not([readonly])"
  );
  const profilePic = document.getElementById("upload-pic");
  const profileImg = document.getElementById("profile-pic");
  const profilePicLabel = document.querySelector(".profile-picture .edit-btn");

  // Initially, disable the profile picture upload button
  profilePic.disabled = true;
  profilePicLabel.style.pointerEvents = "none";
  profilePicLabel.style.opacity = "0.5"; // Show disabled state

  // Edit Profile
  editBtn.addEventListener("click", () => {
    const isEditing = inputs[0].disabled;

    // Toggle input fields and button text
    inputs.forEach((input) => (input.disabled = !isEditing));
    editBtn.textContent = isEditing ? "Save Changes" : "Edit Profile";

    // Enable/Disable the profile picture upload
    profilePic.disabled = !isEditing;
    profilePicLabel.style.pointerEvents = isEditing ? "auto" : "none";
    profilePicLabel.style.opacity = isEditing ? "1" : "0.5";
  });

  // Upload Profile Picture
  profilePic.addEventListener("change", (e) => {
    const reader = new FileReader();
    reader.onload = (e) => (profileImg.src = e.target.result);
    reader.readAsDataURL(profilePic.files[0]);
  });
});

// document.addEventListener("DOMContentLoaded", () => {
//   const themeSwitch = document.getElementById("theme-switch");
//   const body = document.body;

//   // Load previously selected mode from localStorage
//   const savedTheme = localStorage.getItem("theme");
//   if (savedTheme) {
//     body.classList.add(savedTheme);
//     themeSwitch.checked = savedTheme === "dark-mode";
//   }

//   themeSwitch.addEventListener("change", () => {
//     if (themeSwitch.checked) {
//       body.classList.remove("light-mode");
//       body.classList.add("dark-mode");
//       localStorage.setItem("theme", "dark-mode");
//     } else {
//       body.classList.remove("dark-mode");
//       body.classList.add("light-mode");
//       localStorage.setItem("theme", "light-mode");
//     }
//   });
// });
