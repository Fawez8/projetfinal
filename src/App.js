import React, {useEffect, useState} from 'react';
import Recipe from './Recipe';
import './App.css';

const App = ()=> {
  const APP_ID = "decf3213";
  const APP_key = "d7c480c2870ab57787bb85496c17e250";

  const [recipes, setRecipes]=useState([]);
  const [search, setSearch]= useState('');
  const [query, setQuery]= useState('chicken');

  useEffect(()=>{
    getRecipes();

  },[query]);

  const getRecipes = async () => {
    const response = await fetch(`https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_key}`);
    const data = await response.json();
    setRecipes(data.hits);
    console.log(data.hits);

  };

  const updateSearch = e =>{
    setSearch(e.target.value);
  }

  const getSearch = e => {
    e.preventDefault();
    setQuery = (search);
    setSearch('');
  }

  return(
    <div className = "App">
      <form onSubmit ={getSearch} className= "search-form">
        <input className="search-bar" type="text" value={search} onChange={updateSearch}/>
        <button className="search-button" type ="submit">search</button>

      </form>

      <div className ="recipes">

      {recipes.map(recipe => (
        <Recipe 
        key = {recipe.recipe.label}
        title = {recipe.recipe.label} 
        calories = {recipe.recipe.calories} 
        image = {recipe.recipe.image}
        ingredients = {recipe.recipe.ingredients}
        />

      ))}

</div>



    </div>


  );



}

export default App;
