import React, { useEffect, useState } from 'react';
import axios from 'axios';

const IsAuthenticated = () => {
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState('');
  const serverOrigin = process.env.REACT_APP_SERVER_ORIGIN;

  useEffect(() => {
    axios
      .get(`${serverOrigin}/auth/check-auth`, {
        withCredentials: true,
      })
      .then((response) => {
        if (response.data.authenticated) {
          setAuthenticated(true);
          setUsername(response.data.username);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error checking authentication:', error);
        setLoading(false);
      });
  }, []);

  return { authenticated, loading, username };
};

export default IsAuthenticated;
