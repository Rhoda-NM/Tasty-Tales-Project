import React from 'react';
// import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
// import SearchBar from './SearchBar';

const Navbar= () => {
  return (
    
       <nav class="navbar navbar-expand-sm bg-body-tertiary" style={{height:'80px', width:'100%', background:'gray'}}>
             <div class="container-fluid">
                   <h1 class="navbar-brand">Recipe</h1>
                   <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarScroll" aria-controls="navbarScroll" aria-expanded="false" aria-label="Toggle navigation">
                     <span class="navbar-toggler-icon"></span>
                   </button>
                   <div class="collapse navbar-collapse" id="navbarScroll" style={{display:'flex', paddingLeft:'50px'}}>
                        <ul class="navbar-nav me-auto my-2 my-lg-0 navbar-nav-scroll" style={{height:" 100px;"}}>
                           <li class="nav-item">
                             <Link class="nav-link active" aria-current="page" to={'/'}>Home</Link>
                           </li>
                           <li class="nav-item">
                             <Link class="nav-link active" aria-current="page" to={'/recipes'}>Recipes</Link>
                           </li>
                           <li class="nav-item">
                             <Link class="nav-link active" aria-current="page" to={'/recipeform'}>AddRecipe</Link>
                           </li>
                           <li class="nav-item">
                             <Link class="nav-link active" aria-current="page" to={'/about'}>About</Link>
                           </li>
                          
                         </ul>
                         
                    </div>
                    {/* <SearchBar /> */}
              </div>
        </nav>   
    
  );
};

export default Navbar;