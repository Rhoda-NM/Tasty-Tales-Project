import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import NavBar from '../navbar';
import Footer from '../footer'

const RecipeDetail = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [error, setError] = useState(null);
  const [commentContent, setCommentContent] = useState('');
  const [rating, setRating] = useState(0)
 
 
  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await axios.get(`/api/recipes/${id}`);
        setRecipe(response.data);
      } catch (err) {
        setError(err);
      }
    };

    fetchRecipe();
  }, [id]);

  if (error) return <p>Error loading recipe: {error.message}</p>;
  if (!recipe) return <p>Loading...</p>;

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      if (!token) return <p> You need to login first</p>
      const response = await axios.post(`/api/recipes/${id}/comments`,
         { content: commentContent }, 
         {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
      });
      console.log('Comment added:', response.data);
      setCommentContent('');
      // Fetch updated recipe data to display new comment
      const updatedRecipe = await axios.get(`/api/recipes/${id}`);
      console.log(updatedRecipe)
      setRecipe(updatedRecipe.data);
    } catch (err) {
      setError(err);
    }
  };
 
  const handleStarClick = async (starRating) => {
    
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(`/api/recipes/${id}/ratings`, { score: starRating }, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      console.log('Rating added', response.data)
      // Fetch updated recipe data to display new rating
      const updatedRecipe = await axios.get(`/api/recipes/${id}`);
      console.log(updatedRecipe);
      setRecipe(updatedRecipe.data);
    } catch (err) {
      setError(err);
    }
  };

  return (
    <>
      <NavBar />
      <div>
        <h1>{recipe.title}</h1>
        <p>Written by:  {recipe.author}</p>
        <img src={recipe.imgUrl} alt={recipe.title} />
        <h3>Tags</h3>
        <ul>
          {recipe.tags.map(tag => (
            <li key={tag.id}>{tag}</li>
          ))}
        </ul>
        <p>{recipe.description}</p>
        <h3>Ratings</h3>
        {recipe.ratings> 0 ? (
          <div className="text-center mb-4">
          {[1, 2, 3, 4, 5].map((star) => (
            <span
              key={star}
              style={{ fontSize: '30px', cursor: 'pointer', color: star <= recipe.ratings ? '#ffd700' : '#6c757d' }} 
            >
              ★
            </span>
          ))}
          </div>
        ) : (
          <p>No ratings yet.</p>
        )}
        <h3>Ingredients</h3>
        <ul>
          {recipe.ingredients.split('\n').map((ingredient, index) => (
            <li key={index}>{ingredient}</li>
          ))}
        </ul>
        <h3>Instructions</h3>
        <ul>
          {recipe.instructions.split('\n').map((instruction, index) => (
            <li key={index}>{instruction}</li>
          ))}
        </ul>

        <h3>Rate the recipe</h3>
        <div className="text-center mb-4">
              {[1, 2, 3, 4, 5].map((star) => (
                <span
                  key={star}
                  style={{ fontSize: '30px', cursor: 'pointer', color: star <= rating ? '#ffd700' : '#6c757d' }}
                  onClick={() => handleStarClick(star)}
                >
                  ★
                </span>
              ))}
          </div>
        <h3>Comments</h3>
        {recipe.comments.length > 0 ? (
          <ul>
            {recipe.comments.map(comment => (
              <li key={comment.id}>
                <span>{comment.author.username}</span><br />
                {comment.content}
              </li>
            ))}
          </ul>
        ) : (
          <p>No comments yet.</p>
        )}
        <form onSubmit={handleCommentSubmit}>
          <h4>Add a Comment</h4>
          <textarea
            value={commentContent}
            onChange={(e) => setCommentContent(e.target.value)}
            required
          />
          <button type="submit">Submit Comment</button>
        </form>

      </div>
      <Footer />
    </>
  );
};

export default RecipeDetail;