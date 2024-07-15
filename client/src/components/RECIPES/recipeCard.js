import { RecipeForm } from './recipeform';
import { Link } from 'react-router-dom';

export const RecipeCard = ({
        title,
        description,
        id
}) => {
	return (
		<>
            (
                <RecipeForm 
                   recipeId={id}
                   recipeTitle={title}
                />  
                    <div class="card" style="width: 18rem;">
                        <div class="card-body">
                           <h5 class="card-title">{title}</h5>
                           <p class="card-text">{description}</p>
                           <Link to='/recipepage' class="btn btn-primary">Open</Link>
                        </div>
                    </div>
            )
            
		</>
	);
};