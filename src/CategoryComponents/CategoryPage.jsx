import React, {useEffect, useState} from 'react'
import { useParams, Link, NavLink } from 'react-router-dom'
import { API_URL } from '../../api'
import './CategoryPage.css'
import { ArrowLeft } from 'lucide-react'

function CategoryPage() {
    const {category} = useParams();
    const [recipes, setRecipes] = useState([]);

    useEffect(() => {
        fetch(API_URL)
            .then(r => r.json())
            .then(data => {
                const filtered = data.filter(recipe => recipe.category.toLowerCase() === category.toLocaleLowerCase());
                // console.log(filtered);
                
                setRecipes(filtered);
            })
    }, [category]);
    

    const recipesDisplayed = recipes.map((recipe) => {
        console.log(recipe.image);
        
        return(
            <Link to={`/recipe/${recipe.id}`} key={recipe.id} style={{textDecoration: "none", color: "inherit"}}>
                <div className='recipe-container'>
                    <div className='recipe-details'>
                        <img className='recipe-image' src={recipe.image} alt={recipe.title} />
                        <p>{recipe.title}</p>
                    </div>
                    <i>{recipe.time}</i>
                </div>
            </Link>
        )
    });

    return (
        <>
            <NavLink className='nav-link' to="/"><ArrowLeft size={30}/></NavLink>
            {recipesDisplayed}
        </>
    )
}

export default CategoryPage
