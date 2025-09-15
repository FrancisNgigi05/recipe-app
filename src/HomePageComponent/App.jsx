import { useEffect, useState } from 'react'
import { API_URL } from '../api';
import { Link } from 'react-router-dom';
import './App.css'
import BreakfastImage from "../assets/BreakfastImage.jpeg";
import DinnerImage from "../assets/DinnerImage.jpeg";
import LunchImage from "../assets/LunchImage.jpeg";
import SnacksImage from "../assets/SnackImage.jpeg";

function App() {
  const [categories, setCategories] = useState([]);
  const categoryImages = {
    Breakfast: BreakfastImage,
    Dinner: DinnerImage,
    Lunch: LunchImage,
    Snacks: SnacksImage 
  };

  useEffect(() => {
    fetch(`${API_URL}/recipes`)
      .then(r => r.json())
      .then(data => {
        const allCategories = data.map(recipe => recipe.category);
        console.log(allCategories);
  
        const uniqueCategories = [...new Set(allCategories)];
        console.log(uniqueCategories);
        setCategories(uniqueCategories);
      })
      .catch(err => console.error("Error fetching data: ",err));
  }, []);


  const categoriesDisplayed = categories.map(category => (
    <div key={category} className='category-card'>
      <div className='category-info'>
        <img src={categoryImages[category]} alt={category} className='icon'/>
        <div className='inner'>
          <h3>{category}</h3>
          <p>Recipes</p>
        </div>
      </div>
      <Link to={`/recipes/${category.toLowerCase()}`} className='enter-btn'>
        Enter
      </Link>
    </div>
  ))

  return (
    <div className='categories-container'>
      {categoriesDisplayed}
    </div>
  )
}

export default App
