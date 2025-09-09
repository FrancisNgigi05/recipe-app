import React, {useEffect, useState} from 'react'
import { NavLink, Outlet, useParams } from 'react-router-dom'
import { API_URL } from '../../api';
import './RecipeDetail.css'

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

  }, [recipeId]);
  
  if(error) {
    return <p style={{color: "red"}}>{error}</p>
  }

  if(!recipe) {
    return <p>Loading...</p>
  }

  return (
    <div className='details-container'>
      <img src={recipe.image} alt={recipe.title} />
      <h1>{recipe.title}</h1>
      <nav className='nav-links'>
        {/* tyle={{textDecoration: "none", color: "inherit"} */}
        <NavLink to='ingredient' style={{textDecoration: "none", color: "inherit"}}>Ingredients</NavLink>
        <NavLink to='preparation' style={{textDecoration: "none", color: "inherit"}}>Instructions</NavLink>
      </nav>
      <main>
        <Outlet />
      </main>
    </div>
  )
}

export default RecipeDetail
