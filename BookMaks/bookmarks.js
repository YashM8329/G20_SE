// Sample initial bookmarks
const bookmarks = [
    { title: "The Great Gatsby", author: "F. Scott Fitzgerald", dateAdded: "2024-11-01" },
    { title: "1984", author: "George Orwell", dateAdded: "2024-11-05" },
  ];
  
  // Function to render the bookmarks list
  function renderBookmarks() {
    const bookmarksList = document.getElementById("bookmarks-list");
    bookmarksList.innerHTML = ""; // Clear current list
  
    bookmarks.forEach((bookmark, index) => {
      const bookmarkItem = document.createElement("div");
      bookmarkItem.className = "bookmark-item";
  
      bookmarkItem.innerHTML = `
        <p><strong>Title:</strong> ${bookmark.title}</p>
        <p><strong>Author:</strong> ${bookmark.author}</p>
        <p><strong>Date Added:</strong> ${bookmark.dateAdded}</p>
        <button class="remove-btn" onclick="removeBookmark(${index})">Remove</button>
      `;
  
      bookmarksList.appendChild(bookmarkItem);
    });
  }
  
  // Function to add a new bookmark
  function addBookmark() {
    const title = prompt("Enter the book title:");
    const author = prompt("Enter the book author:");
    const dateAdded = new Date().toISOString().split("T")[0]; // Current date in YYYY-MM-DD format
  
    if (title && author) {
      bookmarks.push({ title, author, dateAdded });
      renderBookmarks();
    } else {
      alert("Both title and author are required to add a bookmark.");
    }
  }
  
  // Function to remove a bookmark by index
  function removeBookmark(index) {
    bookmarks.splice(index, 1);
    renderBookmarks();
  }
  
  // Initialize the page
  document.addEventListener("DOMContentLoaded", () => {
    // Render initial bookmarks
    renderBookmarks();
  
    // Add event listener for "Add Bookmark" button
    const addBookmarkBtn = document.getElementById("add-bookmark-btn");
    addBookmarkBtn.addEventListener("click", addBookmark);
  });
  
