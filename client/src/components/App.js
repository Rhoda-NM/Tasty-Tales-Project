import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './AuthProvider';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import { Container } from 'react-bootstrap';
import Home from './home'; // Assuming you have a Home component
import Login from './USER/login'; // Assuming you have a Login component
import SignUp from './USER/signup'; // Assuming you have a Signup component
import Recipes from "./RECIPES/recipes";
import AddRecipeForm from './RECIPES/recipeform';
import Review from './RECIPES/review'; // Import the review component from RECIPES folder

const ProtectedRoute = ({ component: Component }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  return user ? <Component /> : <Navigate to="/login" />;
};

function App() {
  return (
    <AuthProvider>
      <div className="App bg-light-gray"> {/* Apply background color */}
        <Container>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/signup" element={<SignUp />} />
            <Route exact path="/recipes" element={<Recipes />} />
            <Route exact path="/recipeform" element={<AddRecipeForm />} />
            <Route exact path="/recipes/:id/review" element={<Review />} /> {/* Route for review component */}
          </Routes>
        </Container>
      </div>
    </AuthProvider>
  );
}

export default App;
