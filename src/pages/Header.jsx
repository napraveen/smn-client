import React from 'react';
import { Link } from 'react-router-dom';

import GetUserDetails from '../functions/GetUserDetails';
import lmsLogo from '../images/lmslogo.png';
const Header = () => {
  const { userDetails } = GetUserDetails();

  const handleLogout = () => {
    const serverOrigin = process.env.REACT_APP_SERVER_ORIGIN;

    fetch(`${serverOrigin}/auth/logout`, {
      method: 'POST',
      credentials: 'include',
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.message === 'Logged out successfully') {
          window.location.href = '/';
        }
      })
      .catch((error) => {
        console.error('Error logging out:', error);
      });
  };
  return (
    <div>
      {userDetails ? (
        <header>
          {' '}
          <div className="header-left">
            {' '}
            <img src={lmsLogo} alt="Logo" className="my-logo" />
            &nbsp;
          </div>
          <div className="header-middle">
            <p>
              {' '}
              <Link
                to="/"
                style={{ textDecoration: 'none' }}
                className="home-header-text"
              >
                Home
              </Link>
            </p>
            <p>
              {' '}
              <Link
                to="/availablebooks"
                style={{ textDecoration: 'none' }}
                className="home-header-text"
              >
                Available Books
              </Link>
            </p>
            {userDetails.username === 'admin' ? (
              <>
                {' '}
                <p>
                  {' '}
                  <Link
                    to="/upload"
                    style={{ textDecoration: 'none' }}
                    className="home-header-text"
                  >
                    Upload
                  </Link>
                </p>
                <p>
                  {' '}
                  <Link
                    to="/users"
                    style={{ textDecoration: 'none' }}
                    className="home-header-text"
                  >
                    Users
                  </Link>
                </p>
                <p>
                  {' '}
                  <Link
                    to="/issuedbooks"
                    style={{ textDecoration: 'none' }}
                    className="home-header-text"
                  >
                    Issued Books
                  </Link>
                </p>
              </>
            ) : (
              <p>
                {' '}
                <Link
                  to="/duedates"
                  style={{ textDecoration: 'none' }}
                  className="home-header-text"
                >
                  Due Dates
                </Link>
              </p>
            )}
          </div>
          <div className="header-right">
            <Link to="/">
              <button className="logout" onClick={handleLogout}>
                Logout
              </button>
            </Link>
          </div>
        </header>
      ) : (
        <header>
          {' '}
          <div className="header-left">
            {' '}
            <img src={lmsLogo} alt="Logo" className="my-logo" />
            &nbsp;
          </div>
          <div className="header-middle">
            <p>
              {' '}
              <Link
                to="/"
                style={{ textDecoration: 'none' }}
                className="home-header-text"
              >
                Home
              </Link>
            </p>
            <p>
              {' '}
              <Link
                to="/availablebooks"
                style={{ textDecoration: 'none' }}
                className="home-header-text"
              >
                Available Books
              </Link>
            </p>
          </div>
          <div className="header-right">
            <Link to="/login" style={{ textDecoration: 'none' }}>
              {' '}
              <button className="login">Login</button>
            </Link>
          </div>
        </header>
      )}
    </div>
  );
};

export default Header;
