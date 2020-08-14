import React from 'react';

const Search = ({ searchHandler }) => {
  return (
    <div>
      <input onChange={searchHandler} />
      <button onClick={() => searchHandler('click')}>Search</button>
    </div>
  );
};

export default Search;
