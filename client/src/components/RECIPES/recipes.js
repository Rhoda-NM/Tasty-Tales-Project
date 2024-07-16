import React, { useState, useEffect } from 'react';
import RecipeCard from './recipeCard';
import 'bootstrap/dist/css/bootstrap.min.css';


const Recipes = () => {
    const [recipes, setRecipes] = useState([]);
    const [loading, setLoading] = useState(true);  // Loading state

    useEffect(() => {
        fetch('/recipe/recipes')  // Adjust the URL if your endpoint is different
            .then(response => response.json())
            .then(data => {
                setRecipes(data);
                setLoading(false);  // Update loading state once data is fetched
            })
            .catch(error => {
                console.error('Error fetching recipes:', error);
                setLoading(false);  // Update loading state on error
            });
    }, []);

    const backgroundImageUrl = 'https://images.pexels.com/photos/4346328/pexels-photo-4346328.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2';

    // Define an array of background colors for recipe cards
    const cardColors = ['#f4a261', '#43aa8b', '#f3722c', '#577590', '#f9c74f', '#90be6d'];

    return (
        <div 
            className="container-fluid p-0"
            style={{
                backgroundImage: `url(${backgroundImageUrl})`,
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
                minHeight: '100vh',
                overflowX: 'hidden',
                backgroundAttachment: 'fixed',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column',
                textAlign: 'center',
            }}
        >
            <div className="container mt-4">
                <h1 className="mb-4" style={{ color: '#ff69b4', fontWeight: 'bold', fontFamily: 'cursive', fontSize: '3rem' }}>Recipes</h1>
                <div className="row">
                    {loading ? (
                        <p>Loading...</p>  // Placeholder for loading state
                    ) : recipes.length === 0 ? (
                        <p>No recipes found.</p>  // Placeholder for empty state
                    ) : (
                        recipes.map((recipe, index) => (
                            <div key={recipe.id} className="col-10 col-md-6 col-lg-4 mb-4 d-flex align-items-stretch">
                                <div className="card" style={{ backgroundColor: cardColors[index % cardColors.length], padding: '10px', borderRadius: '10px', height: '100%' }}>
                                    <RecipeCard recipe={recipe} />
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

export default Recipes;
