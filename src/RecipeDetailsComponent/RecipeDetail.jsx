import React, {useEffect, useState} from 'react'
import { NavLink, Outlet, useParams } from 'react-router-dom'
import { API_URL } from '../../api';
import './RecipeDetail.css'
import { ArrowLeft } from 'lucide-react';

function RecipeDetail() {
  const [recipe, setRecipe] = useState(null);
  const {id: recipeId} = useParams();
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`${API_URL}/${recipeId}`)
      .then(r => {
        if(!r.ok) {
          throw new Error("Recipe not found");
        }
        return r.json();
      })
      .then(data => {
        if(!data.id) {
          throw new Error("Recipe not found");
        }
        console.log(data);
        setRecipe(data)
      })
      .catch(err => setError(err))

  }, [recipeId]);
  
  if(error) {
    return <p style={{color: "red"}}>{error}</p>
  }

  if(!recipe) {
    return <p>Loading...</p>
  }

  return (
    <div className='details-container'>
      <NavLink className="back-btn" to={`/recipes/${recipe.category.toLowerCase()}`}><ArrowLeft size={28}/></NavLink>
      <img id="top-image" src={recipe.image} alt={recipe.title} />
      <h1 id="title">{recipe.title}</h1>
      <nav className='nav-links'>
        {/* tyle={{textDecoration: "none", color: "inherit"} */}
        <NavLink className="link" to='ingredient'>Ingredients</NavLink>
        <NavLink className="link" to='preparation'>Instructions</NavLink>
        {/* <NavLink className="back-btn" to={`/recipes/${recipe.category.toLowerCase()}`}>Back</NavLink> */}
      </nav>
      <main>
        <Outlet />
      </main>
    </div>
  )
}

export default RecipeDetail
