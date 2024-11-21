// Mock Data for Transactions
const transactions = [
    { date: "2024-11-01", duration: "No Duration", title: "Book1", type: "Purchase", seller: "Varnika", amount: "Rs 1500" },
    { date: "2024-11-05", duration: "15 days", title: "Book2", type: "Rent", seller: "Varnika", amount: "Rs 300" },
  ];
  
  // Function to Render Transactions in Table
  function displayTransactions(data) {
    const tableBody = document.querySelector(".transaction-table tbody");
    tableBody.innerHTML = ""; // Clear existing rows
  
    data.forEach((transaction) => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${transaction.date}</td>
        <td>${transaction.duration}</td>
        <td>${transaction.title}</td>
        <td>${transaction.type}</td>
        <td>${transaction.seller}</td>
        <td>${transaction.amount}</td>
      `;
      tableBody.appendChild(row);
    });
  }
  
  // Function to Add a New Transaction
  function addTransaction(date, duration, title, type, seller, amount) {
    if (!date || !duration || !title || !type || !seller || !amount) {
      alert("All fields are required to add a new transaction.");
      return;
    }
    transactions.push({ date, duration, title, type, seller, amount });
    displayTransactions(transactions);
  }
  
  // Initialize Page with Transactions
  document.addEventListener("DOMContentLoaded", () => {
    displayTransactions(transactions);
  
    // Example: Adding New Transaction with Prompt Inputs
    document.querySelector("#add-transaction-btn")?.addEventListener("click", () => {
      const date = prompt("Enter Date (YYYY-MM-DD):");
      const duration = prompt("Enter Duration (e.g., 'No Duration' or '15 days'):");
      const title = prompt("Enter Book Title:");
      const type = prompt("Enter Transaction Type (Purchase/Rent):");
      const seller = prompt("Enter Seller/Renter Name:");
      const amount = prompt("Enter Amount (e.g., 'Rs 1500'):");
      addTransaction(date, duration, title, type, seller, amount);
    });
  });
  
