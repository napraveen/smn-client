import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import GetUserDetails from '../functions/GetUserDetails';

const Home = () => {
  const { userDetails } = GetUserDetails();
  const navigate = useNavigate();

  useEffect(() => {
    if (!userDetails) {
      navigate('/login');
    }
  }, [userDetails, navigate]);

  if (!userDetails) {
    return <p>Loading user details...</p>;
  }

  return (
    <div className="home-home_page">
      <div className="home-container">
        <div className="home-dashboard">{userDetails.username}</div>
      </div>
    </div>
  );
};

export default Home;
