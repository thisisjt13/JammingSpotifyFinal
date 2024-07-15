// src/spotify.js
import axios from 'axios';

const clientId = '25ae395254594016b3871b835fbd45f2';
const redirectUri = 'http://localhost:3000/callback';
const scopes = [
    'user-read-private',
    'user-read-email',
    'playlist-read-private',
    'playlist-modify-private',
    'playlist-modify-public',
    'playlist-read-collaborative',
];

const authEndpoint = 'https://accounts.spotify.com/authorize';
const tokenEndpoint = 'https://accounts.spotify.com/api/token';

const getTokenFromUrl = () => {
    const params = new URLSearchParams(window.location.hash.replace('#', ''));
    return params.get('access_token');
};

export const loginUrl = `${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join(
    '%20'
)}&response_type=token&show_dialog=true`;

export const getAccessToken = () => {
    const token = getTokenFromUrl();
    return token;
};

export const getUserProfile = (accessToken) => {
    return axios.get('https://api.spotify.com/v1/me', {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    }).catch(error => {
        console.error('Error fetching user profile:', error.response ? error.response.data : error.message);
    });
};

export const searchTracks = (accessToken, query, limit = 50) => {
    console.log('Searching tracks with query:', query);
    return axios.get('https://api.spotify.com/v1/search', {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
        params: {
            q: query,
            type: 'track',
            limit: limit
        },
    }).then(response => {
        console.log('Search response:', response.data);
        return response.data;
    }).catch(error => {
        console.error('Error fetching search results:', error.response ? error.response.data : error.message);
    });
};

export const createPlaylist = (accessToken, userId, name) => {
    return axios.post(`https://api.spotify.com/v1/users/${userId}/playlists`, {
        name: name,
        description: 'New playlist from Jammming app',
        public: false
    }, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        }
    }).then(response => response.data).catch(error => {
        console.error('Error creating playlist:', error.response ? error.response.data : error.message);
    });
};

export const addTracksToPlaylist = (accessToken, playlistId, tracks) => {
    return axios.post(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
        uris: tracks
    }, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        }
    }).catch(error => {
        console.error('Error adding tracks to playlist:', error.response ? error.response.data : error.message);
    });
};