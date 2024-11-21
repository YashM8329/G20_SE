document.getElementById("bookRentalForm").addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent form submission

    // Collect form data
    const bookName = document.getElementById("bookName").value;
    const price = document.getElementById("price").value;
    const bookPhoto = document.getElementById("bookPhoto").files[0];

    // Update preview details
    document.getElementById("previewBookName").textContent = bookName;
    document.getElementById("previewPriceText").textContent = `$${price}/week`;

    // Handle image preview
    if (bookPhoto) {
        const reader = new FileReader();
        reader.onload = function (e) {
            document.getElementById("previewImage").src = e.target.result;
        };
        reader.readAsDataURL(bookPhoto);
    }

    // Show preview section
    document.getElementById("previewSection").classList.remove("hidden");
});
