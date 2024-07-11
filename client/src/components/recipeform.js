import React, { useState } from 'react';
import axios from 'axios';

const RecipeForm = () => {
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

        axios.post('/recipes', formattedRecipe)
            .then(response => {
                alert('Recipe added successfully!');
            })
            .catch(error => {
                console.error('There was an error adding the recipe!', error);
            });
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" name="title" value={recipe.title} onChange={handleChange} placeholder="Title" required />
            <textarea name="description" value={recipe.description} onChange={handleChange} placeholder="Description" required />
            <textarea name="ingredients" value={recipe.ingredients} onChange={handleChange} placeholder="Ingredients" required />
            <textarea name="instructions" value={recipe.instructions} onChange={handleChange} placeholder="Instructions" required />
            <input type="text" name="tags" value={recipe.tags} onChange={handleChange} placeholder="Tags (comma-separated)" required />
            <button type="submit">Add Recipe</button>
        </form>
    );
};

export default RecipeForm;