import React from 'react';
import GetUserDetails from '../functions/GetUserDetails';
const Home = () => {
  const { userDetails } = GetUserDetails();
  return (
    <>
      <div className="home-home_page">
        {userDetails ? (
          <>
            <div className="home-container">
              <div className="home-dashboard">{userDetails.username}</div>
            </div>
          </>
        ) : (
          <p>Loading user details...</p>
        )}
      </div>
    </>
  );
};

export default Home;
