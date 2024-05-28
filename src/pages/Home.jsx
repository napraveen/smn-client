import React from 'react';
import GetUserDetails from '../functions/GetUserDetails';
import { Link } from 'react-router-dom';
import '../css/Home.css';
import bestBook from '../images/books.webp';
import Header from './Header';
const Home = () => {
  const { userDetails } = GetUserDetails();

  return (
    <>
      <div className="home-home_page">
        {userDetails ? (
          <>
            <Header />
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
                  <Link to="/availablebooks" style={{textDecoration:"none"}}>
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
            <Header />
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
