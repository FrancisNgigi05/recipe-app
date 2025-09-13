import React, {useEffect, useState} from 'react'
import { useParams, Link, NavLink } from 'react-router-dom'
import { API_URL } from '../../api'
import './CategoryPage.css'
import { ArrowLeft } from 'lucide-react'
import SearchBar from '../SearchComponent/SearchBar'

function CategoryPage() {
    const {category} = useParams();
    const [recipes, setRecipes] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        fetch(API_URL)
            .then(r => r.json())
            .then(data => {
                const filtered = data.filter(recipe => recipe.category.toLowerCase() === category.toLocaleLowerCase());
                // console.log(filtered);
                
                setRecipes(filtered);
            })
    }, [category]);
    

    // Filter recipes based on search term
    const filteredRecipes = recipes.filter(recipe => 
        recipe.title.toLowerCase().includes(searchTerm.toLowerCase())
    );


    const recipesDisplayed = filteredRecipes.map((recipe) => {
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
            <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />
            {recipesDisplayed}
        </>
    )
}

export default CategoryPage
