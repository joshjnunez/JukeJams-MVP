import React from 'react';
import Image from "react-bootstrap/Image"

const ListEntry = ({ video, listClickHandler }) => {
  return (
    <div onClick={() => listClickHandler(video)}>
      <div>
        <Image src={video.snippet.thumbnails.default.url} rounded></Image>
      </div>
      <div>
        <div style={{ fontFamily: "monospace", fontWeight: "bolder", strokeWidth: ""}}>{video.snippet.title}</div>
        <div>{video.snippet.channelTitle}</div>
      </div>
    </div>
  );
};

export default ListEntry;
