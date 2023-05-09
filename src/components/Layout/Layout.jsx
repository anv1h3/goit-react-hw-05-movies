import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

const StyledLink = styled(NavLink)`
  color: black;

  &.active {
    color: blueviolet;
  }
`;

export const Layout = () => {
  return (
    <main>
      <header>
        <nav>
          <StyledLink to="/" className="navLink">
            Home
          </StyledLink>
          <StyledLink to="/movies" className="navLink">
            Movies
          </StyledLink>
        </nav>
      </header>
      <Suspense fallback={<div>Loading...</div>}>
        <Outlet />
      </Suspense>
    </main>
  );
};
