import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { API_URL } from '../../api';


function Ingredients() {
    const [ingredient, setIngredient] = useState([]);
    const [error, setError] = useState(null);
    const {id: recipeId} = useParams();
    
    useEffect(() => {
        fetch(`${API_URL}/${recipeId}`)
            .then(r => {
                if(!r.ok) {
                    throw new Error("Error fetching data");
                }
                return r.json();
            })
            .then(data => {
                if(!data.id) {
                    throw new Error("Error fetching data");
                }
                console.log(data);
                setIngredient(data.ingredients);
            })
            .catch(err => setError(err.message))
    }, [recipeId]);

    if(error) {
        return <p style={{color: "red"}}>{error}</p>
    }

    const displayedIngredient = ingredient.map((ingr) => {

        console.log(ingr)
        return(
            <li key={ingr}>{ingr}</li>
        )
    } 
    )

    return (
        <div>
            <h1>Ingredients</h1>
            <ul>
                {displayedIngredient}
            </ul>
        </div>
    )
}

export default Ingredients
