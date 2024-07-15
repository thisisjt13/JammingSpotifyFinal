import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import spotifyLogo from './Spotify_icon.svg';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { loginUrl, getUserProfile, searchTracks, createPlaylist, addTracksToPlaylist } from './spotify';
import Callback from './Callback';
import SearchBar from './SearchBar';
import SearchResults from './SearchResults';
import Playlist from './Playlist';
import Pagination from './Pagination';
import sampleData from './sampleData.json'; // dummy data

function MainApp() {
  const [tracks, setTracks] = useState(sampleData.tracks.items); // Initialize state with sample data
  const [searchResults, setSearchResults] = useState([]); // Initialize search function
  const [playlist, setPlaylist] = useState([]); // tracks in the playlist
  const [playlistName, setPlaylistName] = useState(''); // playlist name
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10); // Ensure this is set to the desired number of items per page
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const accessToken = localStorage.getItem('spotify_access_token');
    if (accessToken) {
      setToken(accessToken);
      getUserProfile(accessToken).then(response => {
        setUser(response.data);
      }).catch(error => {
        console.error('Error fetching user profile:', error);
      });
    }
  }, []);

  const search = (term) => {
    const accessToken = localStorage.getItem('spotify_access_token');
    if (!accessToken) {
      console.error('No access token found');
      return;
    }

    searchTracks(accessToken, term, 50).then(results => {
      setSearchResults(results.tracks.items);
      console.log('Search Results:', results.tracks.items); // Add this log
    }).catch(error => {
      console.error('Error fetching search results:', error);
    });
  };

  const savePlaylist = () => {
    const accessToken = localStorage.getItem('spotify_access_token');
    if (!accessToken || !user) {
      console.error('No access token or user found');
      return;
    }

    createPlaylist(accessToken, user.id, playlistName).then(response => {
      const playlistId = response.id;
      const trackUris = playlist.map(track => track.uri);
      return addTracksToPlaylist(accessToken, playlistId, trackUris);
    }).then(() => {
      alert('Playlist saved successfully!');
    }).catch(error => {
      console.error('Error saving playlist:', error);
    });
  };

  // Calculate current items
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  console.log('indexOfFirstItem:', indexOfFirstItem); // Add this log
  console.log('indexOfLastItem:', indexOfLastItem); // Add this log
  console.log('searchResults length:', searchResults.length); // Add this log
  const currentItems = searchResults.slice(indexOfFirstItem, indexOfLastItem);

  console.log('Current Items:', currentItems); // Debugging log

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handlePlaylistNameChange = (newName) => {
    setPlaylistName(newName);
  };

  function addToPlaylist(track) {
    setPlaylist(prevPlaylist => {
      if (prevPlaylist.find(t => t.id === track.id)) {
        return prevPlaylist;
      }
      return [...prevPlaylist, track];
    });
  }

  function removeFromPlaylist(trackId) {
    setPlaylist(prevPlaylist => prevPlaylist.filter(track => track.id !== trackId));
  }

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('spotify_access_token');
  };

  return (
    <div className="App">
      <div className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1>Jammming</h1>
        {!token ? (
          <a href={loginUrl} className="spotify-login">Login with Spotify <img src={spotifyLogo} /> </a>
        ) : (
          <div>
            <h1>Welcome, {user && user.display_name}</h1>
            <button onClick={logout}>Log out</button>
          </div>
        )}
      </div>
      <SearchBar onSearch={search} />
      <main>
        <div className="searchResults">
          <SearchResults 
            tracks={currentItems} 
            onAddToPlaylist={addToPlaylist} 
          />
          <Pagination 
            itemsPerPage={itemsPerPage} 
            totalItems={searchResults.length} 
            paginate={paginate}
          />
        </div>
        <Playlist   
          playlist={playlist} 
          playlistName={playlistName}
          onNameChange={handlePlaylistNameChange}
          onRemoveFromPlaylist={removeFromPlaylist} 
        />
        
      </main>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/callback" element={<Callback />} />
        <Route path="/" element={<MainApp />} />
      </Routes>
    </Router>
  );
}

export default App;