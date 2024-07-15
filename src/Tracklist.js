import React from 'react';
import Track from './Track'


export default function Tracklist(props) {
  return (
      <div className="Tracklist">
          {props.tracks.map(track => (
              <Track key={track.id} track={track} onAddToPlaylist={props.onAddToPlaylist} />
          ))}
      </div>
  );
}