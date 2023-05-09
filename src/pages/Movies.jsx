import {React} from 'react';
import { useState, useEffect } from 'react';
import { SearchMovie } from 'components/Search';
import { searchMovies } from 'servises/FetchData';
import { Link, useLocation, useSearchParams } from 'react-router-dom';

const Movies = () => {
  const [searchedMovies, setSearchedMovies] = useState(null);
  const [searchParams] = useSearchParams();
  const location = useLocation();

  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const movieQuery = searchParams.get('query') ?? '';

  useEffect(() => {

    movieQuery &&
      searchMovies(movieQuery)
        .then(response => response.json())
        .then(data => setSearchedMovies(data.results))
        .catch(error => setError(error.message))
        .finally(setIsLoading(false));
  }, [movieQuery]);
  return (
    <>
      {error && <p>Something went wrong...</p>}

      <SearchMovie />
      {isLoading && <p>Loading...</p>}
      <ul>
        {searchedMovies &&
          searchedMovies.map(movie => {
            return (
              <li key={movie.id}>
                <Link to={`${movie.id}`} state={{ from: location }}>
                  {movie.title}
                </Link>
              </li>
            );
          })}
      </ul>
    </>
  );
};
export default Movies;