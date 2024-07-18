import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../AuthProvider';
import NavBar from '../navbar';
import Footer from '../footer'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from "@fortawesome/free-solid-svg-icons";
import "bootstrap/dist/css/bootstrap.min.css";


const UserProfile = () => {
  const { logout } = useAuth();
  const { user, loading } = useAuth();
  const navigate = useNavigate()
  const [userInfo, setUserInfo] = useState(null);
  const [error, setError] = useState(null);
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('/user/userinfo', {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        setUserInfo(response.data);
      } catch (err) {
        setError(err);
      }
    };

    if (user) {
      fetchUserInfo();
    }
  }, [user]);


  const handleLogout = async() => {
    try{
      await logout();
    } catch(err){
      console.error('Logout error', err)
    }
    
  };

  const handleDeleteUser = async () => {
    const token = localStorage.getItem('token');
    try {
      const response = await axios.delete('/user/delete_user', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (response.status === 200) {
        localStorage.removeItem('token');
        navigate('/signup');
      }
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    try {
      const response = await axios.put('/user/update_user', {
        email,
        username
      }, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 200) {
        setMessage('Profile updated successfully!');
      }
    } catch (error) {
      setMessage('Error updating profile.');
      console.error("Error updating profile:", error);
    }
  };


  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading user info: {error.message}</p>;
  if (!userInfo) return <p>Loading user info...</p>;

  return (
    <>
      <NavBar />
      <div className='row justify-content-center'>
        <div className='col-4'>
          <div className='row'>
            <h1>User: {userInfo.username}</h1>
            <p>Email: {userInfo.email}</p>
          </div>
          <div>
      <h1>User Profile</h1>
      <button onClick={handleLogout}>Logout</button>
      <button onClick={handleDeleteUser}>Delete Account</button>

      <h2>Update Profile</h2>
      <form onSubmit={handleUpdate}>
        <div>
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label>Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <button type="submit">Update</button>
      </form>
      {message && <p>{message}</p>}
    </div>
        </div>
        
        {/* Add more user information as needed */}
      </div>
      <Footer />
    </>
  );
};

export default UserProfile;