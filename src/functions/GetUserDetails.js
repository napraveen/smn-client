import React, { useEffect, useState } from 'react';
import IsAuthenticated from './IsAuthenticated';

const GetUserDetails = () => {
  const { authenticated, username } = IsAuthenticated();
  const [userDetails, setUserDetails] = useState(null);
  const serverOrigin = process.env.REACT_APP_SERVER_ORIGIN;

  useEffect(() => {
    const getUserDetails = async () => {
      if (username) {
        try {
          const response = await fetch(`${serverOrigin}/api/user/${username}`);

          if (response.ok) {
            const user = await response.json();
            setUserDetails(user);
          } else {
            console.error('Failed to fetch user details:', response.status);
          }
        } catch (error) {
          console.error('Error fetching user details:', error);
        }
      }
    };

    getUserDetails();
  }, [username]);

  return { userDetails };
};

export default GetUserDetails;
