// Get the signup form and elements
const signupForm = document.querySelector(".signup-form");

// Listen for form submission
signupForm.addEventListener("submit", async (e) => {
  e.preventDefault(); // Prevent the default form submission behavior

  // Get the form data
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const phone = document.getElementById("phone").value;
  const address = document.getElementById("address").value;
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  const confirmPassword = document.getElementById("confirm-password").value;

  // Check if passwords match
  if (password !== confirmPassword) {
    alert("Passwords do not match");
    return;
  }

  // Prepare the data to send to the backend
  const userData = {
    name,
    email,
    phone,
    address,
    username,
    password,
  };

  try {
    // Send the POST request to the backend
    const response = await fetch("http://localhost:3000/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData), // Send the form data as a JSON string
    });

    const result = await response.json(); // Parse the JSON response

    if (response.ok) {
      // If signup is successful
      alert(result.message);
      // Redirect to the login page or another page
      window.location.href = "/login"; // Adjust the path as needed
    } else {
      // If there's an error (e.g., user already exists)
      alert(result.message);
    }
  } catch (error) {
    console.error("Error:", error);
    alert("An error occurred. Please try again.");
  }
});

document.querySelectorAll(".eye-icon").forEach((icon) => {
  icon.addEventListener("click", (e) => {
    const passwordField = e.target
      .closest(".input-group")
      .querySelector("input");
    if (passwordField.type === "password") {
      passwordField.type = "text";
      e.target.src = "eye-open.png"; // Update to an open-eye icon
    } else {
      passwordField.type = "password";
      e.target.src = "eye-close.png"; // Update to a closed-eye icon
    }
  });
});
