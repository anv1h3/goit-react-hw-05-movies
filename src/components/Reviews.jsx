// import {Suspense} from 'react';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getMovieReview } from 'servises/FetchData';

const Reviews = () => {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);
  useEffect(() => {
    getMovieReview(movieId)
      .then(response => response.json())
      .then(data => setReviews(data.results));
  }, [movieId]);

  return (
    <ul>
      {reviews.length < 1 && <p>There are no reviews yet</p>}
      {reviews.map(review => {
        return (
          <li key={review.id}>
            <h3>Autor: {review.author}</h3>
            <p>{review.content}</p>
          </li>
        );
      })}
    </ul>
  );
};
export default Reviews;