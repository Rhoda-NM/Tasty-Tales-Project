import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const RecipeCard = ({ recipe }) => {
    const { id, title, description, ingredients, instructions, imgUrl } = recipe;

    // Placeholder image URL
    const placeholderImageUrl = 'https://via.placeholder.com/400x250.png?text=Recipe+Image';

    // State to manage expanded/collapsed view
    const [expanded, setExpanded] = useState(false);

    // Function to toggle expanded view
    const toggleExpanded = () => {
        setExpanded(!expanded);
    };

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
                {!expanded && (
                    <div>
                        <p className="card-text">{description}</p>
                        <button className="btn btn-link" onClick={toggleExpanded}>
                            Expand
                        </button>
                    </div>
                )}
                {expanded && (
                    <div>
                        <p className="card-text">{description}</p>
                        <p className="card-text"><strong>Ingredients:</strong> {ingredients}</p>
                        <p className="card-text"><strong>Instructions:</strong> {instructions}</p>
                        <Link to={`/review`} className="btn btn-danger">
                            Add Review
                        </Link>
                        <button className="btn btn-link mt-2" onClick={toggleExpanded}>
                            Collapse
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default RecipeCard;