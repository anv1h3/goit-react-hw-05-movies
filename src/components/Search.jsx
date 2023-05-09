import React from 'react';
import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';

export const SearchMovie = () => {
  const [value, setValue] = useState('');
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('query') ?? '';
  
  console.log(query);

  const updateQueryString = e => {
    e.preventDefault();
    const queryValue = value;
    if (queryValue === '') {
      return setSearchParams({});
    }
    setSearchParams({ query: queryValue });
    };

  const handleChange = ({ target }) => {
    setValue(target.value);
  };

  return (
    <form onSubmit={updateQueryString}>
      <input type="search" value={value} onChange={handleChange} />
      <button type="submit">Search</button>
    </form>
  );
};
