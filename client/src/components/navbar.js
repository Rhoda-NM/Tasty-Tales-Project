import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from './AuthProvider';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from "@fortawesome/free-solid-svg-icons";
import "bootstrap/dist/css/bootstrap.min.css";
import "./app.css";

function NavBar() {
  const img4 = "https://www.themealdb.com/images/media/meals/zadvgb1699012544.jpg";

  // Track user authentication state
  const { user, logout } = useAuth();


  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <Link to="/" className="navbar-brand">
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <img src={img4} width={"60px"} alt="logo" />
              <h1 style={{ marginLeft: 12, marginBottom: 0 }}>tasty<span>TALES</span></h1>
            </div>
          </Link>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link to="/" className="nav-link active">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/recipes" className="nav-link active">
                  Recipes
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/recipeform" className="nav-link active">
                  Add Recipe
                </Link>
              </li>
            </ul>
            <div className="d-flex align-items-center">
              <div className="user">
                
                <h3>
                  {user ? (
                    // Show Logout button if authenticated
                    <>
                      <div class="input-group mb-3">
                        <button class="btn btn-outline-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="true"><FontAwesomeIcon icon={faUser} /> </button>
                        <ul class="dropdown-menu">
                          <li>
                            <Link className="dropdown-item" to="/user/profile">View Profile</Link>
                          </li>
                          <li><hr class="dropdown-divider" /></li>
                          <li>
                            <Link className="dropdown-item" to="/user/profile">My Recipes</Link>
                          </li>
                          <li><hr class="dropdown-divider" /></li>
                          <li>
                            <Link className="dropdown-item" to="/user/profile">Sign Out</Link>
                          </li>
                          <li><hr class="dropdown-divider" /></li>
                        </ul>
                      </div>
                    </>
                  ) : (
                    // Show Login button if not authenticated
                    <>
                      <Link to="/login" className="nav-link active">
                        Sign In
                      </Link>
                      |
                      <Link to="/signup" className="nav-link active">
                        Register
                      </Link>
                    </>
                  )}
                </h3>
              </div>
              <div className="search-bar ms-3">
                <input type="text" className="form-control" placeholder="Search..." />
                <button type="submit" className="btn btn-outline-light ms-2">
                  Search
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}

export default NavBar;
