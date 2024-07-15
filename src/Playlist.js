import React, {useState} from 'react';
import './Playlist.css';
import './Track.css';
import pencilIcon from './pencilicon.svg';
import tickIcon from './check-mark-circle-icon.svg'


export default function Playlist(props) {
    const [isEditing, setIsEditing] = useState(false);
    const [newName, setNewName] = useState(props.playlistName);
  
    const handleNameChange = (event) => {
      setNewName(event.target.value);
  
    };
  
    const handleBlur = () => {
      props.onNameChange(newName);
      setIsEditing(false);
    };    

    const handleRemoveClick = (trackId) => {
        props.onRemoveFromPlaylist(trackId);
      };

      const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
          props.onNameChange(newName);
          setIsEditing(false);
        }
      };
    


    return (
        <div className="playlist">
        {isEditing ? (
          <>
          <input
            type="text"
            value={newName}
            onChange={handleNameChange}
            onBlur={handleBlur}
            onKeyDown={handleKeyPress}
            autoFocus
          />
          <img src={tickIcon} className="tick-icon" alt="tick" />
          </>
        ) : (
          
          <div className="playlistHeading">
          <h2 onClick={() => setIsEditing(true)}>
            {props.playlistName || "Your Playlist"}
            <img src={pencilIcon} className="pencil-icon" alt="pencil" />
          </h2>
          </div>
       
        )}
    
        {props.playlist.map(track => (
            <div className="Track">
            <div className="Track-information">
        <h3>{track.name}</h3>
        <p>{track.artists[0].name} | {track.album.name}</p>
        </div>
        
        <button className="Track-action" onClick={() => handleRemoveClick(track.id)}>
                  -
        </button>
      </div>
          
          
   
             
        ))}    
        <div className="playlistButton">
        <button type="button">Save to Spotify</button>
      </div>
      </div>
    );
  }
  
