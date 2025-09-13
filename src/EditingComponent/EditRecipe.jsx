import React, { useEffect, useState } from 'react'
import { NavLink, useNavigate, useParams } from 'react-router-dom'
import { API_URL } from '../../api';
import './EditRecipe.css'
import { CATEGORIES } from '../constants';
import { ArrowLeft } from 'lucide-react';

function EditRecipe() {
    const {id} = useParams();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        title: "",
        category: "",
        image: "",
        ingredients: "",
        instructions: "",
        time: ""
    })

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);


    useEffect(() => {
        fetch(`${API_URL}/${id}`)
            .then((r) => {
                if(!r.ok) {
                    throw new Error("Recipe not found");
                }
                return r.json();
            })
            .then((data) => {
                setFormData({
                    title: data.title || "",
                    category: data.category || "",
                    image: data.image || "",
                    ingredients: data.ingredients?.join(", ") || "",
                    instructions: data.instructions?.join("\n") || "",
                    time: data.time || ""
                });
                setLoading(false);
            })
            .catch((err) => {
                setError(err.message);
                setLoading(false);
            })
    }, [id]);

    function handleChange(e) {
        const {name, value} = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
    }

    function handleSubmit(e) {
        e.preventDefault();
        
        const updatedRecipe = {
            ...formData,
            ingredients: formData.ingredients.split(",").map((i) => i.trim()),
            instructions: formData.instructions.split("\n").map((i) => i.trim())
        };

        fetch(`${API_URL}/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(updatedRecipe)
        })
            .then((r) => {
                if(!r.ok) {
                    throw new Error("Failed to update recipe");
                }
                return r.json();
            })
            .then(() => {
                navigate(`/recipe/${id}`);
            })
            .catch((err) => {
                setError(err.message);
            });
    }

    if (loading) return <p>Loading recipe...</p>
    if (error) return <p style={{color: "red"}}>{error}</p>

    return (
        <form onSubmit={handleSubmit}>
            <NavLink to={`/recipe/${id}`}>
                <ArrowLeft size={28}/>
            </NavLink>
            <h2>Edit Recipe</h2>

            <input
                type="text"
                name='title'
                value={formData.title}
                onChange={handleChange}
                placeholder='Title'
                required
            />
            <br /><br />
            <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
                >
                <option value="">-- Select Category --</option>
                {CATEGORIES.map((cat) => (
                    <option key={cat} value={cat}>
                        {cat}
                    </option>
                ))}
            </select>
            <br /><br />
            <input
                type="text"
                name='image'
                value={formData.image}
                onChange={handleChange}
                placeholder='Image URL'
                required
            />
            <br /><br />
            <textarea
                name="ingredients"
                id='ingredients-text'
                value={formData.ingredients}
                onChange={handleChange}
                placeholder='Ingredients (comma separated)'
                required 
            />
            <br /><br />
            <textarea 
                name='instructions'
                id='instructions-text'
                value={formData.instructions}
                onChange={handleChange}
                placeholder='Instructions (each step on new line)'
                required
            />
            <br /><br />
            <input
                type="text"
                name='time'
                value={formData.time}
                onChange={handleChange}
                placeholder='Cooking time'
            />
            <br /><br />
            <button type='submit'>Save Changes</button>
        </form>
    )
}

export default EditRecipe
