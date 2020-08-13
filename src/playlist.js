import React from 'react';

// import ListEntry from './listEntry.js';

const Playlist = ({ userPlaylist }) => {
  // console.log(videos);
  return (
    <div>
      <h3>Your Playlist:</h3>
      <ul>
        {userPlaylist.map((video) => (
          <li>{video.snippet.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default Playlist;
