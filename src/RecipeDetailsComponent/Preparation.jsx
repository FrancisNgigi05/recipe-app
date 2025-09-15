import React, {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom';
import { API_URL } from '../api';

function Preparation() {
    const [instruction, setInstruction] = useState([]);
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
                setInstruction(data.instructions);
            })
            .catch(err => setError(err.message))
    }, [recipeId]);

    if(error) {
        return <p style={{color: "red"}}>{error}</p>
    }

    const displayedInstructions = instruction.map((ins) => {

        console.log(ins)
        return(
            <li key={ins}>{ins}</li>
        )
    } 
    )

    return (
        <div>
            <h1>Instructions</h1>
            <ul>
                {displayedInstructions}
            </ul>
        </div>
    )
}

export default Preparation
