import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './AuthProvider'
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import { Container, Navbar } from 'react-bootstrap';
import Home from './home'; 
import NavBar from './navbar';
import Login from './USER/login'; // Assuming you have a Login component
import SignUp from './USER/signup'; // Assuming you have a Signup component
//import Recipe from './recipes'; // Import the Recipe component
//import RecipeCards from './recipeCard'; // Import the RecipeCards component
//import { Switch, Route } from "react-router-dom";
import Recipes from "./RECIPES/recipes";
import RecipeForm from './RECIPES/recipeform';
import Review from './RECIPES/review';
import RecipeDetail from './RECIPES/recipeDetail';
import UserProfile from './USER/UserProfile';
import SearchResults from './RECIPES/SearchRecipe';

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
      
          <div className='container-fluid'>
            <Routes>
              <Route exact path="/" element={<Home />}  />
              <Route exact path="/login" element={<Login />} />
              <Route exact path="/signup" element={<SignUp />} />
              <Route exact path="/recipes"  element={<Recipes />} />
              <Route exact path="/recipeform" element={<RecipeForm />} />
              <Route exact path="/review" element={<Review />} />
              <Route path="/recipes/:id" element={<RecipeDetail />} />
              <Route path='/UserProfile' element={ <UserProfile />} />
              <Route path="/search" element={<SearchResults />} />
            </Routes>
          </div>
        </div>
    
    </AuthProvider>
    
  );

}

export default App;
