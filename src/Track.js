import React from 'react';
import './Track.css';

export default function Track(props) {
  const { track, onAddToPlaylist } = props;

  const handleAddToPlaylist = () => {
      onAddToPlaylist(track);
  };
  

    return(
        <div className="Track">
          
          <div className="Track-information">
      <h3>{props.track.name}</h3>
      <p>{props.track.artists[0].name} | {props.track.album.name}</p>
      </div>
      
      <button className="Track-action" onClick={handleAddToPlaylist}>
                +
      </button>
    </div>
    )
}

