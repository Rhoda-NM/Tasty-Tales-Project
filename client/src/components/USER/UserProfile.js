import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../AuthProvider';
import NavBar from '../navbar';
import Footer from '../footer'

const UserProfile = () => {
  const { user, loading } = useAuth();
  const [userInfo, setUserInfo] = useState(null);
  const [error, setError] = useState(null);

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

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading user info: {error.message}</p>;
  if (!userInfo) return <p>Loading user info...</p>;

  return (
    <>
      <NavBar />
      <div>
        <h1>User: {userInfo.username}</h1>
        <p>Email: {userInfo.email}</p>
        {/* Add more user information as needed */}
      </div>
      <Footer />
    </>
  );
};

export default UserProfile;