import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useAuth } from '../AuthProvider';
import { useNavigate } from 'react-router-dom';
import Login from '../USER/login';

const AddRecipeForm = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [recipe, setRecipe] = useState({
    title: '',
    description: '',
    ingredients: '',
    instructions: '',
    tags: ''
  });

  const handleChange = (e) => {
    setRecipe({ ...recipe, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formattedRecipe = {
        ...recipe,
        tags: recipe.tags.split(',').map(item => item.trim())
    };

    axios.post('/api/recipes', formattedRecipe)
        .then(response => {
            alert('Recipe added successfully!');
        })
        .catch(error => {
            console.error('There was an error adding the recipe!', error);
        });
  };



  if (!user) {
    return (
      <>
        <h3>You need to login to add a recipe</h3>
        <Login />
      </>
    );
  }

  return (
    <div>
      <h1>Add a Recipe</h1>
      <div>
            <div>
                <h3 style={{textAlign:'center'}}>Recipe Form</h3>
            </div>
        <form onSubmit={handleSubmit} style={{gap:'10px', paddingTop:'20px', width:'100%', padding:'30px', backgroundColor:' rgba(123, 106, 106, 0.4)', borderRadius:'20px'}}>
            
                 <h6>Title:</h6>
                 <input type="text" name="title" value={recipe.title} onChange={handleChange} placeholder="Title" required />

                 <h6>Description:</h6>
                 <textarea name="description" value={recipe.description} onChange={handleChange} placeholder="Description" required />
           
                 <h6>Ingredients:</h6>
                 <textarea name="ingredients" value={recipe.ingredients} onChange={handleChange} placeholder="ingredients" required />
            
           
                 <h6>Instructions:</h6>
                 <textarea name="instructions" value={recipe.instructions} onChange={handleChange} placeholder="instructions" required />
            
                <h6>Tag</h6>
                <input type="text" name="tags" value={recipe.tags} onChange={handleChange} placeholder="Tags (comma-separated)" required />
            
            <div style={{alignContent:'center', width:'90px', height:'30px'}}>
                <button type="submit">Add </button>
            </div>
            
        </form>
        </div>
    </div>
  );
};

export default AddRecipeForm;