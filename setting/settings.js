document.addEventListener("DOMContentLoaded", () => {
  const saveButtons = document.querySelectorAll(".save-btn");
  const themeOptions = document.getElementsByName("theme");

  // Save changes (simulate functionality)
  saveButtons.forEach(button => {
    button.addEventListener("click", () => {
      alert("Your changes have been saved!");
    });
  });

  // Change theme dynamically
  themeOptions.forEach(option => {
    option.addEventListener("change", () => {
      if (option.value === "dark") {
        document.body.style.backgroundColor = "#1e1e1e";
        document.body.style.color = "white";
      } else {
        document.body.style.backgroundColor = "#ffffff";
        document.body.style.color = "black";
      }
    });
  });
});
