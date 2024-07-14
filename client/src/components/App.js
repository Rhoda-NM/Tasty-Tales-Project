import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './AuthProvider'
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import { Container } from 'react-bootstrap';
import Home from './home'; // Assuming you have a Home component
import Login from './login'; // Assuming you have a Login component
import SignUp from './signup'; // Assuming you have a Signup component
//import Recipe from './recipes'; // Import the Recipe component
//import RecipeCards from './recipeCard'; // Import the RecipeCards component
//import { Switch, Route } from "react-router-dom";
import Recipes from "./recipes";

const ProtectedRoute = ({ component: Component }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  return user ? <Component /> : <Navigate to="/login" />;
};

function App() {
  return (
    <AuthProvider >
      
        <div className="App bg-light-gray"> {/* Apply background color */}
          <Container>
            <Routes>
              <Route exact path="/" element={<Home />}  />
              <Route exact path="/login" element={<Login />} />
              <Route exact path="/signup" element={<SignUp />} />
              <Route exact path="/recipes"  element={<Recipes />} />
            </Routes>
          </Container>
        </div>
    
    </AuthProvider>
    
  );

}

export default App;
