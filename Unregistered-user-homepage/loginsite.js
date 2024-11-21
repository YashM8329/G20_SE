// Get all radio buttons with the class 'nav-radio'
const radioButtons = document.querySelectorAll(".nav-radio");

// Add an event listener to each radio button
radioButtons.forEach((radio) => {
  radio.addEventListener("change", function () {
    // Get the value of the selected radio button, which corresponds to the section ID
    const targetSectionId = this.value;
    const targetSection = document.querySelector(targetSectionId);

    if (targetSection) {
      // Smoothly scroll to the target section
      targetSection.scrollIntoView({ behavior: "smooth" });
    } else {
      console.error(`No section found with ID: ${targetSectionId}`);
    }
  });
});

// Get modal and elements
const modal = document.getElementById("profile-modal");
const profileIcon = document.querySelector(".profile-icon img");
const closeButton = document.querySelector(".close-button");

// Show modal when profile icon is clicked
profileIcon.addEventListener("click", () => {
  modal.style.display = "flex"; // Show modal
});

// Close modal when close button is clicked
closeButton.addEventListener("click", () => {
  modal.style.display = "none"; // Hide modal
});

// Close modal when clicking outside modal content
window.addEventListener("click", (event) => {
  if (event.target === modal) {
    modal.style.display = "none";
  }
});
