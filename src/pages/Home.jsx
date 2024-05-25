import React from 'react';
import GetUserDetails from '../functions/GetUserDetails';
import { Link } from 'react-router-dom';
import '../css/Home.css';
import bestBook from '../images/books.webp';
import lmsLogo from '../images/lmslogo.png';
const Home = () => {
  const { userDetails } = GetUserDetails();
  // const handleLogout = () => {
  //   document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/;';
  //   window.location.href = '/';
  // };
  const handleLogout = () => {
    const serverOrigin = process.env.REACT_APP_SERVER_ORIGIN;

    fetch(`${serverOrigin}/auth/logout`, {
      method: 'POST',
      credentials: 'include', // Ensure cookies are included
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
    <>
      <div className="home-home_page">
        {userDetails ? (
          <>
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
              </div>
              <div className="header-right">
                <Link to="/">
                  <button className="logout" onClick={handleLogout}>
                    Logout
                  </button>
                </Link>
              </div>
            </header>
            <div className="home-body">
              <div className="body-left">
                <div className="body-left-inside">
                  {' '}
                  <h1>
                    Discover the world of <br></br>
                    <span style={{ color: '#ff4f00' }}> knowledge </span>
                    with us
                  </h1>
                  <p>
                    We believe in the transformative power of books and the joy
                    of reading. Our intuitive library management system is here
                    to help you find, borrow, and enjoy the books you love. Join
                    us on a journey through endless stories and limitless
                    learning. Your next adventure awaits!
                  </p>
                  <Link to="/availablebooks">
                    <button className="get-started">Get Started</button>
                  </Link>
                </div>
              </div>
              <div className="body-right">
                <div className="body-right-img-container">
                  {' '}
                  <img
                    src={bestBook}
                    alt="dashboard"
                    className="dashboard-img"
                  />
                </div>
              </div>
              <div className="body-right"></div>
            </div>
          </>
        ) : (
          <>
            <header>
              {' '}
              <div className="header-left">
                {' '}
                <img src={lmsLogo} alt="Logo" className="my-logo" />
                &nbsp;
                <h4>LMS</h4>
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
              </div>
              <div className="header-right">
                <Link to="/login">
                  {' '}
                  <button className="login">Login</button>
                </Link>
              </div>
            </header>
            <div className="home-body">
              <div className="body-left">
                <div className="body-left-inside">
                  {' '}
                  <h1>
                    Discover the world of <br></br>
                    <span style={{ color: '#ff4f00' }}> knowledge </span>
                    with us
                  </h1>
                  <p>
                    We believe in the transformative power of books and the joy
                    of reading. Our intuitive library management system is here
                    to help you find, borrow, and enjoy the books you love. Join
                    us on a journey through endless stories and limitless
                    learning. Your next adventure awaits!
                  </p>
                  <Link to="/login">
                    <button className="get-started">Get Started</button>
                  </Link>
                </div>
              </div>
              <div className="body-right">
                <div className="body-right-img-container">
                  {' '}
                  <img
                    src={bestBook}
                    alt="dashboard"
                    className="dashboard-img"
                  />
                </div>
              </div>
              <div className="body-right"></div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Home;
