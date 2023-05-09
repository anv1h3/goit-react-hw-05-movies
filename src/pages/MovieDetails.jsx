import { Suspense } from 'react';
import { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { getMovieDetail } from 'servises/FetchData';
import { Link, Outlet, useLocation } from 'react-router-dom';
import defaulImage from '../components/images/No-Image-Placeholder-min.png';
import { BackLink } from 'components/BackLink';

const MovieDetails = () => {
  const location = useLocation();
  const backLinkRef = useRef(location.state?.from ?? '/movies');
  const { movieId } = useParams();

  const [title, setTitle] = useState('');
  const [overview, setOverview] = useState('');
  const [userScore, setUserScore] = useState(0);
  const [genres, setGenres] = useState([]);
  const [poster, setPoster] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    getMovieDetail(movieId)
      .then(response => response.json())
      .then(data => {
        setTitle(data.title);
        setOverview(data.overview);
        setUserScore(Math.round(Number(data.vote_average) * 10));
        setGenres(data.genres);
        setPoster(data.poster_path);
      })
      .catch(error => setError(error.message))
      .finally(setIsLoading(false));
  }, [movieId]);

  return (
    <div>
      {error && <p>Something went wrong...</p>}
      {isLoading && <p>Loading...</p>}
      <BackLink type="button" to={backLinkRef.current}>
        Go back
      </BackLink>
      <div className="movie_details">
        <img
          src={
            poster ? `https://image.tmdb.org/t/p/w300/${poster}` : defaulImage
          }
          alt=""
          width="300"
          height="auto"
        />
        <div className="movie_information">
          <h1>{title}</h1>
          <p>User Score - {userScore}%</p>
          <h2>Overview</h2>
          <p>{overview}</p>
          <h3>Genres</h3>
          <ul>
            {genres.map(genre => {
              return <li key={genres.indexOf(genre)}>{genre.name}</li>;
            })}
          </ul>
        </div>
      </div>
      <div className="movie_information">
        <p>Additional information</p>
        <ul>
          <li>
            <Link to="cast">Cast</Link>
          </li>
          <li>
            <Link to="reviews">Reviews</Link>
          </li>
        </ul>
        <Suspense fallback={<div>Loading subpage...</div>}>
          <Outlet />
        </Suspense>
      </div>
    </div>
  );
};
export default MovieDetails;
