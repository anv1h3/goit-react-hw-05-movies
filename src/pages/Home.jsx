import { useEffect, useState } from 'react';
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { getTrending } from 'servises/FetchData';

const Home = () => {
  const [movieList, setMovieList] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setIsLoading(true);
    getTrending()
      .then(response => response.json())
      .then(data => {
        setMovieList(data.results);
      }).catch(error => setError(error.message))
      .finally(setIsLoading(false));
  }, []);
    
  return (
    <div className="trending">
      <h1>Trending today</h1>
      {error && <p>Something went wrong</p>}
      {isLoading && <p>Loading...</p>}
      <ul>
        {movieList &&
          movieList.map(movie => {
            return (
              <li key={movie.id}>
                <Link to={`/movies/${movie.id}`} state={{ from: location }}>
                  {movie.title}
                </Link>
              </li>
            );
          })}
      </ul>
    </div>
  );
};
export default Home;