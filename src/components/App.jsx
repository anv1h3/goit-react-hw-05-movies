import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';

import { Layout } from './Layout/Layout';

const Home = lazy(() => import("../pages/Home"));
const MovieDetails = lazy(() => import("pages/MovieDetails"));
const Reviews = lazy(() => import("./Reviews"));
const Movies = lazy(() => import("../pages/Movies"));
const Cast = lazy(() => import("./Cast"));

export const App = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="movies" element={<Movies />} />
            <Route path="movies/:movieId" element={<MovieDetails />}>
              <Route path="cast" element={<Cast />} />
              <Route path="reviews" element={<Reviews />} />
            </Route>
          </Route>
          <Route path="*" element={<Home />} />
        </Routes>
      </Suspense>
    </div>
  );
};
