import React, { useState } from 'react';
import './Home.css';

const RateAndReviewSection = () => {
  // State variables
  const [rating, setRating] = useState(0); // Initialize with 0 stars
  const [review, setReview] = useState('');

  // Function to handle the rating change
  const handleRatingChange = (newRating) => {
    setRating(newRating);
  };

  // Function to handle the review text change
  const handleReviewChange = (event) => {
    setReview(event.target.value);
  };

  // Function to handle form submission
  const handleSubmit = () => {
    
    fetch('/Ratings', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ rating, review }),
    })
      .then((response) => response.json())
      .then((data) => {
        // Handle the response from the backend
        console.log('Rating and Review submitted successfully:', data);
      })
      .catch((error) => {
        console.error('Error submitting Rating and Review:', error);
      });

    // Clear the review text and reset the rating
    setReview('');
    setRating(0);
  };

  return (
    <div className="rate-and-review-section">
      <h3>Rate and Review Movie</h3>
      <div>
        Your Rating:
        <div>
          {[1, 2, 3, 4, 5].map((star) => (
            <span
              key={star}
              className={`star ${star <= rating ? 'selected' : ''}`}
              onClick={() => handleRatingChange(star)}
            >
              ★
            </span>
          ))}
        </div>
      </div>
      <div>
        Your Review:
        <textarea
          value={review}
          onChange={handleReviewChange}
          rows={4}
          cols={50}
          placeholder="Write your review here"
        />
      </div>
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default RateAndReviewSection;
