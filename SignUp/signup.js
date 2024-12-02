let eyePassword = document.getElementById("eye-password");
let eyeConfirm = document.getElementById("eye-confirm");
let passwordField = document.getElementById("password");
let confirmPasswordField = document.getElementById("confirm-password");

eyePassword.onclick = function() {
    if (passwordField.type === "password") {
        passwordField.type = "text";
        eyePassword.src = "eye-open.png";  // Change icon to open
    } else {
        passwordField.type = "password";
        eyePassword.src = "eye-close.png";  // Change icon to closed
    }
};

eyeConfirm.onclick = function() {
    if (confirmPasswordField.type === "password") {
        confirmPasswordField.type = "text";
        eyeConfirm.src = "eye-open.png";  // Change icon to open
    } else {
        confirmPasswordField.type = "password";
        eyeConfirm.src = "eye-close.png";  // Change icon to closed
    }
};
