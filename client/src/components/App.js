import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import { Container } from 'react-bootstrap';
import Home from './home'; // Assuming you have a Home component
import Login from './login'; // Assuming you have a Login component
import SignUp from './signup'; // Assuming you have a Signup component
//import Recipe from './recipes'; // Import the Recipe component
//import RecipeCards from './recipeCard'; // Import the RecipeCards component
//import { Switch, Route } from "react-router-dom";
import Recipes from "./recipes";

function App() {
  return (
    <Router>
      <div className="App bg-light-gray"> {/* Apply background color */}
        <Container>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/signup" component={SignUp} />
          </Switch>
        </Container>
      </div>
    </Router>
    
  );

}

export default App;
