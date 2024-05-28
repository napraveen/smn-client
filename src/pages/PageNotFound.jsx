import React from 'react';
import Header from './Header';
import PageNotFoundImg from '../images/sadface.jpg';
import { Link } from 'react-router-dom';
const PageNotFound = () => {
  return (
    <div>
      <Header />
      <div className="pagenotfound-container" style={{display:"flex", justifyContent:"center",alignItems:"center",flexDirection:"column"}}>
        <img src={PageNotFoundImg} alt="PageNotFound" />
        <h1 style={{marginTop:"50px", marginBottom:"30px"}}>Page not found. </h1>
        <Link to="/"><button>Go to Home Page</button></Link>
      </div>
    </div>
  );
};

export default PageNotFound;
