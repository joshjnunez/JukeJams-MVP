import React from 'react';
import QueueEntry from './queueEntry.js';

const Queue = ({ userPlaylist, listClickHandler, sortPlaylist }) => {
  return (
    <div>
      Queue here:
      {userPlaylist.map((video) => (
        <QueueEntry video={video} listClickHandler={listClickHandler} sortPlaylist={sortPlaylist} />
      ))}
    </div>
  );
};

export default Queue;
