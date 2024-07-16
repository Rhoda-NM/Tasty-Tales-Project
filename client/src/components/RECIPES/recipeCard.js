import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const RecipeCard = ({ recipe }) => {
    const { id, title, description, imgUrl, author, tags } = recipe;

    // Placeholder image URL
    const placeholderImageUrl = 'https://via.placeholder.com/400x250.png?text=Recipe+Image';


    return (
        <div className="card mb-4">
            {/* Display the image if available, otherwise show placeholder */}
            {imgUrl ? (
                <img src={imgUrl} className="card-img-top" alt={title} />
            ) : (
                <img src={placeholderImageUrl} className="card-img-top" alt={title} />
            )}
            <div className="card-body">
                <h5 className="card-title">{title}</h5>
                <div>
                    <p>By: {author}</p>
                    <p className="card-text">{description}</p>
                {/*Add tags here */}
                </div>
                
            </div>
        </div>
    );
};

export default RecipeCard;