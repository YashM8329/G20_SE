// Function to simulate order confirmation and UPI payment redirection
function confirmOrder() {
  const upiId = document.getElementById('upi-id').value;
  const upiApp = document.getElementById('upi-app').value;
  const successMessage = document.getElementById('success-message');
  const loadingSpinner = document.getElementById('loading-spinner');

  // Hide success message and loading spinner initially
  successMessage.style.display = 'none';
  loadingSpinner.style.display = 'none';

  // Validate UPI ID input
  if (upiId === '') {
    alert('Please enter your UPI ID to proceed!');
    return;
  }

  // Show loading spinner while processing payment
  loadingSpinner.style.display = 'flex';

  // Simulate redirect to the chosen UPI app after 2 seconds
  setTimeout(() => {
    loadingSpinner.style.display = 'none';
    successMessage.style.display = 'block';

    // Redirect to the UPI app
    if (upiApp === 'googlepay') {
      window.location.href = 'upi://pay?pa=' + encodeURIComponent(upiId);
    } else if (upiApp === 'phonepe') {
      window.location.href = 'upi://pay?pa=' + encodeURIComponent(upiId);
    } else if (upiApp === 'paytm') {
      window.location.href = 'upi://pay?pa=' + encodeURIComponent(upiId);
    }
  }, 2000);

  
}
