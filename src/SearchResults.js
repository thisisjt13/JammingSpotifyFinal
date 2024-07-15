import React from 'react';
import Tracklist from './Tracklist';


export default function SearchResults(props) {
    return(
        <div className="SearchResults">
        <h2 className="white-headers">Results</h2>
        <Tracklist tracks={props.tracks} onAddToPlaylist={props.onAddToPlaylist} />
      </div>
    )
}


