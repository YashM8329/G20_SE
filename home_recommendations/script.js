 document.querySelectorAll(".scroll-button").forEach((button) => {
  button.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    target.scrollIntoView({ behavior: "smooth" });
  });
});
// Handle navigation via radio buttons
document.querySelectorAll(".nav-radio").forEach((radio) => {
  radio.addEventListener("change", function () {
    const target = document.querySelector(this.value);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
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

const scrollers = document.querySelectorAll(".scroller");

addAnimation();

function addAnimation(){
  scrollers.forEach((scroller) => {
    const scrollerInner = scroller.querySelector(".scroller__inner");
    const scrollerContent = Array.from(scrollerInner.children);

    scrollerContent.forEach((item) => {
      const duplicatedItem = item.cloneNode(true);
      duplicatedItem.setAttribute("aria-hidden", true);
      scrollerInner.appendChild(duplicatedItem);
    })
  })
}
