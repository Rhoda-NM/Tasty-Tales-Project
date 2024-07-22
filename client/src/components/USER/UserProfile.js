import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../AuthProvider';
import NavBar from '../navbar';
import Footer from '../footer';
import "bootstrap/dist/css/bootstrap.min.css";

const UserProfile = () => {
  const { logout } = useAuth();
  const { user, loading } = useAuth();
  const navigate = useNavigate();
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

  const handleLogout = async () => {
    try {
      await logout();
    } catch (err) {
      console.error('Logout error', err);
    }
  };

  const handleDeleteUser = async () => {
    const token = localStorage.getItem('token');
    try {
      const response = await axios.delete('/user/delete_user', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
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
        username,
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

  const titleStyle = {
    fontSize: '2.5rem',  // Adjust font size as needed
    color: '#007bff',  // Bootstrap primary color, or use any other color
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: '1px',
    marginBottom: '20px',
    textAlign: 'center',
  };

  return (
    <>
      <NavBar />
      <div className="container mt-4">
        <div className="row justify-content-center">
          <div className="col-md-8 col-lg-6"> {/* Increased column width */}
            <div className="card" style={{ borderRadius: '10px', padding: '20px' }}> {/* Added padding */}
              <div className="card-body">
                <h1 style={titleStyle} className="mb-4">User Profile</h1>
                <div className="text-center mb-4">
                  <h3>{userInfo.username}</h3>
                  <p className="text-muted">{userInfo.email}</p>
                </div>
                <div className="d-flex justify-content-between mb-4">
                  <button className="btn btn-danger" onClick={handleLogout}>Logout</button>
                  <button className="btn btn-warning" onClick={handleDeleteUser}>Delete Account</button>
                </div>
                <h4 className="mb-3">Update Profile</h4>
                <form onSubmit={handleUpdate}>
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="username" className="form-label">Username</label>
                    <input
                      type="text"
                      className="form-control"
                      id="username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                    />
                  </div>
                  <button type="submit" className="btn btn-primary">Update</button>
                </form>
                {message && <div className="alert alert-info mt-3">{message}</div>}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default UserProfile;
