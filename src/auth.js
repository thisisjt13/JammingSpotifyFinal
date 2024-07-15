// src/auth.js
const clientId = '25ae395254594016b3871b835fbd45f2';
const redirectUri = 'http://localhost:3000/';
const scopes = [
  'playlist-modify-public',
  'playlist-modify-private'
];

export const getAccessToken = () => {
  const accessToken = localStorage.getItem('access_token');
  const expiresIn = localStorage.getItem('expires_in');
  const expiresAt = localStorage.getItem('expires_at');

  if (accessToken && new Date().getTime() < expiresAt) {
    return accessToken;
  }

  const hash = window.location.hash;
  if (hash) {
    const params = new URLSearchParams(hash.replace('#', ''));
    const token = params.get('access_token');
    const expiresIn = params.get('expires_in');

    if (token) {
      const expiresAt = new Date().getTime() + expiresIn * 1000;
      localStorage.setItem('access_token', token);
      localStorage.setItem('expires_in', expiresIn);
      localStorage.setItem('expires_at', expiresAt);

      window.location.hash = '';
      return token;
    }
  }

  window.location = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&redirect_uri=${encodeURIComponent(redirectUri)}&scope=${scopes.join('%20')}`;
};

export const logout = () => {
  localStorage.removeItem('access_token');
  localStorage.removeItem('expires_in');
  localStorage.removeItem('expires_at');
};