import React from 'react';
import SearchResults from './searchResults.js';
import Playlist from './playlist.js';
import Search from './search.js';
import { Route, BrowserRouter, Link } from 'react-router-dom';

import Button from 'react-bootstrap/Button';

const UserPage = ({
  videos,
  clickHostParty,
  clickJoinParty,
  searchHandler,
  listClickHandler,
  userPlaylist,
  code,
  handleFormChange,
  handleFormSubmit,
  currentUser
}) => {
  let playlist;
  if (userPlaylist.length > 0) {
    playlist = <Playlist userPlaylist={userPlaylist} />;
  }

  return (
    <div>
      {/* <h1 style={{ 
        color: "black", backgroundColor: "#ECEBEB", fontFamily: "verdana", textalign: "center", fontSize: 65, fontWeight: 600, textAlign: "center", padding: "10px 20px"
        }}>
          JUKE JAMS
      </h1>
      <div>BY {currentUser || "error getting current user name"}</div> */}
      <Button size="lg" onClick={() => clickHostParty()}>Host a Party!</Button>{' '}
      <form>
        <label style={{ fontWeight: "bold"}}>
          Join a Party:
          <input
            placeholder="Enter party code"
            type="text"
            name="code"
            onChange={(event) => handleFormChange(event)}
          />
        </label>
        <BrowserRouter>
          <Link to={`/${code}`}>
            <Button>Submit</Button>
          </Link>
        </BrowserRouter>
      </form>
      <Search searchHandler={searchHandler} />
      <SearchResults
        videos={videos}
        listClickHandler={listClickHandler}
        userPlaylist={userPlaylist}
      />{' '}
      <div
        style={{
          display: 'inline-block',
          width: '200px',
          height: '100px',
        }}
      >
        {' '}
        {playlist}{' '}
      </div>
    </div>
  );
};

export default UserPage;
