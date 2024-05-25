import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../css/login.css';
const Login = () => {
  const navigate = useNavigate();
  const serverOrigin = process.env.REACT_APP_SERVER_ORIGIN;

  const [inputValue, setInputValue] = useState({
    email: '',
    password: '',
  });
  const { email, password } = inputValue;
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setInputValue({
      ...inputValue,
      [name]: value,
    });
  };

  const handleError = (err) =>
    toast.error(err, {
      position: 'bottom-left',
    });
  const handleSuccess = (msg) =>
    toast.success(msg, {
      position: 'bottom-left',
    });
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        `${serverOrigin}/auth/login`,
        {
          ...inputValue,
        },
        { withCredentials: true }
      );
      console.log(data);
      const { success, message } = data;
      if (success) {
        handleSuccess(message);
        setTimeout(() => {
          navigate('/');
        }, 1000);
      } else {
        handleError(message);
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.errors) {
        error.response.data.errors.forEach((err) => handleError(err.msg));
      } else {
        handleError('Login failed. Please check your credentials.');
      }
      console.log(error);
    }
    setInputValue({
      ...inputValue,
      email: '',
      password: '',
    });
  };

  return (
    <div className="login-container">
      <ul>
        <Link to="/">
          <li className="login-home">Home</li>
        </Link>
        <li className="login-signup">
          <Link to="/signup">Sign up</Link>
        </li>
      </ul>
      <form onSubmit={handleSubmit}>
        <div className="login-box">
          <h1>
            <span>Hello&nbsp;</span>
            <span>Again!</span>
          </h1>
          <label for="login-email">
            Email&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          </label>

          <input
            type="email"
            name="email"
            className="login-email"
            value={email}
            placeholder="Enter your email"
            onChange={handleOnChange}
          />
          <label htmlFor="password">Password&nbsp;</label>
          <input
            type="password"
            name="password"
            className="login-password"
            value={password}
            placeholder="Enter your password"
            onChange={handleOnChange}
          />
          <button type="submit" className="login-submit">
            Submit
          </button>
        </div>
        <p className="login-signup-button">
          New user? <Link to="/signup">Sign up Here</Link>
        </p>
      </form>
      <ToastContainer />
    </div>
  );
};

export default Login;
