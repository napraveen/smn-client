import React, { useEffect, useState } from 'react';
import Header from './Header';
import axios from 'axios';
import '../css/users.css';
import { ToastContainer, toast } from 'react-toastify';
import GetUserDetails from '../functions/GetUserDetails';
import PageNotFound from './PageNotFound';
const Users = () => {
  const { userDetails } = GetUserDetails();
  const [allUsers, setAllUsers] = useState([]);
  const serverOrigin = process.env.REACT_APP_SERVER_ORIGIN;

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(`${serverOrigin}/allusers`);
        setAllUsers(response.data);
        console.log(response);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };
    fetchUsers();
  }, [serverOrigin]);

  const handleVerify = async (userId) => {
    const { data } = await axios.post(`${serverOrigin}/verify`, { userId });
    setAllUsers((prevUsers) => prevUsers.filter((user) => user._id !== userId));
    toast.success('User verified successfully', {
      position: 'bottom-right',
    });
    console.log(data);
  };

  const handleReject = async (userId) => {
    const { data } = await axios.delete(`${serverOrigin}/reject`, {
      data: { userId },
    });
    setAllUsers((prevUsers) => prevUsers.filter((user) => user._id !== userId));
    toast.error('User Rejected Successfully', {
      position: 'bottom-right',
    });
    console.log(data);
  };

  return (
    <div>
      {userDetails && userDetails.username === 'admin' ? (
        <>
          {' '}
          <Header />
          <table border="1">
            <thead>
              <tr>
                <th>Email</th>
                <th>Username</th>
                <th>Verify</th>
                <th>Reject</th>
              </tr>
            </thead>
            <tbody>
              {allUsers
                .filter((item) => item.username !== 'admin')
                .map((item) => (
                  <tr key={item._id}>
                    <td>{item.email}</td>
                    <td>{item.username}</td>
                    <td>
                      <button onClick={() => handleVerify(item._id)}>
                        Verify
                      </button>
                    </td>
                    <td>
                      <button
                        className="button-reject"
                        onClick={() => handleReject(item._id)}
                      >
                        Reject
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>{' '}
            <ToastContainer position="bottom-right" />
          </table>
        </>
      ) : (
        <PageNotFound />
      )}
    </div>
  );
};

export default Users;
