import React from 'react';
import Queue from './queue.js';
import VideoPlayer from './videoPlayer.js';
import { BrowserRouter, Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';


const PartyPage = ({
  video,
  userPlaylist,
  dropHostParty,
  listClickHandler,
  voteUpdate,
  // currentUser current host first name
}) => {
  return (
    <div style={{ color: "black", backgroundColor: "#ECEBEB", fontFamily: "fantasy", textalign: "center", fontSize: 65, fontWeight: 600, textAlign: "center", padding: "10px 20px" }}>
      Made it to the party page!
      <VideoPlayer video={video} />
      <Queue
        userPlaylist={userPlaylist}
        listClickHandler={listClickHandler}
        voteUpdate={voteUpdate}
      />
      <BrowserRouter>
        <Link to="/ ">
          <Button onClick={() => dropHostParty()}>Drop Hosted Party</Button>{' '}
        </Link>
      </BrowserRouter>
    </div>
  );
};

export default PartyPage;
