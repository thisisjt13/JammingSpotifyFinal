// src/Callback.js
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Callback = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const hash = window.location.hash;
        console.log('URL hash:', hash);

        const accessToken = new URLSearchParams(hash.replace('#', '')).get('access_token');
        console.log('Extracted access token:', accessToken);

        if (accessToken) {
            localStorage.setItem('spotify_access_token', accessToken);
            navigate('/');
        } else {
            navigate('/');
        }
    }, [navigate]);

    return <div>Loading...</div>;
};

export default Callback;