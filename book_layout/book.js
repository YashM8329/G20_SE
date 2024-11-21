document.addEventListener('DOMContentLoaded', function() {
  const stars = document.querySelectorAll('.star-rating .star');
  const renterStars = document.querySelectorAll('.renter-star-rating .renter-star');
  let selectedRating = 0;
  let selectedRenterRating = 0;
  const selectedRatingText = document.querySelector('.selected-rating');
  const selectedRenterRatingText = document.querySelector('.renter-selected-rating');

  // Book rating stars functionality
  stars.forEach(star => {
    star.addEventListener('mouseover', function() {
      const value = parseInt(star.getAttribute('data-value'));
      updateStarRating(value, stars);
    });

    star.addEventListener('mouseout', function() {
      updateStarRating(selectedRating, stars);
    });

    star.addEventListener('click', function() {
      selectedRating = parseInt(star.getAttribute('data-value'));
      selectedRatingText.textContent = `Selected Rating: ${selectedRating}`;
    });
  });

  // Renter rating stars functionality
  renterStars.forEach(star => {
    star.addEventListener('mouseover', function() {
      const value = parseInt(star.getAttribute('data-value'));
      updateStarRating(value, renterStars);
    });

    star.addEventListener('mouseout', function() {
      updateStarRating(selectedRenterRating, renterStars);
    });

    star.addEventListener('click', function() {
      selectedRenterRating = parseInt(star.getAttribute('data-value'));
      selectedRenterRatingText.textContent = `Selected Renter Rating: ${selectedRenterRating}`;
    });
  });

  // Function to update the star rating for either book or renter
  function updateStarRating(value, starElements) {
    starElements.forEach(star => {
      const starValue = parseInt(star.getAttribute('data-value'));
      if (starValue <= value) {
        star.classList.add('selected');
      } else {
        star.classList.remove('selected');
      }
    });
  }

  // Function to handle review submission
  window.submitReview = function() {
    const reviewText = document.getElementById('user-review').value;
    if (reviewText.trim() === '') {
      alert('Please write a review before submitting.');
      return;
    }
    alert(`Your review has been submitted:\n${reviewText}`);
    document.getElementById('user-review').value = ''; // Clear the textarea
  };
});
function toggleBookmark() {
  const button = document.querySelector('.bookmark-button');
  const icon = button.querySelector('.material-icons');  // If you're using the Material Icons version
  
  // Check if the button already has the 'bookmarked' class
  if (button.classList.contains('bookmarked')) {
    // If bookmarked, remove the 'bookmarked' class
    button.classList.remove('bookmarked');
    // Optionally, change the icon to a regular one (if using Material Icons)
    icon.textContent = 'star'; // Replace with a filled star
  } else {
    // If not bookmarked, add the 'bookmarked' class
    button.classList.add('bookmarked');
    // Optionally, change the icon to the filled star (if using Material Icons)
    icon.textContent = 'star_rate';  // Filled star icon for "bookmarked"
  }
}
