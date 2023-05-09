import React from 'react';
import { getMovieCredits } from 'servises/FetchData';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import defaulImage from './images/No-Image-Placeholder-min.png';

const Cast = () => {
  const { movieId } = useParams();
  const [cast, setCast] = useState([]);
  useEffect(() => {
    getMovieCredits(movieId)
      .then(results => results.json())
      .then(data => setCast(data.cast));
  }, [movieId]);
  return (
    <ul>
      {cast.length < 1 && <p>There is no information about cast</p>}
      {cast.map(actor => {
        return (
          <li key={actor.id}>
            <img
              src={
                actor.profile_path
                  ? `https://image.tmdb.org/t/p/w200/${actor.profile_path}`
                  : defaulImage
              }
              alt=""
              width="200"
            />
            <p>{actor.name}</p>
            <p>Character: {actor.character}</p>
          </li>
        );
      })}
    </ul>
  );
};
export default Cast;