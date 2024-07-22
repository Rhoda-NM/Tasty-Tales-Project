import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import NavBar from '../navbar';
import Footer from '../footer';

const EditRecipes = ({ authState }) => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [recipe, setRecipe] = useState({ title: '', ingredients: '', instructions: '' });
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchRecipe = async () => {
            try {
                const response = await axios.get(`/api/recipes/${id}`);
                setRecipe(response.data);
            } catch (err) {
                console.error("Error fetching recipe:", err);
                setError(err.message || "An error occurred while fetching the recipe.");
            }
        };

        fetchRecipe();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setRecipe({ ...recipe, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        try {
            await axios.put(`/api/recipes/${id}`, recipe, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            navigate('/myRecipes');
        } catch (error) {
            console.error("Error updating recipe:", error);
            setError(error.message || "Error updating recipe.");
        }
    };

    const handleDelete = async () => {
        const token = localStorage.getItem('token');
        try {
            await axios.delete(`/api/recipes/${id}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            navigate('/myRecipes');
        } catch (error) {
            console.error("Error deleting recipe:", error);
            setError(error.message || "Error deleting recipe.");
        }
    };

    return (
        <>
            <NavBar />
            <div className="container mt-5">
                <h1>{recipe.title}</h1>
                <p>Written by: {recipe.author}</p>
                {recipe.imgUrl && <img src={recipe.imgUrl} alt={recipe.title} className="img-fluid mb-3" />}
                <p>{recipe.description}</p>

                <div className="row mt-5">
                    <div className="col-12 mb-3">
                        <button onClick={handleDelete} className="btn btn-danger">Delete Recipe</button>
                    </div>
                    <h2>Edit Recipe</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label className="form-label">Title</label>
                            <input
                                type="text"
                                className="form-control"
                                name="title"
                                value={recipe.title}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Ingredients</label>
                            <textarea
                                className="form-control"
                                name="ingredients"
                                value={recipe.ingredients}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Instructions</label>
                            <textarea
                                className="form-control"
                                name="instructions"
                                value={recipe.instructions}
                                onChange={handleChange}
                            />
                        </div>
                        <button type="submit" className="btn btn-primary">Update Recipe</button>
                    </form>
                </div>
                {error && <p className="text-danger">{error}</p>}
            </div>
            <Footer />
        </>
    );
};

export default EditRecipes;
