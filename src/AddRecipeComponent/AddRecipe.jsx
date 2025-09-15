import React, {useState} from 'react'
import {  useNavigate, NavLink } from 'react-router-dom';
import { API_URL } from '../api';
import { CATEGORIES } from '../constants';
import { ArrowLeft } from 'lucide-react';

function AddRecipe() {
    const navigate = useNavigate();

    const [newRecipe, setNewRecipe] = useState({
        title: "",
        category: "",
        image: "",
        time: "",
        ingredients: [],
        instructions: []
    });

    const [ingredientInput, setIngredientInput] = useState("");
    const [instructionInput, setInstructionInput] = useState("");

    function handleChange(e) {
        const {name, value} = e.target;
        setNewRecipe({
            ...newRecipe,
            [name]: value
        });
    }

    // Add ingredient to array
    function addIngredient() {
        if(ingredientInput.trim() !== "") {
            setNewRecipe({
                ...newRecipe,
                ingredients: [...newRecipe.ingredients, ingredientInput]
            });
            setIngredientInput("");
        }
    }

    // Add instruction to array
    function addInstruction() {
        if(instructionInput.trim() !== "") {
            setNewRecipe({
                ...newRecipe,
                instructions: [...newRecipe.instructions, instructionInput]
            });
            setInstructionInput("");
        }
    }

    function handleSubmit(e) {
        e.preventDefault();
        
        fetch(`${API_URL}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newRecipe)
        })
            .then(r => {
                if(!r.ok) throw new Error("Error adding new recipe");
                return r.json();
            })
            .then(data => {
                navigate(`/recipe/${data.id}`);
            })
            .catch(err => console.error(err))
    }

    return (
        <div style={{padding: "1rem"}}>
            <NavLink to="/"><ArrowLeft /></NavLink>
            <h1>Add a new recipe</h1>
            <form action="" onSubmit={handleSubmit} className='form'>
                <input
                    type="text"
                    name='title'
                    placeholder='Recipe Title'
                    value={newRecipe.title}
                    onChange={handleChange}
                    required
                />
                <br /><br />
                <select 
                    name="category"
                    value={newRecipe.category}
                    onChange={handleChange}
                    required
                >
                    <option value="">-- Select Category --</option>
                    {CATEGORIES.map((cat) => (
                        <option key={cat} value={cat}>{cat}</option>
                    ))}
                </select>
                <br /><br />
                <input
                    type="text" 
                    name="image"
                    placeholder='Image URL'
                    value={newRecipe.image}
                    onChange={handleChange}
                    required
                />
                <br /><br />
                <input
                    type="text"
                    name='time'
                    placeholder='Cooking Time (e.g 20 mins)'
                    value={newRecipe.time}
                    onChange={handleChange}
                    required
                />
                <br />
                <br />

                <h3>Ingredients</h3>
                <input
                    type="text"
                    placeholder='Add ingredient'
                    value={ingredientInput}
                    onChange={(e) => setIngredientInput(e.target.value)}
                />
                <button type='button' onClick={addIngredient}>Add</button>
                <ul>
                    {newRecipe.ingredients.map((ing, i) => (
                        <li key={i}>{ing}</li>
                    ))}
                </ul>

                <h3>Instructions</h3>
                <input
                    type="text"
                    placeholder='Add instructions'
                    value={instructionInput}
                    onChange={(e) => setInstructionInput(e.target.value)}
                />
                <button type='button' onClick={addInstruction}>Add</button>
                <ul>
                    {newRecipe.instructions.map((ins, i) => (
                        <li key={i}>{ins}</li>
                    ))}
                </ul>


                <button type="submit">Save Recipe</button>
            </form>
        </div>
    )
}

export default AddRecipe;
